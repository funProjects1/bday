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

function analyzeGuess(input, correct) {
  let correctPlace = 0;
  let wrongPlace = 0;

  const usedInCorrect = Array(correct.length).fill(false);
  const usedInInput = Array(input.length).fill(false);

  // First pass: exact matches
  for (let i = 0; i < Math.min(input.length, correct.length); i++) {
    if (input[i] === correct[i]) {
      correctPlace++;
      usedInCorrect[i] = true;
      usedInInput[i] = true;
    }
  }

  // Second pass: wrong position matches
  for (let i = 0; i < input.length; i++) {
    if (usedInInput[i]) continue;
    for (let j = 0; j < correct.length; j++) {
      if (!usedInCorrect[j] && input[i] === correct[j]) {
        wrongPlace++;
        usedInCorrect[j] = true;
        break;
      }
    }
  }

  return { correctPlace, wrongPlace };
}

function checkPassword() {
  const input = document
    .getElementById("secretInput")
    .value.trim()
    .toLowerCase();
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
    const { correctPlace, wrongPlace } = analyzeGuess(input, correctPassword);
    const totalMatched = correctPlace + wrongPlace;

    const similarity = Math.floor(
      (totalMatched / correctPassword.length) * 100
    );

    errorMsg.innerHTML = `
      <strong>Hint 1:</strong> 🔍 You're ${similarity}% close.<br>
      <strong>Hint 2:</strong> ✅ ${correctPlace} in correct place, 🔁 ${wrongPlace} correct but in wrong place.
    `;
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
