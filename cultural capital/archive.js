import { db } from "./firebase-config.js";

import {
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const graph =
document.getElementById("graph");


const submissions =
await getDocs(collection(db,"submissions"));


let index=0;


submissions.forEach(doc=>{


const data=doc.data();


let portrait =
document.createElement("img");


portrait.src=data.portraitURL;


portrait.className="portrait";


// horizontal position
let x =
(index+1)*100;


// vertical position based on total

let y =
Math.max(
50,
700-(data.total*5)
);


// slight horizontal variation

x += Math.random()*40-20;


portrait.style.left=x+"px";

portrait.style.bottom=y+"px";


portrait.onclick=()=>{

openPopup(data);

};


graph.appendChild(portrait);


index++;


});




function openPopup(data){


document
.getElementById("popup")
.classList.remove("hidden");


document
.getElementById("largePortrait")
.src=data.portraitURL;


document
.getElementById("total")
.innerHTML=
"Total: "+data.total;


let text="";


for(let key in data.answers){

text+=
key+": "
+
data.answers[key]
+
"<br>";

}


document
.getElementById("answers")
.innerHTML=text;


}



window.closePopup=function(){

document
.getElementById("popup")
.classList.add("hidden");

}
