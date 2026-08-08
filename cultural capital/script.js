import { db, storage } from "./firebase.js";

import {
  ref as databaseRef,
  push,
  set
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const form = document.getElementById("capitalForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {

    // Calculate total
    let points = 0;

    points += Number(document.getElementById("accent").value);
    points += Number(document.getElementById("languages").value || 0);
    points += Number(document.getElementById("gdp").value || 0);
    points += Number(document.getElementById("parents").value);
    points += Number(document.getElementById("bothParents").value);
    points += Number(document.getElementById("fatherGDP").value || 0);
    points += Number(document.getElementById("motherGDP").value || 0);
    points += Number(document.getElementById("fatherDegree").value);
    points += Number(document.getElementById("motherDegree").value);
    points += Number(document.getElementById("license").value);
    points += Number(document.getElementById("joke").value);


    // Collect answers
    const answers = {
      accent: Number(document.getElementById("accent").value),
      languages: Number(document.getElementById("languages").value || 0),
      gdp: Number(document.getElementById("gdp").value || 0),
      parents: Number(document.getElementById("parents").value),
      bothParents: Number(document.getElementById("bothParents").value),
      fatherGDP: Number(document.getElementById("fatherGDP").value || 0),
      motherGDP: Number(document.getElementById("motherGDP").value || 0),
      fatherDegree: Number(document.getElementById("fatherDegree").value),
      motherDegree: Number(document.getElementById("motherDegree").value),
      license: Number(document.getElementById("license").value),
      joke: Number(document.getElementById("joke").value),
      books: Number(document.getElementById("books").value || 0),
      works: Number(document.getElementById("works").value || 0),
      atelier: Number(document.getElementById("atelier").value),
      master: Number(document.getElementById("master").value || 0),
      bachelor: Number(document.getElementById("bachelor").value || 0),
      languageLevel: Number(document.getElementById("languageLevel").value || 0)
    };


    // Get portrait
    const file = document.getElementById("portrait").files[0];

    if (!file) {
      alert("Please upload a portrait.");
      return;
    }


    // Upload portrait
    const imageRef = storageRef(
      storage,
      "portraits/" + Date.now() + "_" + file.name
    );

    await uploadBytes(imageRef, file);

    const portraitURL = await getDownloadURL(imageRef);

    console.log("Portrait uploaded:", portraitURL);


    // Create database reference
    const submissionRef = push(
      databaseRef(db, "submissions")
    );


    // Save submission
    await set(submissionRef, {
      portraitURL: portraitURL,
      total: points,
      timestamp: Date.now(),
      answers: answers
    });


    console.log("DATABASE SAVED!");

    alert("Submission archived.");

  } catch (error) {

    console.error("ERROR:", error);

    alert("There was an error saving your submission. Check the console.");

  }
});
