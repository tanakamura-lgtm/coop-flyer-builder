/**
 * Coop Flyer Builder - Core Application Logic
 * Supports:
 * - 8 / 10 / 12 Item Grid Templates (Dynamic switching)
 * - Deleted Top Sub-Strip & 1.5x Expanded Sale Title Area (Never cuts off)
 * - 1.5x Larger Badge (16px) & Catchphrase Badge (15px, wraps at 10+ chars)
 * - 1.5x Larger Volume / Spec (19px, wraps to 2 lines at 7+ chars)
 * - Uncut 10x Banner on Right
 * - Reversed Top Bar: Left = Origin/Maker, Right = Badge
 * - Maximized Product Image area (eliminated dead margins, fit-cover/contain toggle)
 * - Enhanced Web Image Search (Open Food Facts + Wikimedia + Smart Auto-Matching)
 * - External Web Search helpers (Google / Yahoo direct links + Clipboard paste)
 * - 3x Mega Product Names & 2x Mega Price Digits (78px, 8% tax auto-calculation)
 * - Specified 4 Stores & Date Range (●月●日～●月●日)
 */

// ============================================================
// Comprehensive Food & Product Image Database (Smart Matching)
// ============================================================

const SMART_FOOD_DATABASE = [
  // Vegetables & Fruits
  { keywords: ['玉ねぎ', 'たまねぎ', 'タマネギ', '玉葱'], name: '北海道産 玉ねぎ', url: 'assets/presets/tamanegi.png', category: '青果' },
  { keywords: ['長ねぎ', 'ねぎ', 'ネギ', '白ねぎ'], name: '長ねぎ', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['みかん', 'ハウスみかん', '蜜柑', '柑橘'], name: 'ハウスみかん', url: 'assets/presets/mikan.png', category: '青果' },
  { keywords: ['ぶどう', '葡萄', 'ナガノパープル', 'シャインマスカット', 'マスカット'], name: 'ナガノパープル（ぶどう）', url: 'assets/presets/grape.png', category: '青果' },
  { keywords: ['トマト', 'ミニトマト'], name: 'トマト', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['キャベツ'], name: 'キャベツ', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['じゃがいも', '馬鈴薯', 'ポテト'], name: '北海道産 じゃがいも', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['にんじん', '人参'], name: 'にんじん', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['りんご', '林檎'], name: 'りんご', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80', category: '青果' },
  { keywords: ['バナナ'], name: 'バナナ', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80', category: '青果' },

  // Meat & Poultry
  { keywords: ['若鶏', '手羽元', '鶏肉', 'チキン', '鶏もも', 'とり'], name: '国産 若鶏手羽元', url: 'assets/presets/chicken.png', category: '精肉' },
  { keywords: ['シャウエッセン', 'ウインナー', 'ソーセージ'], name: '日本ハム シャウエッセン', url: 'assets/presets/schau_essen.png', category: '加工肉' },
  { keywords: ['牛肉', '牛', 'ステーキ', 'カルビ', '黒毛和牛'], name: '牛肉（カルビ・ステーキ）', url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=500&q=80', category: '精肉' },
  { keywords: ['豚肉', 'ロース', '豚バラ', 'ポーク'], name: '豚肉（ロース・バラ）', url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80', category: '精肉' },

  // Fish & Seafood
  { keywords: ['紅さけ', 'さけ', '鮭', 'サーモン', '定塩'], name: '定塩紅さけ', url: 'assets/presets/salmon.png', category: '鮮魚' },
  { keywords: ['まぐろ', 'きはだまぐろ', 'マグロ', '刺身'], name: 'きはだまぐろ刺身用', url: 'assets/presets/maguro.png', category: '鮮魚' },
  { keywords: ['えび', '海老', 'エビ'], name: '生食用 えび', url: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80', category: '鮮魚' },

  // Staples, Dairy, Groceries
  { keywords: ['米', 'お米', 'ななつぼし', 'ゆめぴりか', 'ごはん'], name: '北海道米 ななつぼし', url: 'assets/presets/rice.png', category: '米' },
  { keywords: ['キャノーラ油', '油', 'サラダ油', 'オイル', '日清'], name: '日清 キャノーラ油', url: 'assets/presets/canola_oil.png', category: '調味料' },
  { keywords: ['十六茶', 'お茶', '緑茶', '綾鷹', '伊右衛門'], name: 'アサヒ 十六茶', url: 'assets/presets/tea.png', category: '飲料' },
  { keywords: ['バター', '生協バター', 'マーガリン'], name: 'コープ 生協バター', url: 'assets/presets/coop_butter.png', category: '日配' },
  { keywords: ['卵', 'たまご', '玉子'], name: '新鮮たまご（10個入）', url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80', category: '日配' },
  { keywords: ['牛乳', 'ミルク'], name: '北海道牛乳（1000ml）', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80', category: '日配' },
  { keywords: ['豆腐', 'とうふ'], name: '絹ごし豆腐', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', category: '日配' },
  { keywords: ['ビール', '金麦', 'クリアアサヒ', 'スーパードライ'], name: '生ビール / 発泡酒', url: 'https://images.unsplash.com/photo-1608270102604-585a6a6fa3ea?auto=format&fit=crop&w=500&q=80', category: '酒類' }
];

// 12 Full Preset Items
const INITIAL_FLYER_DATA = {
  gridCount: 8, // 8, 10, or 12
  header: {
    saleTitle: '今週のお買い得！！',
    titleTheme: 'theme-gold', // 'theme-gold', 'theme-red', 'theme-pink', 'theme-blue', 'theme-white'
    startDate: '2026-09-06',
    endDate: '2026-09-08',
    dateRangeText: '9月6日(日)～9月8日(火)',
    rightBox: {
      type: 'banner', // 'banner' or 'custom'
      imageUrl: 'assets/point10x_box.png',
      tagText: '毎週土日',
      mainText: 'ポイント10倍！',
      subText: '※一部対象外商品がございます',
      themeColor: 'gold' // 'gold', 'red', 'pink', 'blue'
    }
  },
  stores: [
    { name: 'パセオ堺町店', hours: '通常あさ9時からよる9時まで営業', tel: '☎0146-22-1511' },
    { name: 'えりも店', hours: '通常あさ9時からよる8時まで営業', tel: '☎01466-2-2342' },
    { name: '東町店', hours: '通常あさ10時からよる7時まで営業', tel: '☎0146-22-0001' },
    { name: '様似店', hours: '通常あさ9時からよる8時まで営業', tel: '☎0146-36-4551' }
  ],
  items: [
    {
      id: 1,
      title: '玉ねぎ',
      origin: '北海道産',
      volume: '2Lサイズ・1本',
      catchCopy: '入荷状況により他産地に変更になる場合があります',
      priceHontai: 96,
      priceTax: 104,
      unit: '各',
      badge: '',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/tamanegi.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 2,
      title: 'シャウエッセン',
      origin: '日本ハム',
      volume: '117g×2',
      catchCopy: 'パリッ!!としたおいしさ',
      priceHontai: 379,
      priceTax: 409,
      unit: '',
      badge: '',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/schau_essen.png',
      imgFit: 'fit-contain',
      zoom: 105,
      posY: 0
    },
    {
      id: 3,
      title: 'ナガノパープル',
      origin: '長野産・種なし',
      volume: '300g・1パック',
      catchCopy: '',
      priceHontai: 999,
      priceTax: 1079,
      unit: '',
      badge: '数量限定',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/grape.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 4,
      title: '定塩紅さけ',
      origin: '原料原産地ロシア',
      volume: '4切',
      catchCopy: '',
      priceHontai: 699,
      priceTax: 755,
      unit: '',
      badge: '原料原産地ロシア',
      customBadge: '',
      border: 'border-cyan',
      image: 'assets/presets/salmon.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 5,
      title: 'ななつぼしブレンド',
      origin: '北海道米 100%',
      volume: '5kg',
      catchCopy: '',
      priceHontai: 2290,
      priceTax: 2473,
      unit: '',
      badge: 'お1人様2点限り',
      customBadge: '',
      border: 'border-gold',
      image: 'assets/presets/rice.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 6,
      title: 'ハウスみかん',
      origin: '佐賀産',
      volume: '3Sサイズ・6玉・1パック',
      catchCopy: '',
      priceHontai: 499,
      priceTax: 539,
      unit: '',
      badge: '数量限定',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/mikan.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 7,
      title: '若鶏手羽元',
      origin: '国内産',
      volume: '100g当り',
      catchCopy: '一部解凍品を含みます',
      priceHontai: 69,
      priceTax: 75,
      unit: '',
      badge: '',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/chicken.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 8,
      title: 'きはだまぐろ',
      origin: '刺身用・解凍',
      volume: '100g当り',
      catchCopy: '',
      priceHontai: 359,
      priceTax: 388,
      unit: '',
      badge: '',
      customBadge: '',
      border: 'border-cyan',
      image: 'assets/presets/maguro.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 9,
      title: '十六茶',
      origin: 'アサヒ',
      volume: '2L・1本',
      catchCopy: '16素材とからだにいいこと',
      priceHontai: 99,
      priceTax: 107,
      unit: '',
      badge: '',
      customBadge: '',
      border: 'border-green',
      image: 'assets/presets/tea.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 10,
      title: 'キャノーラ油',
      origin: '日清',
      volume: '900g',
      catchCopy: 'お1人様2点限り',
      priceHontai: 299,
      priceTax: 323,
      unit: '',
      badge: 'お1人様2点限り',
      customBadge: '',
      border: 'border-pink',
      image: 'assets/presets/canola_oil.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 11,
      title: '生協バター',
      origin: 'コープ',
      volume: '150g',
      catchCopy: '北海道で製造したバターです',
      priceHontai: 329,
      priceTax: 355,
      unit: '',
      badge: '数量限定',
      customBadge: '',
      border: 'border-cyan',
      image: 'assets/presets/coop_butter.png',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    },
    {
      id: 12,
      title: '金麦糖質75%オフ',
      origin: 'サントリー',
      volume: '350ml・24缶入・1ケース',
      catchCopy: 'お酒は20歳になってから',
      priceHontai: 3090,
      priceTax: 3339,
      unit: '',
      badge: 'おすすめポイント+150pt',
      customBadge: '',
      border: 'border-gold',
      image: 'https://images.unsplash.com/photo-1608270102604-585a6a6fa3ea?auto=format&fit=crop&w=500&q=80',
      imgFit: 'fit-contain',
      zoom: 100,
      posY: 0
    }
  ]
};

// Current Working State
let flyerState = JSON.parse(JSON.stringify(INITIAL_FLYER_DATA));
let activeItemId = 1;
let currentZoom = 0.85;

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('coop_flyer_state_v5');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.items && parsed.items.length >= 8) {
        flyerState = parsed;
        if (!flyerState.gridCount) flyerState.gridCount = 8;
        if (!flyerState.header) flyerState.header = { ...INITIAL_FLYER_DATA.header };
        if (!flyerState.header.titleTheme) {
          flyerState.header.titleTheme = 'theme-gold';
        }
        if (!flyerState.header.rightBox) {
          flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
        }
      }
    }
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('coop_flyer_state_v5', JSON.stringify(flyerState));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// ============================================================
// Formatting Helpers: Volume, Catchphrase, Period
// ============================================================

function formatVolumeHtml(volumeStr) {
  if (!volumeStr) return '';
  const str = String(volumeStr).trim();
  if (str.length <= 6) {
    return escapeHtml(str);
  }

  const sepIdx = str.indexOf('・');
  if (sepIdx >= 2 && sepIdx <= 7) {
    const part1 = str.substring(0, sepIdx + 1);
    const part2 = str.substring(sepIdx + 1);
    return `${escapeHtml(part1)}<br>${escapeHtml(part2)}`;
  }

  const part1 = str.substring(0, 6);
  const part2 = str.substring(6);
  return `${escapeHtml(part1)}<br>${escapeHtml(part2)}`;
}

/**
 * 🌟 Formats Catchphrase:
 * If 10+ characters, breaks into multiple lines neatly.
 */
function formatCatchCopyHtml(catchStr) {
  if (!catchStr) return '';
  const str = String(catchStr).trim();
  if (str.length <= 10) {
    return escapeHtml(str);
  }

  // Look for comma, space or break at 10-12 chars
  const commaIdx = str.indexOf('、');
  if (commaIdx >= 5 && commaIdx <= 14) {
    const p1 = str.substring(0, commaIdx + 1);
    const p2 = str.substring(commaIdx + 1);
    return `${escapeHtml(p1)}<br>${escapeHtml(p2)}`;
  }

  // Break at 10th char
  const p1 = str.substring(0, 10);
  const p2 = str.substring(10);
  return `${escapeHtml(p1)}<br>${escapeHtml(p2)}`;
}

// ============================================================
// Product Title Formatter (9文字までは1行、10文字以上は自動で2段表示に分割)
// ============================================================

function splitProductTitle(title) {
  if (!title) return ['商品名'];
  const str = String(title).trim();
  if (str.includes('\n')) {
    const parts = str.split('\n').map(s => s.trim()).filter(Boolean);
    return parts.length ? parts : [str];
  }

  // 🌟 9文字以下ならスペースや記号があっても必ず1行のまま表示（同じフォントサイズを維持）
  if (str.length <= 9) {
    return [str];
  }

  const len = str.length;

  // 1. スペース（半角・全角）での分割
  const spaceMatch = str.search(/[\s　]/);
  if (spaceMatch >= 2 && spaceMatch <= len - 2) {
    return [str.substring(0, spaceMatch).trim(), str.substring(spaceMatch + 1).trim()];
  }

  // 2. 記号（中黒・カッコ・スラッシュ等）での分割
  const symbolRules = [
    { char: '・', after: true },
    { char: '＆', after: true },
    { char: '&', after: true },
    { char: '＋', after: true },
    { char: '+', after: true },
    { char: '（', after: false },
    { char: '(', after: false },
    { char: '【', after: false },
    { char: '[', after: false },
    { char: '／', after: true },
    { char: '/', after: true }
  ];

  for (const rule of symbolRules) {
    const idx = str.indexOf(rule.char);
    if (idx >= 2 && idx <= len - 2) {
      if (rule.after) {
        return [str.substring(0, idx + 1).trim(), str.substring(idx + 1).trim()];
      } else {
        return [str.substring(0, idx).trim(), str.substring(idx).trim()];
      }
    }
  }

  // 行頭禁則文字（2行目の先頭に来てはいけない文字）
  const gyotoKinsoku = ['ー', 'ッ', 'っ', 'ゃ', 'ゅ', 'ょ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', '・', '）', ')', '】', ']', '、', '。'];

  // 3. 文字種の変わり目（ひらがな、カタカナ、漢字、英数）での分割
  function getCharType(ch) {
    if (/[\u3040-\u309F]/.test(ch)) return 'hira';
    if (/[\u30A0-\u30FF]/.test(ch)) return 'kata';
    if (/[\u4E00-\u9FFF]/.test(ch)) return 'kanji';
    if (/[0-9a-zA-Z%％]/.test(ch)) return 'alphanum';
    return 'other';
  }

  let bestTypeBreak = -1;
  let minDiff = 999;
  const half = len / 2;

  for (let i = 2; i < len - 2; i++) {
    const prevCh = str[i - 1];
    const currCh = str[i];
    if (gyotoKinsoku.includes(currCh)) continue;
    if (prevCh === 'ー') continue;

    const t1 = getCharType(prevCh);
    const t2 = getCharType(currCh);

    if (t1 !== t2 && t1 !== 'other' && t2 !== 'other') {
      const diff = Math.abs(i - half);
      if (diff < minDiff) {
        minDiff = diff;
        bestTypeBreak = i;
      }
    }
  }

  if (bestTypeBreak !== -1 && minDiff <= 2.5) {
    return [str.substring(0, bestTypeBreak).trim(), str.substring(bestTypeBreak).trim()];
  }

  // 4. 文字数中央での分割（禁則処理を考慮）
  let splitPos = Math.ceil(len / 2);
  if (len === 7) splitPos = 4; // 7文字なら 4/3 または 3/4

  // 2行目の先頭が禁則文字の場合は前後にずらす
  if (gyotoKinsoku.includes(str[splitPos])) {
    if (splitPos > 2 && !gyotoKinsoku.includes(str[splitPos - 1])) {
      splitPos--;
    } else if (splitPos + 1 < len) {
      splitPos++;
    }
  }

  while (splitPos < len - 1 && gyotoKinsoku.includes(str[splitPos])) {
    splitPos++;
  }

  return [str.substring(0, splitPos).trim(), str.substring(splitPos).trim()];
}

function formatPeriodText(startStr, endStr) {
  if (!startStr) return '';
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const d1 = new Date(startStr + 'T00:00:00');
  const m1 = d1.getMonth() + 1;
  const day1 = d1.getDate();
  const w1 = weekdays[d1.getDay()];

  if (!endStr || startStr === endStr) {
    return `${m1}月${day1}日(${w1})限り`;
  }

  const d2 = new Date(endStr + 'T00:00:00');
  const m2 = d2.getMonth() + 1;
  const day2 = d2.getDate();
  const w2 = weekdays[d2.getDay()];

  if (m1 === m2) {
    return `${m1}月${day1}日(${w1})～${day2}日(${w2})`;
  } else {
    return `${m1}月${day1}日(${w1})～${m2}月${day2}日(${w2})`;
  }
}

// ============================================================
// DOM Elements
// ============================================================

const dom = {
  tabBtns: document.querySelectorAll('.editor-tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  
  gridOptBtns: document.querySelectorAll('.grid-opt-btn'),
  itemSelectorContainer: document.getElementById('item-selector-container'),
  activeItemTitleLabel: document.getElementById('active-item-title-label'),
  activeItemSubLabel: document.getElementById('active-item-sub-label'),

  inputProductName: document.getElementById('input-product-name'),
  btnQuickWebSearch: document.getElementById('btn-quick-web-search'),
  inputOriginMaker: document.getElementById('input-origin-maker'),
  inputVolume: document.getElementById('input-volume'),
  inputPriceHontai: document.getElementById('input-price-hontai'),
  inputPriceTax: document.getElementById('input-price-tax'),
  inputPriceUnit: document.getElementById('input-price-unit'),
  inputBadge: document.getElementById('input-badge'),
  groupCustomBadge: document.getElementById('group-custom-badge'),
  inputCustomBadge: document.getElementById('input-custom-badge'),
  inputCatchcopy: document.getElementById('input-catchcopy'),
  inputCardBorder: document.getElementById('input-card-border'),
  inputImgFit: document.getElementById('input-img-fit'),
  editorImagePreview: document.getElementById('editor-image-preview'),
  btnOpenWebSearch: document.getElementById('btn-open-web-search'),
  btnOpenPresets: document.getElementById('btn-open-presets'),
  inputLocalImage: document.getElementById('input-local-image'),
  inputImageUrl: document.getElementById('input-image-url'),
  btnApplyImageUrl: document.getElementById('btn-apply-image-url'),
  btnPasteClipboard: document.getElementById('btn-paste-clipboard'),
  inputImgZoom: document.getElementById('input-img-zoom'),
  inputImgPosY: document.getElementById('input-img-pos-y'),

  inputSaleTitle: document.getElementById('input-sale-title'),
  selectTitleBgTheme: document.getElementById('select-title-bg-theme'),
  inputStartDate: document.getElementById('input-start-date'),
  inputEndDate: document.getElementById('input-end-date'),
  inputDateRangeText: document.getElementById('input-date-range-text'),

  // Right Box Editor controls
  sectionRightBoxEditor: document.getElementById('section-right-box-editor'),
  inputRightBoxType: document.getElementById('input-rightbox-type'),
  groupRightBoxBanner: document.getElementById('group-rightbox-banner'),
  btnPresetRightBox10x: document.getElementById('btn-preset-rightbox-10x'),
  inputRightBoxLocalImage: document.getElementById('input-rightbox-local-image'),
  inputRightBoxImageUrl: document.getElementById('input-rightbox-image-url'),
  groupRightBoxCustom: document.getElementById('group-rightbox-custom'),
  inputRightBoxTag: document.getElementById('input-rightbox-tag'),
  inputRightBoxMain: document.getElementById('input-rightbox-main'),
  inputRightBoxSub: document.getElementById('input-rightbox-sub'),
  inputRightBoxTheme: document.getElementById('input-rightbox-theme'),

  store1Hours: document.getElementById('store-1-hours'),
  store1Tel: document.getElementById('store-1-tel'),
  store2Hours: document.getElementById('store-2-hours'),
  store2Tel: document.getElementById('store-2-tel'),
  store3Hours: document.getElementById('store-3-hours'),
  store3Tel: document.getElementById('store-3-tel'),
  store4Hours: document.getElementById('store-4-hours'),
  store4Tel: document.getElementById('store-4-tel'),

  flyerContainer: document.getElementById('flyer-container'),
  flyerSheet: document.getElementById('flyer-sheet'),
  headerCenterTitleArea: document.getElementById('header-center-title-area'),
  flyerSaleTitleVal: document.getElementById('flyer-sale-title-val'),
  flyerRightBox: document.getElementById('flyer-right-box'),
  flyerDateRangeVal: document.getElementById('flyer-date-range-val'),
  flyerItemsGrid: document.getElementById('flyer-items-grid'),
  flyerStore1Hours: document.getElementById('flyer-store-1-hours'),
  flyerStore1Tel: document.getElementById('flyer-store-1-tel'),
  flyerStore2Hours: document.getElementById('flyer-store-2-hours'),
  flyerStore2Tel: document.getElementById('flyer-store-2-tel'),
  flyerStore3Hours: document.getElementById('flyer-store-3-hours'),
  flyerStore3Tel: document.getElementById('flyer-store-3-tel'),
  flyerStore4Hours: document.getElementById('flyer-store-4-hours'),
  flyerStore4Tel: document.getElementById('flyer-store-4-tel'),

  btnLoadSample: document.getElementById('btn-load-sample'),
  btnSaveJson: document.getElementById('btn-save-json'),
  inputLoadJson: document.getElementById('input-load-json'),
  btnExportPdf: document.getElementById('btn-export-pdf'),
  btnExportPng: document.getElementById('btn-export-png'),
  btnPrint: document.getElementById('btn-print'),

  btnZoomIn: document.getElementById('btn-zoom-in'),
  btnZoomOut: document.getElementById('btn-zoom-out'),
  btnZoomReset: document.getElementById('btn-zoom-reset'),
  btnZoomFit: document.getElementById('btn-zoom-fit'),
  zoomValueLabel: document.getElementById('zoom-value-label'),

  imageModal: document.getElementById('image-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalSearchInput: document.getElementById('modal-search-input'),
  btnModalDoSearch: document.getElementById('btn-modal-do-search'),
  modalImageGrid: document.getElementById('modal-image-grid'),
  modalStatusText: document.getElementById('modal-status-text'),
  btnTabModalSmart: document.getElementById('btn-tab-modal-smart'),
  btnTabModalWeb: document.getElementById('btn-tab-modal-web'),
  btnTabModalPresets: document.getElementById('btn-tab-modal-presets'),
  linkGoogleImages: document.getElementById('link-google-images'),
  linkYahooImages: document.getElementById('link-yahoo-images')
};

// ============================================================
// Initialization
// ============================================================

function init() {
  loadFromLocalStorage();
  buildItemSelectorButtons();
  populateEditorForm();
  renderFlyer();
  setupEventListeners();
  updateZoomDisplay();
}

// ============================================================
// Text Splitting Helper for 2-Tier Headers & POP Titles
// ============================================================

function splitIntoTwoLines(str) {
  if (!str) return [''];
  if (str.includes('\n')) {
    const parts = str.split('\n').map(s => s.trim()).filter(Boolean);
    return parts.length ? parts : [str];
  }
  const cleanStr = str.trim();

  // 🌟 「今週の」「本日の」「週末の」等のプレフィックスがある場合、確実に上段・下段に分割
  const prefixMatches = ['今週の', '本日の', '週末の', '日替わり', '日替り', '月間', '火曜市', '水曜市', '木曜市', '金曜市', '土曜市', '日曜市'];
  for (const p of prefixMatches) {
    if (cleanStr.startsWith(p)) {
      const rest = cleanStr.substring(p.length).trim();
      if (rest) {
        return [p, rest];
      }
    }
  }

  // 🌟 「〜のお買い得」「〜の大特価」などの「の」で区切るパターン
  const noIdx = cleanStr.indexOf('の');
  if (noIdx >= 1 && noIdx <= 5 && cleanStr.length >= 5) {
    const p1 = cleanStr.substring(0, noIdx + 1).trim();
    const p2 = cleanStr.substring(noIdx + 1).trim();
    if (p2) return [p1, p2];
  }

  const len = cleanStr.length;
  if (len < 6) return [cleanStr];

  // Try to find natural breaking points near the center
  const mid = Math.floor(len / 2);
  const breakChars = ['！', '!', '・', '、', '　', ' ', '＆', '&', 'セール', 'まつり', '祭'];
  let bestBreak = -1;
  let minDistance = 999;

  for (let i = 2; i < len - 2; i++) {
    const char = cleanStr[i];
    if (breakChars.includes(char)) {
      const dist = Math.abs(i - mid);
      if (dist < minDistance) {
        minDistance = dist;
        bestBreak = i + 1; // split right after the punctuation
      }
    }
  }

  if (bestBreak > 0 && bestBreak < len) {
    return [cleanStr.substring(0, bestBreak).trim(), cleanStr.substring(bestBreak).trim()];
  }

  // Fallback: split near middle if 8+ chars
  if (len >= 8) {
    return [cleanStr.substring(0, mid).trim(), cleanStr.substring(mid).trim()];
  }

  return [cleanStr];
}

// ============================================================
// Auto-Fit Sale Title to Container (Maximize font size dynamically)
// ============================================================

function autoFitSaleTitle() {
  if (!dom.flyerSaleTitleVal || !dom.headerCenterTitleArea) return;
  const rawTitle = flyerState.header.saleTitle || '今週のお買い得！！';

  // Apply Background Theme
  const theme = flyerState.header.titleTheme || 'theme-gold';
  dom.headerCenterTitleArea.className = `header-center-title-area ${theme}`;

  // Check if title should be rendered as 2 tiers (or explicit newline / split)
  const lines = splitIntoTwoLines(rawTitle);
  const isMulti = lines.length > 1;

  // Measure available container dimensions
  const container = dom.headerCenterTitleArea;
  const containerWidth = container.clientWidth || 380;
  const containerHeight = container.clientHeight || 136;

  // Leave safety margin for padding, border lines, and italic slant/skew
  const maxAvailableWidth = Math.max(100, containerWidth - 20);
  const maxAvailableHeight = Math.max(60, containerHeight - 10);

  if (isMulti) {
    dom.flyerSaleTitleVal.classList.add('multiline-title');
    // 🌟 各行を .title-line で囲み、white-space: nowrap で3段への勝手な折り返しを物理的に絶対禁止！
    dom.flyerSaleTitleVal.innerHTML = lines
      .map(line => `<span class="title-line">${escapeHtml(line)}</span>`)
      .join('');

    // 🌟 ユーザー要望: 現状(36px)の1.5倍くらい(50〜54px)で大迫力かつ枠内にしっかり収める
    let low = 44;
    let high = 56;
    let bestSize = 52;

    dom.flyerSaleTitleVal.style.transform = 'none';

    for (let i = 0; i < 7; i++) {
      const mid = Math.floor((low + high) / 2);
      dom.flyerSaleTitleVal.style.fontSize = mid + 'px';

      // 各行の transform を一旦リセット
      const spans = dom.flyerSaleTitleVal.querySelectorAll('.title-line');
      spans.forEach(s => s.style.transform = 'none');

      const totalH = dom.flyerSaleTitleVal.scrollHeight;

      if (totalH <= maxAvailableHeight) {
        bestSize = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    dom.flyerSaleTitleVal.style.fontSize = bestSize + 'px';

    // 🌟 横幅フィット処理：各行をチェックし、もし横幅をオーバーしていればその行に長体（scaleX）をかける
    const spans = dom.flyerSaleTitleVal.querySelectorAll('.title-line');
    spans.forEach(span => {
      span.style.transform = 'none';
      const w = span.scrollWidth;
      if (w > maxAvailableWidth) {
        const scaleX = Math.max(0.68, (maxAvailableWidth / w) * 0.98);
        span.style.transform = `scaleX(${scaleX})`;
        span.style.transformOrigin = 'center center';
      } else {
        span.style.transform = 'none';
      }
    });

    // タイトル全体のPOPスタイル（力強い迫力と上品な傾斜）
    dom.flyerSaleTitleVal.style.transform = 'scaleY(1.05) skewX(-2deg)';
  } else {
    // 1行タイトルの場合
    dom.flyerSaleTitleVal.classList.remove('multiline-title');
    dom.flyerSaleTitleVal.textContent = rawTitle;
    dom.flyerSaleTitleVal.style.transform = 'none';

    let low = 36;
    let high = 68;
    let bestSize = 58;

    for (let i = 0; i < 9; i++) {
      const mid = Math.floor((low + high) / 2);
      dom.flyerSaleTitleVal.style.fontSize = mid + 'px';

      const w = dom.flyerSaleTitleVal.scrollWidth;
      const h = dom.flyerSaleTitleVal.scrollHeight;

      if (w <= maxAvailableWidth && h <= maxAvailableHeight) {
        bestSize = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    dom.flyerSaleTitleVal.style.fontSize = bestSize + 'px';

    const finalW = dom.flyerSaleTitleVal.scrollWidth;
    if (finalW > maxAvailableWidth) {
      const scaleX = Math.max(0.68, (maxAvailableWidth / finalW) * 0.98);
      dom.flyerSaleTitleVal.style.transform = `scaleY(1.05) skewX(-2deg) scaleX(${scaleX})`;
    } else {
      dom.flyerSaleTitleVal.style.transform = 'scaleY(1.05) skewX(-2deg)';
    }
  }
}

// ============================================================
// Render Right Box (Banner Image or Custom POP Notice)
// ============================================================

function renderRightBox() {
  if (!dom.flyerRightBox) return;
  const rb = flyerState.header.rightBox || INITIAL_FLYER_DATA.header.rightBox;

  if (rb.type === 'custom') {
    const theme = rb.themeColor || 'gold';
    const tag = rb.tagText || 'お得情報';
    const main = rb.mainText || 'ポイント10倍！';
    const sub = rb.subText || '';

    // If 8+ chars or contains newline, display in 2 lines
    const isMainMulti = main.length >= 8 || main.includes('\n');
    let mainHtml = '';
    if (isMainMulti) {
      const parts = splitIntoTwoLines(main);
      mainHtml = parts.map(escapeHtml).join('<br>');
    } else {
      mainHtml = escapeHtml(main);
    }

    dom.flyerRightBox.className = 'header-right-box';
    dom.flyerRightBox.innerHTML = `
      <div class="right-box-custom-container right-box-theme-${escapeHtml(theme)}">
        ${tag ? `<div class="right-box-custom-tag">${escapeHtml(tag)}</div>` : ''}
        <div class="right-box-custom-main ${isMainMulti ? 'multiline' : ''}">${mainHtml}</div>
        ${sub ? `<div class="right-box-custom-sub">${escapeHtml(sub)}</div>` : ''}
      </div>
    `;

    autoFitRightBox();
  } else {
    // Banner image
    const imgUrl = rb.imageUrl || 'assets/point10x_box.png';
    dom.flyerRightBox.className = 'header-right-box';
    dom.flyerRightBox.innerHTML = `
      <img src="${escapeHtml(imgUrl)}" alt="右側バナー" class="right-box-banner-img">
    `;
  }
}

// 🌟 Auto-Fit Right Box Elements (Tag, Main text, Sub text/dates)
function autoFitRightBox() {
  if (!dom.flyerRightBox) return;
  const container = dom.flyerRightBox;
  const maxW = Math.max(80, (container.clientWidth || 210) - 12);

  // Sub text / date (e.g. 早期割引 12/1（火）まで)
  const subEl = container.querySelector('.right-box-custom-sub');
  if (subEl) {
    subEl.style.transform = 'none';
    const curW = subEl.scrollWidth;
    if (curW > maxW) {
      const scale = Math.max(0.65, maxW / curW);
      subEl.style.transform = `scaleX(${scale})`;
      subEl.style.transformOrigin = 'center center';
    }
  }

  // Tag
  const tagEl = container.querySelector('.right-box-custom-tag');
  if (tagEl) {
    tagEl.style.transform = 'none';
    const curW = tagEl.scrollWidth;
    if (curW > maxW) {
      const scale = Math.max(0.65, maxW / curW);
      tagEl.style.transform = `scaleX(${scale})`;
      tagEl.style.transformOrigin = 'center center';
    }
  }

  // Main text
  const mainEl = container.querySelector('.right-box-custom-main');
  if (mainEl) {
    const isMulti = mainEl.classList.contains('multiline');
    mainEl.style.transform = isMulti ? 'scaleY(1.04)' : 'scaleY(1.08)';
    const curW = mainEl.scrollWidth;
    if (curW > maxW) {
      const scale = Math.max(0.65, maxW / curW);
      mainEl.style.transform = `${isMulti ? 'scaleY(1.04)' : 'scaleY(1.08)'} scaleX(${scale})`;
      mainEl.style.transformOrigin = 'center center';
    }
  }
}

// ============================================================
// Auto-Fit Date Range to Container (Never overflow or cut off date)
// ============================================================

function autoFitDateRange() {
  if (!dom.flyerDateRangeVal) return;
  const el = dom.flyerDateRangeVal;
  const container = el.parentElement;
  if (!container) return;

  // Reset transform and size first to measure accurately
  el.style.transform = 'none';
  el.style.fontSize = '';

  const maxW = Math.max(80, (container.clientWidth || 210) - 8);
  const text = (el.textContent || '').trim();
  const textLen = text.length;

  // Dynamically adapt base font size based on character count
  let baseFontSize = 17;
  if (textLen >= 17) {
    baseFontSize = 13.5;
  } else if (textLen >= 15) {
    baseFontSize = 14.5;
  } else if (textLen >= 13) {
    baseFontSize = 15.5;
  } else if (textLen >= 11) {
    baseFontSize = 16.5;
  }
  el.style.fontSize = `${baseFontSize}px`;

  // Fine scale if it still slightly overflows container
  const currentW = el.scrollWidth;
  if (currentW > maxW) {
    const scale = Math.max(0.68, maxW / currentW);
    el.style.transform = `scaleY(1.05) scaleX(${scale})`;
    el.style.transformOrigin = 'center center';
  } else {
    el.style.transform = 'scaleY(1.05)';
    el.style.transformOrigin = 'center center';
  }
}

// Helper to fit all header components
function fitAllHeaderElements() {
  autoFitSaleTitle();
  autoFitDateRange();
  autoFitRightBox();
}

// ============================================================
// Render Logic: Flyer Preview
// ============================================================

function renderFlyer() {
  const currentCount = flyerState.gridCount || 8;

  // 1. Update Header: Date Range
  dom.flyerDateRangeVal.textContent = flyerState.header.dateRangeText || '9月6日(日)～9月8日(火)';

  // 2. Update Header: Right Box
  renderRightBox();

  // 3. Auto-fit all header components (Sale title, Date range, Right box)
  fitAllHeaderElements();

  // 4. Set Grid Template Class: 8, 10, or 12
  dom.flyerItemsGrid.className = `flyer-grid-${currentCount}`;
  dom.flyerItemsGrid.innerHTML = '';

  // Render items up to currentCount
  const displayItems = flyerState.items.slice(0, currentCount);

  displayItems.forEach((item) => {
    const isSelected = item.id === activeItemId;
    const card = document.createElement('div');
    card.className = `flyer-item-card ${item.border || 'border-pink'}${isSelected ? ' is-selected' : ''}`;
    card.dataset.id = item.id;

    card.addEventListener('click', () => {
      setActiveItem(item.id);
    });

    // 🌟 REVERSED: Origin/Maker on LEFT, Badge on RIGHT
    let originHtml = '';
    if (item.origin) {
      originHtml = `<span class="item-origin-maker">${escapeHtml(item.origin)}</span>`;
    }

    // 🌟 BADGE: 1.5x larger (16px)
    let badgeHtml = '';
    const badgeText = item.badge === 'カスタム' ? item.customBadge : item.badge;
    if (badgeText) {
      let badgeClass = 'item-badge-pill';
      if (badgeText.includes('ポイント')) badgeClass += ' badge-point';
      else if (badgeText.includes('限り') || badgeText.includes('限定')) badgeClass += ' badge-limit';
      else if (badgeText.includes('ロシア') || badgeText.includes('産')) badgeClass += ' badge-special';
      badgeHtml = `<span class="${badgeClass}">${escapeHtml(badgeText)}</span>`;
    }

    // 🌟 CATCHPHRASE: Placed below Badge, 1.5x larger, wraps at 10+ chars
    let catchHtml = '';
    if (item.catchCopy) {
      catchHtml = `
        <div class="item-top-row-catch">
          <span class="item-catch-badge">${formatCatchCopyHtml(item.catchCopy)}</span>
        </div>
      `;
    }

    // 🌟 MEGA PRICE Display (78px)
    const rawPrice = item.priceHontai != null && item.priceHontai !== '' ? Number(item.priceHontai) : null;
    const formattedPrice = rawPrice != null ? rawPrice.toLocaleString() : '---';
    const formattedTax = item.priceTax != null && item.priceTax !== '' ? Number(item.priceTax).toLocaleString() : '---';
    const unitHtml = item.unit ? `<span class="price-unit-tag">${escapeHtml(item.unit)}</span>` : '';
    const priceDigitsClass = (rawPrice != null && rawPrice >= 1000) ? 'price-digits four-digits' : 'price-digits';

    // 🌟 Image Transform & Fit Mode
    const zoomScale = (item.zoom || 100) / 100;
    const posY = item.posY || 0;
    const imgStyle = `transform: scale(${zoomScale}) translateY(${posY}px);`;
    const fitClass = item.imgFit === 'fit-cover' ? 'item-photo fit-cover' : 'item-photo';

    // 🌟 3x MEGA PRODUCT TITLE (7文字以上は2段表示に分割)
    const titleParts = splitProductTitle(item.title);
    const isMultiTitle = titleParts.length > 1;
    const titleHtml = titleParts.map(escapeHtml).join('<br>');
    const titleClass = isMultiTitle ? 'item-title-text two-tier-title' : 'item-title-text';

    // 🌟 VOLUME / SPEC: 1.5x larger (19px), 6 chars max per line, 2-tier wrap
    const volumeFormattedHtml = formatVolumeHtml(item.volume);

    card.innerHTML = `
      <!-- Top Section: Left=Origin, Right=Badge, and Catchphrase below Badge -->
      <div class="item-card-top-section">
        <div class="item-top-row-1">
          <div>${originHtml}</div>
          <div>${badgeHtml}</div>
        </div>
        ${catchHtml}
      </div>

      <!-- 🌟 MEGA Product Name (~3x larger, 7文字以上は2段表示) -->
      <div class="item-title-banner">
        <h3 class="${titleClass}" title="${escapeHtml(item.title || '')}">${titleHtml}</h3>
      </div>

      <!-- Main Body: Image (Left, maximized) + Mega Price & Volume (Right) -->
      <div class="item-card-inner">
        <!-- Image Column -->
        <div class="item-image-col">
          <img src="${item.image || 'assets/presets/tamanegi.png'}" alt="${escapeHtml(item.title)}" class="${fitClass}" style="${imgStyle}">
        </div>

        <!-- Info & 🌟 MEGA Price Column -->
        <div class="item-info-col">
          <div>
            <div class="item-volume-text">${volumeFormattedHtml}</div>
          </div>

          <!-- 🌟 MEGA Price Block (2x larger digits: 78px) -->
          <div class="item-price-block">
            <div class="price-main-row">
              <span class="price-hontai-tag">本体</span>
              ${unitHtml}
              <span class="${priceDigitsClass}">${formattedPrice}</span>
              <span class="price-yen-mark">円</span>
            </div>
            <div class="price-tax-box">
              （税込${item.unit ? escapeHtml(item.unit) : ''}<span class="val">${formattedTax}</span>円）
            </div>
          </div>
        </div>
      </div>
    `;

    dom.flyerItemsGrid.appendChild(card);
  });

  // 3. Update Stores
  if (flyerState.stores && flyerState.stores.length >= 4) {
    dom.flyerStore1Hours.textContent = flyerState.stores[0].hours;
    dom.flyerStore1Tel.textContent = flyerState.stores[0].tel;
    dom.flyerStore2Hours.textContent = flyerState.stores[1].hours;
    dom.flyerStore2Tel.textContent = flyerState.stores[1].tel;
    dom.flyerStore3Hours.textContent = flyerState.stores[2].hours;
    dom.flyerStore3Tel.textContent = flyerState.stores[2].tel;
    dom.flyerStore4Hours.textContent = flyerState.stores[3].hours;
    dom.flyerStore4Tel.textContent = flyerState.stores[3].tel;
  }

  updateItemSelectorButtons();
}

// ============================================================
// Item Selector Buttons (Dynamic according to gridCount: 8, 10, or 12)
// ============================================================

function buildItemSelectorButtons() {
  const currentCount = flyerState.gridCount || 8;
  dom.itemSelectorContainer.innerHTML = '';
  
  for (let i = 0; i < currentCount; i++) {
    const item = flyerState.items[i];
    if (!item) continue;
    const btn = document.createElement('button');
    btn.className = `item-select-btn ${item.id === activeItemId ? 'active' : ''}`;
    btn.dataset.id = item.id;
    btn.innerHTML = `
      <span class="badge-num">コマ ${item.id}</span>
      <span class="item-name-preview" id="selector-name-${item.id}">${escapeHtml(item.title || '未設定')}</span>
    `;
    btn.addEventListener('click', () => {
      setActiveItem(item.id);
    });
    dom.itemSelectorContainer.appendChild(btn);
  }
}

function updateItemSelectorButtons() {
  const currentCount = flyerState.gridCount || 8;
  for (let i = 0; i < currentCount; i++) {
    const item = flyerState.items[i];
    if (item) {
      const label = document.getElementById(`selector-name-${item.id}`);
      if (label) label.textContent = item.title || '未設定';
    }
  }

  const allBtns = dom.itemSelectorContainer.querySelectorAll('.item-select-btn');
  allBtns.forEach(btn => {
    if (parseInt(btn.dataset.id, 10) === activeItemId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Grid Buttons Active
  dom.gridOptBtns.forEach(btn => {
    if (parseInt(btn.dataset.grid, 10) === currentCount) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setActiveItem(id) {
  activeItemId = id;
  populateEditorForm();
  renderFlyer();
}

function setGridLayout(count) {
  flyerState.gridCount = count;
  if (activeItemId > count) {
    activeItemId = 1;
  }
  buildItemSelectorButtons();
  populateEditorForm();
  renderFlyer();
  saveToLocalStorage();
}

// ============================================================
// Editor Form Population & Event Handlers
// ============================================================

function populateEditorForm() {
  const item = flyerState.items.find(it => it.id === activeItemId);
  if (!item) return;

  dom.activeItemTitleLabel.textContent = `コマ ${item.id} の編集`;
  dom.activeItemSubLabel.textContent = `全${flyerState.gridCount || 8}コマ中`;

  dom.inputProductName.value = item.title || '';
  dom.inputOriginMaker.value = item.origin || '';
  dom.inputVolume.value = item.volume || '';
  dom.inputPriceHontai.value = item.priceHontai != null ? item.priceHontai : '';
  dom.inputPriceTax.value = item.priceTax != null ? item.priceTax : '';
  dom.inputPriceUnit.value = item.unit || '';
  
  if (['', '数量限定', 'お1人様2点限り', 'お1人様1点限り', 'おすすめポイント+150pt', '広告の品', '今週のイチオシ', '原料原産地ロシア', '生協基準クリア'].includes(item.badge)) {
    dom.inputBadge.value = item.badge;
    dom.groupCustomBadge.style.display = 'none';
  } else {
    dom.inputBadge.value = 'カスタム';
    dom.inputCustomBadge.value = item.badge || item.customBadge || '';
    dom.groupCustomBadge.style.display = 'flex';
  }

  dom.inputCatchcopy.value = item.catchCopy || '';
  dom.inputCardBorder.value = item.border || 'border-pink';
  dom.inputImgFit.value = item.imgFit || 'fit-contain';
  dom.editorImagePreview.src = item.image || 'assets/presets/tamanegi.png';
  dom.inputImageUrl.value = item.image && item.image.startsWith('http') ? item.image : '';
  dom.inputImgZoom.value = item.zoom || 100;
  dom.inputImgPosY.value = item.posY || 0;

  dom.inputSaleTitle.value = flyerState.header.saleTitle || '今週のお買い得！！';
  if (dom.selectTitleBgTheme) {
    dom.selectTitleBgTheme.value = flyerState.header.titleTheme || 'theme-gold';
  }
  dom.inputStartDate.value = flyerState.header.startDate || '2026-09-06';
  dom.inputEndDate.value = flyerState.header.endDate || '2026-09-08';
  dom.inputDateRangeText.value = flyerState.header.dateRangeText || '9月6日(日)～9月8日(火)';

  // Populate Right Box Settings
  const rb = flyerState.header.rightBox || INITIAL_FLYER_DATA.header.rightBox;
  if (dom.inputRightBoxType) dom.inputRightBoxType.value = rb.type || 'banner';
  if (dom.inputRightBoxImageUrl) dom.inputRightBoxImageUrl.value = rb.imageUrl || 'assets/point10x_box.png';
  if (dom.inputRightBoxTag) dom.inputRightBoxTag.value = rb.tagText || '毎週土日';
  if (dom.inputRightBoxMain) dom.inputRightBoxMain.value = rb.mainText || 'ポイント10倍！';
  if (dom.inputRightBoxSub) dom.inputRightBoxSub.value = rb.subText || '※一部対象外商品がございます';
  if (dom.inputRightBoxTheme) dom.inputRightBoxTheme.value = rb.themeColor || 'gold';

  if (dom.groupRightBoxBanner && dom.groupRightBoxCustom) {
    if (rb.type === 'custom') {
      dom.groupRightBoxBanner.style.display = 'none';
      dom.groupRightBoxCustom.style.display = 'block';
    } else {
      dom.groupRightBoxBanner.style.display = 'block';
      dom.groupRightBoxCustom.style.display = 'none';
    }
  }

  if (flyerState.stores && flyerState.stores.length >= 4) {
    dom.store1Hours.value = flyerState.stores[0].hours;
    dom.store1Tel.value = flyerState.stores[0].tel;
    dom.store2Hours.value = flyerState.stores[1].hours;
    dom.store2Tel.value = flyerState.stores[1].tel;
    dom.store3Hours.value = flyerState.stores[2].hours;
    dom.store3Tel.value = flyerState.stores[2].tel;
    dom.store4Hours.value = flyerState.stores[3].hours;
    dom.store4Tel.value = flyerState.stores[3].tel;
  }
}

function calcTax8(hontaiPrice) {
  if (hontaiPrice == null || hontaiPrice === '' || isNaN(hontaiPrice)) return '';
  const num = Number(hontaiPrice);
  return Math.round(num * 1.08);
}

function setupEventListeners() {
  const getItem = () => flyerState.items.find(it => it.id === activeItemId);

  // Grid selection buttons (8 / 10 / 12)
  dom.gridOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.dataset.grid, 10);
      setGridLayout(count);
    });
  });

  // Tabs
  dom.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.tabBtns.forEach(b => b.classList.remove('active'));
      dom.tabPanels.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) {
        targetPanel.style.display = 'block';
      }
    });
  });

  // Inputs
  dom.inputProductName.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.title = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputOriginMaker.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.origin = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputVolume.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.volume = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputPriceHontai.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      const val = e.target.value;
      item.priceHontai = val !== '' ? Number(val) : '';
      const autoTax = calcTax8(item.priceHontai);
      item.priceTax = autoTax;
      dom.inputPriceTax.value = autoTax;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputPriceTax.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.priceTax = e.target.value !== '' ? Number(e.target.value) : '';
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputPriceUnit.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.unit = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputBadge.addEventListener('change', (e) => {
    const item = getItem();
    if (item) {
      item.badge = e.target.value;
      if (item.badge === 'カスタム') {
        dom.groupCustomBadge.style.display = 'flex';
        item.customBadge = dom.inputCustomBadge.value;
      } else {
        dom.groupCustomBadge.style.display = 'none';
      }
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputCustomBadge.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.customBadge = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputCatchcopy.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.catchCopy = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputCardBorder.addEventListener('change', (e) => {
    const item = getItem();
    if (item) {
      item.border = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputImgFit.addEventListener('change', (e) => {
    const item = getItem();
    if (item) {
      item.imgFit = e.target.value;
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputImgZoom.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.zoom = Number(e.target.value);
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.inputImgPosY.addEventListener('input', (e) => {
    const item = getItem();
    if (item) {
      item.posY = Number(e.target.value);
      renderFlyer();
      saveToLocalStorage();
    }
  });

  dom.btnApplyImageUrl.addEventListener('click', () => {
    const url = dom.inputImageUrl.value.trim();
    if (url) applyImageToActiveItem(url);
  });

  dom.btnPasteClipboard.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().startsWith('http')) {
        dom.inputImageUrl.value = text.trim();
        applyImageToActiveItem(text.trim());
      } else {
        alert('クリップボードに有効な画像URL（http...）が見つかりませんでした。ブラウザの画像上で「画像アドレスをコピー」してから押してください。');
      }
    } catch (err) {
      const manual = prompt('画像URLを貼り付けてください:');
      if (manual && manual.trim().startsWith('http')) {
        dom.inputImageUrl.value = manual.trim();
        applyImageToActiveItem(manual.trim());
      }
    }
  });

  dom.inputLocalImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        applyImageToActiveItem(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Sale title
  dom.inputSaleTitle.addEventListener('input', (e) => {
    flyerState.header.saleTitle = e.target.value;
    renderFlyer();
    saveToLocalStorage();
  });

  // Central Title Background Theme
  if (dom.selectTitleBgTheme) {
    dom.selectTitleBgTheme.addEventListener('change', (e) => {
      if (!flyerState.header) flyerState.header = { ...INITIAL_FLYER_DATA.header };
      flyerState.header.titleTheme = e.target.value;
      autoFitSaleTitle();
      saveToLocalStorage();
    });
  }

  // Right Box Controls
  if (dom.inputRightBoxType) {
    dom.inputRightBoxType.addEventListener('change', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.type = e.target.value;
      if (e.target.value === 'custom') {
        dom.groupRightBoxBanner.style.display = 'none';
        dom.groupRightBoxCustom.style.display = 'block';
      } else {
        dom.groupRightBoxBanner.style.display = 'block';
        dom.groupRightBoxCustom.style.display = 'none';
      }
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.btnPresetRightBox10x) {
    dom.btnPresetRightBox10x.addEventListener('click', () => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.imageUrl = 'assets/point10x_box.png';
      dom.inputRightBoxImageUrl.value = 'assets/point10x_box.png';
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.inputRightBoxImageUrl) {
    dom.inputRightBoxImageUrl.addEventListener('input', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.imageUrl = e.target.value;
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.inputRightBoxLocalImage) {
    dom.inputRightBoxLocalImage.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (!flyerState.header.rightBox) {
            flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
          }
          flyerState.header.rightBox.imageUrl = event.target.result;
          dom.inputRightBoxImageUrl.value = event.target.result.substring(0, 40) + '...';
          renderRightBox();
          saveToLocalStorage();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (dom.inputRightBoxTag) {
    dom.inputRightBoxTag.addEventListener('input', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.tagText = e.target.value;
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.inputRightBoxMain) {
    dom.inputRightBoxMain.addEventListener('input', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.mainText = e.target.value;
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.inputRightBoxSub) {
    dom.inputRightBoxSub.addEventListener('input', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.subText = e.target.value;
      renderRightBox();
      saveToLocalStorage();
    });
  }

  if (dom.inputRightBoxTheme) {
    dom.inputRightBoxTheme.addEventListener('change', (e) => {
      if (!flyerState.header.rightBox) {
        flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
      }
      flyerState.header.rightBox.themeColor = e.target.value;
      renderRightBox();
      saveToLocalStorage();
    });
  }

  // Clicking right-box navigates to editor tab
  if (dom.flyerRightBox) {
    dom.flyerRightBox.addEventListener('click', () => {
      const headerTabBtn = document.querySelector('.editor-tab-btn[data-tab="tab-header"]');
      if (headerTabBtn) {
        headerTabBtn.click();
      }
      if (dom.sectionRightBoxEditor) {
        dom.sectionRightBoxEditor.scrollIntoView({ behavior: 'smooth' });
        dom.sectionRightBoxEditor.style.outline = '2px solid #3b82f6';
        setTimeout(() => {
          dom.sectionRightBoxEditor.style.outline = 'none';
        }, 1500);
      }
    });
  }

  // Date Range Sync
  const syncDateRange = () => {
    const s = dom.inputStartDate.value;
    const e = dom.inputEndDate.value;
    flyerState.header.startDate = s;
    flyerState.header.endDate = e;

    const formatted = formatPeriodText(s, e);
    flyerState.header.dateRangeText = formatted;
    dom.inputDateRangeText.value = formatted;

    renderFlyer();
    saveToLocalStorage();
  };

  dom.inputStartDate.addEventListener('change', syncDateRange);
  dom.inputEndDate.addEventListener('change', syncDateRange);

  dom.inputDateRangeText.addEventListener('input', (e) => {
    flyerState.header.dateRangeText = e.target.value;
    renderFlyer();
    saveToLocalStorage();
  });

  // Stores
  const updateStores = () => {
    flyerState.stores[0].hours = dom.store1Hours.value;
    flyerState.stores[0].tel = dom.store1Tel.value;
    flyerState.stores[1].hours = dom.store2Hours.value;
    flyerState.stores[1].tel = dom.store2Tel.value;
    flyerState.stores[2].hours = dom.store3Hours.value;
    flyerState.stores[2].tel = dom.store3Tel.value;
    flyerState.stores[3].hours = dom.store4Hours.value;
    flyerState.stores[3].tel = dom.store4Tel.value;
    renderFlyer();
    saveToLocalStorage();
  };

  [dom.store1Hours, dom.store1Tel, dom.store2Hours, dom.store2Tel,
   dom.store3Hours, dom.store3Tel, dom.store4Hours, dom.store4Tel].forEach(el => {
    el.addEventListener('input', updateStores);
  });

  // Zoom
  dom.btnZoomIn.addEventListener('click', () => {
    currentZoom = Math.min(1.5, currentZoom + 0.1);
    updateZoomDisplay();
  });
  dom.btnZoomOut.addEventListener('click', () => {
    currentZoom = Math.max(0.5, currentZoom - 0.1);
    updateZoomDisplay();
  });
  dom.btnZoomReset.addEventListener('click', () => {
    currentZoom = 1.0;
    updateZoomDisplay();
  });
  dom.btnZoomFit.addEventListener('click', () => {
    const paneHeight = document.querySelector('.preview-pane').clientHeight;
    currentZoom = Math.max(0.5, Math.min(1.0, (paneHeight - 80) / 1220));
    updateZoomDisplay();
  });

  // Print & Export
  if (dom.btnExportPdf) {
    dom.btnExportPdf.addEventListener('click', exportToPdf);
  }

  dom.btnPrint.addEventListener('click', () => {
    if (dom.flyerSheet) dom.flyerSheet.classList.add('is-exporting');
    fitAllHeaderElements();
    window.print();
  });

  // 🌟 印刷プレビュー時・終了時にヘッダー各要素（タイトル・売出し期間・右枠）を自動再計算＆選択枠を確実に除去
  window.addEventListener('beforeprint', () => {
    if (dom.flyerSheet) dom.flyerSheet.classList.add('is-exporting');
    fitAllHeaderElements();
  });
  window.addEventListener('afterprint', () => {
    if (dom.flyerSheet) dom.flyerSheet.classList.remove('is-exporting');
    fitAllHeaderElements();
  });

  dom.btnExportPng.addEventListener('click', exportToPng);

  // Save / Load
  dom.btnSaveJson.addEventListener('click', saveToJsonFile);
  dom.inputLoadJson.addEventListener('change', loadFromJsonFile);
  dom.btnLoadSample.addEventListener('click', () => {
    if (confirm('初期サンプルデータを再読み込みしますか？現在の編集内容は上書きされます。')) {
      flyerState = JSON.parse(JSON.stringify(INITIAL_FLYER_DATA));
      activeItemId = 1;
      buildItemSelectorButtons();
      populateEditorForm();
      renderFlyer();
      saveToLocalStorage();
    }
  });

  // Image Modal Triggers
  dom.btnQuickWebSearch.addEventListener('click', () => {
    const item = getItem();
    openImageModal(item?.title || '玉ねぎ', 'smart');
  });

  dom.btnOpenWebSearch.addEventListener('click', () => {
    const item = getItem();
    openImageModal(item?.title || '玉ねぎ', 'smart');
  });

  dom.btnOpenPresets.addEventListener('click', () => {
    openImageModal('', 'presets');
  });

  dom.modalCloseBtn.addEventListener('click', closeImageModal);
  dom.imageModal.addEventListener('click', (e) => {
    if (e.target === dom.imageModal) closeImageModal();
  });

  dom.btnModalDoSearch.addEventListener('click', () => {
    const q = dom.modalSearchInput.value.trim();
    if (q) performSmartSearch(q);
  });

  dom.modalSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = dom.modalSearchInput.value.trim();
      if (q) performSmartSearch(q);
    }
  });

  dom.btnTabModalSmart.addEventListener('click', () => {
    const q = dom.modalSearchInput.value.trim() || getItem()?.title || '玉ねぎ';
    performSmartSearch(q);
  });

  dom.btnTabModalWeb.addEventListener('click', () => {
    const q = dom.modalSearchInput.value.trim() || getItem()?.title || '玉ねぎ';
    fetchLiveWebImages(q);
  });

  dom.btnTabModalPresets.addEventListener('click', () => {
    showAllPresets();
  });
}

function updateZoomDisplay() {
  dom.flyerContainer.style.transform = `scale(${currentZoom})`;
  dom.zoomValueLabel.textContent = `${Math.round(currentZoom * 100)}%`;
}

function applyImageToActiveItem(imageUrl) {
  const item = flyerState.items.find(it => it.id === activeItemId);
  if (item) {
    item.image = imageUrl;
    dom.editorImagePreview.src = imageUrl;
    dom.inputImageUrl.value = imageUrl.startsWith('http') ? imageUrl : '';
    renderFlyer();
    saveToLocalStorage();
  }
}

// ============================================================
// Modal: Smart Matching + Live Web Search + External Links
// ============================================================

function openImageModal(initialQuery, mode = 'smart') {
  dom.imageModal.classList.add('active');
  dom.modalSearchInput.value = initialQuery;

  const safeQ = encodeURIComponent(initialQuery || '食材');
  dom.linkGoogleImages.href = `https://www.google.com/search?tbm=isch&q=${safeQ}`;
  dom.linkYahooImages.href = `https://search.yahoo.co.jp/image/search?p=${safeQ}`;

  if (mode === 'presets') {
    showAllPresets();
  } else {
    performSmartSearch(initialQuery);
  }
}

function closeImageModal() {
  dom.imageModal.classList.remove('active');
}

async function performSmartSearch(query) {
  if (!query) {
    showAllPresets();
    return;
  }

  const safeQ = encodeURIComponent(query);
  dom.linkGoogleImages.href = `https://www.google.com/search?tbm=isch&q=${safeQ}`;
  dom.linkYahooImages.href = `https://search.yahoo.co.jp/image/search?p=${safeQ}`;

  dom.modalStatusText.innerHTML = `<span>「${escapeHtml(query)}」に沿った画像を検索中...</span>`;
  dom.modalImageGrid.innerHTML = '';

  const matchedPresets = [];
  const cleanQ = query.toLowerCase();

  SMART_FOOD_DATABASE.forEach(item => {
    const match = item.keywords.some(k => cleanQ.includes(k.toLowerCase()) || k.toLowerCase().includes(cleanQ));
    if (match) {
      matchedPresets.push(item);
    }
  });

  if (matchedPresets.length > 0) {
    matchedPresets.forEach(preset => {
      appendImageCard(preset.url, `⭐ 最適一致: ${preset.name}`);
    });
  }

  fetchLiveWebImages(query, matchedPresets.length > 0);
}

async function fetchLiveWebImages(query, hasSmartMatches = false) {
  if (!hasSmartMatches) {
    dom.modalImageGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#a0aec0;">WEBから画像を検索中...</div>';
  }

  let totalFound = 0;

  // Search Wikimedia Commons API
  try {
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=12&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=400&format=json&origin=*`;
    const res = await fetch(wikiUrl);
    const data = await res.json();

    if (data.query && data.query.pages) {
      if (!hasSmartMatches && totalFound === 0) dom.modalImageGrid.innerHTML = '';
      
      const pages = Object.values(data.query.pages);
      pages.forEach(page => {
        if (page.imageinfo && page.imageinfo[0]) {
          const info = page.imageinfo[0];
          const thumb = info.thumburl || info.url;
          const full = info.url || thumb;
          const title = (page.title || '').replace(/^File:/, '');

          if (thumb.match(/\.(jpg|jpeg|png|webp)/i)) {
            totalFound++;
            appendImageCard(full, title);
          }
        }
      });
    }
  } catch (e) {
    console.warn('Wikimedia search error:', e);
  }

  // Search Open Food Facts API
  try {
    const offUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`;
    const res = await fetch(offUrl);
    const data = await res.json();

    if (data.products && data.products.length > 0) {
      data.products.forEach(p => {
        const img = p.image_front_url || p.image_url;
        if (img) {
          totalFound++;
          const pName = p.product_name || p.product_name_ja || query;
          appendImageCard(img, `📦 商品パッケージ: ${pName}`);
        }
      });
    }
  } catch (e) {
    console.warn('Open Food Facts search error:', e);
  }

  if (totalFound > 0 || hasSmartMatches) {
    dom.modalStatusText.textContent = `「${query}」の画像候補です。クリックでコマに適用されます。`;
  } else {
    dom.modalStatusText.textContent = `WEB上で「${query}」の画像が見つかりませんでした。定番ライブラリを表示します。`;
    showAllPresets();
  }
}

function appendImageCard(imgUrl, title) {
  const card = document.createElement('div');
  card.className = 'image-result-card';
  card.innerHTML = `
    <div class="image-result-thumb">
      <img src="${imgUrl}" alt="${escapeHtml(title)}" loading="lazy">
    </div>
    <div class="image-result-title" title="${escapeHtml(title)}">${escapeHtml(title)}</div>
  `;
  card.addEventListener('click', () => {
    applyImageToActiveItem(imgUrl);
    closeImageModal();
  });
  dom.modalImageGrid.appendChild(card);
}

function showAllPresets() {
  dom.modalStatusText.textContent = 'コープさっぽろ・スーパー定番食材の高画質ライブラリです。クリックで適用されます。';
  dom.modalImageGrid.innerHTML = '';

  SMART_FOOD_DATABASE.forEach(item => {
    appendImageCard(item.url, item.name);
  });
}

// ============================================================
// Export to High-Resolution PNG
// ============================================================

async function exportToPng() {
  if (typeof html2canvas === 'undefined') {
    alert('画像出力ライブラリの読み込みに失敗しました。印刷機能をご利用ください。');
    return;
  }

  fitAllHeaderElements();

  const originalZoom = currentZoom;
  dom.flyerContainer.style.transform = 'none';
  if (dom.flyerSheet) dom.flyerSheet.classList.add('is-exporting');

  const exportBtn = dom.btnExportPng;
  const origBtnText = exportBtn.innerHTML;
  exportBtn.innerHTML = '出力中...';
  exportBtn.disabled = true;

  try {
    const canvas = await html2canvas(dom.flyerSheet, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const link = document.createElement('a');
    const title = flyerState.header.saleTitle || '号外';
    link.download = `コープさっぽろチラシ_${title}_${flyerState.header.dateRangeText || '売出し'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Error generating image:', err);
    alert('画像の生成中にエラーが発生しました。外部WEB画像のCORS制限の可能性があります。');
  } finally {
    if (dom.flyerSheet) dom.flyerSheet.classList.remove('is-exporting');
    dom.flyerContainer.style.transform = `scale(${originalZoom})`;
    exportBtn.innerHTML = origBtnText;
    exportBtn.disabled = false;
  }
}

// ============================================================
// Export Directly to High-Resolution A4 PDF (ワンクリックPDF保存)
// ============================================================

async function exportToPdf() {
  const exportBtn = dom.btnExportPdf;
  const origBtnText = exportBtn ? exportBtn.innerHTML : '';
  if (exportBtn) {
    exportBtn.innerHTML = 'PDF生成中...';
    exportBtn.disabled = true;
  }

  fitAllHeaderElements();

  const originalZoom = currentZoom;
  dom.flyerContainer.style.transform = 'none';
  if (dom.flyerSheet) dom.flyerSheet.classList.add('is-exporting');

  try {
    if (typeof html2canvas === 'undefined') {
      throw new Error('html2canvas が読み込まれていません。');
    }

    // A4用紙比率に合わせて高品質キャプチャ
    const canvas = await html2canvas(dom.flyerSheet, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // jsPDF が使用可能か確認
    if (window.jspdf && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      // A4 portrait: 210mm x 297mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // A4サイズ全面に配置
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      const title = flyerState.header.saleTitle || '今週のお買い得！！';
      const cleanTitle = title.replace(/[\n\r\/\\?%*:|"<>]/g, '_');
      pdf.save(`コープさっぽろチラシ_${cleanTitle}.pdf`);
    } else {
      // jsPDFが万一使用できない場合は印刷ダイアログを起動
      alert('PDF生成ライブラリの初期化に失敗しました。印刷ダイアログの「PDFに保存」をご利用ください。');
      window.print();
    }
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('PDFの直接出力中にエラーが発生しました。ブラウザの印刷ダイアログ（A4印刷ボタン）から「PDFに保存」をご利用ください。');
  } finally {
    if (dom.flyerSheet) dom.flyerSheet.classList.remove('is-exporting');
    dom.flyerContainer.style.transform = `scale(${originalZoom})`;
    if (exportBtn) {
      exportBtn.innerHTML = origBtnText;
      exportBtn.disabled = false;
    }
  }
}

// ============================================================
// Save / Load JSON
// ============================================================

function saveToJsonFile() {
  const jsonStr = JSON.stringify(flyerState, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `coop_flyer_${flyerState.header.saleTitle || 'data'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function loadFromJsonFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data && data.items && data.items.length >= 8) {
        flyerState = data;
        if (!flyerState.gridCount) flyerState.gridCount = 8;
        if (!flyerState.header) flyerState.header = { ...INITIAL_FLYER_DATA.header };
        if (!flyerState.header.titleTheme) {
          flyerState.header.titleTheme = 'theme-gold';
        }
        if (!flyerState.header.rightBox) {
          flyerState.header.rightBox = { ...INITIAL_FLYER_DATA.header.rightBox };
        }
        activeItemId = 1;
        buildItemSelectorButtons();
        populateEditorForm();
        renderFlyer();
        saveToLocalStorage();
        alert('チラシデータを正常に読み込みました！');
      } else {
        alert('無効なチラシデータファイルです。');
      }
    } catch (err) {
      alert('ファイルの解析に失敗しました: ' + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.addEventListener('resize', () => {
  autoFitSaleTitle();
  autoFitDateRange();
});

document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (err) {
    console.error('Init error:', err);
  }
});
