import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const graph = document.getElementById("graph");

const popup = document.getElementById("popup");
const largePortrait = document.getElementById("largePortrait");
const totalElement = document.getElementById("total");
const answersElement = document.getElementById("answers");

// Listen for all submissions
const submissionsRef = ref(db, "submissions");

onValue(submissionsRef, (snapshot) => {

graph.innerHTML = "";

const data = snapshot.val();

if (!data) {
graph.innerHTML = "<p>No submissions yet.</p>";
return;
}

const submissions = Object.values(data);

const scores = submissions.map(
submission => Number(submission.total) || 0
);

const minScore = Math.min(...scores);
const maxScore = Math.max(...scores);

// =========================
// VERTICAL SCORE AXIS
// =========================

const scale = document.createElement("div");

scale.className = "graphScale";

const scaleLine = document.createElement("div");

scaleLine.className = "scaleLine";

scale.appendChild(scaleLine);

const numberOfSteps = 10;

for (let i = 0; i <= numberOfSteps; i++) {

```
const number = document.createElement("span");

let value;

if (maxScore === minScore) {

  value = minScore;

} else {

  value =
    minScore +
    ((maxScore - minScore) / numberOfSteps) * i;

}

number.textContent =
  Math.round(value);

number.className =
  "scaleNumber";

number.style.bottom =
  (i / numberOfSteps) * 100 + "%";

scale.appendChild(number);
```

}

graph.appendChild(scale);

// =========================
// PORTRAITS
// =========================

submissions.forEach((submission, index) => {

```
const portrait =
  document.createElement("img");

portrait.className =
  "archivePortrait";

portrait.src =
  submission.portraitURL;

portrait.alt =
  "Cultural capital submission";


const score =
  Number(submission.total) || 0;


// Vertical position = score

let verticalPosition = 50;

if (maxScore !== minScore) {

  verticalPosition =
    ((score - minScore) /
    (maxScore - minScore)) * 90 + 5;

}

portrait.style.bottom =
  verticalPosition + "%";


// All portraits stay on the right
// of the vertical score axis

portrait.style.left =
  "60%";


// If several portraits have the same
// score, arrange them horizontally

const sameScore =
  submissions.filter(
    item =>
      Number(item.total) === score
  );

const positionInGroup =
  sameScore.indexOf(submission);

if (sameScore.length > 1) {

  const spacing = 12;

  const totalWidth =
    (sameScore.length - 1) * spacing;

  portrait.style.left =
    (60 - totalWidth / 2 +
    positionInGroup * spacing) + "%";

}


// =========================
// CLICK PORTRAIT
// =========================

portrait.addEventListener(
  "click",
  () => {

    largePortrait.src =
      submission.portraitURL;

    totalElement.textContent =
      "Total: " + submission.total;

    answersElement.innerHTML = "";


    if (submission.answers) {

      Object.entries(
        submission.answers
      ).forEach(([question, value]) => {

        const line =
          document.createElement("p");

        line.textContent =
          question + ": " + value;

        answersElement.appendChild(
          line
        );

      });

    }

    popup.classList.remove(
      "hidden"
    );

  }
);


graph.appendChild(
  portrait
);
```

});

});

// Close popup

window.closePopup = function () {

popup.classList.add(
"hidden"
);

};

