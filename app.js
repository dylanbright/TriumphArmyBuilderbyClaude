// Triumph Army Builder

const MAX_POINTS = 48;
const ARMY_DATA_PATH = 'ArmyListsData/';

// Troop Types data (from troopTypes.json)
const TROOP_TYPES_DATA = [
    {"permanentCode":"BLV","displayName":"Bow Levy","displayCode":"BL","cost":2,"category":"foot","order":"Open"},
    {"permanentCode":"RBL","displayName":"Rabble","displayCode":"Rb","cost":2,"category":"foot","order":"Open"},
    {"permanentCode":"HRD","displayName":"Horde","displayCode":"Hd","cost":2,"category":"foot","order":"Close"},
    {"permanentCode":"ARC","displayName":"Archers","displayCode":"Arc","cost":4,"category":"foot","order":"Open"},
    {"permanentCode":"LFT","displayName":"Light Foot","displayCode":"LFt","cost":3,"category":"foot","order":"Open"},
    {"permanentCode":"LSP","displayName":"Light Spear","displayCode":"LSp","cost":3,"category":"foot","order":"Open"},
    {"permanentCode":"RDR","displayName":"Raiders","displayCode":"Rd","cost":4,"category":"foot","order":"Open"},
    {"permanentCode":"SKM","displayName":"Skirmishers","displayCode":"Sk","cost":3,"category":"foot","order":"Open"},
    {"permanentCode":"WBD","displayName":"Warband","displayCode":"Wb","cost":3,"category":"foot","order":"Open"},
    {"permanentCode":"ART","displayName":"Artillery","displayCode":"Art","cost":3,"category":"foot","order":"Close"},
    {"permanentCode":"EFT","displayName":"Elite Foot","displayCode":"EFt","cost":4,"category":"foot","order":"Close"},
    {"permanentCode":"HFT","displayName":"Heavy Foot","displayCode":"HFt","cost":3,"category":"foot","order":"Close"},
    {"permanentCode":"PAV","displayName":"Pavisiers","displayCode":"Pv","cost":4,"category":"foot","order":"Close"},
    {"permanentCode":"PIK","displayName":"Pikes","displayCode":"Pk","cost":3,"category":"foot","order":"Close"},
    {"permanentCode":"SPR","displayName":"Spear","displayCode":"Sp","cost":4,"category":"foot","order":"Close"},
    {"permanentCode":"WWG","displayName":"War Wagons","displayCode":"WWg","cost":3,"category":"foot","order":"Close"},
    {"permanentCode":"WRR","displayName":"Warriors","displayCode":"Wr","cost":3,"category":"foot","order":"Close"},
    {"permanentCode":"BAD","displayName":"Bad Horse","displayCode":"BH","cost":3,"category":"mounted","order":"Open"},
    {"permanentCode":"BTX","displayName":"Battle Taxi","displayCode":"BTx","cost":3,"category":"mounted","order":"Open"},
    {"permanentCode":"CHT","displayName":"Chariots","displayCode":"Ch","cost":4,"category":"mounted","order":"Open"},
    {"permanentCode":"ECV","displayName":"Elite Cavalry","displayCode":"ECv","cost":4,"category":"mounted","order":"Open"},
    {"permanentCode":"HBW","displayName":"Horse Bow","displayCode":"HBw","cost":4,"category":"mounted","order":"Open"},
    {"permanentCode":"JCV","displayName":"Javelin Cavalry","displayCode":"JCv","cost":4,"category":"mounted","order":"Open"},
    {"permanentCode":"KNT","displayName":"Knights","displayCode":"Kn","cost":4,"category":"mounted","order":"Open"},
    {"permanentCode":"CAT","displayName":"Cataphracts","displayCode":"Cat","cost":4,"category":"mounted","order":"Close"},
    {"permanentCode":"ELE","displayName":"Elephants","displayCode":"El","cost":4,"category":"mounted","order":"Close"}
];

