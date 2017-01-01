var score = 0;
var high_score = 0;

function Snake() {
  this.x = (window.innerWidth / 2) - (window.innerWidth / 2) % scl;
  this.y = (window.innerHeight / 2) - (window.innerHeight / 2) % scl;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      score++;
      this.total++;

      pickRaaageLocation();

      return true;
    } else {
      return false;
    }
  }

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        update_high();
        write_score();
        score = 0;

        // hit.play();
        // game_1.stop();
        // rage_music.stop();
        // intro.play();

        raaage = 0;
        in_game = 0;
        document.getElementById("high").innerHTML = "HIGHSCORE: " + getCookie("highscore");
        document.getElementById("mask").style.visibility = "visible";
        document.getElementById("start-gui").style.visibility = "visible";

        this.xspeed = 0;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        this.x = (window.innerWidth / 2) - (window.innerWidth / 2) % scl;
        this.y = (window.innerHeight / 2) - (window.innerHeight / 2) % scl;
      }
    }
  }

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

    document.getElementById("points").innerHTML = "Score: " + score;
  }

  this.show = function () {
    if(raaage == 2){
      fill(random(0,255), random(0,255), random(0,255));
    } else {
      fill(255);
    }

    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
      if(raaage == 2){
        fill(random(0,255), random(0,255), random(0,255));
      }
    }
    rect(this.x, this.y, scl, scl);
    
  }
}

function update_high() {
  if (score > getCookie("highscore")) {
    high_score = score;
    document.cookie = "highscore=" + high_score;
    document.cookie = "username=John Doe";
  }
}

function write_score (){
  // var javascriptVariable = "John";
  // window.location.href = "write_highscore.php?name=" + javascriptVariable; 
  $.ajax({
    url: 'write_highscore.php',
    data: 'name=' + getCookie("nickname") + ' ' + score + ' ' + rage_timer, 
    success: function(data) {

    },
    error: function() {

    }
  });
}