// Função auxiliar: transforma a string de tags em um Set para busca rápida
const getTagSet = (el) => new Set(
    (el.dataset.tags || '')
        .toLowerCase()
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
);

// Seleciona todos os cards e botões
const cards   = document.querySelectorAll('[data-tags]');
const buttons = document.querySelectorAll('.filter-btn');

// Atualiza visual dos botões (ativo/inativo)
const setActiveButton = (activeBtn) => {
    buttons.forEach(btn => {
        btn.classList.toggle('bg-green-500', btn === activeBtn);
        btn.classList.toggle('text-white', btn === activeBtn);
        btn.classList.toggle('bg-gray-200', btn !== activeBtn);
        btn.classList.toggle('text-gray-800', btn !== activeBtn);
    });
};

// Handler de clique
const filterCards = (tag) => {
    cards.forEach(card => {
        const tags = getTagSet(card);
        // "all" mostra tudo
        const shouldShow = tag === 'all' || tags.has(tag);
        card.classList.toggle('hidden', !shouldShow);
    });
};

// Vincula eventos aos botões
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.dataset.filter.toLowerCase();
        filterCards(tag);
        setActiveButton(btn);
    });
});

// Inicializa mostrando tudo e marcando "Todas"
document.querySelector('.filter-btn[data-filter="all"]').click();

