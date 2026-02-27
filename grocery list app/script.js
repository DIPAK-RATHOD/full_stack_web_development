(() => {
	const STORAGE_KEY = 'groceryData_v1';
	let data = { categories: [] };
	let selectedCategoryId = null;

	function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
	function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
	function load() { const raw = localStorage.getItem(STORAGE_KEY); if (raw) data = JSON.parse(raw); }
	function findCategory(id) { return data.categories.find(c => c.id === id); }

	function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

	function renderCategories() {
		const ul = document.getElementById('categories'); ul.innerHTML = '';
		const select = document.getElementById('category-select'); select.innerHTML = '';
		if (data.categories.length === 0) {
			const li = document.createElement('li'); li.className = 'empty'; li.textContent = 'No categories yet'; ul.appendChild(li);
		} else {
			data.categories.forEach(cat => {
				const li = document.createElement('li'); li.className = 'category' + (cat.id === selectedCategoryId ? ' selected' : '');
				li.dataset.id = cat.id;
				const btn = document.createElement('button'); btn.className = 'cat-btn'; btn.dataset.id = cat.id; btn.textContent = cat.name;
				const count = document.createElement('span'); count.className = 'count'; count.textContent = cat.items.length;
				li.appendChild(btn); li.appendChild(count); ul.appendChild(li);

				const opt = document.createElement('option'); opt.value = cat.id; opt.textContent = cat.name; select.appendChild(opt);
			});
		}

		if (selectedCategoryId && data.categories.some(c => c.id === selectedCategoryId)) {
			select.value = selectedCategoryId;
		} else if (data.categories[0]) {
			selectedCategoryId = data.categories[0].id; select.value = selectedCategoryId;
		}

		renderItems();
	}

	function renderItems() {
		const container = document.getElementById('items'); container.innerHTML = '';
		if (!selectedCategoryId) { container.innerHTML = '<p class="muted">Select or add a category to see items.</p>'; return; }
		const cat = findCategory(selectedCategoryId);
		if (!cat) { container.innerHTML = '<p class="muted">Category not found.</p>'; return; }
		if (cat.items.length === 0) { container.innerHTML = '<p class="muted">No items yet.</p>'; return; }

		const ul = document.createElement('ul'); ul.className = 'items-list';
		cat.items.forEach(it => {
			const li = document.createElement('li'); li.className = 'item';
			const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = !!it.checked; checkbox.dataset.id = it.id;
			checkbox.addEventListener('change', () => { it.checked = checkbox.checked; save(); renderItems(); renderCategories(); });
			const label = document.createElement('label'); label.textContent = it.name; if (it.checked) label.classList.add('done');
			label.prepend(checkbox);
			const del = document.createElement('button'); del.className = 'delete'; del.textContent = '✕';
			del.addEventListener('click', () => { cat.items = cat.items.filter(x => x.id !== it.id); save(); renderItems(); renderCategories(); });
			li.appendChild(label); li.appendChild(del); ul.appendChild(li);
		});
		container.appendChild(ul);
	}

	function addCategory(name) {
		name = (name || '').trim(); if (!name) return;
		const exists = data.categories.find(c => c.name.toLowerCase() === name.toLowerCase());
		if (exists) { selectedCategoryId = exists.id; renderCategories(); return; }
		const cat = { id: uid(), name, items: [] };
		data.categories.push(cat); selectedCategoryId = cat.id; save(); renderCategories();
	}

	function addItem(name) {
		name = (name || '').trim(); if (!name || !selectedCategoryId) return;
		const cat = findCategory(selectedCategoryId); if (!cat) return;
		cat.items.push({ id: uid(), name, checked: false }); save(); renderItems(); renderCategories();
	}

	function clearCompleted() { if (!selectedCategoryId) return; const cat = findCategory(selectedCategoryId); cat.items = cat.items.filter(i => !i.checked); save(); renderItems(); renderCategories(); }

	function bind() {
		document.getElementById('category-form').addEventListener('submit', e => { e.preventDefault(); const v = document.getElementById('new-category').value; addCategory(v); document.getElementById('new-category').value = ''; });
		document.getElementById('item-form').addEventListener('submit', e => { e.preventDefault(); const v = document.getElementById('new-item').value; addItem(v); document.getElementById('new-item').value = ''; });
		document.getElementById('categories').addEventListener('click', e => { const btn = e.target.closest('button'); if (!btn) return; const id = btn.dataset.id; if (id) { selectedCategoryId = id; renderCategories(); } });
		document.getElementById('category-select').addEventListener('change', e => { selectedCategoryId = e.target.value; renderCategories(); });
		document.getElementById('clear-completed').addEventListener('click', () => { clearCompleted(); });
	}

	document.addEventListener('DOMContentLoaded', () => { load(); bind(); renderCategories(); });

})();
