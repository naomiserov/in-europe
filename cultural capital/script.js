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

        // ==================================================
        // 1. EMBODIED CAPITAL
        // ==================================================

        const accent =
            Number(document.getElementById("accent").value || 0);

        const gdp =
            Number(document.getElementById("gdp").value || 0);

        const fatherGDP =
            Number(document.getElementById("fatherGDP").value || 0);

        const motherGDP =
            Number(document.getElementById("motherGDP").value || 0);

        const fatherDegree =
            Number(document.getElementById("fatherDegree").value || 0);

        const motherDegree =
            Number(document.getElementById("motherDegree").value || 0);

        const license =
            Number(document.getElementById("license").value || 0);


        // ==================================================
        // 2. OBJECTIFIED CAPITAL
        // ==================================================

        const books =
            Number(document.getElementById("books").value || 0);

        const works =
            Number(document.getElementById("works").value || 0);

        const atelier =
            Number(document.getElementById("atelier").value || 0);

        const institutions =
            Number(document.getElementById("institutions").value || 0);

        const churches =
            Number(document.getElementById("churches").value || 0);

        const mosques =
            Number(document.getElementById("mosques").value || 0);

        const temples =
            Number(document.getElementById("temples").value || 0);

        const sacral =
            Number(document.getElementById("sacral").value || 0);

        const biennale =
            Number(document.getElementById("biennale").value || 0);

        const concerts =
            Number(document.getElementById("concerts").value || 0);

        const theatre =
            Number(document.getElementById("theatre").value || 0);

        const solo =
            Number(document.getElementById("solo").value || 0);

        const duo =
            Number(document.getElementById("duo").value || 0);

        const group =
            Number(document.getElementById("group").value || 0);

        const publications =
            Number(document.getElementById("publications").value || 0);

        const mentions =
            Number(document.getElementById("mentions").value || 0);


        // ==================================================
        // 3. INSTITUTIONALIZED CAPITAL
        // ==================================================

        const master =
            Number(document.getElementById("master").value || 0);

        const bachelor =
            Number(document.getElementById("bachelor").value || 0);

        const research =
            Number(document.getElementById("research").value || 0);

        const phd =
            Number(document.getElementById("phd").value || 0);

        const grants =
            Number(document.getElementById("grants").value || 0);

        const residencies =
            Number(document.getElementById("residencies").value || 0);

        const job =
            Number(document.getElementById("job").value || 0);

        const languageLevel =
            Number(document.getElementById("languageLevel").value || 0);


        // ==================================================
        // CALCULATE TOTAL SCORE
        // ==================================================

        let points = 0;


        // ------------------------------
        // EMBODIED
        // ------------------------------

        points += accent;
        points += gdp;
        points += fatherGDP;
        points += motherGDP;
        points += fatherDegree;
        points += motherDegree;
        points += license;


        // ------------------------------
        // OBJECTIFIED
        // ------------------------------

        points += books;
        points += works;
        points += atelier;
        points += institutions;
        points += churches;
        points += mosques;
        points += temples;
        points += sacral;
        points += biennale;
        points += concerts;
        points += theatre;
        points += solo;
        points += duo;
        points += group;
        points += publications;
        points += mentions;


        // ------------------------------
        // INSTITUTIONALIZED
        // ------------------------------

        points += master;
        points += bachelor;
        points += research;
        points += phd;
        points += grants;
        points += residencies;
        points += job;
        points += languageLevel;


        // ==================================================
        // COLLECT ANSWERS
        // ==================================================

        const answers = {

            // Embodied
            accent: accent,
            gdp: gdp,
            fatherGDP: fatherGDP,
            motherGDP: motherGDP,
            fatherDegree: fatherDegree,
            motherDegree: motherDegree,
            license: license,


            // Objectified
            books: books,
            works: works,
            atelier: atelier,
            institutions: institutions,
            churches: churches,
            mosques: mosques,
            temples: temples,
            sacral: sacral,
            biennale: biennale,
            concerts: concerts,
            theatre: theatre,
            solo: solo,
            duo: duo,
            group: group,
            publications: publications,
            mentions: mentions,


            // Institutionalized
            master: master,
            bachelor: bachelor,
            research: research,
            phd: phd,
            grants: grants,
            residencies: residencies,
            job: job,
            languageLevel: languageLevel
        };


        // ==================================================
        // CHECK PORTRAIT
        // ==================================================

        const portraitInput =
            document.getElementById("portrait");

        if (
            !portraitInput ||
            portraitInput.files.length === 0
        ) {
            alert("Please upload a portrait.");
            return;
        }

        const file =
            portraitInput.files[0];


        // ==================================================
        // UPLOAD PORTRAIT
        // ==================================================

        const imageRef = storageRef(
            storage,
            "portraits/" +
            Date.now() +
            "_" +
            file.name
        );

        await uploadBytes(
            imageRef,
            file
        );

        const portraitURL =
            await getDownloadURL(imageRef);


        // ==================================================
        // CREATE DATABASE REFERENCE
        // ==================================================

        const submissionsRef =
            databaseRef(
                db,
                "submissions"
            );

        const newSubmissionRef =
            push(submissionsRef);


        // ==================================================
        // SAVE SUBMISSION
        // ==================================================

        await set(
            newSubmissionRef,
            {
                portraitURL: portraitURL,
                total: points,
                timestamp: Date.now(),
                answers: answers
            }
        );


        // ==================================================
        // SUCCESS
        // ==================================================

        console.log(
            "Portrait uploaded:",
            portraitURL
        );

        console.log(
            "DATABASE SAVED!"
        );

        console.log(
            "TOTAL:",
            points
        );

        alert(
            "Submission archived."
        );

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
