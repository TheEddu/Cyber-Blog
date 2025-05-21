export function renderHeader({ image, alt, title, subtitle }) {
  return `
    <header class="bg-gray-900 flex items-center border-b border-gray-200 px-8 py-4 shadow-sm fixed top-0 left-0 right-0 z-30" style="height: 72px;">
      ${image ? `<img src="${image}" alt="${alt}" class="w-12 h-12 rounded-lg mr-4 border border-green-400 shadow-sm" />` : ''}
      <div>
        <h1 class="text-2xl font-bold text-green-600 tracking-tight">${title}</h1>
        <span class="text-sm text-gray-500">${subtitle}</span>
      </div>
      <button id="toggleMenu" class="lg:hidden p-2 absolute top-4 right-4 bg-gray-800 text-white rounded-md shadow">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </header>
  `;
}

export function renderSidebar({ summary, backLink }) {
  return `
    <nav id="sidebar" class="bg-gray-900 w-72 min-w-[220px] max-w-xs border-r border-gray-200 px-6 py-8 
      fixed top-18 left-0 bottom-0 z-20 overflow-y-auto rounded-tr-2xl rounded-br-2xl shadow-md 
      transition-transform transform lg:translate-x-0 -translate-x-full lg:block"
      style="margin-top:72px; height:calc(100vh - 72px);">
      <h2 class="text-lg font-semibold text-green-700 mb-4">Sumário</h2>
      <ul class="space-y-3 text-gray-300 text-base">
        ${summary.map(item => `<li><a href="#${item.id}" class="hover:text-green-600 transition">${item.label}</a></li>`).join('')}
      </ul>
      <div class="mt-10 text-xs text-gray-400">
        <a href="${backLink}" class="hover:underline text-green-500">← Voltar para a página inicial</a>
      </div>
    </nav>
  `;
}

export function renderReferences({ references }) {
  return `
    <section class="mb-10" id="referencias">
      <h3 class="text-2xl font-semibold mb-2 text-gray-800 border-l-4 border-green-400 pl-3">Referências</h3>
      <ul class="list-disc list-inside mb-4 space-y-1 text-sm">
        ${references.map(ref => `<li>${ref.text} <a href="${ref.url}" class="text-green-600 hover:underline" target="_blank">${ref.url}</a></li>`).join('')}
      </ul>
    </section>
  `;
}
