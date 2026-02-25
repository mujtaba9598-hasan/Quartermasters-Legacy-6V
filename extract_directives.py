import json
with open('inbox_latest.json', encoding='utf-8') as f:
    data = json.load(f)
msgs = data.get('2002', [])[:2]
out = []
for m in msgs:
    out.append(f"SUBJECT: {m.get('subject')}\nBODY:\n{m.get('body')}\n\n--- NEXT DIRECTIVE ---\n\n")
with open('new_directives_utf8.txt', 'w', encoding='utf-8') as f:
    f.writelines(out)
