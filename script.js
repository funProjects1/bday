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

function checkPassword() {
  const input = document
    .getElementById("secretInput")
    .value.trim()
    .toLowerCase();
  const cardSection = document.getElementById("cardSection");
  const errorMsg = document.getElementById("errorMsg");

  if (input === "iloveyoubujji") {
    clockSound.pause();
    birthdaySong.play();
    cardSection.style.display = "block";
    document.querySelector(".password-form").style.display = "none";
    showNextReason();
  } else {
    errorSound.play();
    errorMsg.textContent = "Oops! That’s not the right word. Try again!";
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
