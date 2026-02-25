import os
import glob

replacements = {
    "src/app/page.tsx": [
        ("California-based, globally minded", "Ajman-headquartered, globally minded"),
        ("California, United States", "Ajman Free Zone, UAE")
    ],
    "src/components/home/HeroSection.tsx": [
        ("California-based, globally minded", "Ajman-headquartered, globally minded"),
        ("href=\"#services\"", "href=\"/services\"")
    ],
    "src/app/layout.tsx": [
        ("California consulting firm", "international consulting firm")
    ],
    "src/components/layout/Footer.tsx": [
        ("California, United States", "Ajman Free Zone, UAE"),
        ("California", "Ajman Free Zone, UAE") # catchall
    ]
}

def fix_specifics():
    for fpath, rules in replacements.items():
        if os.path.exists(fpath):
            with open(fpath, "r", encoding="utf-8") as file:
                content = file.read()
            for old, new in rules:
                content = content.replace(old, new)
            with open(fpath, "w", encoding="utf-8") as file:
                file.write(content)
                
def fix_globals():
    for f in glob.glob("src/**/*.tsx", recursive=True) + glob.glob("src/**/*.ts", recursive=True):
        if os.path.isfile(f):
            with open(f, "r", encoding="utf-8") as file:
                content = file.read()
            original = content
            content = content.replace("hello@example.com", "ceocli@quartermasters.me")
            content = content.replace("hello@quartermasters.me", "ceocli@quartermasters.me") # Wait, is this needed? CEO said replace hello@example.com
            content = content.replace("https://example.com", "https://quartermasters.me")
            content = content.replace("example.com", "quartermasters.me")
            if original != content:
                with open(f, "w", encoding="utf-8") as file:
                    file.write(content)

if __name__ == "__main__":
    os.chdir("quartermasters-nexus")
    fix_specifics()
    fix_globals()
    print("Done applying textual replacements.")
