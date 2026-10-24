
const cards = document.querySelectorAll('.labs-grid .article-card');

// Busca tags 
const getTagSet = (card) => {

    const el = card.querySelector('[data-tags]') || card;
    return new Set(
        (el.dataset.tags || '')
            .toLowerCase()
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
    );
};

// Seleciona botões
const buttons = document.querySelectorAll('.filter-btn');

// Atualiza visual dos botões
const setActiveButton = (activeBtn) => {
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn === activeBtn);
    });
};


const filterCards = (tag) => {
    cards.forEach(card => {
        const tags = getTagSet(card);
        const shouldShow = tag === 'all' || tags.has(tag.toLowerCase());
        card.style.display = shouldShow ? '' : 'none';
    });
};


buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.dataset.filter.toLowerCase();
        filterCards(tag);
        setActiveButton(btn);
    });
});


const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
if (allBtn) {
    allBtn.click();
} else {
    cards.forEach(card => { card.style.display = ''; });
}
