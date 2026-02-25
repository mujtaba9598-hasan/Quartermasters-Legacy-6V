import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2002', [])
    
    out = []
    # Print the absolute newest messages starting from the final appended blocks
    for i in range(len(msgs) - 5, len(msgs)):
        if i >= 0:
            m = msgs[i]
            out.append(f"### [{i}] {m.get('subject')}\n{m.get('body')}\n\n---\n")
            
    with open('c09_directive_real.txt', 'w', encoding='utf-8') as f:
        f.writelines(out)
        
    print("Saved true newest to c09_directive_real.txt")
except Exception as e:
    print(f"Error: {e}")
