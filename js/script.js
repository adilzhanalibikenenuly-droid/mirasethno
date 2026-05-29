document.addEventListener("DOMContentLoaded", () => {
    // --- 1. МОБИЛЬНОЕ МЕНЮ ---
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

    // --- 2. ГАЛЕРЕЯ ТОВАРОВ ---
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // --- 3. КАТАЛОГ И ФИЛЬТРЫ ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const categories = card.dataset.category;
                card.style.display = (filter === 'all' || categories.includes(filter)) ? 'block' : 'none';
            });
        });
    });

    // --- 4. FAQ ---
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        item.querySelector('.faq__question').addEventListener("click", () => {
            faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- 5. ДИНАМИЧЕСКИЕ ДАННЫЕ (База) ---
    const pageId = window.location.pathname.split('/').pop().replace('.html', '');
    const product = productsData[pageId];

    // Заполняем страницу товара
    if (product) {
        const titleEl = document.querySelector('.product__title');
        const priceEl = document.querySelector('.product__price');
        if (titleEl) titleEl.innerText = product.title;
        if (priceEl) priceEl.innerText = product.price;
        if (document.getElementById('char-complexity')) document.getElementById('char-complexity').innerText = product.complexity;
        if (document.getElementById('char-size')) document.getElementById('char-size').innerText = product.size;

        // Кнопка WhatsApp
        const button = document.querySelector(".product__btn");
        if (button) {
            const text = encodeURIComponent(`Здравствуйте, хочу приобрести схему "${product.title}". Подскажите реквизиты для оплаты 🤍`);
            button.href = `https://wa.me/77011271428?text=${text}`;
        }
    }

    // Заполняем каталог
    cards.forEach(card => {
        const titleEl = card.querySelector('.card__title');
        if (!titleEl) return;
        const key = Object.keys(productsData).find(k => productsData[k].title === titleEl.innerText);
        if (key && card.querySelector('.price')) {
            card.querySelector('.price').innerText = productsData[key].price;
        }
    });
});