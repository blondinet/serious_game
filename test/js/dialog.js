


AffichageHUD();

function AffichageHUD(){
     // var newdiv1 = $( "<div id='object1'></div>" );
     // var newdiv2 = document.createElement( "div" );
     // var existingdiv1 = document.getElementById( "foo" );


     $("backpack").empty();
     // new_div = document.createElement( "div" );
     // new_div.prepend("<div><img src='./images/inventaire.png' style='position:absolute; opacity: 0.5;'></div>")
     // $('#theDiv').prepend('<img id="theImg" src="theImg.png" />')

     // $( "body" ).append( $newdiv1, [ newdiv2, existingdiv1 ] );
     let back = "<div id='backpack' style='position:absolute; left:2vw; top:60vh; max-width: 20vw; height: auto;'>"+
     "<img src='./images/inventaire.png' style='opacity: 0.75;'>";

     if(sessionStorage.getItem("cafe") == 1) {
          back += "<img id='cafe' src='./images/cafe.png' style='position:absolute; left:5vw; top:13vh; max-width: 6vw; height: auto'/>";
     }
     back += "</img></div>";



     $("html").append(back);
}

function traitement(){
     sessionStorage.setItem("cafe", 0);
     sessionStorage.setItem("monnaie", 1);
     sessionStorage.setItem("magazine", "");
     sessionStorage.setItem("specifications", "");
     sessionStorage.setItem("maquette", "");
     sessionStorage.setItem("note_retour", "");
}



function create_dialog(tab_nodes) {
     var Dialog = {
          createAndAddNode: function (textLines) {
               var resultNode = Dialog.createNode(textLines);
               Dialog.addNode(resultNode);
               return resultNode;
          },
          createNode: function (textLines) {
               var lineObjects = [];
               var lineId;
               textLines.forEach(function (textLine, index) {
                    lineId = index;
                    lineObjects.push({ id: lineId, text: textLine });
               });
               return {
                    id: null,
                    speaker: null,
                    type: textLines.length === 1 ? 'inactive' : 'interactive',
                    lines: lineObjects
               };
          },
          addNode: function (node) {
               node.id = Dialog.nodes.length;
               Dialog.nodes.push(node);
          },
          getNode: function (nodeId) {
               var foundNode = null;
               this.nodes.forEach(function (node) {
                    if (node.id === nodeId) {
                         foundNode = node;
                    }
               });
               return foundNode;
          },
          nodes: tab_nodes
     }
     return Dialog;
}


function dialog(num_dialog){
     switch(num_dialog){
          case 1:
               return dialogue_porte_ferme();
          break;
          case 2:
               return dialogue_porte_ouverte();
          break;
          case 3:
               return dialogue_ux();
          break;
          case 4:
               return dialogue_porte_ouvertFull();
          break;
          case 5:
               if(sessionStorage.getItem("cafe") == 1) {
                    return dialogue_fin_tuto();
               }
               else {
                    return dialogue_tuto();
               }
          break;
          case 6:
               return dialogue_tuto_2();
          break;
     }
}

function dialogue_fin_tuto(){
     return [{
          id: '0',
          speaker: 'Vous',
          type: 'inactive',
          action: 2,
          lines: [
               { id: '0.0', text: "Donner un café." }
          ],
          next: function (linePicked) {
               return "1";
          }
     }, {
          id: '1',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '1.0', text: "Je vous remercie. J’espère qu’il est sans sucre !" }
          ],
          next: function (linePicked) {
               return "2";
          }
     }, {
          id: '2',
          speaker: 'Vous',
          type: 'inactive',
          lines: [
               { id: '2.0', text: "…" }
          ],
          next: function (linePicked) {
               return "3";
          }
     }, {
          id: '3',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '3.0', text: "Je rigole c’est bon ! Qu’est-ce qui vous amène ?" }
          ],
          next: function (linePicked) {
               return "4";
          }
     }, {
          id: '4',
          speaker: 'Vous',
          type: 'inactive',
          lines: [
               { id: '4.0', text: "Je suis actuellement à la recherche d’un stage et je voulais savoir si vous aviez des offres à pourvoir dans le domaine du design, en accord avec mes compétences ?" }
          ],
          next: function (linePicked) {
               return "5";
          }
     }, {
          id: '5',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '5.0', text: "Je crois pouvoir vous donner quelques pistes de recherches…, regardez votre téléphone et allez sur l’application LinkeudeIne. J’ai mis à jour 3 offres qui pourraient vous intéresser." }
          ],
          next: function (linePicked) {
               return "6";
          }
     }, {
          id: '6',
          speaker: 'Vous',
          type: 'inactive',
          action:3,
          lines: [
               { id: '6.0', text: "Merci beaucoup je vais regarder ça. Bonne journée !" }
          ],
          next: function (linePicked) {
               return "7";
          }
     }, {
          id: '7',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '7.0', text: "Fermez bien la porte en partant…" }
          ],
          next: function (linePicked) {
               return "-1";
          }
     }];
}

