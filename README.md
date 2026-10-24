# CyberBlog

Blog pessoal sobre segurança da informação, redes, hacking ético e tecnologia.

**Site:** <https://theeddu.github.io/Cyber-Blog/>

## Tecnologias

- [Eleventy (11ty)](https://www.11ty.dev/), gerador de sites estáticos
- Nunjucks e Markdown para páginas e artigos
- CSS e JavaScript para apresentação, navegação e filtro dos artigos
- GitHub Actions e GitHub Pages para publicação

## Publicação no GitHub Pages

O workflow em `.github/workflows/gh-pages.yml` gera o site com o prefixo `/Cyber-Blog/` e publica `_site/` no GitHub Pages a cada push para `main`. No repositório, configure **Settings → Pages → Build and deployment → Source → GitHub Actions**.

O nome do repositório deve permanecer `Cyber-Blog` para corresponder ao prefixo configurado em `npm run build-ghpages`, à URL em `_data/metadata.js` e à URL canônica do feed Atom em `eleventy.config.js`. Se o nome mudar, atualize esses valores.

## Conteúdo e estrutura

- `content/`: página inicial, páginas de tags, feed, sitemap e artigos em Markdown
- `content/blog/images/`: imagens usadas pelo site e pelos artigos
- `_includes/`: layouts e componentes Nunjucks
- `_data/` e `_config/`: metadados, validação e filtros do Eleventy
- `css/` e `public/js/`: estilos e JavaScript do site
- `eleventy.config.js`: configuração do Eleventy, cópia de arquivos e plugins

## Créditos e licenças

O projeto foi iniciado a partir do tema [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog), criado por Zach Leatherman e mantido pela comunidade Eleventy. A estrutura inicial, exemplos e partes da configuração derivam desse projeto, distribuído sob a licença MIT; consulte [LICENSE](LICENSE). O site foi adaptado para o CyberBlog, com conteúdo, identidade visual, estilos e organização próprios.

O gerador [Eleventy](https://github.com/11ty/eleventy) é um projeto open source independente, distribuído sob licença MIT. Os plugins e demais dependências mantêm suas próprias licenças e créditos, conforme seus respectivos projetos.
