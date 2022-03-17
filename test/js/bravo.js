
// transform: scaleX(-1);


var i = setInterval(bravo, 500);

// bravo()
async function bravo(){
     var elem = $("#image_rigolo")
     clearInterval(id);
     var id = setInterval(frame, 500);
     function frame() {

          if (!$("#image_rigolo").hasClass("flipped")) {
               elem.addClass('flipped');
          }else {
               elem.removeClass('flipped');
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
