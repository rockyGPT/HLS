const streamForm = document.getElementById('streamForm');
const streamUrlInput = document.getElementById('streamUrl');
const playerContainer = document.getElementById('playerContainer');
const toggleFullScreen = document.getElementById('toggleFullScreen');

streamForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const streamUrl = streamUrlInput.value;

  const videoElement = document.createElement('video');
  videoElement.controls = true;

  const hls = new Hls();
  hls.loadSource(streamUrl);
  hls.attachMedia(videoElement);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
  videoElement.play();
  });
  
  const deleteStreamBtn = document.createElement('button');
  deleteStreamBtn.innerText = 'X';
  deleteStreamBtn.className = 'deleteStreamBtn';
  deleteStreamBtn.addEventListener('click', () => {
  playerContainer.removeChild(player);
  });
  
  const player = document.createElement('div');
  player.className = 'player';
  player.appendChild(videoElement);
  player.appendChild(deleteStreamBtn);
  
  playerContainer.appendChild(player);
  streamUrlInput.value = '';
  });
  
  toggleFullScreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (playerContainer.requestFullscreen) {
        playerContainer.requestFullscreen();
      } else if (playerContainer.mozRequestFullScreen) { // Firefox
        playerContainer.mozRequestFullScreen();
      } else if (playerContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
        playerContainer.webkitRequestFullscreen();
      } else if (playerContainer.msRequestFullscreen) { // IE/Edge
        playerContainer.msRequestFullscreen();
      }
      playerContainer.classList.add('fullscreen');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      playerContainer.classList.remove('fullscreen');
    }
    resizeGrid();
  });
  
  function resizeGrid() {
    const playerCount = playerContainer.childElementCount;
    if (playerContainer.classList.contains('fullscreen')) {
      if (playerCount === 1) {
        playerContainer.style.gridTemplateColumns = '1fr';
      } else if (playerCount === 2) {
        playerContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else if (playerCount >= 3 && playerCount <= 4) {
        playerContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else if (playerCount >= 5 && playerCount <= 6) {
        playerContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
    } else {
      playerContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    }
  }