function dialogue_tuto(){
     return [{
          id: '0',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '0.0', text: "... Mh ? Que voulez-vous ?" }
          ],
          next: function (linePicked) {
               return "1";
          }
     }, {
          id: '1',
          speaker: 'Vous',
          type: 'inactive',
          lines: [
               { id: '1.0', text: "Je suis actuellement à la recherche d’un stage et…" }
          ],
          next: function (linePicked) {
               return "2";
          }
     }, {
          id: '2',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '2.0', text: "Je suis fatiguée, je me prendrais bien un petit remontant. Sans cela, je crois ne pas pouvoir vous aider…" }
          ],
          next: function (linePicked) {
               return "3";
          }
     }, {
          id: '3',
          speaker: 'Vous',
          type: 'interactive',
          lines: [
               { id: '3.0', text: "Je vais acheter un café." },
               { id: '3.1', text: "Je vous apporte de l’eau."},
               { id: '3.2', text: "Je vous apporte un chocolat."}
          ],
          next: function (linePicked) {
               if (linePicked === '3.0') {
                    return "5";
               }
               if (linePicked === '3.1') {
                    return "4";
               }
               return "4";
          }
     }, {
          id: '4',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '4.0', text: "Je prefère autre chose." }
          ],
          next: function (linePicked) {
               return "3";
          }
     }, {
          id: '5',
          speaker: 'RH',
          type: 'inactive',
          lines: [
               { id: '5.0', text: "Il y a une machine dans le couloir." }
          ],
          next: function (linePicked) {
               return "-1";
          }
     },]
}


function dialogue_tuto_2(){
     return [{
          id: '0',
          speaker: 'RH',
          type: 'inactive',
          action: 1,
          lines: [
               { id: '0.0', text: "Vous prenez un café en échange d'un euro." }
          ],
          next: function (linePicked) {
               return "1";
          }
     }, {
          id: '1',
          speaker: 'Vous',
          type: 'inactive',
          lines: [
               { id: '1.0', text: "Le café est servi." }
          ],
          next: function (linePicked) {
               return "-1";
          }
     }]
}



function dialogue_porte_ouvertFull(){
     return [{
          id: '0',
          speaker: 'info',
          type: 'inactive',
          lines: [
               { id: '0.0', text: "Porte ouverte full." }
          ],
          next: function (linePicked) {
               return "-1";
          }
     }];
}

function dialogue_ux(){
     return [{
          id: '0',
          speaker: 'info',
          type: 'inactive',
          lines: [
               { id: '0.0', text: "Bienvenu dans notre entreprise." }
          ],
          next: function (linePicked) {
               return "1";
          }
     }, {
          id: '1',
          speaker: 'page',
          type: 'inactive',
          lines: [
               { id: '1.0', text: "Hello." }
          ],
          next: function (linePicked) {
               return "2";
          }
     }, {
          id: '2',
          speaker: 'visitor',
          type: 'interactive',
          lines: [
               { id: '2.0', text: "What is this?" },
               { id: '2.1', text: "This blocky text looks familiar …"},
               { id: '2.2', text: "Oh no, is this one of those branching dialogs kind of things?"}
          ],
          next: function (linePicked) {
               if (linePicked === '2.0') {
                    return "3";
               }
               if (linePicked === '2.1') {
                    return "8";
               }
               return "13";
          }
     }, {
          id: '3',
          speaker: 'page',
          type: 'inactive',
          lines: [
               { id: '3.0', text: "This is a little thing I made."}
          ],
          next: function (linePicked) {
               return "4";
          }
     }, {
          id: '4',
          speaker: 'page',
          type: 'inactive',
          lines: [
               { id: '4.0', text: "I love old point-and-click adventure games."}
          ],
          next: function (linePicked) {
               return "5";
          }
     }];
}

