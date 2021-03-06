function traitement(){
     sessionStorage.setItem("cafe", 0);
     sessionStorage.setItem("monnaie", 1);
     sessionStorage.setItem("magazine", 0);
     sessionStorage.setItem("specifications", 0);
     sessionStorage.setItem("maquette", 0);
     sessionStorage.setItem("note_retour", 0);
     sessionStorage.setItem("instructions", 0);
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
              if(sessionStorage.getItem("note_retour") == 1) {
                  return dialogue_ux_designer_end();
              }
              if(sessionStorage.getItem("maquette") == 1) {
                  return dialogue_ux_designer_maquette();
              }
              if(sessionStorage.getItem("instructions") == 1) {
                  return dialogue_ux_designer_help();
              }
              else {
                  return dialogue_ux_welcome();
              }
          break;
          case 2:
              if(sessionStorage.getItem("maquette") == 1) {
                  return dialogue_ux_client_feedback();
                }
              else {
                  return dialogue_ux_client_spec();
              }
          break;
          case 3:
              if(sessionStorage.getItem("specifications") == 1) {
                  return dialogue_maquette();
              }
     }
}


function dialogue_ux_designer_maquette(){
  return [{
    id: '0',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "Si tu as termin?? les maquettes, tu peux retourner voir le client pour obtenir ses retours." }
    ],
    next: function (linePicked) {
         return "-1";
    }
  }]
}

function dialogue_maquette(){
  return [{
    id: '0',
    speaker: 'info',
    type: 'inactive',
    action: 10,
    lines: [
         { id: '0.0', text: "Mini-jeu : vous cr??ez les maquettes." }
    ],
    next: function (linePicked) {
         return "1";
    }
}, {
     id: '1',
     speaker: 'info',
     type: 'inactive',
     action: 10,
     lines: [
          { id: '1.0', text: "Bravo, tu es arriv?? ?? la fin du jeu." }
     ],
     next: function (linePicked) {
          return "-2";
     }
}]
}

function dialogue_ux_welcome(){
  return [{
    id: '0',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "Bienvenue dans UX Corp. ! Pour ton premier jour, tu vas travailler sur une maquette pour notre nouveau client." }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "Pour ce faire, tu vas devoir d??terminer les sp??cifications fonctionnelles du produit, et en cr??er une maquette. Ensuite, tu devras obtenir l???avis et le retour de notre client." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Vous',
       type: 'interactive',
       action: 9,
       lines: [
            { id: '2.0', text: "Qu???est-ce qu???une sp??cification fonctionnelle ?" },
            { id: '2.1', text: "Qu???est-ce qu???une maquette ?"},
            { id: '2.2', text: "Des retours ?"},
            { id: '2.3', text: "D???accord, je m???y mets."}
       ],
       next: function (linePicked) {
            if (linePicked === '2.0') {
                 return "3";
            }
            if (linePicked === '2.1') {
                 return "4";
            }
            if (linePicked === '2.2') {
                 return "5";
            }
            return "-1";
       }
  }, {
       id: '3',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '3.0', text: "Les sp??cifications d??crivent le fonctionnement du dispositif num??rique. Elles servent ?? sp??cifier le comportement de chaque ??cran de l???interface utilisateur. Elles mod??lisent ainsi le fonctionnement de l???interface c??t?? utilisateur." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '4',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '4.0', text: "Le maquettage est un processus de concr??tisation graphique d???une interface num??rique. Il se d??roule souvent en plusieurs ??tapes de diff??rents niveaux de pr??cision. Il sert ?? cr??er une harmonie entre l???ergonomie, le design graphique et l???exp??rience utilisateur du produit." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '5',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "En UX design, il est tr??s important d???inclure les utilisateurs d??s la conception du produit. Pour cela, on va discuter avec eux et leur proposer de tester les diff??rents produits du maquettage au fur et ?? mesure de leur conception. Cela nous permettra d???obtenir leurs retours et d???am??liorer le produit en cons??quence." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }];
}