// Battle Cards data with costs
// costType: "flat" = one-time cost, "perStand" = cost per stand, "none" = no cost
const BATTLE_CARDS_DATA = {
    "FC":  {"displayName":"Fortified Camp", "cost":1, "costType":"flat"},
    "PD":  {"displayName":"Prepared Defenses", "cost":0.5, "costType":"flat"},
    "AM":  {"displayName":"Ambush", "cost":1, "costType":"flat"},
    "SW":  {"displayName":"Standard Wagon", "cost":0, "costType":"none"},
    "NC":  {"displayName":"No Camp", "cost":3, "costType":"flat"},
    "PT":  {"displayName":"Pack Train and Herds", "cost":1, "costType":"flat"},
    "SC":  {"displayName":"Scythed Chariots and Stampedes", "cost":2, "costType":"flat"},
    "SB":  {"displayName":"Supporting Bowmen", "cost":0, "costType":"none"},
    "SP":  {"displayName":"Supportable", "cost":0, "costType":"none"},
    "LC":  {"displayName":"Light Camelry", "cost":0, "costType":"none"},
    "DD":  {"displayName":"Deployment Dismounting", "cost":1, "costType":"flat"},
    "HL":  {"displayName":"Hold the Line", "cost":0, "costType":"none"},
    "HD":  {"displayName":"Hoplite Deep Formation", "cost":0, "costType":"none"},
    "MI":  {"displayName":"Mobile Infantry", "cost":0, "costType":"none"},
    "ES":  {"displayName":"Elephant Screen", "cost":2, "costType":"flat"},
    "ET":  {"displayName":"Screenable", "cost":2, "costType":"flat"},
    "PL":  {"displayName":"Plaustrella", "cost":1, "costType":"perStand"},
    "AC":  {"displayName":"Armored Camelry", "cost":-1, "costType":"perStand"},
    "CC":  {"displayName":"Charging Camelry", "cost":-1, "costType":"perStand"},
    "SS":  {"displayName":"Shower Shooting", "cost":1, "costType":"perStand"},
    "CT":  {"displayName":"Charge Through", "cost":1, "costType":"flat"},
    "MD":  {"displayName":"Mid-Battle Dismounting", "cost":2, "costType":"flat"},
    "SV":  {"displayName":"Separated Valets", "cost":0, "costType":"none"},
    "SF":  {"displayName":"Sword-Fighting Cavalry", "cost":0, "costType":"none"},
    "CH":  {"displayName":"Chained Together", "cost":0, "costType":"none"},
    "CF":  {"displayName":"Camel Protected Infantry", "cost":1, "costType":"flat"},
    "DC":  {"displayName":"Deceptive Deployment", "cost":0, "costType":"none"}
};

let troopTypes = {};
let armyData = null;
let troopSelections = {};
let armyBattleCardSelections = {};

// DOM Elements
const loadArmyBtn = document.getElementById('loadArmy');
const armySearchInput = document.getElementById('armySearch');
const armySelectEl = document.getElementById('armySelect');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const armyBuilderEl = document.getElementById('armyBuilder');
const armyNameEl = document.getElementById('armyName');
const invasionRatingEl = document.getElementById('invasionRating');
const maneuverRatingEl = document.getElementById('maneuverRating');
const homeTopographyEl = document.getElementById('homeTopography');
const generalTroopTypeEl = document.getElementById('generalTroopType');
const totalPointsEl = document.getElementById('totalPoints');
const maxPointsEl = document.getElementById('maxPoints');
const pointsFillEl = document.getElementById('pointsFill');
const troopListEl = document.getElementById('troopList');
const summaryContentEl = document.getElementById('summaryContent');
const printSummaryBtn = document.getElementById('printSummary');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTroopTypes();
    populateArmyDropdown();

    loadArmyBtn.addEventListener('click', loadArmy);
    armySearchInput.addEventListener('input', filterArmyList);
    armySelectEl.addEventListener('dblclick', loadArmy);
    printSummaryBtn.addEventListener('click', openPrintView);

    maxPointsEl.textContent = MAX_POINTS;
});

// Populate the army dropdown
function populateArmyDropdown(filter = '') {
    armySelectEl.innerHTML = '';

    const filterLower = filter.toLowerCase();
    const filteredArmies = filter
        ? ARMY_LISTS_DATA.filter(army => army.name.toLowerCase().includes(filterLower))
        : ARMY_LISTS_DATA;

    if (filteredArmies.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- No armies match your search --';
        armySelectEl.appendChild(opt);
        return;
    }

    filteredArmies.forEach(army => {
        const opt = document.createElement('option');
        opt.value = army.id;
        opt.textContent = army.name;
        armySelectEl.appendChild(opt);
    });
}

// Filter army list based on search input
function filterArmyList() {
    const searchTerm = armySearchInput.value.trim();
    populateArmyDropdown(searchTerm);
}

// Load troop types from embedded data
function loadTroopTypes() {
    // Index by permanentCode for easy lookup
    troopTypes = {};
    TROOP_TYPES_DATA.forEach(troop => {
        troopTypes[troop.permanentCode] = troop;
    });
}

