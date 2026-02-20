import httpx
from typing import Dict, Any, List
import structlog

logger = structlog.get_logger()

class AliffCommsClient:
    def __init__(self, base_url: str, agent_id: str, api_key: str):
        self.base_url = base_url
        self.agent_id = agent_id
        self.headers = {
            "X-Agent-Id": agent_id,
            "X-Agent-Key": api_key,
            "Content-Type": "application/json"
        }

    async def get_unread_messages(self) -> List[Dict[str, Any]]:
        url = f"{self.base_url}/inbox/{self.agent_id}?status=unread"
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, headers=self.headers)
                response.raise_for_status()
                data = response.json()
                return data.get("messages", [])
            except httpx.HTTPStatusError as e:
                logger.error("api_error - HTTP status error", error=e.response.text, status_code=e.response.status_code)
                raise
            except httpx.RequestError as e:
                logger.error("api_error - Request error", error=str(e))
                raise
            except Exception as e:
                logger.error("api_error - Unexpected error", error=str(e))
                raise

    async def send_message(self, payload: Dict[str, Any]):
        url = f"{self.base_url}/send"
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=self.headers, json=payload)
                response.raise_for_status()
            except httpx.HTTPStatusError as e:
                logger.error("api_error - HTTP status error sending message", error=e.response.text, status_code=e.response.status_code)
                raise
            except httpx.RequestError as e:
                logger.error("api_error - Request error sending message", error=str(e))
                raise
            except Exception as e:
                logger.error("api_error - Unexpected error sending message", error=str(e))
                raise

