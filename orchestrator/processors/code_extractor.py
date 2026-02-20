import re
from typing import List, Dict

class CodeExtractor:
    def extract_code_blocks(self, text: str) -> List[Dict[str, str]]:
        # Regex to find code blocks with optional language identifier
        # Matches ```lang ... ```
        pattern = r"```(\w+)?\n(.*?)```"
        matches = re.findall(pattern, text, re.DOTALL)
        
        extracted = []
        for lang, code in matches:
            extracted.append({
                "language": lang.strip() if lang else "text",
                "code": code.strip()
            })
        return extracted
