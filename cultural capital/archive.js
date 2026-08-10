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

function showSubmission(submission) {

largePortrait.src = submission.portraitURL;

totalElement.textContent =
"Total: " + submission.total;

answersElement.innerHTML = "";

if (submission.answers) {

```
Object.keys(submission.answers).forEach(function(key) {

  const line = document.createElement("p");

  line.textContent =
    key + ": " + submission.answers[key];

  answersElement.appendChild(line);

});
```

}

popup.classList.remove("hidden");
}

window.closePopup = function() {

popup.classList.add("hidden");

};

onValue(submissionsRef, function(snapshot) {

graph.innerHTML = "";

const data = snapshot.val();

if (!data) {

```
graph.innerHTML =
  "<p>No submissions yet.</p>";

return;
```

}

const submissions =
Object.values(data);

const scores =
submissions.map(function(submission) {

```
  return Number(submission.total) || 0;

});
```

const minScore =
Math.min(...scores);

const maxScore =
Math.max(...scores);

// SCORE AXIS

const scale =
document.createElement("div");

scale.className =
"graphScale";

const line =
document.createElement("div");

line.className =
"scaleLine";

scale.appendChild(line);

// SCORE NUMBERS

const steps = 10;

for (let i = 0; i <= steps; i++) {

```
const number =
  document.createElement("span");


let value;


if (maxScore === minScore) {

  value = minScore;

} else {

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

// PORTRAITS

submissions.forEach(function(submission) {

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


// Vertical position based on score

let position = 50;


if (maxScore !== minScore) {

  position =
    ((score - minScore) /
    (maxScore - minScore)) * 90 + 5;

}


portrait.style.bottom =
  position + "%";


// All portraits on one side

portrait.style.left =
  "60%";


portrait.onclick =
  function() {

    showSubmission(submission);

  };


graph.appendChild(portrait);
```

});

});
