import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    found_blocker = False
    found_ceo = False
    
    output = []
    
    # Check Engineer inbox (2002) for the blocker
    msgs_2002 = data.get('2002', [])
    for idx, m in enumerate(msgs_2002):
        subject = m.get('subject', '')
        if 'BLOCKER' in subject or 'mission_control.py' in subject:
            output.append(f"--- MATCH IN 2002 AT INDEX {idx} ---")
            output.append(f"Sender: {m.get('from_agent', 'Unknown')}")
            output.append(f"Subject: {subject}")
            output.append(f"Body: {m.get('body')}\n\n")
            found_blocker = True
    
    # To get the latest TRUE message from CEO, just take the absolute last element in 2000
    msgs_2000 = data.get('2000', [])
    if len(msgs_2000) > 0:
        latest_ceo = msgs_2000[-1]
        output.append(f"--- LATEST CEO MESSAGE (INDEX {len(msgs_2000)-1}) ---")
        output.append(f"Subject: {latest_ceo.get('subject', '')}")
        output.append(f"Body: {latest_ceo.get('body', '')}\n\n")
        found_ceo = True
            
    if not found_blocker and not found_ceo:
        print("Nothing found in the JSON payload. API has not updated yet.")
    else:
        with open('latest_target_messages.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(output))
        print("Wrote targets to latest_target_messages.txt")
            
except Exception as e:
    print(f"Error: {e}")
