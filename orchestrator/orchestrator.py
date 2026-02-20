import asyncio
import sys
import os
from core.loop import OrchestratorLoop

def print_banner():
    os.system('cls' if os.name == 'nt' else 'clear')
    print("="*60)
    print("   QUARTERMASTERS ORCHESTRATOR DAEMON v1.0")
    print("   Active Agents: CEO (2000), CTO (2001), Engineer (2002)")
    print("="*60)
    print("Type 'Start' to begin the autonomous loop.")
    print("Type 'Exit' to quit.")
    print("-" * 60)

if __name__ == "__main__":
    print_banner()
    while True:
        try:
            cmd = input("QM-ORCHESTRATOR> ").strip().lower()
            if cmd == "start":
                print("[SYSTEM] Initializing agents...")
                print("[SYSTEM] Starting autonomous loop (Ctrl+C to stop)...")
                loop = OrchestratorLoop()
                try:
                    asyncio.run(loop.run())
                except KeyboardInterrupt:
                    print("\n[SYSTEM] Loop stopping...")
                    break
                except Exception as e:
                    print(f"\n[CRITICAL] Loop crashed: {e}")
                    break
            elif cmd == "exit":
                print("[SYSTEM] Shutting down.")
                sys.exit(0)
            else:
                print("Unknown command. Type 'Start' or 'Exit'.")
        except KeyboardInterrupt:
            print("\n[SYSTEM] Shutting down.")
            sys.exit(0)