// Load army data from local files
async function loadArmy() {
    const armyId = armySelectEl.value;
    if (!armyId) {
        showError('Please select an army from the list');
        return;
    }

    showLoading(true);
    hideError();
    armyBuilderEl.classList.add('hidden');

    try {
        const response = await fetch(ARMY_DATA_PATH + armyId + '.json');
        if (!response.ok) {
            throw new Error(`Failed to load army data: ${response.status}`);
        }
        armyData = await response.json();
        troopSelections = {};
        armyBattleCardSelections = {};

        // Initialize army-level battle card selections
        if (armyData.battleCardEntries) {
            armyData.battleCardEntries.forEach(bc => {
                armyBattleCardSelections[bc.battleCardCode] = false;
            });
        }

        // Initialize selections with minimum values and empty battle card selections
        armyData.troopOptions.forEach((option, index) => {
            const battleCardSelections = {};
            if (option.battleCardEntries) {
                option.battleCardEntries.forEach(bc => {
                    battleCardSelections[bc.battleCardCode] = false;
                });
            }
            // Check if this is a conditional option (has a note)
            const isConditional = option.note && option.note.trim().length > 0;
            troopSelections[index] = {
                count: option.min,
                selectedTroopTypeIndex: 0,
                battleCards: battleCardSelections,
                enabled: true,  // All options start enabled
                isConditional: isConditional
            };
        });

        renderArmy();
        armyBuilderEl.classList.remove('hidden');
    } catch (err) {
        showError('Failed to load army: ' + err.message);
    } finally {
        showLoading(false);
    }
}

// Render the army builder
function renderArmy() {
    // Army name and date range
    const dateRange = armyData.derivedData?.extendedName || armyData.name;
    armyNameEl.textContent = dateRange;

    // Invasion Rating
    if (armyData.invasionRatings && armyData.invasionRatings.length > 0) {
        const rating = armyData.invasionRatings[0];
        invasionRatingEl.textContent = rating.value + (rating.note ? ` (${rating.note})` : '');
    } else {
        invasionRatingEl.textContent = '-';
    }

    // Maneuver Rating
    if (armyData.maneuverRatings && armyData.maneuverRatings.length > 0) {
        const rating = armyData.maneuverRatings[0];
        maneuverRatingEl.textContent = rating.value + (rating.note ? ` (${rating.note})` : '');
    } else {
        maneuverRatingEl.textContent = '-';
    }

    // Home Topography
    if (armyData.homeTopographies && armyData.homeTopographies.length > 0) {
        const topo = armyData.homeTopographies[0];
        const values = topo.values.join(', ');
        homeTopographyEl.textContent = values + (topo.note ? ` (${topo.note})` : '');
    } else {
        homeTopographyEl.textContent = '-';
    }

    // General's Troop Type
    if (armyData.troopEntriesForGeneral && armyData.troopEntriesForGeneral.length > 0) {
        const generalEntries = armyData.troopEntriesForGeneral[0].troopEntries;
        const generalTypes = generalEntries.map(entry => {
            const troopType = troopTypes[entry.troopTypeCode];
            return troopType ? troopType.displayName : entry.troopTypeCode;
        });
        generalTroopTypeEl.textContent = generalTypes.join(' or ');
    } else {
        generalTroopTypeEl.textContent = '-';
    }

    // Render army battle cards (if any)
    renderArmyBattleCards();

    // Render troop options
    renderTroopOptions();
    updateTotalPoints();
}

// Render army-level battle cards
function renderArmyBattleCards() {
    const container = document.getElementById('armyBattleCards');
    if (!container) return;

    container.innerHTML = '';

    // Check if army has battle cards
    if (!armyData.battleCardEntries || armyData.battleCardEntries.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');

    const title = document.createElement('h3');
    title.textContent = 'Army Battle Cards';
    container.appendChild(title);

    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'army-battle-cards-list';

    armyData.battleCardEntries.forEach(bc => {
        const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
        const cardWrapper = document.createElement('label');
        cardWrapper.className = 'battle-card-option army-level';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = armyBattleCardSelections[bc.battleCardCode] || false;
        checkbox.addEventListener('change', (e) => {
            armyBattleCardSelections[bc.battleCardCode] = e.target.checked;
            updateTotalPoints();
        });

        const cardName = cardData ? cardData.displayName : bc.battleCardCode;
        let costText = '';
        if (cardData && cardData.cost !== 0) {
            if (cardData.costType === 'flat') {
                costText = ` (+${cardData.cost} pt${cardData.cost !== 1 ? 's' : ''})`;
            } else if (cardData.costType === 'perStand') {
                costText = ` (+${cardData.cost} pt/stand)`;
            }
        } else if (cardData && cardData.costType === 'none') {
            costText = ' (no cost)';
        }

        const labelText = document.createElement('span');
        labelText.textContent = cardName + costText;
        if (bc.note) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'battle-card-note';
            noteSpan.textContent = ` (${bc.note})`;
            labelText.appendChild(noteSpan);
        }

        cardWrapper.appendChild(checkbox);
        cardWrapper.appendChild(labelText);
        cardsDiv.appendChild(cardWrapper);
    });

    container.appendChild(cardsDiv);
}

