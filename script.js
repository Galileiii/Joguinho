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