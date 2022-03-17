function traitement(){
     sessionStorage.setItem("cafe", 0);
     sessionStorage.setItem("monnaie", 0);
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

function dialogue_maquette(){
  return [{
    id: '0',
    speaker: 'info',
    type: 'inactive',
    action: 10,
    lines: [
         { id: '0.0', text: "Mini-jeu : vous créez les maquettes." }
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
          { id: '1.0', text: "Bravo, tu es arrivé à la fin du jeu." }
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
            { id: '1.0', text: "Pour ce faire, tu vas devoir déterminer les spécifications fonctionnelles du produit, et en créer une maquette. Ensuite, tu devras obtenir l’avis et le retour de notre client." }
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
            { id: '2.0', text: "Qu’est-ce qu’une spécification fonctionnelle ?" },
            { id: '2.1', text: "Qu’est-ce qu’une maquette ?"},
            { id: '2.2', text: "Des retours ?"},
            { id: '2.3', text: "D’accord, je m’y mets."}
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
            { id: '3.0', text: "Les spécifications décrivent le fonctionnement du dispositif numérique. Elles servent à spécifier le comportement de chaque écran de l’interface utilisateur. Elles modélisent ainsi le fonctionnement de l’interface côté utilisateur." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '4',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '4.0', text: "Le maquettage est un processus de concrétisation graphique d’une interface numérique. Il se déroule souvent en plusieurs étapes de différents niveaux de précision. Il sert à créer une harmonie entre l’ergonomie, le design graphique et l’expérience utilisateur du produit." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '5',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "En UX design, il est très important d’inclure les utilisateurs dès la conception du produit. Pour cela, on va discuter avec eux et leur proposer de tester les différents produits du maquettage au fur et à mesure de leur conception. Cela nous permettra d’obtenir leurs retours et d’améliorer le produit en conséquence." }
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
         { id: '0.0', text: "Tu as pu récupérer les spécifications fonctionnelles du besoin auprès du client ?" }
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
            { id: '2.0', text: "Il est dans la pièce de gauche, ne le fais pas attendre !" }
       ],
       next: function (linePicked) {
            return "-1";
       }
  }, {
       id: '3',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '3.0', text: "Tu vas maintenant pouvoir passer au maquettage. Un ordinateur est à ta disposition dans le bureau de droite." }
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
            { id: '1.0', text: "Bonjour, Monsieur. Commençons directement la réunion, quel est votre besoin ?" }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Je suis ébéniste, je vends des œuvres d’art en bois. J’aimerais avoir un site web facile d’accès pour permettre une meilleure exposition." }
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
            { id: '3.1', text: "Voulez-vous vendre vos œuvres sur ce site ? Ou serait-ce plutôt un site d’exposition ?"},
            { id: '3.2', text: "Quels sont vos connaissances et usage personnel de l’informatique ?"},
            { id: '3.3', text: "Vous avez des idées pour le rendu visuel du site, les couleurs par exemple ?"},
            { id: '3.4', text: "Merci, j’ai compris."}
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
            { id: '3.0', text: "Je travaille à la fois pour des professionnels et des particuliers. J’ai un public assez vaste, dont des personnes qui ne sont pas forcément très habituées aux médias numériques." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '5',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '4.0', text: "Mon objectif est bien sûr de vendre mes pièces, mais l’idée du site c’est de montrer le style des œuvres que je produis pour donner envie à mes clients de venir les voir sur place pour les acheter, plutôt que de les vendre en ligne." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '6',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "Je n’y connais rien du tout, et c’est bien pour ça que je suis venu travailler avec vous. J’ai besoin de quelque chose qui soit facile à maintenir, avec un compte administrateur par exemple." }
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '7',
       speaker: 'Client',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "J’aimerais quelque chose d’élégant, qui rappelle le matériau naturel du bois que j’utilise." }
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
         { id: '0.0', text: "Où en sommes-nous ?" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "J’ai terminé la maquette, nous allons pouvoir la tester ensemble !" }
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
         { id: '4.0', text: "Okay c’est pas mal, j’aime l’idée générale et le flow que ça dégage." }
    ],
    next: function (linePicked) {
         return "5";
    }
  }, {
       id: '5',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '5.0', text: "Super, merci. Pourriez-vous remplir ce questionnaire qui m’aidera à améliorer votre site en fonction de vos idées ?" }
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
            { id: '7.0', text: "Cinq minutes plus tard, vous récupérez le questionnaire dûment rempli."}
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
         { id: '0.0', text: "Alors où en es-tu ?" }
    ],
    next: function (linePicked) {
         return "1";
    }
  }, {
       id: '1',
       speaker: 'Vous',
       type: 'inactive',
       lines: [
            { id: '1.0', text: "J’ai montré la maquette au client, je lui ai fait faire un test, puis il a rempli le questionnaire que j’avais préparé." }
       ],
       next: function (linePicked) {
            return "2";
       }
  }, {
       id: '2',
       speaker: 'Head UX Designer',
       type: 'inactive',
       lines: [
            { id: '2.0', text: "Très bien, qu’en a-t-il pensé ?"}
       ],
       next: function (linePicked) {
            return "3";
       }
  }, {
       id: '3',
       speaker: 'info',
       type: 'Vous',
       lines: [
            { id: '3.0', text: "Il a plutôt aimé le design global, et il m’a précisé qu’il aimerait pouvoir écrire des articles à propos de son ébénisterie. Il pensait aussi que le système de filtres n’était pas tout à fait clair, et qu’on pourrait donc l’améliorer."}
       ],
       next: function (linePicked) {
            return "4";
       }
  }, {
    id: '4',
    speaker: 'Head UX Designer',
    type: 'inactive',
    lines: [
         { id: '4.0', text: "D’accord super, c’est un bon début ! Je suis confiant sur la suite du projet grâce à votre travail. On reprendra ça demain, bonne soirée !" }
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
//                { id: '2.1', text: "This blocky text looks familiar …"},
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
