// ============================================
// ÉTAT DE L'APPLICATION
// ============================================
let currentPrices = {};
let selectedCity = 'Thetford';
let selectedResource = 'wood';
let currentResourceData = RESOURCES.wood;

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation...');
    
    // 1️⃣ CHARGER LES PRIX SAUVEGARDÉS D'ABORD
    loadSavedPrices();
    
    showStatus('Chargement...', 'info');
    
    loadResource('wood');
    attachEventListeners();
    
    // 2️⃣ PUIS CHARGER LE FICHIER JSON (en arrière-plan)
    loadPricesFromFile();
});

// ============================================
// SAUVEGARDE LOCALE (NOUVEAU)
// ============================================
function loadSavedPrices() {
    try {
        const saved = localStorage.getItem('albionPrices');
        if (saved) {
            const parsed = JSON.parse(saved);
            currentPrices = parsed;
            console.log('📦 Prix chargés depuis la sauvegarde locale');
        }
    } catch (e) {
        console.log('Erreur chargement sauvegarde:', e);
    }
}

function savePrices() {
    try {
        localStorage.setItem('albionPrices', JSON.stringify(currentPrices));
        console.log('💾 Prix sauvegardés localement');
        
        // Afficher un petit indicateur visuel
        const saveIndicator = document.getElementById('save-indicator');
        if (saveIndicator) {
            saveIndicator.style.opacity = '1';
            setTimeout(() => {
                saveIndicator.style.opacity = '0';
            }, 1000);
        }
    } catch (e) {
        console.log('Erreur sauvegarde:', e);
    }
}

// ============================================
// CHARGEMENT DES PRIX DEPUIS LE FICHIER JSON
// ============================================
async function loadPricesFromFile() {
    showLoading(true);
    
    try {
        const response = await fetch('prices.json');
        const data = await response.json();
        
        if (data && data.prices) {
            // Ne pas écraser les prix modifiés manuellement !
            // On fusionne intelligemment
            Object.keys(data.prices).forEach(key => {
                if (!currentPrices[key]) {
                    currentPrices[key] = data.prices[key];
                }
            });
            
            renderResourceTable();
            
            const updateTime = document.getElementById('updateTime');
            if (updateTime) {
                updateTime.textContent = data.lastUpdate || new Date().toLocaleString('fr-FR');
            }
            
            showStatus(`✓ Prix chargés (${Object.keys(currentPrices).length} ressources)`, 'success');
            clearStatusAfterDelay();
        }
    } catch (error) {
        console.error('Erreur chargement prices.json:', error);
        showStatus('❌ Erreur chargement - Utilisation sauvegarde', 'error');
        
        // Si currentPrices est vide ET que prices.json a échoué, on utilise FALLBACK
        if (Object.keys(currentPrices).length === 0) {
            loadFallbackPrices();
        } else {
            renderResourceTable();
        }
    } finally {
        showLoading(false);
    }
}

// ============================================
// PRIX DE SECOURS (si tout échoue)
// ============================================
function loadFallbackPrices() {
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
    renderResourceTable();
    savePrices(); // Sauvegarder les prix de secours aussi
}