function dialogue_ux_designer_help(){
  return [{
    id: '0',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "Tu as pu r??cup??rer les sp??cifications fonctionnelles du besoin aupr??s du client ?" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'interactive',
       lines: [
            { id: '1.0', text: "Non, pas encore." },
            { id: '1.1', text: "Oui je les ai !"}
       ],
       next: function (linePicked) {
            if (linePicked === '1.0') {
                 return "2";
            }
            return "3";
       }
  }, {
       id: '2',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Il est dans la pi??ce de gauche, ne le fais pas attendre !" }
       ],
       next: function (linePicked) {
            return "-1";
       }
  }, {
       id: '3',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '3.0', text: "Tu vas maintenant pouvoir passer au maquettage. Un ordinateur est ?? ta disposition sur la droite." }
       ],
       next: function (linePicked) {
            return "-1";
       }
  }];
}

function dialogue_ux_client_spec(){
  return [{
    id: '0',
    speaker: 'Client',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "Bonjour !" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "Bonjour, Monsieur. Commen??ons directement la r??union, quel est votre besoin ?" }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Je suis ??b??niste, je vends des ??uvres d???art en bois. J???aimerais avoir un site web facile d???acc??s pour permettre une meilleure exposition." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '3',
       speaker: 'Vous',
       type: 'interactive',
       action: 4,
       lines: [
            { id: '3.0', text: "Quel est votre public cible ?" },
            { id: '3.1', text: "Voulez-vous vendre vos ??uvres sur ce site ? Ou serait-ce plut??t un site d???exposition ?"},
            { id: '3.2', text: "Quels sont vos connaissances et usage personnel de l???informatique ?"},
            { id: '3.3', text: "Vous avez des id??es pour le rendu visuel du site, les couleurs par exemple ?"},
            { id: '3.4', text: "Merci, j???ai compris."}
       ],
       next: function (linePicked) {
            if (linePicked === '3.0') {
                 return "4";
            }
            if (linePicked === '3.1') {
                 return "5";
            }
            if (linePicked === '3.2') {
                 return "6";
            }
            if (linePicked === '3.3') {
                 return "7";
            }
            return "-1";
       }
  }, {
       id: '4',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '3.0', text: "Je travaille ?? la fois pour des professionnels et des particuliers. J???ai un public assez vaste, dont des personnes qui ne sont pas forc??ment tr??s habitu??es aux m??dias num??riques." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '5',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '4.0', text: "Mon objectif est bien s??r de vendre mes pi??ces, mais l???id??e du site c???est de montrer le style des ??uvres que je produis pour donner envie ?? mes clients de venir les voir sur place pour les acheter, plut??t que de les vendre en ligne." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '6',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "Je n???y connais rien du tout, et c???est bien pour ??a que je suis venu travailler avec vous. J???ai besoin de quelque chose qui soit facile ?? maintenir, avec un compte administrateur par exemple." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '7',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "J???aimerais quelque chose d?????l??gant, qui rappelle le mat??riau naturel du bois que j???utilise." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }];
}

function dialogue_ux_client_feedback(){
  return [{
    id: '0',
    speaker: 'Client',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "O?? en sommes-nous ?" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "J???ai termin?? la maquette, nous allons pouvoir la tester ensemble !" }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Voyons voir votre maquette."}
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '3',
       speaker: 'info',
       type: 'inactive',
       lines: [
            { id: '3.0', text: "Phase de test"}
       ],
       next: function (linePicked) {
            return "4";
       }
  }, {
    id: '4',
    speaker: 'Client',
    type: 'inactive',
    lines: [
         { id: '4.0', text: "Okay c???est pas mal, j???aime l???id??e g??n??rale et le flow que ??a d??gage." }
    ],
    next: function (linePicked) {
         return "5";
    }
  }, {
       id: '5',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "Super, merci. Pourriez-vous remplir ce questionnaire qui m???aidera ?? am??liorer votre site en fonction de vos id??es ?" }
       ],
       next: function (linePicked) {
            return "6";
       }
  }, {
       id: '6',
       speaker: 'Client',
       type: 'inactive',
       action: 8,
       lines: [
            { id: '6.0', text: "Aucun souci."}
       ],
       next: function (linePicked) {
            return "7";
       }
  }, {
       id: '7',
       speaker: 'info',
       type: 'inactive',
       lines: [
            { id: '7.0', text: "Cinq minutes plus tard, vous r??cup??rez le questionnaire d??ment rempli."}
       ],
       next: function (linePicked) {
            return "-1";
       }
  }];
}

