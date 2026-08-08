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

  // Find highest and lowest scores
  const scores = submissions.map(
    submission => Number(submission.total) || 0
  );

  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

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

    portrait.style.left = position + "%";


    // Give each portrait a different vertical position
    const randomHeight =
      10 + Math.random() * 70;

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

  popup.classList.add("hidden");

};
