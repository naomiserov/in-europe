import { db, storage } from "./firebase.js";

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



const file =
document.getElementById("portrait").files[0];


if(!file){

alert("Please upload a portrait.");

return;

}


// upload image

const imageRef =
ref(
storage,
"portraits/" + Date.now() + "_" + file.name
);


await uploadBytes(imageRef,file);


const portraitURL =
await getDownloadURL(imageRef);



// collect answers

const answers = {

accent:
Number(document.getElementById("accent").value),

languages:
Number(document.getElementById("languages").value || 0),

gdp:
Number(document.getElementById("gdp").value || 0),

parents:
Number(document.getElementById("parents").value),

bothParents:
Number(document.getElementById("bothParents").value),


books:
Number(document.getElementById("books").value || 0),

works:
Number(document.getElementById("works").value || 0),

atelier:
Number(document.getElementById("atelier").value),


master:
Number(document.getElementById("master").value || 0),

bachelor:
Number(document.getElementById("bachelor").value || 0),

languageLevel:
Number(document.getElementById("languageLevel").value)

};



// save submission

await addDoc(
collection(db,"submissions"),
{

portraitURL,

total:points,

answers,

timestamp:
Date.now()

}

);



alert("Submission archived.");

});


