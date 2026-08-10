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

// --------------------------------------------------
// CLOSE POPUP
// --------------------------------------------------

window.closePopup = function () {
    if (popup) {
        popup.classList.add("hidden");
    }
};

// --------------------------------------------------
// OPEN SUBMISSION
// --------------------------------------------------

function openSubmission(submission) {
    if (!submission) {
        return;
    }

    if (largePortrait) {
        if (submission.portraitURL) {
            largePortrait.src = submission.portraitURL;
            largePortrait.style.display = "block";
        } else {
            largePortrait.removeAttribute("src");
            largePortrait.style.display = "none";
        }
    }

    if (totalElement) {
        totalElement.textContent =
            "Total: " + (Number(submission.total) || 0);
    }

    if (answersElement) {
        answersElement.innerHTML = "";

        if (submission.answers) {
            Object.entries(submission.answers).forEach(
                ([question, value]) => {

                    const line = document.createElement("p");

                    line.textContent =
                        question + ": " + value;

                    answersElement.appendChild(line);
                }
            );
        }
    }

    if (popup) {
        popup.classList.remove("hidden");
    }
}

// --------------------------------------------------
// LOAD SUBMISSIONS
// --------------------------------------------------

onValue(
    submissionsRef,
    (snapshot) => {

        graph.innerHTML = "";

        const data = snapshot.val();

        if (!data) {
            graph.textContent = "No submissions yet.";
            return;
        }

        const submissions = Object.values(data);

        if (submissions.length === 0) {
            graph.textContent = "No submissions yet.";
            return;
        }

        // --------------------------------------------------
        // SCORES
        // --------------------------------------------------

        const scores = submissions.map(
            (submission) => Number(submission.total) || 0
        );

        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);

        // --------------------------------------------------
        // GRAPH SCALE
        // --------------------------------------------------

        const scale = document.createElement("div");

        scale.className = "graphScale";

        // Vertical axis line
        const axis = document.createElement("div");

        axis.className = "scaleLine";

        scale.appendChild(axis);

        // Numbers
        const steps = 10;

        for (let i = 0; i <= steps; i++) {

            const number = document.createElement("span");

            let value = minScore;

            if (maxScore !== minScore) {
                value =
                    minScore +
                    ((maxScore - minScore) / steps) * i;
            }

            number.textContent = Math.round(value);

            number.className = "scaleNumber";

            // IMPORTANT:
            // Position relative to graphScale
            number.style.position = "absolute";

            number.style.bottom =
                (i / steps) * 100 + "%";

            number.style.transform =
                "translateY(50%)";

            scale.appendChild(number);
        }

        graph.appendChild(scale);

        // --------------------------------------------------
        // PORTRAITS
        // --------------------------------------------------

        submissions.forEach((submission) => {

            if (!submission.portraitURL) {
                return;
            }

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
                () => {
                    openSubmission(submission);
                }
            );

            graph.appendChild(portrait);
        });
    },
    (error) => {

        console.error(
            "Error loading submissions:",
            error
        );

        graph.innerHTML =
            "Unable to load submissions.";
    }
);
