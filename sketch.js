var r = 0;
var g = 0;
var b = 0;
let angeletti, angelettiMoving, character, character1, dog, jointImg, joint;
let song1, song2;
let dogChar;
let portal;
let x = 50,
  y = 50;
let xspeed = 10,
  yspeed = 4;
let movingRight = false;
let movingLeft = false;
let movingUp = false;
let movingDown = false;
let bulletsArr = [];
let dogUp = true;

let xpos = 300;
let ypos = 300;
let dogx = 550;
let dogy = 600 / 2;
let speed = 5;
let ai,
  aiMove = false;
const fireworks = [];
let gravity;
let gameState = "menu";
let buttons = [true];
let sqrx = 50,
  sqry = 50;
let killedDog = false;
let win = false;

function preload() {
  angeletti = loadImage("angeletti.png");
  angelettiMoving = loadImage("angeletti1.png");
  dog = loadImage("dog.png");
  jointImg = loadImage("joint.png");
  song1 = loadSound("bf.mp3");
  song2 = loadSound("mm.mp3");
}
function setup() {
  createCanvas(700, 600);
  stroke("green");
  strokeWeight(4);
  gravity = createVector(0, 0.2);

  song2.play();
  setInterval(randomPos, 2000);
}

function draw() {
  background(r, g, b);
  fill(255);
  stroke(255);
  if (!win) {
    for (let i = 0; i < bulletsArr.length; i++) {
      bulletsArr[i].display();
      bulletsArr[i].shoot();

      if (
        bulletsArr[i].x >= dogx &&
        bulletsArr[i].x <= dogx + 120 &&
        bulletsArr[i].y >= dogy &&
        bulletsArr[i].y <= dogy + 130
      )
        dogx = bulletsArr[i].x;
      killedDog = true;
    }
    if (dogx > width + 50) {
      win = true;
    }

    if (aiMove) {
      stroke("red");
      strokeWeight(4);
    }

    if (gameState == "menu") {
      drawMenu();
    }

    // Part1
    if (gameState == "part1") {
      character = new Player(image(angeletti, x, y, 170, 90), xpos, ypos);
      x += xspeed;
      y += yspeed;

      if (x > width - 170 || x < 0) {
        xspeed = -xspeed;
        xspeed *= 1.05;
        r = random(255);
        g = random(255);
        b = random(255);
      }
      if (y > height - 90 || y < 0) {
        yspeed = -yspeed;
        yspeed *= 1.05;
        r = random(255);
        g = random(100, 200);
        b = random(100);
      }

      if (random(1) < 0.04) {
        fireworks.push(new Firework());
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
          fireworks.splice(i, 1);
        }
      }
    }

    //part 2
    if (gameState == "part2") {
      character = new Player(
        image(angelettiMoving, xpos, ypos, 120, 130),
        xpos,
        y
      );
      stroke("red");
      strokeWeight(4);

      dogChar = image(dog, dogx, dogy, 120, 130);

      if (dogUp) {
        dogy += 10;
      } else {
        dogy -= 10;
      }

      if (dogy <= 0) dogUp = true;

      if (dogy >= 600 - 130) dogUp = false;

      if (movingRight) {
        xpos += speed;
      }
      if (movingLeft) {
        xpos -= speed;
      }
      if (movingUp) {
        ypos -= speed;
      }
      if (movingDown) {
        ypos += speed;
      }
    }

    if (killedDog) {
      stroke("green");
      strokeWeight(4);
      portal = new Portal(sqrx, sqry);
      portal.display();
    }
  } else {
    fill(255);
    textSize(50);
    text("Happy Birthday ANGELETIIIIIIII", 100, height / 2 - 50, 600, 500);
    if (random(1) < 0.5) {
      fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();

      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
  }
}

function mouseClicked() {
  if (
    gameState == "menu" &&
    mouseX >= width / 2 - 48 &&
    mouseX <= width / 2 - 48 + 150 &&
    mouseY >= height / 2 &&
    mouseY <= height / 2 + 150
  ) {
    gameState = "part1";
    song2.stop();
    song1.play();
  }

  if (
    mouseX >= x &&
    mouseX <= x + 170 &&
    mouseY >= y &&
    mouseY <= y + 90 &&
    gameState == "part1"
  ) {
    gameState = "part2";
    r = 0;
    g = 0;
    b = 0;
    angeletti = angelettiMoving;
    ai = new AI(
      50,
      50,
      new Player(image(angelettiMoving, xpos, ypos, 120, 130), xpos, y)
    );
    stroke("red");
    strokeWeight(4);
    ai.display();
  }
}

const drawMenu = () => {
  fill(20, 220, 20);
  noStroke();
  textSize(30);
  text("First Pronounce the following words:", width / 2 - 230, 50, 600, 80);
  textSize(20);
  text("- Wood", width / 2 - 50, 100, 600, 80);
  text("- Pizza", width / 2 - 50, 130, 600, 80);
  text("- Uber", width / 2 - 50, 160, 600, 80);

  rect(width / 2 - 70, height / 2, 150, 70);
  fill(255);
  text("Start Game", width / 2 - 48, height / 2 + 25, 150, 70);
};

function keyReleased() {
  if (gameState == "part2") {
    if (keyCode == UP_ARROW || key == "w") {
      movingUp = false;
    }
    if (keyCode == LEFT_ARROW || key == "a") {
      movingLeft = false;
    }
    if (keyCode == DOWN_ARROW || key == "s") {
      movingDown = false;
    }
    if (keyCode == RIGHT_ARROW || key == "d") {
      movingRight = false;
    }
  }
}

function keyPressed() {
  if (gameState == "part2") {
    if (keyCode == UP_ARROW || key == "w") {
      movingUp = true;
    }
    if (keyCode == LEFT_ARROW || key == "a") {
      movingLeft = true;
    }
    if (keyCode == DOWN_ARROW || key == "s") {
      movingDown = true;
    }
    if (keyCode == RIGHT_ARROW || key == "d") {
      movingRight = true;
    }

    if (keyCode == ENTER) {
      let bullet = new Bullet(xpos, ypos + 60);
      bulletsArr.push(bullet);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 25;
  }

  display() {
    joint = image(jointImg, this.x, this.y, 80, 50);
  }
  shoot() {
    this.x += this.speed;
  }
}

class AI {
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.rotation = atan2(player.y - this.y, player.x - this.y);
    this.speed = 2.5;
  }

  move() {
    this.x += cos(this.rotation) * this.speed;
    this.y += sin(this.rotation) * this.speed;
  }

  display() {
    push();
    ellipse(this.x, this.y, 50);
  }
}

class Player {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
  }
}

const randomPos = () => {
  sqrx = random(0, width);
  sqry = random(0, height);
};

class Portal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    stroke("green");
    fill("green");

    strokeWeight(4);
  }

  display() {
    push();
    stroke("green");
    fill("green");
    strokeWeight(4);
    rect(this.x, this.y, 50, 50);
    pop();
  }
}