// ============================================
// CHARGEMENT D'UNE RESSOURCE
// ============================================
function loadResource(resourceKey) {
    selectedResource = resourceKey;
    currentResourceData = RESOURCES[resourceKey];
    
    document.querySelector('h1').innerHTML = `${currentResourceData.icon} Calculateur de ${currentResourceData.name} - Albion Online`;
    
    const citySelect = document.getElementById('city');
    if (citySelect) {
        const defaultCity = currentResourceData.city;
        const option = Array.from(citySelect.options).find(opt => opt.value === defaultCity);
        if (option) {
            citySelect.value = defaultCity;
            selectedCity = defaultCity;
        }
    }
    
    renderResourceTable();
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
                    <th>Qté</th>
                    <th>Prix achat<br>(${currentResourceData.rawName})</th>
                    <th>Prix total</th>
                    <th>Prix vente<br>(${currentResourceData.refinedName})</th>
                    <th>Marge</th>
                    <th>Profit</th>
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
            <tr class="tier-${item.tier}">
                <td><strong>${item.tier}</strong></td>
                <td class="${enchantClass}"><strong>${item.enchant}</strong></td>
                <td>${item.quantity}</td>
                <td><input type="number" class="price-input raw-price" data-resource="${selectedResource}" data-index="${index}" value="${rawPrice || ''}" placeholder="0" min="0" step="1"></td>
                <td class="total-cost" data-resource="${selectedResource}" data-index="${index}">${totalCost ? totalCost.toLocaleString() : '-'}</td>
                <td><input type="number" class="price-input refined-price" data-resource="${selectedResource}" data-index="${index}" value="${refinedPrice || ''}" placeholder="0" min="0" step="1"></td>
                <td class="margin ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}" data-resource="${selectedResource}" data-index="${index}">${margin ? margin + '%' : '-'}</td>
                <td class="profit ${profit > 0 ? 'profit-positive' : profit < 0 ? 'profit-negative' : ''}" data-resource="${selectedResource}" data-index="${index}">${profit ? profit.toLocaleString() : '-'}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" class="total-label">TOTAL PROFIT (${currentResourceData.name}):</td>
                    <td id="total-profit" class="total-value">0</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    container.innerHTML = html;
    
    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('change', updateCalculations);
    });
    
    updateTotalProfit();
}

// ============================================
// UTILITAIRES
// ============================================
function getEnchantClass(enchant) {
    const classes = { '.0': 'enchant-0', '.1': 'enchant-1', '.2': 'enchant-2', '.3': 'enchant-3', '.4': 'enchant-4' };
    return classes[enchant] || '';
}

// ============================================
// MISE À JOUR DES CALCULS (avec sauvegarde)
// ============================================
function updateCalculations() {
    const resource = this.dataset.resource;
    const index = parseInt(this.dataset.index);
    const type = this.classList.contains('raw-price') ? 'raw' : 'refined';
    const value = parseFloat(this.value) || 0;
    
    const item = RESOURCES[resource].items[index];
    const key = item.itemId;
    
    if (!currentPrices[key]) currentPrices[key] = {};
    currentPrices[key][type] = value;
    
    // 💾 SAUVEGARDER APRÈS CHAQUE MODIFICATION
    savePrices();
    
    const rawPrice = currentPrices[key]?.raw || 0;
    const refinedPrice = currentPrices[key]?.refined || 0;
    const totalCost = rawPrice * item.quantity;
    const profit = refinedPrice - totalCost;
    const margin = totalCost > 0 ? ((profit / totalCost) * 100).toFixed(1) : '';
    
    const totalCostCell = document.querySelector(`.total-cost[data-resource="${resource}"][data-index="${index}"]`);
    if (totalCostCell) totalCostCell.textContent = totalCost ? totalCost.toLocaleString() : '-';
    
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
    if (totalElement) totalElement.textContent = total.toLocaleString();
}

function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('api-status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `api-status ${type}`;
    }
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = show ? 'block' : 'none';
}

function updateTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.resource === selectedResource);
    });
}

function attachEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => loadResource(e.target.dataset.resource));
    });
}

function clearStatusAfterDelay() {
    let start = null;
    const duration = 3000;
    
    function fadeOut(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        
        if (elapsed < duration) {
            requestAnimationFrame(fadeOut);
        } else {
            showStatus('', 'info');
        }
    }
    requestAnimationFrame(fadeOut);
}

async function testEuropeAPI() {
    try {
        const url = 'https://europe.albion-online-data.com/api/v2/stats/prices/T4_WOOD.json?locations=Thetford&qualities=1';
        
        // Utilisation de corsproxy.io (le même qui fonctionnait avant)
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        console.log('✅ Réponse API Europe:', data);
        
        if (data && data.length > 0) {
            const prixAchat = Math.min(...data[0].sell_price_min.map(p => p.Price));
            const prixVente = Math.min(...data[0].sell_price_max.map(p => p.Price));
            
            alert(`T4 Bois à Thetford:\nPrix achat: ${prixAchat}\nPrix vente: ${prixVente}`);
        }
    } catch (error) {
        console.error('❌ Erreur:', error);
        alert('Échec de la connexion à l\'API Europe');
    }
}
