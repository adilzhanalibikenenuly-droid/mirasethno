const menu = document.getElementById('mobileMenu')
const overlay = document.getElementById('overlay')
const openBtn = document.getElementById('menuBtn')
const closeBtn = document.getElementById('menuClose')

openBtn.addEventListener('click', () => {
    menu.classList.add('active');
    overlay.classList.add('active'); 
})

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
})

overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
})

const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;

        thumbs.forEach(t => t.classList.remove('active'));

        thumb.classList.add('active');
    })
})

const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {

            const categories = card.dataset.category;

            if (filter === 'all') {
                card.style.display = 'block';
            } else if (categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

        });

    });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');


        question.addEventListener("click", () => {
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            })

            item.classList.toggle('active');
        })
    })
})

const productTitle = document.querySelector(".product__title").textContent;

const text = encodeURIComponent(
  `Здравствуйте, хочу приобрести схему "${productTitle}". Подскажите, пожалуйста, реквизиты для оплаты 🤍`
);

const button = document.querySelector(".product__btn");

button.href = `https://wa.me/77011271428?text=${text}`;