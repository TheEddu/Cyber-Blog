function loadArticle(config) {
  document.title = config.title;

  fetch(config.mdFile)
    .then(response => {
      if (!response.ok) throw new Error("Arquivo não encontrado");
      return response.text();
    })
    .then(text => {
      let html = marked.parse(text);

        html = html.replaceAll(
          'src="../../images/',
          'src="/Cyber-Blog/images/'
        );
      document.getElementById("content").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("content").innerHTML = 
        `<p style="color:red;">Erro ao carregar o artigo: ${err.message}</p>`;
    });
}