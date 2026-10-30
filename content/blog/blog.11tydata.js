import { readFileSync } from "node:fs";

const sourceFor = (data) => {
	try { return readFileSync(data.page.inputPath, "utf8"); } catch { return ""; }
};

const allowedTags = ["database", "cybersecurity", "docker", "desenvolvimento-pessoal", "redes", "shell", "linux"];
const tagBySlug = {
	infoSec: ["cybersecurity"],
	"formatar-ssd": ["linux"],
	kaizen: ["desenvolvimento-pessoal"],
	scriptDocker: ["docker", "shell"],
	"mysql-docker": ["docker", "database"],
	modoAnonimo: ["cybersecurity"],
	social: ["cybersecurity"],
	MalwareConhecendoECombatendoEssesInimigos: ["cybersecurity"],
	senhasSeguras: ["cybersecurity"],
	sqlVideoGameSales: ["database"],
	routerConfiguration: ["redes"],
	"python-introduction": ["desenvolvimento-pessoal"],
	protocolosPortas: ["redes"],
	zabbixErrorHandling: ["redes", "docker"],
};
// Sequência editorial da home e da navegação entre artigos.
const editorialOrder = {
	infoSec: 1,
	"formatar-ssd": 2,
	kaizen: 3,
	scriptDocker: 4,
	"mysql-docker": 5,
	modoAnonimo: 6,
	social: 7,
	MalwareConhecendoECombatendoEssesInimigos: 8,
	senhasSeguras: 9,
	sqlVideoGameSales: 10,
	routerConfiguration: 11,
	protocolosPortas: 12,
	zabbixErrorHandling: 13,
};
const homeDescriptions = {
	infoSec: "Meu primeiro artigo, introdução a segurança da informação, alguns tópicos e conceitos fundamentais, baseado nos meus estudos.",
	kaizen: "Esse eBook é uma introdução prática e direta à filosofia Kaizen, serve para quem atua com tecnologia, mas também para quem busca melhorar constantemente, tanto na carreira quanto na vida pessoal.",
	scriptDocker: "Docker é uma plataforma popular para desenvolver, enviar e executar aplicações em contêineres. Logo que comecei a trabalhar com Docker, notei que existem vários comandos, e também que muitos deles são usados de forma repetida, então, por que não criar um script para automatizar e faciliar esse processo?",
	"mysql-docker": "Aprenda a configurar um container MySQL com Docker, manter os dados persistentes e conectar o banco ao VS Code para executar consultas sem depender de ferramentas gráficas.",
	modoAnonimo: "O modo anônimo é bastante popular, mas é realmente útil para proteger sua privacidade online? Vamos explorar se ele realemente nos permite navegar de forma anônima.",
	social: "A Engenharia Social é uma técnica de manipulação psicológica usada por cibercriminosos para obter informações confidenciais. Neste artigo, me dediquei a pesquisar e ensinar como identificar e se proteger dessas ameaças.",
	MalwareConhecendoECombatendoEssesInimigos: "Como amante da Cybersegurança, saber sobre Malware faz parte da minha vida, então, pensei em como poderia ajudar outras pessoas a entenderem mais sobre o assunto, enquanto eu mesmo entendo melhor, e pratico como explicar o assunto para pessoas de fora da área.",
	senhasSeguras: "Eu tive a idéia de desenvolver um projeto gerador de senhas seguras com Python, depois, veio a idéia de escrever um artigo sobre senhas seguras, então, decidi unir ambas idéias em um artigo.",
	sqlVideoGameSales: "Análise de um banco de dados de vendas de videogames usando SQL para extrair insights interessantes sobre o mercado de jogos.",
	routerConfiguration: "Análise de um banco de dados de vendas de videogames usando SQL para extrair insights interessantes sobre o mercado de jogos.",
	"python-introduction": "Python é uma linguagem de programação versátil e poderosa, amplamente utilizada em diversas áreas, incluindo segurança da informação. Neste artigo, apresento uma introdução ao Python.",
	protocolosPortas: "Quando acessamos um site, enviamos uma mensagem pelo WhatsApp ou assistimos a um vídeo no YouTube, existe uma enorme troca de dados acontecendo entre dispositivos. Já se perguntou como essas informações encontram o caminho certo? E como o computador sabe quem deve receber esses dados? Esses conceitos formam a base da comunicação entre dispositivos e são essenciais para quem deseja aprender redes, infraestrutura, cibersegurança ou administração de sistemas.",
	zabbixErrorHandling: "Relato de um laboratório com Zabbix em Docker no Arch Linux e Ubuntu Server: diagnóstico de conectividade entre redes virtuais, configuração do agente e análise das regras de firewall.",
};

