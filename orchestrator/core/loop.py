import asyncio
import random
import structlog
import os
from ..config import load_config
from ..comms.api_client import AliffCommsClient
from ..processors.response_router import ResponseRouter
from ..core.state import StateManager
from ..audit.audit_trail import AuditTrail

logger = structlog.get_logger()

class OrchestratorLoop:
    def __init__(self):
        self.config = load_config()
        # Main Comms for the System itself (reporting)
        self.comms = AliffCommsClient(
            base_url="https://aliffsolutions.com/api/v1/agent-comms",
            agent_id="SYSTEM", 
            api_key=os.getenv("QM_CEO_COMMS_KEY") 
        )
        self.audit = AuditTrail(self.config["paths"]["audit_file"])
        self.state = StateManager()
        self.router = ResponseRouter(self.config, self.comms)

    # Agent init removed as agents are gone.

    async def run(self):
        logger.info("Orchestrator started")
        while True:
            try:
                await self._poll_cycle()
            except Exception as e:
                logger.error("cycle_error", error=str(e))
            
            # Sleep with jitter
            await asyncio.sleep(300 + random.uniform(0, 10))

    async def _poll_cycle(self):
        # Pure Automation Cycle:
        # 1. Poll CEO (2000) for approved code Deliveries
        # 2. Poll Engineer (2002) for new task assignments (forwarded by CEO)
        
        # We need to watch both inboxes as per config
        watch_list = self.config["polling"].get("watch_agents", ["2000", "2002"])
        
        for agent_id in watch_list:
            # For this daemon, we need the API keys for these agents to read their inboxes.
            # In a real shared env, we might have a master key or individual keys.
            # We assume env vars: QM_CEO_COMMS_KEY, QM_ENGINEER_COMMS_KEY
            
            env_key = ""
            if agent_id == "2000":
                env_key = os.getenv("QM_CEO_COMMS_KEY")
            elif agent_id == "2002":
                env_key = os.getenv("QM_ENGINEER_COMMS_KEY")
            
            if not env_key:
                continue

            client = AliffCommsClient(
                base_url="https://aliffsolutions.com/api/v1/agent-comms",
                agent_id=agent_id,
                api_key=env_key
            )

            try:
                messages = await client.get_unread_messages()
                for msg in messages:
                    if self.state.is_processed(msg["id"]):
                        continue

                    logger.info("processing_msg", msg_id=msg["id"], subject=msg.get("subject"))

                    # LOGIC:
                    # If message contains code blocks (detected by extractor via router),
                    # we treat it as a "Deployment Candidate".
                    # We use the router's deploy_package logic which extracts -> writes -> builds.
                    
                    # We only auto-deploy if it comes from authorized sources or specific subjects?
                    # The Directive says: "Poll CEO inbox... if msg.from == 2002 (Gemini delivery) -> extract -> write -> docker"
                    # Also "Poll Engineer inbox... for forwarded tasks"
                    
                    # IMPLEMENTATION for CEO Inbox (2000):
                    if agent_id == "2000":
                        # CEO receives code from Engineer (2002)
                        if msg.get("from_agent") == "2002":
                            # This is a code delivery. AUTO DEPLOY.
                            logger.info("auto_deploy_trigger", source="engineer_delivery")
                            report = await self.router.deploy_package(msg.get("body", ""), msg)
                            # Report is already sent by router.
                        else:
                            # Just a normal message/directive. Log it.
                            pass

                    # IMPLEMENTATION for Engineer Inbox (2002):
                    elif agent_id == "2002":
                        # Engineer receives directives from CEO (2000)
                        # The orchestrator just ensures they are logged/seen? 
                        # Or maybe we don't need to do anything active here other than mark processed.
                        pass
                    
                    # Mark processed
                    self.state.mark_processed(msg["id"])

            except Exception as e:
                logger.error("poll_error", agent_id=agent_id, error=str(e)) 
