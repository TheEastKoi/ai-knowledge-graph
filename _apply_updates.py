import json
import re

# Read the TS file
with open('src/data/knowledge.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Read the replacement data
with open('_update_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for node_id, node_data in data.items():
    new_desc = node_data['fullDescription']
    new_refs = node_data['references']

    # Replace fullDescription: find from id marker to the fullDescription value
    pattern = rf"(id: '{node_id}'.*?fullDescription:\s*)'[^']*'"

    match = re.search(pattern, content, re.DOTALL)
    if match:
        prefix = match.group(1)
        replacement = f"{prefix}'{new_desc}'"
        content = content[:match.start()] + replacement + content[match.end():]
        print(f"OK: Updated fullDescription for '{node_id}'")
    else:
        print(f"ERROR: No fullDescription match for '{node_id}'")

    # Replace references: find empty references array after the node id
    ref_pattern = rf"(id: '{node_id}'.*?references:\s*\[)\s*\]"

    match = re.search(ref_pattern, content, re.DOTALL)
    if match:
        prefix = match.group(1)
        replacement = f"{prefix}\n{new_refs}\n    ]"
        content = content[:match.start()] + replacement + content[match.end():]
        print(f"OK: Updated references for '{node_id}'")
    else:
        print(f"ERROR: No references match for '{node_id}'")

# Write back
with open('src/data/knowledge.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! File size: {len(content)} chars")
print(f"arxiv.org refs: {content.count('arxiv.org')}")
print(f"promptingguide.ai: {content.count('promptingguide.ai')}")
