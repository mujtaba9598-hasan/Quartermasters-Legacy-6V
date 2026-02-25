import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2002', [])
    
    out = []
    for i in range(0, 3):
        if i < len(msgs):
            m = msgs[i]
            out.append(f"### [{i}] {m.get('subject')}\n{m.get('body')}\n\n---\n")
            
    with open('ceo_directives_latest_read.txt', 'w', encoding='utf-8') as f:
        f.writelines(out)
        
    print("Saved latest directives to ceo_directives_latest_read.txt")
except Exception as e:
    print(f"Error: {e}")
