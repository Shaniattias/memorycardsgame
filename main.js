function openInstructions() {
    document.getElementById('instructions-popup').style.display = 'block';
  }
  
  function closeInstructions() {
    document.getElementById('instructions-popup').style.display = 'none';
  }
  
  function startGame(event) {
    event.preventDefault();
    var playerName = document.getElementById('playerName').value;
    var pairs = parseInt(document.getElementById('pairs').value);
    if (playerName.length < 2 || pairs < 1) {
      alert("שם המשתמש חייב להיות בעל 2 תווים לפחות ומספר זוגות הקלפים חייב להיות לפחות 1.");
    } else {
      window.location.href = "./index.html?playerName=" + encodeURIComponent(playerName) + "&pairs=" + encodeURIComponent(pairs);
    }
  }
  