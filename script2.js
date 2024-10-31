const control = document.getElementById("control");
const playArea = document.getElementById("play-area");
const startButton = document.getElementById("start-sound");

const audioTopLeft = document.getElementById("top-left-audio");
const audioTopRight = document.getElementById("top-right-audio");
const audioBottomLeft = document.getElementById("bottom-left-audio");
const audioBottomRight = document.getElementById("bottom-right-audio");

// Definindo volume inicial e volume máximo
const initialVolume = 0.0;  // volume mínimo para quando longe do canto em questão
const maxVolume = 1.0;      // volume máximo quando bem próximo do canto em questão

audioTopLeft.volume = initialVolume;
audioTopRight.volume = initialVolume;
audioBottomLeft.volume = initialVolume;
audioBottomRight.volume = initialVolume;

// Função para iniciar os sons após o clique do usuário
startButton.addEventListener("click", () => {
  audioTopLeft.play();
  audioTopRight.play();
  audioBottomLeft.play();
  audioBottomRight.play();
  startButton.style.display = "none"; // Esconde o botão após iniciar os sons
});

// Função para mover o botão de controle/presença de acordo com a posição do mouse
playArea.addEventListener("mousemove", (event) => {
  const rect = playArea.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Atualizando a posição do mouse
  control.style.left = `${mouseX - control.offsetWidth / 2}px`;
  control.style.top = `${mouseY - control.offsetHeight / 2}px`;

  // Ajustando a distância máxima para reforçar as diferenças de volume com relação ao movimento do mouse
  const maxDist = (playArea.clientWidth + playArea.clientHeight) / 2;

  // Calcula as distâncias para cada lado
  const distanceTopLeft = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(mouseY, 2));
  const distanceTopRight = Math.sqrt(Math.pow(playArea.clientWidth - mouseX, 2) + Math.pow(mouseY, 2));
  const distanceBottomLeft = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(playArea.clientHeight - mouseY, 2));
  const distanceBottomRight = Math.sqrt(Math.pow(playArea.clientWidth - mouseX, 2) + Math.pow(playArea.clientHeight - mouseY, 2));

  // Ajusta o volume para cada canto com referência dos volumes mais extremos
  audioTopLeft.volume = Math.max(initialVolume, maxVolume * (1 - distanceTopLeft / maxDist));
  audioTopRight.volume = Math.max(initialVolume, maxVolume * (1 - distanceTopRight / maxDist));
  audioBottomLeft.volume = Math.max(initialVolume, maxVolume * (1 - distanceBottomLeft / maxDist));
  audioBottomRight.volume = Math.max(initialVolume, maxVolume * (1 - distanceBottomRight / maxDist));
});
