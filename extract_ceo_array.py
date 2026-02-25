import json

try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 2000 is CEO. 2002 is Engineer. 
    msgs_from_ceo_to_engineeer = []
    
    if '2000' in data:
        # Check CEO's outbox or inbox depending on how the JSON is structured
        # Usually checking the root "2002" key gets messages received BY the engineer
        print("CEO key exists.")
        
    msgs = data.get('2000', []) # Lets try reading CEO's array if the schema is flipped
    
    out = []
    for i in range(max(0, len(msgs) - 5), len(msgs)):
        m = msgs[i]
        out.append(f"### [{i}] {m.get('subject')}\n{m.get('body')}\n\n---\n")
            
    with open('from_ceo_array.txt', 'w', encoding='utf-8') as f:
        f.writelines(out)
        
    print(f"Saved {min(5, len(msgs))} messages from 2000's array to from_ceo_array.txt")
except Exception as e:
    print(f"Error: {e}")
