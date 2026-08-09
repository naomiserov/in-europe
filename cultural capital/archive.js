import { db } from “./firebase.js”;

import {
ref,
onValue
} from “https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js”;

const graph = document.getElementById(“graph”);

const popup = document.getElementById(“popup”);
const largePortrait = document.getElementById(“largePortrait”);
const totalElement = document.getElementById(“total”);
const answersElement = document.getElementById(“answers”);

// Listen for all submissions
const submissionsRef = ref(db, “submissions”);

onValue(submissionsRef, (snapshot) => {

graph.innerHTML = “”;

const data = snapshot.val();

if (!data) {
graph.innerHTML = “No submissions yet.”;
return;
}

const submissions = Object.values(data);

// Find highest and lowest scores
const scores = submissions.map(
submission => Number(submission.total) || 0
);

const minScore = Math.min(…scores);
const maxScore = Math.max(…scores);

// =========================
// NUMERICAL GRAPH SCALE
// =========================

const scale = document.createElement(“div”);

scale.className = “graphScale”;

const scaleLine = document.createElement(“div”);

scaleLine.className = “scaleLine”;

scale.appendChild(scaleLine);

// Create 10 numbered points on the scale
const numberOfSteps = 10;

for (let i = 0; i <= numberOfSteps; i++) {

const number = document.createElement("span");
let value;
if (maxScore === minScore) {
  value = minScore;
} else {
  value =
    minScore +
    ((maxScore - minScore) / numberOfSteps) * i;
}
number.textContent = Math.round(value);
number.className = "scaleNumber";
number.style.left =
  (i / numberOfSteps) * 100 + "%";
scale.appendChild(number);

}

graph.appendChild(scale);

// =========================
// PORTRAITS
// =========================

submissions.forEach((submission) => {

const portrait = document.createElement("img");
portrait.className = "archivePortrait";
portrait.src = submission.portraitURL;
portrait.alt = "Cultural capital submission";
// Position horizontally according to score
let position = 50;
if (maxScore !== minScore) {
  position =
    ((Number(submission.total) - minScore) /
    (maxScore - minScore)) * 90 + 5;
}
portrait.style.left =
  position + "%";
// Give each portrait a vertical position
const randomHeight =
  10 + Math.random() * 65;
portrait.style.top =
  randomHeight + "%";
// Click portrait
portrait.addEventListener("click", () => {
  largePortrait.src =
    submission.portraitURL;
  totalElement.textContent =
    "Total: " + submission.total;
  answersElement.innerHTML = "";
  if (submission.answers) {
    Object.entries(submission.answers)
      .forEach(([question, value]) => {
        const line =
          document.createElement("p");
        line.textContent =
          question + ": " + value;
        answersElement.appendChild(line);
      });
  }
  popup.classList.remove("hidden");
});
graph.appendChild(portrait);

});

});

// Close popup
window.closePopup = function () {

popup.classList.add(“hidden”);

};
