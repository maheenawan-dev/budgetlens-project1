const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

let expenses = JSON.parse(localStorage.getItem('budgetlens_expenses')) || [];
let budgetLimit = parseFloat(localStorage.getItem('budgetlens_limit')) || 500;

const form = document.getElementById('expenseForm');
const txList = document.getElementById('txList');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  expenses.push({
    id: Date.now(),
    date: document.getElementById('expDate').value,
    category: document.getElementById('expCategory').value,
    amount: parseFloat(document.getElementById('expAmount').value),
    note: document.getElementById('expNote').value
  });
  localStorage.setItem('budgetlens_expenses', JSON.stringify(expenses));
  form.reset();
  renderAll();
});

document.getElementById('setBudgetBtn').addEventListener('click', () => {
  const val = parseFloat(document.getElementById('budgetInput').value);
  if (val > 0) {
    budgetLimit = val;
    localStorage.setItem('budgetlens_limit', budgetLimit);
    document.getElementById('budgetInput').value = '';
    renderAll();
  }
});

function isThisMonth(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function renderAll() {
  renderList();
  renderStats();
  renderBudget();
  renderCategories();
}

function renderList() {
  txList.innerHTML = '';

  if (expenses.length === 0) {
    txList.innerHTML = `<li class="empty-state">No expenses logged yet — add your first one above.</li>`;
    return;
  }

  [...expenses].sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(e => {
    const li = document.createElement('li');
    li.className = 'tx-item';
    li.innerHTML = `
      <div><strong>${e.category}</strong>${e.note ? `<div class="meta">${e.note}</div>` : ''}</div>
      <div class="tx-right">
        <div>
          <div class="tx-amount">$${e.amount.toFixed(2)}</div>
          <div class="meta">${e.date}</div>
        </div>
        <button class="tx-delete" data-id="${e.id}" aria-label="Delete expense">✕</button>
      </div>`;
    txList.appendChild(li);
  });

  // attach delete listeners after rendering
  document.querySelectorAll('.tx-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      expenses = expenses.filter(e => e.id !== id);
      localStorage.setItem('budgetlens_expenses', JSON.stringify(expenses));
      renderAll();
    });
  });
}

function renderStats() {
  const monthExpenses = expenses.filter(e => isThisMonth(e.date));
  const monthTotal = monthExpenses.reduce((s,e) => s + e.amount, 0);

  const catTotals = {};
  monthExpenses.forEach(e => catTotals[e.category] = (catTotals[e.category]||0) + e.amount);
  const topCat = Object.entries(catTotals).sort((a,b) => b[1]-a[1])[0];

  document.getElementById('monthTotal').textContent = `$${monthTotal.toFixed(2)}`;
  document.getElementById('txCount').textContent = expenses.length;
  document.getElementById('topCategory').textContent = topCat ? topCat[0] : '—';
  document.getElementById('remainingBudget').textContent = `$${Math.max(budgetLimit - monthTotal, 0).toFixed(2)}`;
}

function renderBudget() {
  const monthTotal = expenses.filter(e => isThisMonth(e.date)).reduce((s,e) => s + e.amount, 0);
  const percent = Math.min((monthTotal / budgetLimit) * 100, 100);
  document.getElementById('spentOfBudget').textContent = `$${monthTotal.toFixed(2)}`;
  document.getElementById('budgetLimitLabel').textContent = `$${budgetLimit}`;
  document.getElementById('budgetProgress').style.width = percent + '%';
}

function renderCategories() {
  const container = document.getElementById('catBreakdown');
  container.innerHTML = '';
  if (expenses.length === 0) return;

  const totals = {};
  expenses.forEach(e => totals[e.category] = (totals[e.category]||0) + e.amount);
  const grand = Object.values(totals).reduce((a,b)=>a+b,0);

  Object.entries(totals).sort((a,b)=>b[1]-a[1]).forEach(([cat, amt]) => {
    const pct = ((amt/grand)*100).toFixed(0);
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="cat-bar-label"><span>${cat}</span><span>${pct}%</span></div>
      <div class="cat-bar-track"><div class="cat-bar-fill" style="width:${pct}%"></div></div>`;
    container.appendChild(div);
  });
}

renderAll();