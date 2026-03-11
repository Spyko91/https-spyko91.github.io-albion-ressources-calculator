// ============================================
// ÉTAT DE L'APPLICATION
// ============================================
let currentPrices = {};
let selectedCity = 'Thetford';
let selectedResource = 'wood';
let useFallback = false;
let currentResourceData = RESOURCES.wood;
let apiAttempts = 0;

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du calculateur multi-ressources...');
    
    showStatus('Initialisation...', 'info');
    
    // Charger la ressource par défaut
    loadResource('wood');
    
    // Attacher les événements
    attachEventListeners();
    
    // Charger les prix
    initializePrices();
});

// ============================================
// CHARGEMENT D'UNE RESSOURCE
// ============================================
function loadResource(resourceKey) {
    selectedResource = resourceKey;
    currentResourceData = RESOURCES[resourceKey];
    
    // Mettre à jour le titre
    document.querySelector('h1').innerHTML = `${currentResourceData.icon} Calculateur de ${currentResourceData.name} - Albion Online`;
    
    // Mettre à jour la ville par défaut
    const citySelect = document.getElementById('city');
    if (citySelect) {
        const defaultCity = currentResourceData.city;
        const option = Array.from(citySelect.options).find(opt => opt.value === defaultCity);
        if (option) {
            citySelect.value = defaultCity;
            selectedCity = defaultCity;
        }
    }
    
    // Afficher le tableau
    renderResourceTable();
    
    // Mettre à jour les onglets
    updateTabs();
}

// ============================================
// RENDU DU TABLEAU
// ============================================
function renderResourceTable() {
    const container = document.getElementById('table-container');
    if (!container) return;
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Tier</th>
                    <th>Enchant</th>
                    <th>Qté<br>nécessaire</th>
                    <th>Prix achat<br>(${currentResourceData.rawName})</th>
                    <th>Prix total<br>brut</th>
                    <th>Prix vente<br>(${currentResourceData.refinedName})</th>
                    <th>Marge</th>
                    <th>Profit</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="resource-table-body">
    `;
    
    currentResourceData.items.forEach((item, index) => {
        const rawPrice = currentPrices[item.itemId]?.raw || '';
        const refinedPrice = currentPrices[item.itemId]?.refined || '';
        const totalCost = rawPrice ? rawPrice * item.quantity : '';
        const profit = (rawPrice && refinedPrice) ? refinedPrice - totalCost : '';
        const margin = (rawPrice && refinedPrice && totalCost > 0) ? ((profit / totalCost) * 100).toFixed(1) : '';
        
        const enchantClass = getEnchantClass(item.enchant);
        
        html += `
            <tr class="tier-${item.tier}" data-resource-index="${index}">
                <td><strong>${item.tier}</strong></td>
                <td class="${enchantClass}"><strong>${item.enchant}</strong></td>
                <td>${item.quantity}</td>
                <td><input type="number" class="price-input raw-price" data-resource="${selectedResource}" data-index="${index}" value="${rawPrice || ''}" placeholder="0" step="1" min="0"></td>
                <td class="total-cost" data-resource="${selectedResource}" data-index="${index}">${totalCost ? totalCost.toLocaleString() : '-'}</td>
                <td><input type="number" class="price-input refined-price" data-resource="${selectedResource}" data-index="${index}" value="${refinedPrice || ''}" placeholder="0" step="1" min="0"></td>
                <td class="margin ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}" data-resource="${selectedResource}" data-index="${index}">${margin ? margin + '%' : '-'}</td>
                <td class="profit ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}" data-resource="${selectedResource}" data-index="${index}">${profit ? profit.toLocaleString() : '-'}</td>
                <td><button class="btn-small update-row" data-resource="${selectedResource}" data-index="${index}" ${useFallback ? 'disabled' : ''}>↺</button></td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7" class="total-label">TOTAL PROFIT POTENTIEL (${currentResourceData.name}):</td>
                    <td id="total-profit" class="total-value">0</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    container.innerHTML = html;
    
    // Attacher les événements
    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('change', updateCalculations);
    });
    
    document.querySelectorAll('.update-row').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const resource = e.target.dataset.resource;
            const index = e.target.dataset.index;
            if (useFallback) {
                showStatus('Mode démo : modification manuelle uniquement', 'warning');
                setTimeout(() => showStatus('', 'info'), 3000);
            } else {
                updateSingleRow(resource, index);
            }
        });
    });
    
    updateTotalProfit();
}