// Render troop option cards
function renderTroopOptions() {
    troopListEl.innerHTML = '';

    armyData.troopOptions.forEach((option, index) => {
        const card = createTroopCard(option, index);
        troopListEl.appendChild(card);
    });
}

// Create a troop card element
function createTroopCard(option, index) {
    const card = document.createElement('div');
    card.className = 'troop-card';

    // Check if battle line (core = "all")
    const isBattleLine = option.core === 'all';
    if (isBattleLine) {
        card.classList.add('battle-line');
    }

    const selection = troopSelections[index];
    const isDisabled = !selection.enabled;

    // Add disabled class if option is disabled
    if (isDisabled) {
        card.classList.add('troop-disabled');
    }

    const selectedTroopEntry = option.troopEntries[selection.selectedTroopTypeIndex];
    const troopType = troopTypes[selectedTroopEntry.troopTypeCode];
    const cost = troopType ? troopType.cost : 0;
    const troopPoints = isDisabled ? 0 : selection.count * cost;

    // Calculate battle card costs for this troop option
    let battleCardPoints = 0;
    if (!isDisabled && option.battleCardEntries && selection.battleCards) {
        option.battleCardEntries.forEach(bc => {
            if (selection.battleCards[bc.battleCardCode]) {
                const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                if (cardData) {
                    if (cardData.costType === 'flat') {
                        battleCardPoints += cardData.cost;
                    } else if (cardData.costType === 'perStand') {
                        battleCardPoints += cardData.cost * selection.count;
                    }
                }
            }
        });
    }
    const points = troopPoints + battleCardPoints;

    // Header with description and controls
    const header = document.createElement('div');
    header.className = 'troop-header';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'troop-title';

    // Add conditional toggle if this option has a note
    if (selection.isConditional) {
        const conditionalToggle = document.createElement('label');
        conditionalToggle.className = 'conditional-toggle';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selection.enabled;
        checkbox.addEventListener('change', (e) => {
            selection.enabled = e.target.checked;
            if (!e.target.checked) {
                selection.count = 0;
            } else {
                selection.count = option.min;
            }
            renderTroopOptions();
            updateTotalPoints();
        });

        const toggleLabel = document.createElement('span');
        toggleLabel.textContent = 'Include';

        conditionalToggle.appendChild(checkbox);
        conditionalToggle.appendChild(toggleLabel);
        titleDiv.appendChild(conditionalToggle);

        // Show the note prominently
        const noteDiv = document.createElement('div');
        noteDiv.className = 'conditional-note';
        noteDiv.textContent = option.note;
        titleDiv.appendChild(noteDiv);
    }

    const description = document.createElement('div');
    description.className = 'troop-description';
    description.textContent = option.description;
    titleDiv.appendChild(description);

    const troopTypeName = document.createElement('div');
    troopTypeName.className = 'troop-type-name';
    if (troopType) {
        troopTypeName.innerHTML = `${troopType.displayName} (${troopType.displayCode}) - <span class="cost">${cost} pts each</span>`;
    }
    titleDiv.appendChild(troopTypeName);

    header.appendChild(titleDiv);

    // Controls
    const controls = document.createElement('div');
    controls.className = 'troop-controls';

    // When disabled, min is effectively 0; when enabled, use the option's min
    const effectiveMin = isDisabled ? 0 : (selection.isConditional ? 0 : option.min);

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.disabled = isDisabled || selection.count <= effectiveMin;
    minusBtn.addEventListener('click', () => {
        if (selection.count > effectiveMin) {
            selection.count--;
            renderTroopOptions();
            updateTotalPoints();
        }
    });

    const countSpan = document.createElement('span');
    countSpan.className = 'troop-count';
    countSpan.textContent = selection.count;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.disabled = isDisabled || selection.count >= option.max;
    plusBtn.addEventListener('click', () => {
        if (selection.count < option.max) {
            selection.count++;
            renderTroopOptions();
            updateTotalPoints();
        }
    });

    const pointsSpan = document.createElement('span');
    pointsSpan.className = 'troop-points';
    pointsSpan.textContent = `${points} pts`;

    controls.appendChild(minusBtn);
    controls.appendChild(countSpan);
    controls.appendChild(plusBtn);
    controls.appendChild(pointsSpan);

    header.appendChild(controls);
    card.appendChild(header);

    // Troop type selector (if multiple options)
    if (option.troopEntries.length > 1) {
        const typeOptions = document.createElement('div');
        typeOptions.className = 'troop-type-options';

        const label = document.createElement('label');
        label.textContent = 'Troop Type:';
        typeOptions.appendChild(label);

        const select = document.createElement('select');
        option.troopEntries.forEach((entry, entryIndex) => {
            const opt = document.createElement('option');
            const entryTroopType = troopTypes[entry.troopTypeCode];
            opt.value = entryIndex;
            opt.textContent = entryTroopType
                ? `${entryTroopType.displayName} (${entryTroopType.displayCode}) - ${entryTroopType.cost} pts`
                : entry.troopTypeCode;
            if (entry.note) {
                opt.textContent += ` - ${entry.note}`;
            }
            if (entryIndex === selection.selectedTroopTypeIndex) {
                opt.selected = true;
            }
            select.appendChild(opt);
        });

        select.addEventListener('change', (e) => {
            selection.selectedTroopTypeIndex = parseInt(e.target.value);
            renderTroopOptions();
            updateTotalPoints();
        });

        typeOptions.appendChild(select);
        card.appendChild(typeOptions);
    }

    // Meta information
    const meta = document.createElement('div');
    meta.className = 'troop-meta';

    // Min/Max
    const minMax = document.createElement('span');
    minMax.className = 'meta-item min-max';
    minMax.textContent = `Min: ${option.min} / Max: ${option.max}`;
    meta.appendChild(minMax);

    // Battle Line
    if (isBattleLine) {
        const battleLine = document.createElement('span');
        battleLine.className = 'meta-item battle-line';
        battleLine.textContent = 'Battle Line';
        meta.appendChild(battleLine);
    }

    // Battle Cards - now as selectable checkboxes
    if (option.battleCardEntries && option.battleCardEntries.length > 0) {
        const battleCardsDiv = document.createElement('div');
        battleCardsDiv.className = 'battle-cards-selection';

        const cardsLabel = document.createElement('span');
        cardsLabel.className = 'battle-cards-label';
        cardsLabel.textContent = 'Battle Cards:';
        battleCardsDiv.appendChild(cardsLabel);

        option.battleCardEntries.forEach(bc => {
            const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
            const cardWrapper = document.createElement('label');
            cardWrapper.className = 'battle-card-option';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = selection.battleCards[bc.battleCardCode] || false;
            checkbox.addEventListener('change', (e) => {
                selection.battleCards[bc.battleCardCode] = e.target.checked;
                renderTroopOptions();
                updateTotalPoints();
            });

            const cardName = cardData ? cardData.displayName : bc.battleCardCode;
            let costText = '';
            if (cardData && cardData.cost !== 0) {
                if (cardData.costType === 'flat') {
                    costText = ` (+${cardData.cost} pt${cardData.cost !== 1 ? 's' : ''})`;
                } else if (cardData.costType === 'perStand') {
                    const sign = cardData.cost > 0 ? '+' : '';
                    costText = ` (${sign}${cardData.cost} pt/stand)`;
                }
            }

            const labelText = document.createElement('span');
            labelText.textContent = cardName + costText;
            if (bc.note) {
                const noteSpan = document.createElement('span');
                noteSpan.className = 'battle-card-note';
                noteSpan.textContent = ` (${bc.note})`;
                labelText.appendChild(noteSpan);
            }

            cardWrapper.appendChild(checkbox);
            cardWrapper.appendChild(labelText);
            battleCardsDiv.appendChild(cardWrapper);
        });

        card.appendChild(battleCardsDiv);
    }

    // Restrictions/Notes (only show if not already displayed as conditional note)
    if (option.note && option.note.trim() && !selection.isConditional) {
        const restrictions = document.createElement('span');
        restrictions.className = 'meta-item restrictions';
        restrictions.textContent = option.note;
        meta.appendChild(restrictions);
    }

    card.appendChild(meta);

    return card;
}

