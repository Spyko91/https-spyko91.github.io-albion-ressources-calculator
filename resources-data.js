// ============================================
// DONNÉES DE TOUTES LES RESSOURCES - ALBION ONLINE
// ============================================

const RESOURCES = {
    // ============= BOIS =============
    wood: {
        name: 'Bois',
        icon: '🌲',
        city: 'Thetford',
        rawName: 'Bûche',
        refinedName: 'Planche',
        items: [
            // T2
            { tier: 'T2', enchant: '.0', itemId: 'T2_WOOD', quantity: 1, rawName: 'Bouleau', refinedName: 'Bouleau' },
            // T3
            { tier: 'T3', enchant: '.0', itemId: 'T3_WOOD', quantity: 2, rawName: 'Châtaignier', refinedName: 'Châtaignier' },
            // T4
            { tier: 'T4', enchant: '.0', itemId: 'T4_WOOD', quantity: 2, rawName: 'Cèdre', refinedName: 'Cèdre' },
            { tier: 'T4', enchant: '.1', itemId: 'T4_WOOD_LEVEL1', quantity: 2, rawName: 'Cèdre .1', refinedName: 'Cèdre .1' },
            { tier: 'T4', enchant: '.2', itemId: 'T4_WOOD_LEVEL2', quantity: 2, rawName: 'Cèdre .2', refinedName: 'Cèdre .2' },
            { tier: 'T4', enchant: '.3', itemId: 'T4_WOOD_LEVEL3', quantity: 2, rawName: 'Cèdre .3', refinedName: 'Cèdre .3' },
            // T5
            { tier: 'T5', enchant: '.0', itemId: 'T5_WOOD', quantity: 3, rawName: 'Pin', refinedName: 'Pin' },
            { tier: 'T5', enchant: '.1', itemId: 'T5_WOOD_LEVEL1', quantity: 3, rawName: 'Pin .1', refinedName: 'Pin .1' },
            { tier: 'T5', enchant: '.2', itemId: 'T5_WOOD_LEVEL2', quantity: 3, rawName: 'Pin .2', refinedName: 'Pin .2' },
            { tier: 'T5', enchant: '.3', itemId: 'T5_WOOD_LEVEL3', quantity: 3, rawName: 'Pin .3', refinedName: 'Pin .3' },
            // T6
            { tier: 'T6', enchant: '.0', itemId: 'T6_WOOD', quantity: 4, rawName: 'Séquoia', refinedName: 'Séquoia' },
            { tier: 'T6', enchant: '.1', itemId: 'T6_WOOD_LEVEL1', quantity: 4, rawName: 'Séquoia .1', refinedName: 'Séquoia .1' },
            { tier: 'T6', enchant: '.2', itemId: 'T6_WOOD_LEVEL2', quantity: 4, rawName: 'Séquoia .2', refinedName: 'Séquoia .2' },
            { tier: 'T6', enchant: '.3', itemId: 'T6_WOOD_LEVEL3', quantity: 4, rawName: 'Séquoia .3', refinedName: 'Séquoia .3' },
            // T7
            { tier: 'T7', enchant: '.0', itemId: 'T7_WOOD', quantity: 5, rawName: 'Pierre de Lune', refinedName: 'Pierre de Lune' },
            { tier: 'T7', enchant: '.1', itemId: 'T7_WOOD_LEVEL1', quantity: 5, rawName: 'Pierre de Lune .1', refinedName: 'Pierre de Lune .1' },
            { tier: 'T7', enchant: '.2', itemId: 'T7_WOOD_LEVEL2', quantity: 5, rawName: 'Pierre de Lune .2', refinedName: 'Pierre de Lune .2' },
            { tier: 'T7', enchant: '.3', itemId: 'T7_WOOD_LEVEL3', quantity: 5, rawName: 'Pierre de Lune .3', refinedName: 'Pierre de Lune .3' },
            // T8
            { tier: 'T8', enchant: '.0', itemId: 'T8_WOOD', quantity: 5, rawName: 'Pierre de Sang', refinedName: 'Pierre de Sang' },
            { tier: 'T8', enchant: '.1', itemId: 'T8_WOOD_LEVEL1', quantity: 5, rawName: 'Pierre de Sang .1', refinedName: 'Pierre de Sang .1' },
            { tier: 'T8', enchant: '.2', itemId: 'T8_WOOD_LEVEL2', quantity: 5, rawName: 'Pierre de Sang .2', refinedName: 'Pierre de Sang .2' },
            { tier: 'T8', enchant: '.3', itemId: 'T8_WOOD_LEVEL3', quantity: 5, rawName: 'Pierre de Sang .3', refinedName: 'Pierre de Sang .3' }
        ]
    },
    
    // ============= PIERRE =============
    stone: {
        name: 'Pierre',
        icon: '🪨',
        city: 'Fort Sterling',
        rawName: 'Bloc',
        refinedName: 'Pierre taillée',
        items: [
            // T2
            { tier: 'T2', enchant: '.0', itemId: 'T2_ROCK', quantity: 1, rawName: 'Calcaire', refinedName: 'Calcaire' },
            // T3
            { tier: 'T3', enchant: '.0', itemId: 'T3_ROCK', quantity: 2, rawName: 'Grès', refinedName: 'Grès' },
            // T4
            { tier: 'T4', enchant: '.0', itemId: 'T4_ROCK', quantity: 2, rawName: 'Ardoise', refinedName: 'Ardoise' },
            { tier: 'T4', enchant: '.1', itemId: 'T4_ROCK_LEVEL1', quantity: 2, rawName: 'Ardoise .1', refinedName: 'Ardoise .1' },
            { tier: 'T4', enchant: '.2', itemId: 'T4_ROCK_LEVEL2', quantity: 2, rawName: 'Ardoise .2', refinedName: 'Ardoise .2' },
            { tier: 'T4', enchant: '.3', itemId: 'T4_ROCK_LEVEL3', quantity: 2, rawName: 'Ardoise .3', refinedName: 'Ardoise .3' },
            // T5
            { tier: 'T5', enchant: '.0', itemId: 'T5_ROCK', quantity: 3, rawName: 'Marbre', refinedName: 'Marbre' },
            { tier: 'T5', enchant: '.1', itemId: 'T5_ROCK_LEVEL1', quantity: 3, rawName: 'Marbre .1', refinedName: 'Marbre .1' },
            { tier: 'T5', enchant: '.2', itemId: 'T5_ROCK_LEVEL2', quantity: 3, rawName: 'Marbre .2', refinedName: 'Marbre .2' },
            { tier: 'T5', enchant: '.3', itemId: 'T5_ROCK_LEVEL3', quantity: 3, rawName: 'Marbre .3', refinedName: 'Marbre .3' },
            // T6
            { tier: 'T6', enchant: '.0', itemId: 'T6_ROCK', quantity: 4, rawName: 'Travertin', refinedName: 'Travertin' },
            { tier: 'T6', enchant: '.1', itemId: 'T6_ROCK_LEVEL1', quantity: 4, rawName: 'Travertin .1', refinedName: 'Travertin .1' },
            { tier: 'T6', enchant: '.2', itemId: 'T6_ROCK_LEVEL2', quantity: 4, rawName: 'Travertin .2', refinedName: 'Travertin .2' },
            { tier: 'T6', enchant: '.3', itemId: 'T6_ROCK_LEVEL3', quantity: 4, rawName: 'Travertin .3', refinedName: 'Travertin .3' },
            // T7
            { tier: 'T7', enchant: '.0', itemId: 'T7_ROCK', quantity: 5, rawName: 'Basalte', refinedName: 'Basalte' },
            { tier: 'T7', enchant: '.1', itemId: 'T7_ROCK_LEVEL1', quantity: 5, rawName: 'Basalte .1', refinedName: 'Basalte .1' },
            { tier: 'T7', enchant: '.2', itemId: 'T7_ROCK_LEVEL2', quantity: 5, rawName: 'Basalte .2', refinedName: 'Basalte .2' },
            { tier: 'T7', enchant: '.3', itemId: 'T7_ROCK_LEVEL3', quantity: 5, rawName: 'Basalte .3', refinedName: 'Basalte .3' },
            // T8
            { tier: 'T8', enchant: '.0', itemId: 'T8_ROCK', quantity: 5, rawName: 'Andésite', refinedName: 'Andésite' },
            { tier: 'T8', enchant: '.1', itemId: 'T8_ROCK_LEVEL1', quantity: 5, rawName: 'Andésite .1', refinedName: 'Andésite .1' },
            { tier: 'T8', enchant: '.2', itemId: 'T8_ROCK_LEVEL2', quantity: 5, rawName: 'Andésite .2', refinedName: 'Andésite .2' },
            { tier: 'T8', enchant: '.3', itemId: 'T8_ROCK_LEVEL3', quantity: 5, rawName: 'Andésite .3', refinedName: 'Andésite .3' }
        ]
    },
    
    // ============= MINERAI =============
    ore: {
        name: 'Minerai',
        icon: '⛏️',
        city: 'Bridgewatch',
        rawName: 'Minerai',
        refinedName: 'Lingot',
        items: [
            // T2
            { tier: 'T2', enchant: '.0', itemId: 'T2_ORE', quantity: 1, rawName: 'Cuivre', refinedName: 'Cuivre' },
            // T3
            { tier: 'T3', enchant: '.0', itemId: 'T3_ORE', quantity: 2, rawName: 'Étain', refinedName: 'Étain' },
            // T4
            { tier: 'T4', enchant: '.0', itemId: 'T4_ORE', quantity: 2, rawName: 'Fer', refinedName: 'Fer' },
            { tier: 'T4', enchant: '.1', itemId: 'T4_ORE_LEVEL1', quantity: 2, rawName: 'Fer .1', refinedName: 'Fer .1' },
            { tier: 'T4', enchant: '.2', itemId: 'T4_ORE_LEVEL2', quantity: 2, rawName: 'Fer .2', refinedName: 'Fer .2' },
            { tier: 'T4', enchant: '.3', itemId: 'T4_ORE_LEVEL3', quantity: 2, rawName: 'Fer .3', refinedName: 'Fer .3' },
            // T5
            { tier: 'T5', enchant: '.0', itemId: 'T5_ORE', quantity: 3, rawName: 'Acier', refinedName: 'Acier' },
            { tier: 'T5', enchant: '.1', itemId: 'T5_ORE_LEVEL1', quantity: 3, rawName: 'Acier .1', refinedName: 'Acier .1' },
            { tier: 'T5', enchant: '.2', itemId: 'T5_ORE_LEVEL2', quantity: 3, rawName: 'Acier .2', refinedName: 'Acier .2' },
            { tier: 'T5', enchant: '.3', itemId: 'T5_ORE_LEVEL3', quantity: 3, rawName: 'Acier .3', refinedName: 'Acier .3' },
            // T6
            { tier: 'T6', enchant: '.0', itemId: 'T6_ORE', quantity: 4, rawName: 'Titane', refinedName: 'Titane' },
            { tier: 'T6', enchant: '.1', itemId: 'T6_ORE_LEVEL1', quantity: 4, rawName: 'Titane .1', refinedName: 'Titane .1' },
            { tier: 'T6', enchant: '.2', itemId: 'T6_ORE_LEVEL2', quantity: 4, rawName: 'Titane .2', refinedName: 'Titane .2' },
            { tier: 'T6', enchant: '.3', itemId: 'T6_ORE_LEVEL3', quantity: 4, rawName: 'Titane .3', refinedName: 'Titane .3' },
            // T7
            { tier: 'T7', enchant: '.0', itemId: 'T7_ORE', quantity: 5, rawName: 'Runite', refinedName: 'Runite' },
            { tier: 'T7', enchant: '.1', itemId: 'T7_ORE_LEVEL1', quantity: 5, rawName: 'Runite .1', refinedName: 'Runite .1' },
            { tier: 'T7', enchant: '.2', itemId: 'T7_ORE_LEVEL2', quantity: 5, rawName: 'Runite .2', refinedName: 'Runite .2' },
            { tier: 'T7', enchant: '.3', itemId: 'T7_ORE_LEVEL3', quantity: 5, rawName: 'Runite .3', refinedName: 'Runite .3' },
            // T8
            { tier: 'T8', enchant: '.0', itemId: 'T8_ORE', quantity: 5, rawName: 'Météorite', refinedName: 'Météorite' },
            { tier: 'T8', enchant: '.1', itemId: 'T8_ORE_LEVEL1', quantity: 5, rawName: 'Météorite .1', refinedName: 'Météorite .1' },
            { tier: 'T8', enchant: '.2', itemId: 'T8_ORE_LEVEL2', quantity: 5, rawName: 'Météorite .2', refinedName: 'Météorite .2' },
            { tier: 'T8', enchant: '.3', itemId: 'T8_ORE_LEVEL3', quantity: 5, rawName: 'Météorite .3', refinedName: 'Météorite .3' }
        ]
    },
    
    // ============= CUIR (Peaux) =============
    hide: {
        name: 'Cuir',
        icon: '🦌',
        city: 'Lymhurst',
        rawName: 'Peau',
        refinedName: 'Cuir',
        items: [
            // T2
            { tier: 'T2', enchant: '.0', itemId: 'T2_HIDE', quantity: 1, rawName: 'Rugueux', refinedName: 'Rugueux' },
            // T3
            { tier: 'T3', enchant: '.0', itemId: 'T3_HIDE', quantity: 2, rawName: 'Moyen', refinedName: 'Moyen' },
            // T4
            { tier: 'T4', enchant: '.0', itemId: 'T4_HIDE', quantity: 2, rawName: 'Robuste', refinedName: 'Robuste' },
            { tier: 'T4', enchant: '.1', itemId: 'T4_HIDE_LEVEL1', quantity: 2, rawName: 'Robuste .1', refinedName: 'Robuste .1' },
            { tier: 'T4', enchant: '.2', itemId: 'T4_HIDE_LEVEL2', quantity: 2, rawName: 'Robuste .2', refinedName: 'Robuste .2' },
            { tier: 'T4', enchant: '.3', itemId: 'T4_HIDE_LEVEL3', quantity: 2, rawName: 'Robuste .3', refinedName: 'Robuste .3' },
            // T5
            { tier: 'T5', enchant: '.0', itemId: 'T5_HIDE', quantity: 3, rawName: 'Dur', refinedName: 'Dur' },
            { tier: 'T5', enchant: '.1', itemId: 'T5_HIDE_LEVEL1', quantity: 3, rawName: 'Dur .1', refinedName: 'Dur .1' },
            { tier: 'T5', enchant: '.2', itemId: 'T5_HIDE_LEVEL2', quantity: 3, rawName: 'Dur .2', refinedName: 'Dur .2' },
            { tier: 'T5', enchant: '.3', itemId: 'T5_HIDE_LEVEL3', quantity: 3, rawName: 'Dur .3', refinedName: 'Dur .3' },
            // T6
            { tier: 'T6', enchant: '.0', itemId: 'T6_HIDE', quantity: 4, rawName: 'Résistant', refinedName: 'Résistant' },
            { tier: 'T6', enchant: '.1', itemId: 'T6_HIDE_LEVEL1', quantity: 4, rawName: 'Résistant .1', refinedName: 'Résistant .1' },
            { tier: 'T6', enchant: '.2', itemId: 'T6_HIDE_LEVEL2', quantity: 4, rawName: 'Résistant .2', refinedName: 'Résistant .2' },
            { tier: 'T6', enchant: '.3', itemId: 'T6_HIDE_LEVEL3', quantity: 4, rawName: 'Résistant .3', refinedName: 'Résistant .3' },
            // T7
            { tier: 'T7', enchant: '.0', itemId: 'T7_HIDE', quantity: 5, rawName: 'Solide', refinedName: 'Solide' },
            { tier: 'T7', enchant: '.1', itemId: 'T7_HIDE_LEVEL1', quantity: 5, rawName: 'Solide .1', refinedName: 'Solide .1' },
            { tier: 'T7', enchant: '.2', itemId: 'T7_HIDE_LEVEL2', quantity: 5, rawName: 'Solide .2', refinedName: 'Solide .2' },
            { tier: 'T7', enchant: '.3', itemId: 'T7_HIDE_LEVEL3', quantity: 5, rawName: 'Solide .3', refinedName: 'Solide .3' },
            // T8
            { tier: 'T8', enchant: '.0', itemId: 'T8_HIDE', quantity: 5, rawName: 'Fort', refinedName: 'Fort' },
            { tier: 'T8', enchant: '.1', itemId: 'T8_HIDE_LEVEL1', quantity: 5, rawName: 'Fort .1', refinedName: 'Fort .1' },
            { tier: 'T8', enchant: '.2', itemId: 'T8_HIDE_LEVEL2', quantity: 5, rawName: 'Fort .2', refinedName: 'Fort .2' },
            { tier: 'T8', enchant: '.3', itemId: 'T8_HIDE_LEVEL3', quantity: 5, rawName: 'Fort .3', refinedName: 'Fort .3' }
        ]
    },
    
    // ============= FIBRE (Coton) =============
    fiber: {
        name: 'Fibre',
        icon: '🌿',
        city: 'Thetford',
        rawName: 'Fibre',
        refinedName: 'Tissu',
        items: [
            // T2
            { tier: 'T2', enchant: '.0', itemId: 'T2_FIBER', quantity: 1, rawName: 'Jute', refinedName: 'Jute' },
            // T3
            { tier: 'T3', enchant: '.0', itemId: 'T3_FIBER', quantity: 2, rawName: 'Chanvre', refinedName: 'Chanvre' },
            // T4
            { tier: 'T4', enchant: '.0', itemId: 'T4_FIBER', quantity: 2, rawName: 'Lin', refinedName: 'Lin' },
            { tier: 'T4', enchant: '.1', itemId: 'T4_FIBER_LEVEL1', quantity: 2, rawName: 'Lin .1', refinedName: 'Lin .1' },
            { tier: 'T4', enchant: '.2', itemId: 'T4_FIBER_LEVEL2', quantity: 2, rawName: 'Lin .2', refinedName: 'Lin .2' },
            { tier: 'T4', enchant: '.3', itemId: 'T4_FIBER_LEVEL3', quantity: 2, rawName: 'Lin .3', refinedName: 'Lin .3' },
            // T5
            { tier: 'T5', enchant: '.0', itemId: 'T5_FIBER', quantity: 3, rawName: 'Coton', refinedName: 'Coton' },
            { tier: 'T5', enchant: '.1', itemId: 'T5_FIBER_LEVEL1', quantity: 3, rawName: 'Coton .1', refinedName: 'Coton .1' },
            { tier: 'T5', enchant: '.2', itemId: 'T5_FIBER_LEVEL2', quantity: 3, rawName: 'Coton .2', refinedName: 'Coton .2' },
            { tier: 'T5', enchant: '.3', itemId: 'T5_FIBER_LEVEL3', quantity: 3, rawName: 'Coton .3', refinedName: 'Coton .3' },
            // T6
            { tier: 'T6', enchant: '.0', itemId: 'T6_FIBER', quantity: 4, rawName: 'Laine', refinedName: 'Laine' },
            { tier: 'T6', enchant: '.1', itemId: 'T6_FIBER_LEVEL1', quantity: 4, rawName: 'Laine .1', refinedName: 'Laine .1' },
            { tier: 'T6', enchant: '.2', itemId: 'T6_FIBER_LEVEL2', quantity: 4, rawName: 'Laine .2', refinedName: 'Laine .2' },
            { tier: 'T6', enchant: '.3', itemId: 'T6_FIBER_LEVEL3', quantity: 4, rawName: 'Laine .3', refinedName: 'Laine .3' },
            // T7
            { tier: 'T7', enchant: '.0', itemId: 'T7_FIBER', quantity: 5, rawName: 'Soie', refinedName: 'Soie' },
            { tier: 'T7', enchant: '.1', itemId: 'T7_FIBER_LEVEL1', quantity: 5, rawName: 'Soie .1', refinedName: 'Soie .1' },
            { tier: 'T7', enchant: '.2', itemId: 'T7_FIBER_LEVEL2', quantity: 5, rawName: 'Soie .2', refinedName: 'Soie .2' },
            { tier: 'T7', enchant: '.3', itemId: 'T7_FIBER_LEVEL3', quantity: 5, rawName: 'Soie .3', refinedName: 'Soie .3' },
            // T8
            { tier: 'T8', enchant: '.0', itemId: 'T8_FIBER', quantity: 5, rawName: 'Byssus', refinedName: 'Byssus' },
            { tier: 'T8', enchant: '.1', itemId: 'T8_FIBER_LEVEL1', quantity: 5, rawName: 'Byssus .1', refinedName: 'Byssus .1' },
            { tier: 'T8', enchant: '.2', itemId: 'T8_FIBER_LEVEL2', quantity: 5, rawName: 'Byssus .2', refinedName: 'Byssus .2' },
            { tier: 'T8', enchant: '.3', itemId: 'T8_FIBER_LEVEL3', quantity: 5, rawName: 'Byssus .3', refinedName: 'Byssus .3' }
        ]
    }
};

