// ============================================================
// app.js – Sledovač výdavkov
// ============================================================

// --- Farby jednotlivých kategórií (názov kategórie → hex farba) ---
const CAT_COLORS = {
  'Jedlo':      '#1D9E75',
  'Doprava':    '#378ADD',
  'Bývanie':    '#7F77DD',
  'Zábava':     '#D4537E',
  'Zdravie':    '#63B819',
  'Oblečenie':  '#EF9F27',
  'Iné':        '#888780'
};

// --- Pole, v ktorom sú uložené všetky výdavky počas behu stránky ---
// Každý výdavok je objekt: { id, name, amount, cat, date }
let expenses = [];

// ============================================================
// todayStr()
// Vráti dnešný dátum vo formáte "YYYY-MM-DD" (napr. "2025-04-21").
// Používa sa ako predvolená hodnota poľa "dátum" vo formulári.
// ============================================================
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ============================================================
// fmt(n)
// Naformátuje číslo ako menu v slovenskom formáte, napr. "12,50 €".
// - n: číslo, ktoré chceme zobraziť
// ============================================================
function fmt(n) {
  return n.toLocaleString('sk-SK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' €';
}

// ============================================================
// addExpense()
// Spustí sa po kliknutí na tlačidlo "Pridať výdavok".
// 1. Načíta hodnoty z formulárových polí.
// 2. Skontroluje, či sú vyplnené povinné polia (popis a suma).
// 3. Vytvorí nový objekt výdavku a pridá ho na začiatok poľa expenses[].
// 4. Vyčistí formulár pre ďalší zápis.
// 5. Zavolá render() na aktualizáciu zobrazenia.
// ============================================================
function addExpense() {
  // Načítanie hodnôt z formulára
  const name   = document.getElementById('inp-name').value.trim();
  const amount = parseFloat(document.getElementById('inp-amount').value);
  const cat    = document.getElementById('inp-cat').value;
  const date   = document.getElementById('inp-date').value;

  // Validácia – popis nesmie byť prázdny
  if (!name) {
    document.getElementById('inp-name').focus();
    return;
  }

  // Validácia – suma musí byť kladné číslo
  if (!amount || amount <= 0) {
    document.getElementById('inp-amount').focus();
    return;
  }

  // Vytvorenie nového výdavku; Date.now() generuje unikátne ID
  const newExpense = {
    id:     Date.now(),
    name:   name,
    amount: amount,
    cat:    cat,
    date:   date || todayStr()
  };

  // unshift() pridá prvok na ZAČIATOK poľa (najnovší výdavok bude hore v zozname)
  expenses.unshift(newExpense);

  // Vyčistenie formulára
  document.getElementById('inp-name').value   = '';
  document.getElementById('inp-amount').value = '';
  document.getElementById('inp-date').value   = todayStr();

  // Prekreslenie celého UI
  render();
}

// ============================================================
// deleteExpense(id)
// Vymaže výdavok so zadaným ID zo zoznamu.
// - id: unikátne číslo výdavku (vygenerované cez Date.now() pri jeho pridaní)
// Používa filter() – vytvorí nové pole BEZ položky s daným id.
// ============================================================
function deleteExpense(id) {
  expenses = expenses.filter(function(e) {
    return e.id !== id;
  });

  // Po vymazaní znova prekreslíme UI
  render();
}

// ============================================================
// render()
// Hlavná funkcia, ktorá aktualizuje celé rozhranie na základe
// aktuálneho obsahu poľa expenses[].
// Volá sa vždy, keď sa výdavky zmenia (pridanie / vymazanie).
//
// Robí 3 veci:
//   1. Aktualizuje metriky (celková suma, počet, mesiac, max)
//   2. Vykreslí zoznam výdavkov
//   3. Vykreslí graf kategórií
// ============================================================
function render() {

  // ----------------------------------------------------------
  // 1. METRIKY
  // ----------------------------------------------------------

  // Celková suma: sčítame amount všetkých výdavkov pomocou reduce()
  const total = expenses.reduce(function(sum, e) {
    return sum + e.amount;
  }, 0);

  // Aktuálny mesiac vo formáte "YYYY-MM" (napr. "2025-04")
  const nowMonth = new Date().toISOString().slice(0, 7);

  // Suma výdavkov len za tento mesiac (filtrujeme podľa dátumu)
  const monthTotal = expenses
    .filter(function(e) { return e.date.startsWith(nowMonth); })
    .reduce(function(sum, e) { return sum + e.amount; }, 0);

  // Najdrahší výdavok – pomocou reduce() nájdeme objekt s najväčším amount
  const maxExp = expenses.length
    ? expenses.reduce(function(a, b) { return a.amount > b.amount ? a : b; })
    : null;

  // Zapíšeme vypočítané hodnoty do HTML elementov
  document.getElementById('m-total').textContent = fmt(total);
  document.getElementById('m-count').textContent = expenses.length;
  document.getElementById('m-month').textContent = fmt(monthTotal);
  document.getElementById('m-max').textContent   = maxExp ? fmt(maxExp.amount) : '—';

  // ----------------------------------------------------------
  // 2. ZOZNAM VÝDAVKOV
  // ----------------------------------------------------------
  const list = document.getElementById('exp-list');

  if (expenses.length === 0) {
    // Prázdny stav – žiadne výdavky ešte neboli pridané
    list.innerHTML = '<div class="exp-empty">Pridajte prvý výdavok</div>';
  } else {
    // Pre každý výdavok vytvoríme HTML kartičku pomocou map() + join()
    list.innerHTML = expenses.map(function(e) {
      const color = CAT_COLORS[e.cat] || '#888';
      return `
        <div class="exp-item">
          <!-- Farebná bodka zodpovedajúca kategórii -->
          <div class="exp-dot" style="background:${color}"></div>

          <!-- Popis a metadata výdavku -->
          <div class="exp-item-info">
            <div class="exp-item-name">${e.name}</div>
            <div class="exp-item-meta">${e.cat} · ${e.date}</div>
          </div>

          <!-- Suma výdavku -->
          <div class="exp-item-amount">${fmt(e.amount)}</div>

          <!-- Tlačidlo na vymazanie; onclick odovzdá id konkrétneho výdavku -->
          <button class="exp-del" onclick="deleteExpense(${e.id})" title="Zmazať">×</button>
        </div>
      `;
    }).join('');
  }

  // ----------------------------------------------------------
  // 3. GRAF KATEGÓRIÍ
  // ----------------------------------------------------------

  // Zoskupíme výdavky podľa kategórie a spočítame sumy
  // Výsledok: { 'Jedlo': 45.5, 'Doprava': 20, ... }
  const catTotals = {};
  expenses.forEach(function(e) {
    catTotals[e.cat] = (catTotals[e.cat] || 0) + e.amount;
  });

  // Prevedieme objekt na pole párov [kategória, suma] a zoradíme zostupne
  const sorted = Object.entries(catTotals).sort(function(a, b) {
    return b[1] - a[1];
  });

  // Maximálna suma kategórie – slúži na výpočet šírky pruhov (100 % = max)
  const maxCat = sorted.length ? sorted[0][1] : 1;

  const chart = document.getElementById('cat-chart');

  if (sorted.length === 0) {
    chart.innerHTML = '<div class="exp-empty" style="padding:1rem;">Zatiaľ žiadne dáta</div>';
  } else {
    // Pre každú kategóriu vytvoríme riadok s pruhom
    chart.innerHTML = sorted.map(function([cat, val]) {
      const color     = CAT_COLORS[cat] || '#888';
      const widthPct  = ((val / maxCat) * 100).toFixed(1); // šírka pruhu v %
      return `
        <div class="exp-chart-row">
          <span class="exp-chart-cat">${cat}</span>
          <div class="exp-chart-track">
            <div class="exp-chart-fill" style="width:${widthPct}%; background:${color}"></div>
          </div>
          <span class="exp-chart-val">${fmt(val)}</span>
        </div>
      `;
    }).join('');
  }
}

// --- Spustenie: nastavíme dnešný dátum a prvý render pri načítaní stránky ---
document.getElementById('inp-date').value = todayStr();
render();