// Calculate and update total points
function updateTotalPoints() {
    let total = 0;

    // Add army-level battle card costs
    if (armyData.battleCardEntries) {
        armyData.battleCardEntries.forEach(bc => {
            if (armyBattleCardSelections[bc.battleCardCode]) {
                const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                if (cardData && cardData.costType === 'flat') {
                    total += cardData.cost;
                }
            }
        });
    }

    armyData.troopOptions.forEach((option, index) => {
        const selection = troopSelections[index];

        // Skip disabled options
        if (!selection.enabled) return;

        const selectedTroopEntry = option.troopEntries[selection.selectedTroopTypeIndex];
        const troopType = troopTypes[selectedTroopEntry.troopTypeCode];
        const cost = troopType ? troopType.cost : 0;
        total += selection.count * cost;

        // Add troop-level battle card costs
        if (option.battleCardEntries && selection.battleCards) {
            option.battleCardEntries.forEach(bc => {
                if (selection.battleCards[bc.battleCardCode]) {
                    const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                    if (cardData) {
                        if (cardData.costType === 'flat') {
                            total += cardData.cost;
                        } else if (cardData.costType === 'perStand') {
                            total += cardData.cost * selection.count;
                        }
                    }
                }
            });
        }
    });

    totalPointsEl.textContent = total;

    const percentage = Math.min((total / MAX_POINTS) * 100, 100);
    pointsFillEl.style.width = percentage + '%';

    if (total > MAX_POINTS) {
        totalPointsEl.classList.add('over-limit');
        pointsFillEl.classList.add('over-limit');
    } else {
        totalPointsEl.classList.remove('over-limit');
        pointsFillEl.classList.remove('over-limit');
    }

    // Update the summary
    renderSummary(total);
}