const monthNumbers = {
	"janeiro": "01", "fevereiro": "02", "março": "03", "abril": "04", "maio": "05", "junho": "06",
	"julho": "07", "agosto": "08", "setembro": "09", "outubro": "10", "novembro": "11", "dezembro": "12",
};

export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
	isPost: true,
	eleventyComputed: {
		title: (data) => {
			if (data.title) return data.title;
			const heading = sourceFor(data).match(/^#{1,6}\s+(.+)$/m)?.[1];
			return heading || data.page.fileSlug.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
		},
		order: (data) => editorialOrder[data.page.fileSlug] ?? 999,
		description: (data) => {
			if (data.description) return data.description;
			if (Object.hasOwn(homeDescriptions, data.page.fileSlug)) return homeDescriptions[data.page.fileSlug];
			const text = sourceFor(data);
			const paragraph = text.replace(/^---[\s\S]*?---\s*/m, "").split(/\n\s*\n/).find((part) => part.trim() && !/^\s*(#|Publicado em|---)/.test(part));
			const summary = paragraph?.replace(/[*_`\[\]]/g, "").replace(/\s+/g, " ").trim();
			if (!summary) return "Artigo sobre tecnologia e segurança da informação.";
			if (summary.length <= 180) return summary;
			const excerpt = summary.slice(0, 180);
			return `${excerpt.slice(0, excerpt.lastIndexOf(" ")).trimEnd()}…`;
		},
		date: (data) => {
			const source = sourceFor(data);
			const frontMatterDate = source.match(/^date:\s*(.+)$/m);
			if (frontMatterDate && data.date) return data.date;
			const published = source.match(/Publicado em\s+([A-Za-zçÇ]+)(?:\s+de)?\s+(\d{4})/i);
			if (published) {
				const month = monthNumbers[published[1].toLowerCase()];
				if (month) return new Date(`${published[2]}-${month}-01T12:00:00`);
			}
			return new Date("2025-01-01T12:00:00");
		},
		tags: (data) => {
			const frontMatterTags = sourceFor(data).match(/^tags:\s*(.+)$/m)?.[1];
			const parsedTags = frontMatterTags ? frontMatterTags.replace(/[\[\]"]/g, "").split(",").map((tag) => tag.trim()).filter(Boolean) : [];
			const categories = (parsedTags.length ? parsedTags : (tagBySlug[data.page.fileSlug] || []))
				.map((tag) => tag.toLowerCase())
				.filter((tag, index, tags) => allowedTags.includes(tag) && tags.indexOf(tag) === index);
			return ["posts", ...categories];
		},
		image: (data) => data.image || ({
			infoSec: "/images/infoSec.jpg",
			kaizen: "/images/kaizen.jpg",
			modoAnonimo: "/images/modoAnonimo.jpg",
			senhasSeguras: "/images/senhasSeguras.jpg",
			social: "/images/social.jpg",
			MalwareConhecendoECombatendoEssesInimigos: "/images/MalwareConhecendoECombatendoEssesInimigos.jpg",
			scriptDocker: "https://image.lexica.art/full_webp/11dfd817-3f6c-4812-ba26-077d2dbb5aae",
			"mysql-docker": "https://image.lexica.art/full_webp/0a92c22b-8e31-4e82-9245-1efba8ecb488",
			sqlVideoGameSales: "https://image.lexica.art/full_webp/16eaa384-7e38-4231-bd6c-95d6c2d00472",
			routerConfiguration: "https://image.lexica.art/full_webp/18a127d5-320d-40a4-885e-cd0b9714b1d3",
			"python-introduction": "https://image.lexica.art/full_webp/40abe69d-479e-4eb3-bec6-8b33328f99c2",
		})[data.page.fileSlug],
	},
};

