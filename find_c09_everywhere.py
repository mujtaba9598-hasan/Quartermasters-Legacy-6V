import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    found = False
    
    # Check CEO outbox (2000)
    msgs_2000 = data.get('2000', [])
    for idx, m in enumerate(msgs_2000):
        subject = m.get('subject', '')
        body = m.get('body', '')
        if 'C-09' in subject or 'C-09' in body:
            print(f"--- MATCH IN 2000 AT INDEX {idx} ---")
            print(f"Subject: {subject}")
            print(f"Body snippet: {body[:150]}")
            found = True
            
    # Check Engineer inbox (2002)
    msgs_2002 = data.get('2002', [])
    for idx, m in enumerate(msgs_2002):
        subject = m.get('subject', '')
        body = m.get('body', '')
        if 'C-09' in subject or 'C-09' in body:
            print(f"--- MATCH IN 2002 AT INDEX {idx} ---")
            print(f"Subject: {subject}")
            print(f"Body snippet: {body[:150]}")
            found = True
            
    if not found:
        print("C-09 was not found anywhere in the JSON payload (subject or body). API has not updated yet.")
            
except Exception as e:
    print(f"Error: {e}")
