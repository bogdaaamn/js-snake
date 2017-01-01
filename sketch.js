var s;
var scl = 20;
var food, special;
var in_game = 0, first_time = 0;
var raaage = 0, rage_timer, rage_tmp = 0, rage_music; // 0 - no special, 1 - special on screen, 2 - special eaten
var hit, intro, game_1, game_2, game_3;

function preload() {
  //preload sounds
  //intro = loadSound('sounds/intro.mp3');
  rage_music = loadSound('sounds/raaage.mp3');
  hit = loadSound('sounds/hit.mp3');
}


function setup() {
  canvas = createCanvas((window.innerWidth - 20) - (window.innerWidth - 20) % scl, (window.innerHeight - 20) - (window.innerHeight - 20) % scl);
  canvas.parent('sketch-holder');

  init_gui();

  s = new Snake();
  frameRate(10);
  pickLocation();
  start_timer();

  init_gui();

  //load music
  // game_1 = loadSound('sounds/game_1.mp3', success, error, loading);
  // game_2 = loadSound('sounds/game_1.mp3', success, error, loading);
  // game_3 = loadSound('sounds/game_1.mp3', success, error, loading);

  if (first_time){
    document.getElementById("start-gui").style.visibility = "hidden";
    document.getElementById("nick-gui").style.visibility = "visible";
    document.getElementById("nick-box").focus();
  } 
  else{
    document.getElementById("start-gui").style.visibility = "visible";
    document.getElementById("nick-gui").style.visibility = "hidden";
  }

  //intro.play();
}

window.onresize = function () {
  var w = (window.innerWidth - 20) - (window.innerWidth - 20) % scl;
  var h = (window.innerHeight - 20) - (window.innerHeight - 20) % scl;
  canvas.size(w, h);
  width = w;
  height = h;
};

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

  if(raaage == 0){
    special = createVector(floor(random(cols)), floor(random(rows)));
    special.mult(scl);
  }
}

function pickRaaageLocation(){
  var rand = floor(random (1, 100));
  console.log(rand);
  if (raaage == 0) {
    if (rand < 21) {
      raaage = 1;
      var cols = floor(width / scl);
      var rows = floor(height / scl);
      special = createVector(floor(random(cols)), floor(random(rows)));
      special.mult(scl);
    }
  }
}

function draw() {
  background(255);

  document.getElementById("mask").style.width = window.innerWidth + "px";
  document.getElementById("mask").style.height = window.innerHeight + "px";

  if (s.eat(food)) {
    pickLocation();
  }
  if (s.eat(special)) {
    raaage = 2;
    console.log("yeeeeeees");
    rage_tmp = rage_timer;
    rage_music.play();
  }

  s.death();
  s.update();
  s.show();

  fill(0, 0, 0);
  rect(food.x, food.y, scl, scl);

  if(raaage == 0){
    document.body.style.backgroundColor = "black";
    document.getElementById("points").style.color = "black";
    frameRate(10);
    rage_music.stop();
  } else if (raaage == 1){
    fill(random(0,255), random(0,255), random(0,255));
    rect(special.x, special.y, scl, scl); 
  } else if (raaage == 2){
    special.x = 10000; //uite lebede in zare cand ma uit ele dispare
    frameRate(20);

    //backgr color
    var color_body = '#'+random().toString(16).substr(-6);
    document.body.style.backgroundColor = color_body;

    //score color
    var color_p = '#'+random().toString(16).substr(-6);
    document.getElementById("points").style.color = color_p;

    if(rage_timer - 10 == rage_tmp){
      raaage = 0;
      rage_music.stop();
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (in_game != 0 && s.yspeed != 1) {
      s.dir(0, -1);
      pressed = 1;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (in_game != 0 && s.yspeed != -1) {
      s.dir(0, 1);
      pressed = 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (in_game != 0 && s.xspeed != -1) {
      s.dir(1, 0);
      pressed = 1;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (in_game != 0 && s.xspeed != 1) {
      s.dir(-1, 0);
      pressed = 1;
    }
  } else if (keyCode === 32) {
    if (in_game == 0 && first_time == 0) {
      in_game = 1;
      document.getElementById("start-gui").style.visibility = "hidden";
      document.getElementById("mask").style.visibility = "hidden";
      s.xspeed = 1;
      hit.play();
      // intro.stop();
      // game_1.play();
    }
  } else if (keyCode == 13) {
    if (first_time == 1){
      if(document.getElementById('nick-box').value === '' ){
        $("#nick-gui").effect('shake', { times:2 }, 300);  //shake jQuery function
      } else {
        document.getElementById("start-gui").style.visibility = "visible";
        document.getElementById("nick-gui").style.visibility = "hidden";

        first_time = 0;

        document.cookie = "nickname=" + document.getElementById('nick-box').value;
        console.log("Hello,", document.getElementById('nick-box').value);
      }
    }
  }
}

function init_gui () {
  if (document.cookie.indexOf("nickname") == -1){
    first_time = 1;
  }

  if (document.cookie.indexOf("highscore") == -1){
    document.cookie = "highscore=0";
  }
  
  document.getElementById("mask").style.visibility = "visible";

  if (typeof window.orientation !== 'undefined') {
    background(0);
    document.getElementById("instr").style.visibility = "hidden";
    document.getElementById("high").style.visibility = "hidden";
    document.getElementById("title").innerHTML = "THIS SNAKE DOESN'T LIKE MOBILE PHONES :(";
  } 
  else {
  //start-gui
  document.getElementById("title").innerHTML = "SNAKE GAME";
  document.getElementById("instr").innerHTML = "TO START PRESS SPACE";
  document.getElementById("high").innerHTML = "HIGHSCORE: " + getCookie("highscore");

  //nick-gui
  document.getElementById("nick-text").innerHTML = "ENTER YOUR NICKNAME HERE";

}  
}

function start_timer() {
  rage_timer = 0;
  setInterval(function(){
    var a = new Date();
    rage_timer++;
    console.log(rage_timer, rage_tmp);
  },1000);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

