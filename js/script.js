document.addEventListener("DOMContentLoaded", async () => {

    // --- ЗАГРУЗКА КОМПОНЕНТОВ ---
    async function loadComponents() {
        const header = await fetch('/components/header.html').then(r => r.text());
        const footer = await fetch('/components/footer.html').then(r => r.text());
        document.getElementById('header-placeholder').innerHTML = header;
        document.getElementById('footer-placeholder').innerHTML = footer;
    }
    await loadComponents();

    // --- АКТИВНАЯ ССЫЛКА ---
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop__nav-link, .menu__item').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === path) link.classList.add('active');
    });

    // --- КАТАЛОГ ---
    const grid = document.getElementById('catalog-grid');
    if (grid) {
        Object.entries(productsData).forEach(([key, product]) => {
            grid.innerHTML += `
                <a href="/products/${key}.html" class="card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.title}" class="card__img">
                    <div class="card__content">
                        <h3 class="card__title">${product.title}</h3>
                        <p class="card__description">${product.description}</p>
                        <p class="price">${product.price}</p>
                        <span class="card__btn">Перейти</span>
                    </div>
                </a>`;
        });
    }

    // --- ГЛАВНАЯ: ПОПУЛЯРНЫЕ ---
    const popularGrid = document.getElementById('popular-grid');
    if (popularGrid) {
        Object.entries(productsData)
            .filter(([key, product]) => product.popular)
            .forEach(([key, product]) => {
                popularGrid.innerHTML += `
                    <a href="/products/${key}.html" class="card">
                        <img src="${product.image}" alt="${product.title}" class="card__img">
                        <div class="card__content">
                            <h3 class="card__title">${product.title}</h3>
                            <p class="card__description">${product.description}</p>
                            <p class="price">${product.price}</p>
                            <span class="card__btn">Перейти</span>
                        </div>
                    </a>`;
            });
    }

    // --- МОБИЛЬНОЕ МЕНЮ ---
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('menuClose');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            menu.classList.add('active');
            overlay.classList.add('active');
        });
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // --- ГАЛЕРЕЯ ---
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // --- ФИЛЬТРЫ ---
    const filterNames = {
        related: 'Проверенные',
        main: 'Дизайн-схемы',
        mini: 'Мини-схемы',
        geometry: 'Этно-геометрия',
        zhainamaz: 'Жайнамаз'
    };

    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                card.style.display = (filter === 'all' || categories.includes(filter)) ? 'block' : 'none';
                if (filter !== 'all') {
                    card.href = card.href.split('?')[0] + `?from=${filter}`;
                } else {
                    card.href = card.href.split('?')[0];
                }
            });
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${urlFilter}"]`);
        if (targetBtn) targetBtn.click();
    }

    // --- FAQ ---
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        item.querySelector('.faq__question')?.addEventListener("click", () => {
            faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- СТРАНИЦА ТОВАРА ---
    const pageId = window.location.pathname.split('/').pop().replace('.html', '');
    const product = productsData[pageId];

    if (product) {
        const titleEl = document.querySelector('.product__title');
        const priceEl = document.querySelector('.product__price');
        if (titleEl) titleEl.innerText = product.title;
        if (priceEl) priceEl.innerText = product.price;
        if (document.getElementById('char-complexity')) document.getElementById('char-complexity').innerText = product.complexity;
        if (document.getElementById('char-size')) document.getElementById('char-size').innerText = product.size;

        const button = document.querySelector(".product__btn");
        if (button) {
            const text = encodeURIComponent(`Здравствуйте, хочу приобрести схему "${product.title}". Подскажите реквизиты для оплаты 🤍`);
            button.href = `https://wa.me/77011271428?text=${text}`;
        }

        // --- ХЛЕБНЫЕ КРОШКИ ---
        const params = new URLSearchParams(window.location.search);
        const from = params.get('from');
        const breadcrumbs = document.querySelector('.breadcrumbs .container');
        if (breadcrumbs) {
            if (from && filterNames[from]) {
                breadcrumbs.innerHTML = `
                    <a href="/catalog.html">Схемы</a>
                    <span>/</span>
                    <a href="/catalog.html?filter=${from}">${filterNames[from]}</a>
                    <span>/</span>
                    <span>${product.title}</span>
                `;
            } else {
                breadcrumbs.innerHTML = `
                    <a href="/catalog.html">Схемы</a>
                    <span>/</span>
                    <span>${product.title}</span>
                `;
            }
        }
    }

});