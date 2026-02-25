import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2002', [])
    
    # We want to find the exact message that says "ACCEPTED C-09" or gives "DIRECTIVE: C-10"
    for i in range(len(msgs) - 1, -1, -1):
        m = msgs[i]
        subject = m.get('subject', '')
        if 'C-09' in subject or 'C-10' in subject:
            print(f"FOUND MATCH AT INDEX {i}")
            print(f"SUBJECT: {subject}")
            print(f"BODY:\n{m.get('body')}")
            break
            
except Exception as e:
    print(f"Error: {e}")
