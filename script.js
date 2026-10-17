// script.js
// Consome a API pública Open Library para buscar livros pelo título digitado
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://yqhbmfjiyqbjubijeboa.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZBh6BysSHRQRUSrARSynNg_lvkoL-pb";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
      const extra = `${autores} · ${ano}`;

      const card = document.createElement("div");
      card.className = "livro-card";
      card.innerHTML = `
        <img src="${capaUrl}" alt="Capa de ${titulo}">
        <div class="livro-info">
          <h2>${titulo}</h2>
          <p>Autor(es): ${autores}</p>
          <p>Primeira publicação: ${ano}</p>
          <button class="botao-favoritar">Favoritar</button>
        </div>
      `;
      card.querySelector(".botao-favoritar").addEventListener("click", () => salvarFavorito(titulo, extra));
      area.appendChild(card);
    });

  } catch (erro) {
    area.innerHTML = "<p class='mensagem'>Ops! Algo deu errado ao buscar. Tente novamente.</p>";
  }
}

// CREATE — salvar um favorito
async function salvarFavorito(nome, extra) {
  const { error } = await supabase.from("favoritos").insert({ nome_item: nome, dados_extra: extra });
  if (error) {
    console.error(error);
    alert("Não foi possível favoritar. Veja o console para detalhes.");
    return;
  }
  listarFavoritos();
}

// READ — listar favoritos
async function listarFavoritos() {
  const area = document.getElementById("lista-favoritos");
  const { data, error } = await supabase.from("favoritos").select("*").order("created_at");

  if (error) {
    area.innerHTML = "<p class='mensagem'>Não foi possível carregar os favoritos.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    area.innerHTML = "<p class='mensagem'>Nenhum favorito ainda.</p>";
    return;
  }

  area.innerHTML = "";
  data.forEach((fav) => {
    const item = document.createElement("div");
    item.className = "favorito-card";
    item.innerHTML = `
      <div class="favorito-info">
        <strong>${fav.nome_item}</strong>
        <p>${fav.dados_extra || ""}</p>
      </div>
      <button class="botao-remover">Excluir</button>
    `;
    item.querySelector(".botao-remover").addEventListener("click", () => removerFavorito(fav.id));
    area.appendChild(item);
  });
}

// DELETE — remover um favorito
async function removerFavorito(id) {
  const { error } = await supabase.from("favoritos").delete().eq("id", id);
  if (error) {
    console.error(error);
    alert("Não foi possível excluir. Veja o console para detalhes.");
    return;
  }
  listarFavoritos();
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

// Carrega os favoritos já salvos assim que a página abre
listarFavoritos();
