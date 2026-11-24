let etudiants = [];
        let table = "etudiants";
        let casenom = document.getElementById("casenom");
        let caseprenom = document.getElementById("caseprenom");
        let Ajouter = document.getElementById("Ajouter");
        let listeEtudiants = document.getElementById("listeEtudiants");
        let compteur = document.getElementById("compteur");

        function sauvegarderEtudiants() {
            localStorage.setItem(table, JSON.stringify(etudiants));
        }

        function chargerEtudiants() {
            let donnees = localStorage.getItem(table);
            if (donnees !== null) {
                etudiants = JSON.parse(donnees);
            } else {
                etudiants = [];
            }
        }

        function afficherEtudiants() {
            listeEtudiants.innerHTML = "";

            etudiants.forEach(function (etudiant) {
                let li = document.createElement("li");

                let source = document.createElement("source");
                source.textContent = etudiant.nom + " " + etudiant.prenom;

                let Supprimer = document.createElement("button");
                Supprimer.textContent = "Supprimer";
                Supprimer.addEventListener("click", function () {
                    supprimerEtudiant(etudiant.id);
                });

                li.appendChild(source);
                li.appendChild(Supprimer);
                listeEtudiants.appendChild(li);
            });

            compteur.textContent = etudiants.length;
        }

        function ajouterEtudiant() {
            let nom = casenom.value;
            let prenom = caseprenom.value;

            if (nom === "" || prenom === "") {
                alert("Veuillez remplir tout les champ.");
                return;
            }

            let nouvelEtudiant = {
                id:Date.now(),
                nom: nom,
                prenom: prenom
            };

            etudiants.push(nouvelEtudiant);
            sauvegarderEtudiants();
            afficherEtudiants();

            casenom.value = "";
            caseprenom.value = "";
        }

        function supprimerEtudiant(id) {
            etudiants = etudiants.filter(function (e) {
                return e.id !== id;
            });
            sauvegarderEtudiants();
            afficherEtudiants();
        }

        Ajouter.addEventListener("click", ajouterEtudiant);


        chargerEtudiants();
        afficherEtudiants();
    
