# Triumph Army Builder

A web-based army builder for the **Triumph!** miniatures wargame. Build and customize your army lists with automatic point calculations and printable summaries.

## Features

- **Army Selection**: Search and select from 656 historical armies spanning ancient to medieval periods
- **Troop Management**: Add/remove troops within min/max constraints defined by army lists
- **Multiple Troop Types**: Choose between alternate troop types when available
- **Battle Cards**: Select army-level and troop-level battle cards with automatic point calculation
- **Point Tracking**: Visual progress bar showing points used vs. 48-point limit
- **Army Summary**: Live summary of selected troops and battle cards
- **Print View**: Printer-friendly army list with full battle card descriptions

## How It Works

### Data Sources

The app uses data from the [Meshwesh](https://meshwesh.wgcwar.com/) army list database:

- `armyLists.json` - Index of all available armies
- `ArmyListsData/` - Full army data for each army (656 JSON files)
- `troopTypes.json` - Troop type definitions with point costs
- `battleCards.json` - Battle card rules and descriptions

### Army Information Displayed

For each army, the app shows:
- **Invasion Rating** - Used for determining attacker/defender
- **Maneuver Rating** - Used for terrain placement
- **Home Topography** - The army's native terrain type
- **General's Troop Type** - What troop type the general fights as

### Troop Selection

Each troop option shows:
- Description (historical context)
- Troop type and point cost
- Min/Max limits (enforced by +/- buttons)
- Battle Line indicator (troops that must be in the battle line)
- Available battle cards

### Point Calculation

Points are calculated automatically:
- Base troop cost × number of bases
- Plus flat-cost battle cards
- Plus per-stand battle cards × number of bases
- Army-level battle cards added separately

### Print View

Click "Print Army List" to open a printer-friendly summary including:
- Army name and date range
- All army stats (ratings, topography, general type)
- Army battle cards summary (if any)
- Troop table with bases and points
- Total points
- Full text of all selected battle cards

## Local Development

To run locally, you need a web server (browsers block local file fetches):

```bash
# Using Python
python -m http.server 8000

# Then open http://localhost:8000
```

## Updating Army Data

To refresh army data from Meshwesh:

```bash
# Delete existing data (optional, script skips existing files)
rm -rf ArmyListsData/

# Run download script
python download_army_data.py
```

## Files

| File | Description |
|------|-------------|
| `index.html` | Main application page |
| `app.js` | Application logic |
| `styles.css` | Styling |
| `armyListsCompact.js` | Army index for dropdown (auto-generated) |
| `battleCardsText.js` | Battle card descriptions for print view |
| `troopTypes.json` | Troop type definitions |
| `battleCards.json` | Battle card definitions |
| `armyLists.json` | Full army index |
| `ArmyListsData/` | Individual army JSON files |
| `download_army_data.py` | Script to download army data |

## Credits

- Army list data from [Meshwesh](https://meshwesh.wgcwar.com/) by the Washington Grand Company
- Triumph! rules by Washington Grand Company
- App developed with assistance from Claude (Anthropic)

## License

This is a fan-made tool for the Triumph! miniatures game. Triumph! is a product of the Washington Grand Company.