// ============================================
// CLASSES CSS POUR ENCHANTEMENTS
// ============================================
function getEnchantClass(enchant) {
    const classes = {
        '.0': 'enchant-0',
        '.1': 'enchant-1',
        '.2': 'enchant-2',
        '.3': 'enchant-3',
        '.4': 'enchant-4'
    };
    return classes[enchant] || '';
}

// ============================================
// MISE À JOUR DES CALCULS
// ============================================
function updateCalculations() {
    const resource = this.dataset.resource;
    const index = parseInt(this.dataset.index);
    const type = this.classList.contains('raw-price') ? 'raw' : 'refined';
    const value = parseFloat(this.value) || 0;
    
    const item = RESOURCES[resource].items[index];
    const key = item.itemId;
    
    if (!currentPrices[key]) {
        currentPrices[key] = {};
    }
    
    currentPrices[key][type] = value;
    
    // Recalculer
    const rawPrice = currentPrices[key]?.raw || 0;
    const refinedPrice = currentPrices[key]?.refined || 0;
    const totalCost = rawPrice * item.quantity;
    const profit = refinedPrice - totalCost;
    const margin = totalCost > 0 ? ((profit / totalCost) * 100).toFixed(1) : '';
    
    // Mettre à jour l'affichage
    const totalCostCell = document.querySelector(`.total-cost[data-resource="${resource}"][data-index="${index}"]`);
    if (totalCostCell) {
        totalCostCell.textContent = totalCost ? totalCost.toLocaleString() : '-';
    }
    
    const marginCell = document.querySelector(`.margin[data-resource="${resource}"][data-index="${index}"]`);
    if (marginCell) {
        marginCell.textContent = margin ? margin + '%' : '-';
        marginCell.className = `margin ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}`;
    }
    
    const profitCell = document.querySelector(`.profit[data-resource="${resource}"][data-index="${index}"]`);
    if (profitCell) {
        profitCell.textContent = profit ? profit.toLocaleString() : '-';
        profitCell.className = `profit ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}`;
    }
    
    updateTotalProfit();
}

// ============================================
// FORMATAGE DES IDs POUR L'API
// ============================================
function getApiItemId(baseId, type) {
    if (type === 'raw') {
        return baseId;
    } else {
        // Conversion pour les items raffinés
        return baseId.replace('WOOD', 'PLANKS')
                     .replace('ROCK', 'BLOCK')
                     .replace('ORE', 'METALBAR')
                     .replace('HIDE', 'LEATHER')
                     .replace('FIBER', 'CLOTH');
    }
}

// ============================================
// MISE À JOUR DU TOTAL
// ============================================
function updateTotalProfit() {
    let total = 0;
    
    currentResourceData.items.forEach((item, index) => {
        const profitCell = document.querySelector(`.profit[data-resource="${selectedResource}"][data-index="${index}"]`);
        if (profitCell) {
            const profitText = profitCell.textContent.replace(/\s/g, '');
            if (profitText !== '-') {
                const profit = parseFloat(profitText) || 0;
                if (profit > 0) total += profit;
            }
        }
    });
    
    const totalElement = document.getElementById('total-profit');
    if (totalElement) {
        totalElement.textContent = total.toLocaleString();
    }
}

// ============================================
// CHARGEMENT DES PRIX DE SECOURS
// ============================================
function loadFallbackPrices() {
    useFallback = true;
    showLoading(true);
    
    setTimeout(() => {
        // Charger tous les prix de secours
        Object.keys(RESOURCES).forEach(resourceKey => {
            RESOURCES[resourceKey].items.forEach(item => {
                const fallback = FALLBACK_PRICES[item.itemId];
                if (fallback) {
                    if (!currentPrices[item.itemId]) currentPrices[item.itemId] = {};
                    currentPrices[item.itemId].raw = fallback.raw;
                    currentPrices[item.itemId].refined = fallback.refined;
                }
            });
        });
        
        // Rafraîchir l'affichage
        renderResourceTable();
        
        const updateTime = document.getElementById('updateTime');
        if (updateTime) {
            updateTime.textContent = new Date().toLocaleTimeString('fr-FR') + ' (prix de référence)';
        }
        
        showStatus('⚠️ Mode démo - Prix de référence', 'warning');
        showLoading(false);
    }, 500);
}

