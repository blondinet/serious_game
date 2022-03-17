
// transform: scaleX(-1);


var i = setInterval(bravo, 5);

// bravo()
async function bravo(){
     var elem = $("#image_rigolo")
     clearInterval(id);
     id = setInterval(frame, 10);
     function frame() {

          if ($("#image_rigolo").hasClass("flipped")) {
               elem.removeClass('flipped');
          }else {
               elem.addClass('flipped');
          }
     }
}

// if (pos == 350) {
//   clearInterval(id);
// } else {
//   pos++;
//   elem.style.top = pos + 'px';
//   elem.style.left = pos + 'px';
// }
// }