// ============================================
// CONFIGURATION API
// ============================================
const API_CONFIG = {
    corsProxies: [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://proxy.cors.sh/',
        ''
    ],
    apiEndpoints: [
        'https://www.albion-online-data.com/api/v2/stats/prices/',
        'https://europe.albion-online-data.com/api/v2/stats/prices/',
        'https://west.albion-online-data.com/api/v2/stats/prices/'
    ],
    cities: {
        'Thetford': 'Thetford',
        'Lymhurst': 'Lymhurst',
        'Bridgewatch': 'Bridgewatch',
        'Martlock': 'Martlock',
        'Fort Sterling': 'Fort Sterling',
        'Caerleon': 'Caerleon',
        'Brecilien': 'Brecilien'
    }
};

// ============================================
// PRIX DE SECOURS
// ============================================
const FALLBACK_PRICES = {
    // Bois
    'T2_WOOD': { raw: 150, refined: 300 },
    'T3_WOOD': { raw: 300, refined: 900 },
    'T4_WOOD': { raw: 850, refined: 2550 },
    'T4_WOOD_LEVEL1': { raw: 2550, refined: 7650 },
    'T4_WOOD_LEVEL2': { raw: 7650, refined: 22950 },
    'T4_WOOD_LEVEL3': { raw: 22950, refined: 68850 },
    'T5_WOOD': { raw: 2550, refined: 7650 },
    'T5_WOOD_LEVEL1': { raw: 7650, refined: 22950 },
    'T5_WOOD_LEVEL2': { raw: 22950, refined: 68850 },
    'T5_WOOD_LEVEL3': { raw: 68850, refined: 206550 },
    'T6_WOOD': { raw: 7650, refined: 22950 },
    'T6_WOOD_LEVEL1': { raw: 22950, refined: 68850 },
    'T6_WOOD_LEVEL2': { raw: 68850, refined: 206550 },
    'T6_WOOD_LEVEL3': { raw: 206550, refined: 619650 },
    'T7_WOOD': { raw: 22950, refined: 68850 },
    'T7_WOOD_LEVEL1': { raw: 68850, refined: 206550 },
    'T7_WOOD_LEVEL2': { raw: 206550, refined: 619650 },
    'T7_WOOD_LEVEL3': { raw: 619650, refined: 1858950 },
    'T8_WOOD': { raw: 68850, refined: 206550 },
    'T8_WOOD_LEVEL1': { raw: 206550, refined: 619650 },
    'T8_WOOD_LEVEL2': { raw: 619650, refined: 1858950 },
    'T8_WOOD_LEVEL3': { raw: 1858950, refined: 5576850 },
    
    // Pierre
    'T2_ROCK': { raw: 120, refined: 240 },
    'T3_ROCK': { raw: 240, refined: 720 },
    'T4_ROCK': { raw: 720, refined: 2160 },
    'T4_ROCK_LEVEL1': { raw: 2160, refined: 6480 },
    'T4_ROCK_LEVEL2': { raw: 6480, refined: 19440 },
    'T4_ROCK_LEVEL3': { raw: 19440, refined: 58320 },
    'T5_ROCK': { raw: 2160, refined: 6480 },
    'T5_ROCK_LEVEL1': { raw: 6480, refined: 19440 },
    'T5_ROCK_LEVEL2': { raw: 19440, refined: 58320 },
    'T5_ROCK_LEVEL3': { raw: 58320, refined: 174960 },
    'T6_ROCK': { raw: 6480, refined: 19440 },
    'T6_ROCK_LEVEL1': { raw: 19440, refined: 58320 },
    'T6_ROCK_LEVEL2': { raw: 58320, refined: 174960 },
    'T6_ROCK_LEVEL3': { raw: 174960, refined: 524880 },
    'T7_ROCK': { raw: 19440, refined: 58320 },
    'T7_ROCK_LEVEL1': { raw: 58320, refined: 174960 },
    'T7_ROCK_LEVEL2': { raw: 174960, refined: 524880 },
    'T7_ROCK_LEVEL3': { raw: 524880, refined: 1574640 },
    'T8_ROCK': { raw: 58320, refined: 174960 },
    'T8_ROCK_LEVEL1': { raw: 174960, refined: 524880 },
    'T8_ROCK_LEVEL2': { raw: 524880, refined: 1574640 },
    'T8_ROCK_LEVEL3': { raw: 1574640, refined: 4723920 },
    
    // Minerai
    'T2_ORE': { raw: 180, refined: 360 },
    'T3_ORE': { raw: 360, refined: 1080 },
    'T4_ORE': { raw: 1080, refined: 3240 },
    'T4_ORE_LEVEL1': { raw: 3240, refined: 9720 },
    'T4_ORE_LEVEL2': { raw: 9720, refined: 29160 },
    'T4_ORE_LEVEL3': { raw: 29160, refined: 87480 },
    'T5_ORE': { raw: 3240, refined: 9720 },
    'T5_ORE_LEVEL1': { raw: 9720, refined: 29160 },
    'T5_ORE_LEVEL2': { raw: 29160, refined: 87480 },
    'T5_ORE_LEVEL3': { raw: 87480, refined: 262440 },
    'T6_ORE': { raw: 9720, refined: 29160 },
    'T6_ORE_LEVEL1': { raw: 29160, refined: 87480 },
    'T6_ORE_LEVEL2': { raw: 87480, refined: 262440 },
    'T6_ORE_LEVEL3': { raw: 262440, refined: 787320 },
    'T7_ORE': { raw: 29160, refined: 87480 },
    'T7_ORE_LEVEL1': { raw: 87480, refined: 262440 },
    'T7_ORE_LEVEL2': { raw: 262440, refined: 787320 },
    'T7_ORE_LEVEL3': { raw: 787320, refined: 2361960 },
    'T8_ORE': { raw: 87480, refined: 262440 },
    'T8_ORE_LEVEL1': { raw: 262440, refined: 787320 },
    'T8_ORE_LEVEL2': { raw: 787320, refined: 2361960 },
    'T8_ORE_LEVEL3': { raw: 2361960, refined: 7085880 },
    
    // Cuir
    'T2_HIDE': { raw: 135, refined: 270 },
    'T3_HIDE': { raw: 270, refined: 810 },
    'T4_HIDE': { raw: 810, refined: 2430 },
    'T4_HIDE_LEVEL1': { raw: 2430, refined: 7290 },
    'T4_HIDE_LEVEL2': { raw: 7290, refined: 21870 },
    'T4_HIDE_LEVEL3': { raw: 21870, refined: 65610 },
    'T5_HIDE': { raw: 2430, refined: 7290 },
    'T5_HIDE_LEVEL1': { raw: 7290, refined: 21870 },
    'T5_HIDE_LEVEL2': { raw: 21870, refined: 65610 },
    'T5_HIDE_LEVEL3': { raw: 65610, refined: 196830 },
    'T6_HIDE': { raw: 7290, refined: 21870 },
    'T6_HIDE_LEVEL1': { raw: 21870, refined: 65610 },
    'T6_HIDE_LEVEL2': { raw: 65610, refined: 196830 },
    'T6_HIDE_LEVEL3': { raw: 196830, refined: 590490 },
    'T7_HIDE': { raw: 21870, refined: 65610 },
    'T7_HIDE_LEVEL1': { raw: 65610, refined: 196830 },
    'T7_HIDE_LEVEL2': { raw: 196830, refined: 590490 },
    'T7_HIDE_LEVEL3': { raw: 590490, refined: 1771470 },
    'T8_HIDE': { raw: 65610, refined: 196830 },
    'T8_HIDE_LEVEL1': { raw: 196830, refined: 590490 },
    'T8_HIDE_LEVEL2': { raw: 590490, refined: 1771470 },
    'T8_HIDE_LEVEL3': { raw: 1771470, refined: 5314410 },
    
    // Fibre
    'T2_FIBER': { raw: 105, refined: 210 },
    'T3_FIBER': { raw: 210, refined: 630 },
    'T4_FIBER': { raw: 630, refined: 1890 },
    'T4_FIBER_LEVEL1': { raw: 1890, refined: 5670 },
    'T4_FIBER_LEVEL2': { raw: 5670, refined: 17010 },
    'T4_FIBER_LEVEL3': { raw: 17010, refined: 51030 },
    'T5_FIBER': { raw: 1890, refined: 5670 },
    'T5_FIBER_LEVEL1': { raw: 5670, refined: 17010 },
    'T5_FIBER_LEVEL2': { raw: 17010, refined: 51030 },
    'T5_FIBER_LEVEL3': { raw: 51030, refined: 153090 },
    'T6_FIBER': { raw: 5670, refined: 17010 },
    'T6_FIBER_LEVEL1': { raw: 17010, refined: 51030 },
    'T6_FIBER_LEVEL2': { raw: 51030, refined: 153090 },
    'T6_FIBER_LEVEL3': { raw: 153090, refined: 459270 },
    'T7_FIBER': { raw: 17010, refined: 51030 },
    'T7_FIBER_LEVEL1': { raw: 51030, refined: 153090 },
    'T7_FIBER_LEVEL2': { raw: 153090, refined: 459270 },
    'T7_FIBER_LEVEL3': { raw: 459270, refined: 1377810 },
    'T8_FIBER': { raw: 51030, refined: 153090 },
    'T8_FIBER_LEVEL1': { raw: 153090, refined: 459270 },
    'T8_FIBER_LEVEL2': { raw: 459270, refined: 1377810 },
    'T8_FIBER_LEVEL3': { raw: 1377810, refined: 4133430 }
};