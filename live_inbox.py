import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://aliffsolutions.com/api/v1/agent-comms/inbox"
headers = {
    "X-Agent-Id": "2002",
    "X-Agent-Key": "lK1qkObpIDrNXwMBrtAij9zAK98eedOi"
}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode())
        msgs = data.get('messages', [])
        print(f"Total live messages: {len(msgs)}")
        if msgs:
            latest = msgs[-1]
            print("--- LATEST API SUBMISSION ---")
            print(f"Subject: {latest.get('subject')}")
            print(f"Body: {latest.get('body')}")
except Exception as e:
    print(f"Error: {e}")
