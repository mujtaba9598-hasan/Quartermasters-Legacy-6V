import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2000', [])
    
    if len(msgs) > 0:
        # Get the VERY LAST message only, this MUST be the latest
        last_idx = len(msgs) - 1
        m = msgs[last_idx]
        out = f"### [{last_idx}] {m.get('subject')}\n{m.get('body')}\n\n---\n"
        
        with open('the_actual_last_message_ceo.txt', 'w', encoding='utf-8') as f:
            f.write(out)
        print(f"Saved message [{last_idx}] to the_actual_last_message_ceo.txt")
    else:
        print("Inbox is entirely empty.")
except Exception as e:
    print(f"Error: {e}")
