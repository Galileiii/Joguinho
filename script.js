// Define o volume inicial das músicas ao carregar a página
window.addEventListener("DOMContentLoaded", function () {
  const musicaFundo = document.getElementById("musica-fundo");
  if (musicaFundo) musicaFundo.volume = 0.7;

  const musicaFundo2 = document.getElementById("musica-fundo2");
  if (musicaFundo2) musicaFundo2.volume = 0.7;
});

function trocarTela(saindo, entrando) {
  saindo.classList.add("oculta");
  setTimeout(() => {
    saindo.style.display = "none";
    entrando.style.display = "flex";
    setTimeout(() => {
      entrando.classList.remove("oculta");
    }, 10);
  }, 500);
}

document.getElementById("btn-jogar").addEventListener("click", function () {
  // Som de clique
  const audioClick = document.getElementById("audio-click");
  if (audioClick) {
    audioClick.currentTime = 0;
    audioClick.volume = 1.0;
    audioClick.play();
  }

  // Fade out da música 1, só toca a 2 depois do fade
  const musicaFundo = document.getElementById("musica-fundo");
  const musicaFundo2 = document.getElementById("musica-fundo2");
  if (musicaFundo) {
    let fadeAudio = setInterval(function () {
      if (musicaFundo.volume > 0.01) {
        musicaFundo.volume -= 0.01;
      } else {
        musicaFundo.volume = 0;
        clearInterval(fadeAudio);
        musicaFundo.pause();
        // Só toca a música 2 depois do fade out terminar
        if (musicaFundo2) {
          musicaFundo2.currentTime = 0;
          musicaFundo2.volume = 0.7;
          musicaFundo2.play();
        }
      }
    }, 30);
  } else if (musicaFundo2) {
    // fallback: se não houver música 1, toca a 2 direto
    musicaFundo2.currentTime = 0;
    musicaFundo2.volume = 0.7;
    musicaFundo2.play();
  }

  // Troca de tela com transição
  const telaInicial = document.getElementById("tela-inicial");
  const telaJogo = document.getElementById("tela-jogo");
  trocarTela(telaInicial, telaJogo);
});

document.getElementById("btn-voltar").addEventListener("click", function () {
  // Pausa música do jogo
  const musicaFundo2 = document.getElementById("musica-fundo2");
  if (musicaFundo2) {
    musicaFundo2.pause();
    musicaFundo2.currentTime = 0;
  }

  // Restaura música inicial
  const musicaFundo = document.getElementById("musica-fundo");
  if (musicaFundo) {
    musicaFundo.currentTime = 0;
    musicaFundo.volume = 0.7;
    musicaFundo.play();
  }

  // Troca de tela com transição
  const telaInicial = document.getElementById("tela-inicial");
  const telaJogo = document.getElementById("tela-jogo");
  trocarTela(telaJogo, telaInicial);
});

