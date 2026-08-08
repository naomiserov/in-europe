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

    // Calculate total points

    let points = 0;

    points += Number(document.getElementById("accent").value || 0);
    points += Number(document.getElementById("languages").value || 0);
    points += Number(document.getElementById("gdp").value || 0);
    points += Number(document.getElementById("parents").value || 0);
    points += Number(document.getElementById("bothParents").value || 0);
    points += Number(document.getElementById("fatherGDP").value || 0);
    points += Number(document.getElementById("motherGDP").value || 0);
    points += Number(document.getElementById("fatherDegree").value || 0);
    points += Number(document.getElementById("motherDegree").value || 0);
    points += Number(document.getElementById("license").value || 0);
    points += Number(document.getElementById("joke").value || 0);


    // Collect answers

    const answers = {
      accent: Number(document.getElementById("accent").value || 0),
      languages: Number(document.getElementById("languages").value || 0),
      gdp: Number(document.getElementById("gdp").value || 0),
      parents: Number(document.getElementById("parents").value || 0),
      bothParents: Number(document.getElementById("bothParents").value || 0),
      fatherGDP: Number(document.getElementById("fatherGDP").value || 0),
      motherGDP: Number(document.getElementById("motherGDP").value || 0),
      fatherDegree: Number(document.getElementById("fatherDegree").value || 0),
      motherDegree: Number(document.getElementById("motherDegree").value || 0),
      license: Number(document.getElementById("license").value || 0),
      joke: Number(document.getElementById("joke").value || 0),
      books: Number(document.getElementById("books").value || 0),
      works: Number(document.getElementById("works").value || 0),
      atelier: Number(document.getElementById("atelier").value || 0),
      master: Number(document.getElementById("master").value || 0),
      bachelor: Number(document.getElementById("bachelor").value || 0),
      languageLevel: Number(document.getElementById("languageLevel").value || 0)
    };


    // Check portrait

    const portraitInput = document.getElementById("portrait");

    if (!portraitInput || portraitInput.files.length === 0) {
      alert("Please upload a portrait.");
      return;
    }

    const file = portraitInput.files[0];


    // Upload portrait

    const imageRef = storageRef(
      storage,
      "portraits/" + Date.now() + "_" + file.name
    );

    await uploadBytes(imageRef, file);

    const portraitURL = await getDownloadURL(imageRef);


    // Create database reference

    const submissionsRef = databaseRef(
      db,
      "submissions"
    );

    const newSubmissionRef = push(
      submissionsRef
    );


    // Save submission

    await set(newSubmissionRef, {
      portraitURL: portraitURL,
      total: points,
      timestamp: Date.now(),
      answers: answers
    });


    // Success

    console.log("Portrait uploaded:", portraitURL);
    console.log("DATABASE SAVED!");
    console.log("TOTAL:", points);

    alert("Submission archived.");

  } catch (error) {

    console.error(
      "ERROR SAVING SUBMISSION:",
      error
    );

    alert(
      "There was an error saving the submission. Check the browser console."
    );

  }

});
