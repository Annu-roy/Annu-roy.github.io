/*********** ELECTRONIC MESSAGE BOARD (LETTER-BY-LETTER) ***********/
const phrases = [
  "I'm a Data Analyst",
  "I'm a Data Science Enthusiast"
];
let currentPhraseIndex = 0;
let charIndex = 0;
const typingSpeed = 100;  // ms per char
const holdTime = 1000;    // ms to hold after a phrase is fully typed

const electronicText = document.getElementById("electronic-text");

function typePhrase() {
  if (!electronicText) return;

  // if we've typed the entire phrase
  if (charIndex < phrases[currentPhraseIndex].length) {
    // add next character
    electronicText.textContent += phrases[currentPhraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, typingSpeed);
  } else {
    // hold for a bit, then clear and go to next phrase
    setTimeout(() => {
      // clear text
      electronicText.textContent = "";
      charIndex = 0;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      // type the next phrase
      typePhrase();
    }, holdTime);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // start typing
  typePhrase();

  /*********** PORTFOLIO TAB SWITCHING ***********/
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove 'active' from all
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // add 'active' to clicked
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });

  /*********** OUTPUT / PLATFORMS CAROUSEL ***********/
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselLeftBtn = document.getElementById("carousel-left");
  const carouselRightBtn = document.getElementById("carousel-right");
  let currentSlide = 0;

  const boxes = Array.from(document.querySelectorAll(".platform-box"));
  // approximate box width + gap for horizontal shift
  const boxWidth = boxes[0].offsetWidth + 16; 

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * boxWidth}px)`;
  }

  carouselLeftBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  // 3 boxes visible at once if wide enough; for the 4th box we shift
  carouselRightBtn.addEventListener("click", () => {
    if (currentSlide < boxes.length - 3) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Clicking a platform box -> open data-link
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const link = box.getAttribute("data-link");
      if (link) {
        window.open(link, "_blank");
      }
    });
  });
});
