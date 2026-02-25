import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2002', [])
    
    out = []
    # Print the last 4 messages to catch C-09
    for i in range(max(0, len(msgs) - 4), len(msgs)):
        m = msgs[i]
        out.append(f"### [{i}] {m.get('subject')}\n{m.get('body')}\n\n---\n")
            
    with open('c09_directive.txt', 'w', encoding='utf-8') as f:
        f.writelines(out)
        
    print("Saved C-09 to c09_directive.txt")
except Exception as e:
    print(f"Error: {e}")
