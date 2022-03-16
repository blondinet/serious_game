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

function affiche_dialogue(Dialog, num){
     // On récup le dialogue courant
     var dialogNode = Dialog.getNode(num);
     var container = $('#dialogue');

     // Vérification si le noeud de dialogue courant est interactif
     var isInteractive = (dialogNode.type === 'interactive');
     // Création d'un élément ligne div si interactif, sinon ol
     var lines = document.createElement(isInteractive ? 'ol' : 'div');

     lines.className = dialogNode.speaker;

     if (dialogNode && dialogNode.lines) {
          dialogNode.lines.forEach(function (line) {
               var newLine = document.createElement(isInteractive ? 'li' : 'div');
               newLine.innerHTML = line.text;
               newLine.addEventListener('click', function () {
                    var next = dialogNode.next();
                    if(next == "-1"){
                         suppr_ecran_dialogue(Dialog);
                         container.empty();
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
               }
               lines.appendChild(newLine);
          });
     }
     // container.innerHTML = '';
     container.empty();
     console.log(container);
     container.append(lines);
}