function dialogue_ux_designer_end(){
  return [{
    id: '0',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '0.0', text: "Alors o?? en es-tu ?" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "J???ai montr?? la maquette au client, je lui ai fait faire un test, puis il a rempli le questionnaire que j???avais pr??par??." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Tr??s bien, qu???en a-t-il pens?? ?"}
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '3',
       speaker: 'info',
       type: 'Vous',
       lines: [
            { id: '3.0', text: "Il a plut??t aim?? le design global, et il m???a pr??cis?? qu???il aimerait pouvoir ??crire des articles ?? propos de son ??b??nisterie. Il pensait aussi que le syst??me de filtres n?????tait pas tout ?? fait clair, et qu???on pourrait donc l???am??liorer."}
       ],
       next: function (linePicked) {
            return "4";
       }
  }, {
    id: '4',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '4.0', text: "D???accord super, c???est un bon d??but ! Je suis confiant sur la suite du projet gr??ce ?? votre travail. On reprendra ??a demain, bonne soir??e !" }
    ],
    next: function (linePicked) {
         return "-1";
    }
  }];
}

// function dialogue_porte_ouvertFull(){
//      return [{
//           id: '0',
//           speaker: 'info',
//           type: 'inactive',
//           lines: [
//                { id: '0.0', text: "Porte ouverte full." }
//           ],
//           next: function (linePicked) {
//                return "-1";
//           }
//      }];
// }
//
// function dialogue_ux(){
//      return [{
//           id: '0',
//           speaker: 'info',
//           type: 'inactive',
//           lines: [
//                { id: '0.0', text: "Bienvenue dans notre entreprise." }
//           ],
//           next: function (linePicked) {
//                return "1";
//           }
//      }, {
//           id: '1',
//           speaker: 'page',
//           type: 'inactive',
//           lines: [
//                { id: '1.0', text: "Hello." }
//           ],
//           next: function (linePicked) {
//                return "2";
//           }
//      }, {
//           id: '2',
//           speaker: 'visitor',
//           type: 'interactive',
//           lines: [
//                { id: '2.0', text: "What is this?" },
//                { id: '2.1', text: "This blocky text looks familiar ???"},
//                { id: '2.2', text: "Oh no, is this one of those branching dialogs kind of things?"}
//           ],
//           next: function (linePicked) {
//                if (linePicked === '2.0') {
//                     return "3";
//                }
//                if (linePicked === '2.1') {
//                     return "8";
//                }
//                return "13";
//           }
//      }, {
//           id: '3',
//           speaker: 'page',
//           type: 'inactive',
//           lines: [
//                { id: '3.0', text: "This is a little thing I made."}
//           ],
//           next: function (linePicked) {
//                return "4";
//           }
//      }, {
//           id: '4',
//           speaker: 'page',
//           type: 'inactive',
//           lines: [
//                { id: '4.0', text: "I love old point-and-click adventure games."}
//           ],
//           next: function (linePicked) {
//                return "5";
//           }
//      }];
// }

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
//       { id: '2.1', text: "This blocky text looks familiar ???"},
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
//       { id: '15.0', text: "I bet a link to Github is coming any second now ???"},
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