// ============================================
// TEST API DIRECT (pour debug)
// ============================================
async function testApiConnection() {
    try {
        const testUrl = 'https://www.albion-online-data.com/api/v2/stats/prices/T4_WOOD?locations=Thetford';
        const response = await fetch(testUrl);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API test réussie:', data);
            return true;
        } else {
            console.log('❌ API test échouée:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ API test erreur:', error);
        return false;
    }
}

// ============================================
// RÉCUPÉRATION DES PRIX API (version ultra robuste)
// ============================================
async function fetchAllPrices() {
    showLoading(true);
    showStatus('Connexion à l\'API Albion...', 'info');
    apiAttempts++;
    
    // 1. D'abord, tester la connexion
    const apiWorks = await testApiConnection();
    
    if (!apiWorks) {
        console.log('API directe ne fonctionne pas, tentative avec proxies...');
    }
    
    // Collecter tous les IDs uniques (limité à 30 pour éviter timeout)
    const allIds = [];
    const idMap = {};
    let count = 0;
    
    Object.keys(RESOURCES).forEach(resourceKey => {
        RESOURCES[resourceKey].items.forEach(item => {
            if (count < 30) { // Limite pour pas surcharger
                const rawId = getApiItemId(item.itemId, 'raw');
                const refinedId = getApiItemId(item.itemId, 'refined');
                
                if (!allIds.includes(rawId)) {
                    allIds.push(rawId);
                    idMap[rawId] = { itemId: item.itemId, type: 'raw' };
                }
                if (!allIds.includes(refinedId)) {
                    allIds.push(refinedId);
                    idMap[refinedId] = { itemId: item.itemId, type: 'refined' };
                }
                count++;
            }
        });
    });
    
    // Liste de proxies à essayer
    const proxies = [
        '', // Direct
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors-anywhere.herokuapp.com/'
    ];
    
    const endpoints = [
        'https://www.albion-online-data.com/api/v2/stats/prices/',
        'https://europe.albion-online-data.com/api/v2/stats/prices/',
        'https://west.albion-online-data.com/api/v2/stats/prices/'
    ];
    
    let lastError = null;
    
    // Essayer toutes les combinaisons
    for (const proxy of proxies) {
        for (const endpoint of endpoints) {
            try {
                const itemsParam = allIds.join(',');
                const cityParam = API_CONFIG.cities[selectedCity] || 'Thetford';
                let apiUrl = `${endpoint}${itemsParam}?locations=${cityParam}&qualities=1`;
                
                if (proxy) {
                    apiUrl = proxy + encodeURIComponent(apiUrl);
                }
                
                console.log('Tentative API:', apiUrl);
                showStatus(`Tentative ${apiAttempts}...`, 'info');
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 
                        'Accept': 'application/json',
                        'Origin': window.location.origin
                    },
                    mode: 'cors',
                    cache: 'no-cache'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        console.log(`✅ Succès avec ${proxy || 'direct'} + ${endpoint}`);
                        
                        // Traiter les données
                        let priceCount = 0;
                        data.forEach(priceData => {
                            const itemInfo = idMap[priceData.item_id];
                            if (itemInfo && priceData.sell_price_min && priceData.sell_price_min.length > 0) {
                                const price = Math.min(...priceData.sell_price_min.map(p => p.Price));
                                if (price > 0) {
                                    if (!currentPrices[itemInfo.itemId]) {
                                        currentPrices[itemInfo.itemId] = {};
                                    }
                                    currentPrices[itemInfo.itemId][itemInfo.type] = price;
                                    priceCount++;
                                }
                            }
                        });
                        
                        if (priceCount > 0) {
                            // Mettre à jour l'affichage
                            renderResourceTable();
                            
                            const updateTime = document.getElementById('updateTime');
                            if (updateTime) {
                                updateTime.textContent = new Date().toLocaleTimeString('fr-FR');
                            }
                            
                            useFallback = false;
                            showStatus(`✓ ${priceCount} prix récupérés`, 'success');
                            setTimeout(() => showStatus('', 'info'), 3000);
                            
                            showLoading(false);
                            return;
                        }
                    }
                }
            } catch (e) {
                lastError = e;
                console.log('Échec avec:', proxy, endpoint, e.message);
            }
        }
    }
    
    // Si tout a échoué
    console.error('Toutes les tentatives API ont échoué:', lastError);
    showStatus('❌ API inaccessible - Passage en mode démo', 'error');
    loadFallbackPrices();
    showLoading(false);
}

