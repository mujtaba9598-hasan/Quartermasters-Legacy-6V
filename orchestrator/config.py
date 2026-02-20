import os
import yaml
from pathlib import Path
from dotenv import load_dotenv

def load_config():
    load_dotenv()
    
    config_path = Path(__file__).parent / "config.yaml"
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)
        
    return config

def get_env_var(name, default=None):
    return os.getenv(name, default)
