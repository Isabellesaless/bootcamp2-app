// script.js

async function buscarLivros(termo) {
  const area = document.getElementById("resultado");
  area.innerHTML = "<p class='mensagem'>Carregando...</p>";

  try {
    const resposta = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&limit=5`);

    if (!resposta.ok) throw new Error("Falha na requisição");

    const dados = await resposta.json();

    if (!dados.docs || dados.docs.length === 0) {
      area.innerHTML = "<p class='mensagem'>Nenhum livro encontrado. Tente outro título.</p>";
      return;
    }

    area.innerHTML = "";

    dados.docs.forEach((livro) => {
      const titulo = livro.title || "Título desconhecido";
      const autores = livro.author_name ? livro.author_name.join(", ") : "Autor desconhecido";
      const ano = livro.first_publish_year || "Ano desconhecido";
      const capaUrl = livro.cover_i
        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        : "https://via.placeholder.com/80x120?text=Sem+capa";

      const card = document.createElement("div");
      card.className = "livro-card";
      card.innerHTML = `
        <img src="${capaUrl}" alt="Capa de ${titulo}">
        <div class="livro-info">
          <h2>${titulo}</h2>
          <p>Autor(es): ${autores}</p>
          <p>Primeira publicação: ${ano}</p>
        </div>
      `;
      area.appendChild(card);
    });

  } catch (erro) {
    area.innerHTML = "<p class='mensagem'>Ops! Algo deu errado ao buscar. Tente novamente.</p>";
  }
}

document.getElementById("botao-buscar").addEventListener("click", () => {
  const termo = document.getElementById("campo-busca").value.trim();
  if (termo) buscarLivros(termo);
});

document.getElementById("campo-busca").addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    document.getElementById("botao-buscar").click();
  }
});