// Render army summary
function renderSummary(totalPoints) {
    if (!summaryContentEl || !armyData) return;

    let html = '<table class="summary-table">';
    html += '<thead><tr><th>Troop Type</th><th>Description</th><th class="count">Bases</th><th class="points">Points</th></tr></thead>';
    html += '<tbody>';

    const selectedTroops = [];
    const selectedBattleCards = [];

    // Collect troop selections
    armyData.troopOptions.forEach((option, index) => {
        const selection = troopSelections[index];
        // Skip disabled options
        if (!selection.enabled) return;
        if (selection.count > 0) {
            const selectedTroopEntry = option.troopEntries[selection.selectedTroopTypeIndex];
            const troopType = troopTypes[selectedTroopEntry.troopTypeCode];
            const baseCost = troopType ? troopType.cost : 0;
            let troopPoints = selection.count * baseCost;

            // Calculate battle card costs for this troop
            let cardCosts = 0;
            if (option.battleCardEntries && selection.battleCards) {
                option.battleCardEntries.forEach(bc => {
                    if (selection.battleCards[bc.battleCardCode]) {
                        const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                        if (cardData) {
                            if (cardData.costType === 'flat') {
                                cardCosts += cardData.cost;
                            } else if (cardData.costType === 'perStand') {
                                cardCosts += cardData.cost * selection.count;
                            }
                            selectedBattleCards.push({
                                name: cardData.displayName,
                                troop: option.description,
                                cost: cardData.costType === 'perStand' ? cardData.cost * selection.count : cardData.cost
                            });
                        }
                    }
                });
            }

            selectedTroops.push({
                type: troopType ? `${troopType.displayName} (${troopType.displayCode})` : selectedTroopEntry.troopTypeCode,
                description: option.description,
                count: selection.count,
                points: troopPoints + cardCosts
            });
        }
    });

    // Add army-level battle cards
    if (armyData.battleCardEntries) {
        armyData.battleCardEntries.forEach(bc => {
            if (armyBattleCardSelections[bc.battleCardCode]) {
                const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                if (cardData) {
                    selectedBattleCards.push({
                        name: cardData.displayName,
                        troop: 'Army',
                        cost: cardData.cost
                    });
                }
            }
        });
    }

    // Build table rows
    selectedTroops.forEach(troop => {
        html += `<tr>
            <td>${troop.type}</td>
            <td>${troop.description}</td>
            <td class="count">${troop.count}</td>
            <td class="points">${troop.points} pts</td>
        </tr>`;
    });

    html += '</tbody></table>';

    // Total
    html += `<div class="summary-total">Total: <span class="points-value">${totalPoints} / ${MAX_POINTS} points</span></div>`;

    // Battle cards section
    if (selectedBattleCards.length > 0) {
        html += '<div class="summary-battle-cards"><h4>Selected Battle Cards</h4><ul>';
        selectedBattleCards.forEach(card => {
            const costText = card.cost !== 0 ? ` (${card.cost > 0 ? '+' : ''}${card.cost} pts)` : '';
            html += `<li>${card.name}${costText} - ${card.troop}</li>`;
        });
        html += '</ul></div>';
    }

    summaryContentEl.innerHTML = html;
}

