#!/usr/bin/env python3
"""
Download all army list data from Meshwesh API.

This script reads armyLists.json to get all army IDs, then downloads
the full data for each army and saves it to the ArmyListsData folder.

Usage:
    python download_army_data.py

The script can be re-run to update existing files or add new ones.
"""

import json
import os
import time
import urllib.request
import urllib.error
from pathlib import Path

# Configuration
API_BASE = "https://meshwesh.wgcwar.com/api/v1/armyLists/"
ARMY_LISTS_FILE = "armyLists.json"
OUTPUT_DIR = "ArmyListsData"
DELAY_BETWEEN_REQUESTS = 0.2  # seconds, to be nice to the server


def load_army_list():
    """Load the list of armies from armyLists.json"""
    with open(ARMY_LISTS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def download_army(army_id):
    """Download a single army's data from the API"""
    url = API_BASE + army_id
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"  HTTP Error {e.code}: {e.reason}")
        return None
    except urllib.error.URLError as e:
        print(f"  URL Error: {e.reason}")
        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None


def save_army(army_id, data):
    """Save army data to a JSON file"""
    filepath = Path(OUTPUT_DIR) / f"{army_id}.json"
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)


def main():
    # Create output directory if it doesn't exist
    Path(OUTPUT_DIR).mkdir(exist_ok=True)

    # Load army list
    print(f"Loading army list from {ARMY_LISTS_FILE}...")
    armies = load_army_list()
    print(f"Found {len(armies)} armies")

    # Track progress
    downloaded = 0
    skipped = 0
    failed = 0

    # Check which files already exist
    existing_files = set(f.stem for f in Path(OUTPUT_DIR).glob("*.json"))
    print(f"Found {len(existing_files)} existing files in {OUTPUT_DIR}/")

    # Download each army
    for i, army in enumerate(armies, 1):
        army_id = army['id']
        army_name = army.get('derivedData', {}).get('extendedName', army.get('name', 'Unknown'))

        # Check if already downloaded
        if army_id in existing_files:
            skipped += 1
            continue

        print(f"[{i}/{len(armies)}] Downloading: {army_name[:50]}...")

        data = download_army(army_id)
        if data:
            save_army(army_id, data)
            downloaded += 1
        else:
            failed += 1

        # Be nice to the server
        time.sleep(DELAY_BETWEEN_REQUESTS)

    # Summary
    print("\n" + "=" * 50)
    print("Download complete!")
    print(f"  Downloaded: {downloaded}")
    print(f"  Skipped (already exist): {skipped}")
    print(f"  Failed: {failed}")
    print(f"  Total files in {OUTPUT_DIR}/: {len(list(Path(OUTPUT_DIR).glob('*.json')))}")


if __name__ == "__main__":
    main()
