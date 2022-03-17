/*global Dialog*/

// Lorsque le document est pret

// function

/**
* Fonction qui lance un dialogue en affichant la fenêtre de dialogue
*
*/
function lancement_dialogue(num){
     var Dialog = create_dialog(dialog(num));

     ajout_ecran_dialogue(Dialog);

}

/**
* Fonction qui affiche la fenêtre de dialogue et affiche le début du dialogue associé
*
*
*/
function ajout_ecran_dialogue(Dialog){
     $("#dialogue").css("visibility", "visible");
     affiche_dialogue(Dialog, "0");
}

function suppr_ecran_dialogue(Dialog){
     $("#dialogue").css("visibility", "hidden");
     // affiche_dialogue(Dialog, "0");
}

function do_action(action){
     if(action == 1){
          sessionStorage.setItem("cafe", 1);
     }
     else if (action == 2) {
          sessionStorage.setItem("cafe", 0);
     }
     else if (action == 3) {
          sessionStorage.setItem("telephone", 1);
     }
     else if (action == 4) {
          sessionStorage.setItem("specifications", 1);
     }
     else if (action == 5) {
          sessionStorage.setItem("specifications", 0);
     }
     else if (action == 6) {
          sessionStorage.setItem("maquette", 1);
     }
     else if (action == 7) {
          sessionStorage.setItem("maquette", 0);
     }
     else if (action == 8) {
          sessionStorage.setItem("note_retour", 1);
     }
     else if (action == 9) {
          sessionStorage.setItem("instructions", 1);
     }
     else if (action == 10) {
          sessionStorage.setItem("instructions", 0);
     }
}

function affiche_dialogue(Dialog, num){
     // On récup le dialogue courant
     var dialogNode = Dialog.getNode(num);
     var container = $('#dialogue');

     // Vérification si le noeud de dialogue courant est interactif
     var isInteractive = (dialogNode.type === 'interactive');
     // Création d'un élément ligne div si interactif, sinon ol
     var lines = document.createElement(isInteractive ? 'ol' : 'div');

     // lines.className = dialogNode.speaker;
     lines.className = "line_dialogue";

     if (dialogNode && dialogNode.lines) {
          if(dialogNode.action) {
               do_action(dialogNode.action);
          }
          dialogNode.lines.forEach(function (line) {
               var newLine = document.createElement(isInteractive ? 'li' : 'div');
               newLine.innerHTML = line.text;
               newLine.addEventListener('click', function () {
                    var next = dialogNode.next(line.id);

                    if(next == "-1"){
                         suppr_ecran_dialogue(Dialog);
                         container.empty();
                    }
                    else if (next == "-2") {
                         window.location.href = "bravo.html";
                    }
                    else{
                         affiche_dialogue(Dialog, next);
                    }
               });
               if (line.url) {
                    var link = document.createElement('a');
                    link.href = line.url;
                    link.innerHTML = line.urlText || line.url;
                    newLine.appendChild(document.createElement('br'));
                    newLine.appendChild(link);
                    newLine.style.cssText = "width:50%;margin: 0px;";
               }
               newLine.style.cssText = "cursor: help;";
               newLine.onmouseover = function(){ this.style.backgroundColor ="#FFFFCC" };
               newLine.onmouseout = function(){ this.style.backgroundColor ="" };


               lines.appendChild(newLine);
          });
          // let p = document.createElement("p");

          let speaker = document.createElement("h5");
          speaker.style.cssText = "text-align:left;min-width:1vw;max-width:3vw;margin: 0px; padding:1vw; border: 1px solid black";
          speaker.appendChild(document.createTextNode(dialogNode.speaker));

          lines.prepend(speaker);
     }
     // container.innerHTML = '';
     container.empty();
     container.append(lines);
     AffichageHUD();
}