// var Dialog = {
//   createAndAddNode: function (textLines) {
//     var resultNode = Dialog.createNode(textLines);
//     Dialog.addNode(resultNode);
//     return resultNode;
//   },
//   createNode: function (textLines) {
//     var lineObjects = [];
//     var lineId;
//     textLines.forEach(function (textLine, index) {
//       lineId = index;
//       lineObjects.push({ id: lineId, text: textLine });
//     });
//     return {
//       id: null,
//       speaker: null,
//       type: textLines.length === 1 ? 'inactive' : 'interactive',
//       lines: lineObjects
//     };
//   },
//   addNode: function (node) {
//     node.id = Dialog.nodes.length;
//     Dialog.nodes.push(node);
//   },
//   getNode: function (nodeId) {
//     var foundNode = null;
//     this.nodes.forEach(function (node) {
//       if (node.id === nodeId) {
//         foundNode = node;
//       }
//     });
//     return foundNode;
//   },
//   nodes: [ {
//     id: '0',
//     speaker: 'info',
//     type: 'inactive',
//     lines: [
//       { id: '0.0', text: "Click to start." }
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('1');
//     }
//   }, {
//     id: '1',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '1.0', text: "Hello." }
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('2');
//     }
//   }, {
//     id: '2',
//     speaker: 'visitor',
//     type: 'interactive',
//     lines: [
//       { id: '2.0', text: "What is this?" },
//       { id: '2.1', text: "This blocky text looks familiar …"},
//       { id: '2.2', text: "Oh no, is this one of those branching dialogs kind of things?"}
//     ],
//     next: function (linePicked) {
//       if (linePicked === '2.0') {
//         return Dialog.getNode('3');
//       }
//       if (linePicked === '2.1') {
//         return Dialog.getNode('8');
//       }
//       return Dialog.getNode('13');
//     }
//   }, {
//     id: '3',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '3.0', text: "This is a little thing I made."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('4');
//     }
//   }, {
//     id: '4',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '4.0', text: "I love old point-and-click adventure games."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('5');
//     }
//   }, {
//     id: '5',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '5.0', text: "Their dialogs are a big part of it."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('6');
//     }
//   }, {
//     id: '6',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '6.0', text: "A dialog system of some sort seemed like a nice toy project."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('7');
//     }
//   }, {
//     id: '7',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '7.0', text: "So, here we are."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('15');
//     }
//   }, {
//     id: '8',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '8.0', text: "Indeed."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('9');
//     }
//   }, {
//     id: '9',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '9.0', text: "I found it online, and it is supposedly straight out of The secret of Monkey island or so.", url: "http://scummbar.com/resources/downloads/index.php?todo=Fonts", urlText: 'This is where I found it.'}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('10');
//     }
//   }, {
//     id: '10',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '10.0', text: "Are you into old games, or are you just as old as I am?"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('11');
//     }
//   }, {
//     id: '11',
//     speaker: 'visitor',
//     type: 'interactive',
//     lines: [
//       { id: '11.0', text: "I was young when dinosaurs and Guybrush Threepwood roamed the earth!"},
//       { id: '11.1', text: "I just like to see what primitive pastimes the Ancients thought were fun."},
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('12');
//     }
//   }, {
//     id: '12',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '12.0', text: "Good for you!"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('15');
//     }
//   }, {
//     id: '13',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '13.0', text: "Um, yeah."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('14');
//     }
//   }, {
//     id: '14',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '14.0', text: "But trust me, the tree is not terribly large to click through."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('15');
//     }
//   }, {
//     id: '15',
//     speaker: 'visitor',
//     type: 'interactive',
//     lines: [
//       { id: '15.0', text: "I bet a link to Github is coming any second now …"},
//       { id: '15.1', text: "Well, uh, nice work. I really need to be somewhere, take care!"}
//     ],
//     next: function (linePicked) {
//       if (linePicked === '15.0') {
//         return Dialog.getNode('funny');
//       }
//       return Dialog.getNode('19');
//     }
//   }, {
//     id: 'funny',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '15.0', text: "Funny you should ask!"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('16');
//     }
//   }, {
//     id: '16',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '16.0', text: "Here you go!", url: "https://github.com/bjoreman/dialogjs"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('17');
//     }
//   }, {
//     id: '17',
//     speaker: 'visitor',
//     type: 'inactive',
//     lines: [
//       { id: '17.0', text: "Thanks!"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('18');
//     }
//   }, {
//     id: '18',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '18.0', text: "My pleasure!"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('20');
//     }
//   }, {
//     id: '19',
//     speaker: 'page',
//     type: 'inactive',
//     lines: [
//       { id: '19.0', text: "Thanks, bye!"}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('20');
//     }
//   }, {
//     id: '20',
//     speaker: 'info',
//     type: 'inactive',
//     lines: [
//       { id: '20.0', text: "Start over."}
//     ],
//     next: function (linePicked) {
//       return Dialog.getNode('0');
//     }
//   }]
// };