// ============================================
// MISE À JOUR D'UNE LIGNE SPÉCIFIQUE
// ============================================
async function updateSingleRow(resource, index) {
    const item = RESOURCES[resource].items[index];
    const itemIds = [getApiItemId(item.itemId, 'raw'), getApiItemId(item.itemId, 'refined')];
    
    showLoading(true);
    showStatus(`Récupération des prix pour ${item.tier}${item.enchant}...`, 'info');
    
    // Proxies pour une seule ligne
    const proxies = [
        '',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    for (const proxy of proxies) {
        for (const endpoint of API_CONFIG.apiEndpoints) {
            try {
                const itemsParam = itemIds.join(',');
                const cityParam = API_CONFIG.cities[selectedCity] || 'Thetford';
                let apiUrl = `${endpoint}${itemsParam}?locations=${cityParam}&qualities=1`;
                
                if (proxy) {
                    apiUrl = proxy + encodeURIComponent(apiUrl);
                }
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    mode: 'cors'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        let updated = false;
                        
                        const rawData = data.find(p => p.item_id === getApiItemId(item.itemId, 'raw'));
                        const refinedData = data.find(p => p.item_id === getApiItemId(item.itemId, 'refined'));
                        
                        if (rawData && rawData.sell_price_min && rawData.sell_price_min.length > 0) {
                            const price = Math.min(...rawData.sell_price_min.map(p => p.Price));
                            const input = document.querySelector(`.raw-price[data-resource="${resource}"][data-index="${index}"]`);
                            if (input) {
                                input.value = price || 0;
                                updated = true;
                            }
                            if (!currentPrices[item.itemId]) currentPrices[item.itemId] = {};
                            currentPrices[item.itemId].raw = price || 0;
                        }
                        
                        if (refinedData && refinedData.sell_price_min && refinedData.sell_price_min.length > 0) {
                            const price = Math.min(...refinedData.sell_price_min.map(p => p.Price));
                            const input = document.querySelector(`.refined-price[data-resource="${resource}"][data-index="${index}"]`);
                            if (input) {
                                input.value = price || 0;
                                updated = true;
                            }
                            if (!currentPrices[item.itemId]) currentPrices[item.itemId] = {};
                            currentPrices[item.itemId].refined = price || 0;
                        }
                        
                        if (updated) {
                            const rawInput = document.querySelector(`.raw-price[data-resource="${resource}"][data-index="${index}"]`);
                            const refinedInput = document.querySelector(`.refined-price[data-resource="${resource}"][data-index="${index}"]`);
                            
                            if (rawInput) rawInput.dispatchEvent(new Event('change'));
                            if (refinedInput) refinedInput.dispatchEvent(new Event('change'));
                            
                            showStatus(`✓ Prix mis à jour`, 'success');
                            setTimeout(() => showStatus('', 'info'), 2000);
                            
                            showLoading(false);
                            return;
                        }
                    }
                }
            } catch (e) {
                console.log('Tentative échouée');
            }
        }
    }
    
    showStatus('❌ Échec de la récupération', 'error');
    showLoading(false);
}

// ============================================
// INITIALISATION DES PRIX
// ============================================
async function initializePrices() {
    showLoading(true);
    await fetchAllPrices();
}

// ============================================
// AFFICHAGE DES STATUTS
// ============================================
function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('api-status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `api-status ${type}`;
    }
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
}

// ============================================
// GESTION DES ONGLETS
// ============================================
function updateTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const resource = btn.dataset.resource;
        if (resource === selectedResource) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================
// ÉVÉNEMENTS
// ============================================
function attachEventListeners() {
    // Onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const resource = e.target.dataset.resource;
            loadResource(resource);
        });
    });
    
    // Rafraîchissement
    document.getElementById('refreshPrices').addEventListener('click', () => {
        apiAttempts = 0;
        fetchAllPrices();
    });
    
    // Changement de ville
    document.getElementById('city').addEventListener('change', (e) => {
        selectedCity = e.target.value;
        if (!useFallback) {
            fetchAllPrices();
        }
    });
}