// Open printer-friendly view
function openPrintView() {
    if (!armyData) return;

    // Gather all the data
    const armyName = armyData.derivedData?.extendedName || armyData.name;
    const invasionRating = armyData.invasionRatings?.[0]?.value || '-';
    const maneuverRating = armyData.maneuverRatings?.[0]?.value || '-';
    const homeTopography = armyData.homeTopographies?.[0]?.values?.join(', ') || '-';

    let generalType = '-';
    if (armyData.troopEntriesForGeneral?.[0]?.troopEntries) {
        generalType = armyData.troopEntriesForGeneral[0].troopEntries.map(entry => {
            const tt = troopTypes[entry.troopTypeCode];
            return tt ? tt.displayName : entry.troopTypeCode;
        }).join(' or ');
    }

    // Calculate total and gather troops
    let totalPoints = 0;
    let armyCardPoints = 0;
    const troops = [];
    const battleCards = [];
    const armyCards = [];

    // Army battle cards
    if (armyData.battleCardEntries) {
        armyData.battleCardEntries.forEach(bc => {
            if (armyBattleCardSelections[bc.battleCardCode]) {
                const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                if (cardData) {
                    if (cardData.costType === 'flat') {
                        totalPoints += cardData.cost;
                        armyCardPoints += cardData.cost;
                    }
                    battleCards.push({ code: bc.battleCardCode, name: cardData.displayName, troop: 'Army', cost: cardData.cost });
                    armyCards.push({ name: cardData.displayName, cost: cardData.cost });
                }
            }
        });
    }

    armyData.troopOptions.forEach((option, index) => {
        const selection = troopSelections[index];
        // Skip disabled options
        if (!selection.enabled) return;
        if (selection.count > 0) {
            const selectedTroopEntry = option.troopEntries[selection.selectedTroopTypeIndex];
            const troopType = troopTypes[selectedTroopEntry.troopTypeCode];
            const baseCost = troopType ? troopType.cost : 0;
            let troopPoints = selection.count * baseCost;
            totalPoints += troopPoints;

            // Battle cards
            if (option.battleCardEntries && selection.battleCards) {
                option.battleCardEntries.forEach(bc => {
                    if (selection.battleCards[bc.battleCardCode]) {
                        const cardData = BATTLE_CARDS_DATA[bc.battleCardCode];
                        if (cardData) {
                            let cardCost = 0;
                            if (cardData.costType === 'flat') {
                                cardCost = cardData.cost;
                            } else if (cardData.costType === 'perStand') {
                                cardCost = cardData.cost * selection.count;
                            }
                            totalPoints += cardCost;
                            troopPoints += cardCost;
                            battleCards.push({ code: bc.battleCardCode, name: cardData.displayName, troop: option.description, cost: cardCost });
                        }
                    }
                });
            }

            troops.push({
                type: troopType ? `${troopType.displayName} (${troopType.displayCode})` : selectedTroopEntry.troopTypeCode,
                description: option.description,
                count: selection.count,
                points: troopPoints,
                isBattleLine: option.core === 'all'
            });
        }
    });

    // Build battle cards HTML
    let battleCardsHtml = '';
    if (battleCards.length > 0) {
        battleCardsHtml = '<div class="battle-cards"><h3>Battle Cards</h3>';
        battleCards.forEach(c => {
            const cardText = (typeof BATTLE_CARDS_TEXT !== 'undefined' && BATTLE_CARDS_TEXT[c.code])
                ? BATTLE_CARDS_TEXT[c.code]
                : '';
            battleCardsHtml += '<div class="card-entry">';
            battleCardsHtml += '<h4>' + c.name + (c.cost !== 0 ? ' (' + (c.cost > 0 ? '+' : '') + c.cost + ' pts)' : '') + '</h4>';
            battleCardsHtml += '<div class="card-for">Applied to: ' + c.troop + '</div>';
            if (cardText) {
                battleCardsHtml += '<div class="card-description">' + cardText + '</div>';
            }
            battleCardsHtml += '</div>';
        });
        battleCardsHtml += '</div>';
    }

    // Build print HTML
    const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${armyName} - Army List</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Georgia, serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 1.5rem; margin-bottom: 5px; border-bottom: 2px solid #333; padding-bottom: 5px; }
        .subtitle { color: #666; margin-bottom: 15px; }
        .stats { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px; padding: 10px; background: #f5f5f5; }
        .stat { flex: 1; min-width: 150px; }
        .stat-label { font-weight: bold; font-size: 0.85rem; color: #666; }
        .stat-value { font-size: 1rem; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f0f0f0; font-weight: bold; }
        .count { text-align: center; }
        .points { text-align: right; }
        .battle-line { background: #fffde7; }
        .total { text-align: right; font-weight: bold; font-size: 1.1rem; padding: 10px 0; border-top: 2px solid #333; }
        .army-cards-summary { margin-bottom: 20px; }
        .army-cards-summary h3 { font-size: 1rem; margin-bottom: 10px; }
        .army-cards-summary table { width: auto; min-width: 300px; }
        .subtotal { text-align: right; font-weight: bold; margin-top: 5px; font-size: 0.95rem; }
        .battle-cards { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; }
        .battle-cards h3 { font-size: 1.1rem; margin-bottom: 15px; }
        .card-entry { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-left: 3px solid #666; }
        .card-entry h4 { font-size: 1rem; margin-bottom: 5px; color: #333; }
        .card-entry .card-for { font-size: 0.85rem; color: #666; margin-bottom: 10px; }
        .card-entry .card-description { font-size: 0.9rem; line-height: 1.5; }
        .card-entry .card-description h4 { font-size: 0.95rem; margin-top: 10px; margin-bottom: 5px; color: #555; }
        .card-entry .card-description p { margin-bottom: 8px; }
        .card-entry .card-description ul { margin: 8px 0; padding-left: 25px; }
        .card-entry .card-description li { margin-bottom: 4px; }
        @media print {
            body { padding: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <h1>${armyName}</h1>
    <p class="subtitle">Triumph! Army List - ${totalPoints} / ${MAX_POINTS} points</p>

    <div class="stats">
        <div class="stat">
            <div class="stat-label">Invasion Rating</div>
            <div class="stat-value">${invasionRating}</div>
        </div>
        <div class="stat">
            <div class="stat-label">Maneuver Rating</div>
            <div class="stat-value">${maneuverRating}</div>
        </div>
        <div class="stat">
            <div class="stat-label">Home Topography</div>
            <div class="stat-value">${homeTopography}</div>
        </div>
        <div class="stat">
            <div class="stat-label">General's Troop Type</div>
            <div class="stat-value">${generalType}</div>
        </div>
    </div>

    ${armyCards.length > 0 ? `
    <div class="army-cards-summary">
        <h3>Army Battle Cards</h3>
        <table>
            <thead>
                <tr>
                    <th>Card</th>
                    <th class="points">Points</th>
                </tr>
            </thead>
            <tbody>
                ${armyCards.map(c => `
                    <tr>
                        <td>${c.name}</td>
                        <td class="points">${c.cost}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="subtotal">Army Cards Subtotal: ${armyCardPoints} points</div>
    </div>
    ` : ''}

    <h3 style="margin-top: 20px; margin-bottom: 10px;">Troops</h3>
    <table>
        <thead>
            <tr>
                <th>Troop Type</th>
                <th>Description</th>
                <th class="count">Bases</th>
                <th class="points">Points</th>
            </tr>
        </thead>
        <tbody>
            ${troops.map(t => `
                <tr class="${t.isBattleLine ? 'battle-line' : ''}">
                    <td>${t.type}</td>
                    <td>${t.description}${t.isBattleLine ? ' *' : ''}</td>
                    <td class="count">${t.count}</td>
                    <td class="points">${t.points}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="total">Total: ${totalPoints} / ${MAX_POINTS} points</div>

    <p style="margin-top: 15px; font-size: 0.8rem; color: #666;">* Battle Line troops</p>

    ${battleCardsHtml}

    <button class="no-print" onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Print</button>
</body>
</html>`;

    // Open in new window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printHTML);
    printWindow.document.close();
}

// UI Helpers
function showLoading(show) {
    loadingEl.classList.toggle('hidden', !show);
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}
