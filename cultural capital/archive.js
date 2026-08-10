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

const submissionsRef = ref(db, "submissions");

window.closePopup = function () {
popup.classList.add("hidden");
};

function openSubmission(submission) {

largePortrait.src = submission.portraitURL;

totalElement.textContent =
"Total: " + submission.total;

answersElement.innerHTML = "";

if (submission.answers) {

```
Object.entries(submission.answers).forEach(
  ([question, value]) => {

    const line =
      document.createElement("p");

    line.textContent =
      question + ": " + value;

    answersElement.appendChild(line);
  }
);
```

}

popup.classList.remove("hidden");
}

onValue(submissionsRef, (snapshot) => {

graph.innerHTML = "";

const data = snapshot.val();

if (!data) {
graph.innerHTML = "<p>No submissions yet.</p>";
return;
}

const submissions =
Object.values(data);

const scores =
submissions.map(
submission => Number(submission.total) || 0
);

const minScore =
Math.min(...scores);

const maxScore =
Math.max(...scores);

// Create vertical score axis

const scale =
document.createElement("div");

scale.className =
"graphScale";

const axis =
document.createElement("div");

axis.className =
"scaleLine";

scale.appendChild(axis);

// Add numbers

const steps = 10;

for (let i = 0; i <= steps; i++) {

```
const number =
  document.createElement("span");


let value = minScore;


if (maxScore !== minScore) {

  value =
    minScore +
    ((maxScore - minScore) / steps) * i;
}


number.textContent =
  Math.round(value);


number.className =
  "scaleNumber";


number.style.bottom =
  (i / steps) * 100 + "%";


scale.appendChild(number);
```

}

graph.appendChild(scale);

// Add portraits

submissions.forEach((submission) => {

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


let position = 50;


if (maxScore !== minScore) {

  position =
    ((score - minScore) /
    (maxScore - minScore)) * 90 + 5;
}


portrait.style.bottom =
  position + "%";


portrait.style.left =
  "60%";


portrait.addEventListener(
  "click",
  function () {
    openSubmission(submission);
  }
);


graph.appendChild(portrait);
```

}

});
