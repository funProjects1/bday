let reasons = []; // Declare as a global array

fetch("./reason.json")
  .then((response) => response.json())
  .then((data) => {
    reasons = data.reasons;
  })
  .catch((error) => {
    console.error("Error loading reasons:", error);
  });

let currentReasonIndex = 0;

const clockSound = document.getElementById("clockSound");
const errorSound = document.getElementById("errorSound");
const birthdaySong = document.getElementById("birthdaySong");

clockSound.volume = 0.4;
clockSound.play();

function levenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}

function getSimilarityPercentage(input, correct) {
  const distance = levenshteinDistance(input, correct);
  const maxLen = Math.max(input.length, correct.length);
  const similarity = ((1 - distance / maxLen) * 100).toFixed(1);
  return similarity;
}

function checkPassword() {
  const input = document.getElementById("secretInput").value.trim().toLowerCase();
  const cardSection = document.getElementById("cardSection");
  const errorMsg = document.getElementById("errorMsg");

  const correctPassword = "iloveyoubujji";

  if (input === correctPassword) {
    clockSound.pause();
    birthdaySong.play();
    cardSection.style.display = "block";
    document.querySelector(".password-form").style.display = "none";
    showNextReason();
  } else {
    errorSound.play();
    const similarity = getSimilarityPercentage(input, correctPassword);
    errorMsg.textContent = `You're ${similarity}% close to the correct word. Keep trying!`;
  }
}


function showNextReason() {
  const reasonText = document.getElementById("reasonText");
  reasonText.textContent = reasons[currentReasonIndex];
  currentReasonIndex = (currentReasonIndex + 1) % reasons.length;
}

function updateCountdown() {
  const countdownEl = document.getElementById("countdownTimer");
  const birthday = new Date("2025-05-29T00:00:00");
  const now = new Date();
  const diff = birthday - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `🎂 Bunny's birthday in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    countdownEl.textContent = `🎉 It's Bunny's Birthday Today! 🎉`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
