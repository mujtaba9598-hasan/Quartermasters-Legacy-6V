import os
import glob

replacements = [
    ("California, United States", "Ajman Free Zone, UAE"),
    ("California Based", "Ajman Free Zone, UAE Based"),
    ("California consulting firm", "Ajman-headquartered consulting firm"),
    ("California law", "UAE law"),
    ("California regulatory authorities", "UAE regulatory authorities"),
    ("California Consumer Privacy Act", "UAE Data Protection Law"),
    ("California Privacy Rights", "UAE Privacy Rights"),
    ("California Residents", "UAE Residents"),
    ("California Attorney General", "UAE Telecommunications and Digital Government Regulatory Authority"),
    ("The California Privacy Protection Agency (CPPA)", "The UAE Data Office"),
    ("California Privacy Protection Agency", "UAE Data Office"),
    ("California residents", "UAE residents"),
    ("California coastal", "Arabian coastal"),
    ("California", "Ajman Free Zone, UAE") # catch all
]

def fix_all():
    files = glob.glob("src/**/*.tsx", recursive=True) + glob.glob("src/**/*.ts", recursive=True)
    count = 0
    for f in files:
        if os.path.isfile(f):
            with open(f, "r", encoding="utf-8") as file:
                content = file.read()
            original = content
            for old, new in replacements:
                content = content.replace(old, new)
            if original != content:
                with open(f, "w", encoding="utf-8") as file:
                    file.write(content)
                count += 1
    print(f"Updated {count} files.")

if __name__ == "__main__":
    os.chdir("quartermasters-nexus")
    fix_all()