// Garante que a música toque no primeiro clique do usuário, se o navegador bloquear autoplay
document.body.addEventListener("click", function () {
  const musicaFundo = document.getElementById("musica-fundo");
  if (musicaFundo && musicaFundo.paused) {
    musicaFundo.play();
  }
}, { once: true });
const musica = document.getElementById("musica-fundo2");
const slider = document.getElementById("slider-volume");
slider.addEventListener("input", () => {
  musica.volume = slider.value;
});
//Definir as categorias e as imagens---------------------------------------------
const opcoes = {
  hair: ["./assets/hair-1.png", "./assets/hair-2.png","./assets/hair-3.png","./assets/hair-4.png","./assets/hair-5.png"],
  brows: ["./assets/eyebrow-1.png", "./assets/eyebrow-2.png","./assets/eyebrow-3.png","./assets/eyebrow-4.png","./assets/eyebrow-5.png"],
  eyes: ["./assets/eye-1.png", "./assets/eye-2.png","./assets/eye-3.png","./assets/eye-4.png"],
  mouth: ["./assets/mouth-1.png","./assets/mouth-2.png","./assets/mouth-3.png","./assets/mouth-4.png","./assets/mouth-5.png","./assets/mouth-6.png","./assets/mouth-7.png", "./assets/mouth-8.png", "./assets/mouth-9.png","./assets/mouth-10.png", "./assets/mouth-11.png", "./assets/mouth-12.png", "./assets/mouth-13.png", "./assets/mouth-14.png", "./assets/mouth-15.png"],
  top: ["./assets/top-1.png", "./assets/top-2.png","./assets/top-3.png","./assets/top-4.png","./assets/top-5.png","./assets/top-6.png","./assets/top-7.png","./assets/top-8.png","./assets/top-9.png","./assets/top-10.png"],
   bottom: ["./assets/bottom-1.png", "./assets/bottom-2.png","./assets/bottom-3.png","./assets/bottom-4.png"],  
  acc1: ["./assets/acc-1.png", "./assets/acc-2.png","./assets/acc-3.png","./assets/acc-4.png","./assets/acc-5.png","./assets/acc-6.png","./assets/acc-7.png","./assets/acc-8.png","./assets/acc-9.png","./assets/acc-10.png"],
  acc2: ["./assets/acc-1.png", "./assets/acc-2.png","./assets/acc-3.png","./assets/acc-4.png","./assets/acc-5.png","./assets/acc-6.png","./assets/acc-7.png","./assets/acc-8.png","./assets/acc-9.png","./assets/acc-10.png"],
  acc3: ["./assets/acc-1.png", "./assets/acc-2.png","./assets/acc-3.png","./assets/acc-4.png","./assets/acc-5.png","./assets/acc-6.png","./assets/acc-7.png","./assets/acc-8.png","./assets/acc-9.png","./assets/acc-10.png"],
  neck: ["./assets/neck-1.png", "./assets/neck-2.png","./assets/neck-3.png","./assets/neck-4.png","./assets/neck-5.png"],
  glasses: ["./assets/glasses-1.png", "./assets/glasses-2.png","./assets/glasses-3.png","./assets/glasses-4.png","./assets/glasses-5.png"]
};
//Variáveis de controle--------------------------------------------------------------------
// Guarda qual categoria está selecionada
let categoriaAtual = "hair";

// Guarda qual índice de imagem está em uso em cada categoria
const indices = {
  hair: 0,
  brows: 0,
  eyes: 0,
  mouth: 0,
  top: 0,
  bottom: 0,
  acc1: 0,
  acc2: 0,
  acc3: 0,
  neck: 0,
  glasses: 0
};
//Selecionar os elementos de imagem-------------------------------------------------------
const imagens = {
  hair: document.getElementById("hair"),
  brows: document.getElementById("brows"),
  eyes: document.getElementById("eyes"),
  mouth: document.getElementById("mouth"),
  top: document.getElementById("top"),
    bottom: document.getElementById("bottom"),
  acc1: document.getElementById("acc1"),
  acc2: document.getElementById("acc2"),
  acc3: document.getElementById("acc3"),
  neck: document.getElementById("neck"),
  glasses: document.getElementById("glasses")
};
//Lógica de mudança com as setas------------------------------------------------------
// Botões de trocar
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

btnPrev.addEventListener("click", () => mudarItem(-1));
btnNext.addEventListener("click", () => mudarItem(1));

function mudarItem(direcao) {
  const lista = opcoes[categoriaAtual];
  if (!lista) return;

  indices[categoriaAtual] += direcao;

  // Faz o índice "circular" (voltar ao início se passar do fim)
  if (indices[categoriaAtual] < 0) indices[categoriaAtual] = lista.length - 1;
  if (indices[categoriaAtual] >= lista.length) indices[categoriaAtual] = 0;

  imagens[categoriaAtual].src = lista[indices[categoriaAtual]];
}
//Escolher a categoria (os ícones da esquerda)-------------------------------------------------
// Pega todos os ícones da esquerda
const botoesCategoria = document.querySelectorAll("#painel-esquerda img");

botoesCategoria.forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.alt; // o nome está no atributo alt
    console.log("Categoria selecionada:", categoriaAtual);
  });
});
//Botões de Reset, Random e Save---------------------------------------------------
// --- Reset ---
document.getElementById("btn-reset").addEventListener("click", () => {
  for (let key in imagens) {
    imagens[key].src = "";
    indices[key] = 0;
  }
});

// --- Random ---
document.getElementById("btn-random").addEventListener("click", () => {
  for (let key in imagens) {
    const lista = opcoes[key];
    const aleatorio = Math.floor(Math.random() * lista.length);
    indices[key] = aleatorio;
    imagens[key].src = lista[aleatorio];
  }
});

// --- Save (tirar print) ---
document.getElementById("btn-save").addEventListener("click", () => {
  html2canvas(document.querySelector("#personagem-container")).then(canvas => {
    const link = document.createElement("a");
    link.download = "meu-personagem.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});