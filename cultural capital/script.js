import { db, storage } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


const form = document.getElementById("capitalForm");


form.addEventListener("submit", async (e)=>{

e.preventDefault();


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



document.getElementById("result").innerHTML =

"Assessment completed.<br><br>Your data has been archived.";


// Later:
// upload portrait to Firebase Storage
// save answers to Firestore


console.log("Total:", points);


});
