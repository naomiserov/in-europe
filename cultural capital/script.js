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
        // EMBODIED CAPITAL
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
        // OBJECTIFIED CAPITAL
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
        // INSTITUTIONALIZED CAPITAL
        // ==================================================

        const bachelor =
            Number(document.getElementById("bachelor").value || 0);

        const master =
            Number(document.getElementById("master").value || 0);

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
        // CALCULATE TOTAL
        // ==================================================

        let points = 0;


        // --------------------------------------------------
        // 1. EMBODIED
        // --------------------------------------------------

        // Accent
        // Western Europe       = 0
        // Central Europe       = -1
        // Eastern Europe/Russia = -2
        // Caucasus/Turkey      = -3
        // Central Asia/Middle East = -4
        // East/Southeast Asia  = -5
        // South Asia           = -6

        points += accent;

        // Home country GDP
        points += gdp;

        // Paternal home country GDP
        points += fatherGDP;

        // Maternal home country GDP
        points += motherGDP;

        // Father's highest degree
        // None = 0
        // Primary = 1
        // Secondary = 2
        // Vocational = 3
        // Bachelor = 4
        // Master = 5
        // PhD = 6
        // Postdoc = 7

        points += fatherDegree;

        // Mother's highest degree
        points += motherDegree;

        // Driving licence
        // Yes = 1
        // No = 0

        points += license;


        // --------------------------------------------------
        // 2. OBJECTIFIED
        // --------------------------------------------------

        // Numerical answers equal their number of points

        points += books;
        points += works;

        // Atelier
        // Yes = 1
        // No = 0

        points += atelier;

        points += institutions;
        points += churches;
        points += mosques;
        points += temples;
        points += sacral;

        // Venice Biennale
        // Yes = 1
        // No = 0

        points += biennale;

        points += concerts;
        points += theatre;
        points += solo;
        points += duo;
        points += group;
        points += publications;
        points += mentions;


        // --------------------------------------------------
        // 3. INSTITUTIONALIZED
        // --------------------------------------------------

        points += bachelor;
        points += master;
        points += research;
        points += phd;
        points += grants;
        points += residencies;

        // Job in field
        // Yes = +20
        // No = -5

        points += job;

        // Current lingua franca
        // A1 = 1
        // A2 = 2
        // B1 = 3
        // B2 = 4
        // C1 = 5
        // C2 = 6

        points += languageLevel;


        // ==================================================
        // COLLECT ALL ANSWERS
        // ==================================================

        const answers = {

            // Embodied
            accent:
                accent,

            languages:
                Number(document.getElementById("languages").value || 0),

            gdp:
                gdp,

            parents:
                Number(document.getElementById("parents").value || 0),

            bothParents:
                Number(document.getElementById("bothParents").value || 0),

            fatherGDP:
                fatherGDP,

            motherGDP:
                motherGDP,

            fatherDegree:
                fatherDegree,

            motherDegree:
                motherDegree,

            license:
                license,

            joke:
                Number(document.getElementById("joke").value || 0),


            // Objectified
            books:
                books,

            works:
                works,

            atelier:
                atelier,

            apple:
                Number(document.getElementById("apple").value || 0),

            institutions:
                institutions,

            churches:
                churches,

            mosques:
                mosques,

            temples:
                temples,

            sacral:
                sacral,

            biennale:
                biennale,

            concerts:
                concerts,

            theatre:
                theatre,

            solo:
                solo,

            duo:
                duo,

            group:
                group,

            publications:
                publications,

            mentions:
                mentions,


            // Institutionalized
            bachelor:
                bachelor,

            master:
                master,

            research:
                research,

            phd:
                phd,

            grants:
                grants,

            residencies:
                residencies,

            job:
                job,

            languageLevel:
                languageLevel
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
