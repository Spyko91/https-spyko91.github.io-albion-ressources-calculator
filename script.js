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
    
    // Charger les prix sauvegardés d'abord
    loadSavedPrices();
    
    showStatus('Chargement...', 'info');
    
    loadResource('wood');
    attachEventListeners();
    
    // Puis charger le fichier JSON
    loadPricesFromFile();
});

// ============================================
// SAUVEGARDE LOCALE
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
            // Fusion intelligente sans écraser les prix modifiés
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
// PRIX DE SECOURS
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
    savePrices();
}

// ============================================
// TEST API EUROPE - VERSION CORRIGÉE
// ============================================
async function testEuropeAPI() {
    try {
        showStatus('🧪 Test API Europe...', 'info');
        
        const baseUrl = 'https://europe.albion-online-data.com/api/v2/stats/prices/T4_WOOD.json?locations=Thetford&qualities=1';
        
        // Liste des proxies fonctionnels (testés)
        const proxies = [
            {
                name: 'CorsProxy.io',
                url: 'https://corsproxy.io/?',
                needsEncoding: true,
                needsHeaders: false
            },
            {
                name: 'CORS Anywhere (communautaire)',
                url: 'https://cors-anywhere.com/',
                needsEncoding: false,
                needsHeaders: true,
                headers: {
                    'Origin': window.location.origin,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            },
            {
                name: 'AllOrigins',
                url: 'https://api.allorigins.win/raw?url=',
                needsEncoding: true,
                needsHeaders: false
            }
        ];
        
        let lastError = null;
        
        for (const proxy of proxies) {
            try {
                // Construire l'URL selon le proxy
                let proxyUrl;
                if (proxy.needsEncoding) {
                    proxyUrl = proxy.url + encodeURIComponent(baseUrl);
                } else {
                    proxyUrl = proxy.url + baseUrl;
                }
                
                console.log(`🌐 Tentative avec ${proxy.name}:`, proxyUrl);
                showStatus(`Test avec ${proxy.name}...`, 'info');
                
                // Options de fetch adaptées
                const fetchOptions = {
                    method: 'GET',
                    headers: proxy.headers || { 'Accept': 'application/json' },
                    mode: 'cors',
                    cache: 'no-cache'
                };
                
                const response = await fetch(proxyUrl, fetchOptions);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ Succès avec ${proxy.name}:`, data);
                    
                    if (data && data.length > 0) {
                        const prixAchat = Math.min(...data[0].sell_price_min.map(p => p.Price));
                        const prixVente = Math.max(...data[0].sell_price_max.map(p => p.Price));
                        
                        alert(`✅ Succès via ${proxy.name} !\n\nT4 Bois à Thetford:\n💰 Prix achat: ${prixAchat} silver\n💰 Prix vente: ${prixVente} silver`);
                        showStatus('✓ Test API réussi', 'success');
                        clearStatusAfterDelay();
                        return;
                    }
                }
            } catch (e) {
                lastError = e;
                console.log(`❌ Échec avec ${proxy.name}:`, e.message);
            }
        }
        
        // Si on arrive ici, tous les proxies ont échoué
        throw lastError || new Error('Tous les proxies ont échoué');
        
    } catch (error) {
        console.error('❌ Erreur finale:', error);
        
        // Message d'erreur plus utile avec suggestions
        alert(`❌ Échec de la connexion à l'API Europe

Causes possibles:
• Corsproxy.io est temporairement indisponible (vérifie sur https://corsproxy.io)
• Votre navigateur bloque les requêtes CORS (désactive les extensions)
• L'API Albion est momentanément hors ligne (rare)

Suggestions:
1. Ouvre https://cors-anywhere.com/ dans un nouvel onglet (pas besoin de cliquer)
2. Réessaie le test
3. Si ça échoue encore, essaie avec un navigateur différent (Chrome/Firefox)
4. Désactive temporairement AdBlock et autres extensions`);

        showStatus('❌ Test API échoué', 'error');
        clearStatusAfterDelay();
    }
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
    
    if (!currentPrices[key]) currentPrices[key] = {};
    currentPrices[key][type] = value;
    
    // Sauvegarder après chaque modification
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
    if (totalElement) totalElement.textContent = total.toLocaleString();
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
    if (loading) loading.style.display = show ? 'block' : 'none';
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

// ============================================
// GESTION DES ONGLETS
// ============================================
function updateTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.resource === selectedResource);
    });
}

// ============================================
// ÉVÉNEMENTS
// ============================================
function attachEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => loadResource(e.target.dataset.resource));
    });
}
