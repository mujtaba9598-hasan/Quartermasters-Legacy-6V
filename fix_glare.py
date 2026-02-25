import os

files = {
    "src/components/services/FinancialClient.tsx": ("#C8872E", "VaultEffect"),
    "src/components/services/HumanCapitalClient.tsx": ("#2A9D8F", "BreathingEffect"),
    "src/components/services/ManagementClient.tsx": ("#1B3A4B", "PanoramicEffect"),
    "src/components/services/EventLogisticsClient.tsx": ("#D4763C", "RippleEffect"),
    "src/components/services/TechRndClient.tsx": ("#3B82C4", "GlitchEffect")
}

def fix_glare():
    for f, (color, old_effect) in files.items():
        if os.path.exists(f):
            with open(f, "r", encoding="utf-8") as file:
                content = file.read()
            
            # Ensure import is added
            if "import GlareHover from" not in content:
                content = content.replace(f"import {{ {old_effect} }} from \"@/components/ui/SectorEffects\";",
                                          f"import GlareHover from \"@/components/ui/GlareHover\";\nimport {{ {old_effect} }} from \"@/components/ui/SectorEffects\";")
            
            # Create Wrapper string
            wrapper = f"""    const Wrapper = ({{ children }}: {{ children: React.ReactNode }}) => (
        <GlareHover glareColor="{color}" borderRadius="16px" background="transparent" width="100%" height="auto">
            <{old_effect}>{{children}}</{old_effect}>
        </GlareHover>
    );

    return ("""

            if "const Wrapper =" not in content:
                content = content.replace("    return (", wrapper)
                content = content.replace(f"CardWrapper={{{old_effect}}}", "CardWrapper={Wrapper}")

            with open(f, "w", encoding="utf-8") as file:
                file.write(content)

if __name__ == "__main__":
    os.chdir("quartermasters-nexus")
    fix_glare()
    print("Injected GlareHover to 5 legacy components.")
