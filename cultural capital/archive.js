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

// Firebase submissions
const submissionsRef = ref(db, "submissions");

onValue(submissionsRef, function(snapshot) {

graph.innerHTML = "";

const data = snapshot.val();

// No submissions
if (!data) {
graph.innerHTML = "<p>No submissions yet.</p>";
return;
}

const submissions = Object.values(data);

// Find score range
const scores = submissions.map(function(submission) {
return Number(submission.total) || 0;
});

const minScore = Math.min.apply(null, scores);
const maxScore = Math.max.apply(null, scores);

// =================================
// VERTICAL SCORE AXIS
// =================================

const scale = document.createElement("div");

scale.className = "graphScale";

const scaleLine = document.createElement("div");

scaleLine.className = "scaleLine";

scale.appendChild(scaleLine);

// Ten numbered divisions
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


number.textContent = Math.round(value);

number.className = "scaleNumber";


// Bottom = low score
// Top = high score
number.style.bottom =
  (i / numberOfSteps) * 100 + "%";


scale.appendChild(number);
```

}

graph.appendChild(scale);

// =================================
// PORTRAITS
// =================================

submissions.forEach(function(submission, index) {

```
const portrait = document.createElement("img");


portrait.className = "archivePortrait";


portrait.src =
  submission.portraitURL;


portrait.alt =
  "Cultural capital submission";


const score =
  Number(submission.total) || 0;


// Calculate vertical position

let verticalPosition = 50;


if (maxScore !== minScore) {

  verticalPosition =
    ((score - minScore) /
    (maxScore - minScore)) * 90 + 5;

}


portrait.style.bottom =
  verticalPosition + "%";


// Keep portraits on one side

portrait.style.left = "60%";


// =================================
// CLICK PORTRAIT
// =================================

portrait.addEventListener("click", function() {

  largePortrait.src =
    submission.portraitURL;


  totalElement.textContent =
    "Total: " + score;


  answersElement.innerHTML = "";


  if (submission.answers) {

    Object.entries(submission.answers).forEach(
      function(entry) {

        const question = entry[0];
        const value = entry[1];


        const line =
          document.createElement("p");


        line.textContent =
          question + ": " + value;


        answersElement.appendChild(line);

      }
    );

  }


  popup.classList.remove("hidden");

});


graph.appendChild(portrait);
```

});

});

// =================================
// CLOSE POPUP
// =================================

window.closePopup = function() {

popup.classList.add("hidden");

};
