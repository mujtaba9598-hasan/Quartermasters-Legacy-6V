import json
try:
    with open('inbox_latest.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    msgs = data.get('2002', [])
    with open('subjects_list.txt', 'w', encoding='utf-8') as f:
        for i, m in enumerate(msgs):
            f.write(f"[{i}] {m.get('subject')}\n")
    print(f"Saved {len(msgs)} subjects to subjects_list.txt")
except Exception as e:
    print(f"Error: {e}")
