const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

window.addEventListener('DOMContentLoaded', (event) => {
  const audio = document.querySelector('audio');
  audio.volume = 0.4;
  audio.play();
});
let score = 0;
let gameFrame = 0;
let gameOver = false;

//key activity
keys = [];

//Adding the assets
const cloud = new Image();
cloud.src = './static/cloud.png';

const tree = new Image();
tree.src = './static/tree.png';

const degirmen = new Image();
degirmen.src = './static/degirmen.png';

const degirmen_sail = new Image();
degirmen_sail.src = './static/sail.png';

const house = new Image();
house.src = './static/house.png';

const tisch = new Image();
tisch.src = './static/tisch.png';

const bier = new Image();
bier.src = './static/bier_mas2.png';

const judi = new Image();
judi.src = './static/judi_last.png';
function collision(r1, r2) {
  /* return !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    ); */
  return !(
    r1.x > r2.x + r2.collisonWidth ||
    r1.x + r1.collisonWidth < r2.x ||
    r1.y > r2.y + r2.collisonHeight ||
    r1.y + r1.collisonHeight < r2.y
  );
}
class Player {
  constructor() {
    this.spriteWidth = 4800 / 12; // - 330; //needs to be changed based on the characted
    this.spriteHeight = 2320 / 4 - 50; //- 33; //needs to be changed based on the characted
    this.x = 580; //350;
    this.y = 460; //337;
    this.width = this.spriteWidth; //6;
    this.height = this.spriteHeight; //2;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.speed = 5;
    this.moving = false;
    this.collisonWidth = this.width / 4;
    this.collisonHeight = this.height / 5;
    //this.sound = sound1; //Math.random() <= 0.5 ? 'sound1' : 'sound2';
  }

  update() {
    /*     const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
          this.x -= dx / 30;
        }
        if (mouse.y != this.y) {
          this.y -= dy / 30;
        } */

    if (keys['ArrowLeft'] && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;

      // player.frameY = 1;
      // player.moving = true;
    }
    if (keys['ArrowRight'] && this.x < canvas.width - this.collisonWidth) {
      this.x += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    if (keys['ArrowDown'] && this.y < canvas.height - this.collisonHeight) {
      // arrow down
      this.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    if (keys['ArrowUp'] && this.y > 0) {
      // 38 is the up arrow
      this.y -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }
  }

  draw() {
    /*   ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill(); */
    ctx.drawImage(
      judi,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
    );
  }
}

class Bier {
  constructor() {
    this.x = Math.random() * (canvas.width - 32) + 32; //Math.random() * canvas.width;
    this.y = 0;
    this.speed = Math.random() * 5 + 1;
    this.width = 32;
    this.height = 32;
    this.counted = false;
    this.collisonHeight = this.height * 2;
    this.collisonWidth = this.width * 2;
  }

  update() {
    this.y += this.speed;
    /* const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy); */
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.drawImage(
      bier,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
function drawHouse() {
  ctx.drawImage(
    house,
    0,
    0,
    1024,
    973,
    canvas.width - 210,
    170,
    1024 / 8,
    973 / 8
  );
}

function drawTisch() {
  ctx.drawImage(tisch, 0, 0, 512, 341, 0, 302, 512 / 5, 341 / 5);
}

class Clouds {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 800;
    this.spriteHeight = 956;
    this.frameX = 0;
    this.frameY = 0;
  }

  draw() {
    /*     ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill(); */
    ctx.drawImage(
      cloud,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth / 7,
      this.spriteHeight / 7
    );
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 106;
    this.spriteHeight = 210;
    this.frameX = 0;
    this.frameY = 0;
  }

  draw(widthPro, heightPro) {
    ctx.drawImage(
      tree,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth / widthPro,
      this.spriteHeight / heightPro
    );
  }
}

class Degirmen {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 883;
    this.spriteHeight = 1080;
    this.frameX = 0;
    this.frameY = 0;
  }

  draw() {
    ctx.drawImage(
      degirmen,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth / 7.5,
      this.spriteHeight / 7.5
    );
  }
}

class DegirmenSail {
  constructor() {
    this.x = 175;
    this.y = 140;
    this.spriteWidth = 10350 / 9;
    this.spriteHeight = 1150;
    this.frameX = 0;
    this.frameY = 0;
    this.collisonWidth = this.spriteWidth / 11;
    this.collisonHeight = this.spriteHeight / 11;
    this.speed = 5;
    this.frame = 0;
  }
  draw() {
    ctx.drawImage(
      degirmen_sail,
      this.spriteWidth * this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
    );
  }

  update() {
    if (gameFrame % 5 == 0) {
      this.frame++;
      /*   if (this.frame >= 8) this.frame = 0;

      if (this.frame == 8) {
        this.frameX = 0;
      } else {
        this.frameX++;
      } */
      if (this.frame % 9 == 0) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
    }
  }
}

let player = new Player();
let bier1 = new Bier();
function handleCharacterFrame() {
  if (gameFrame % 3 == 0) {
    if (player.frameX < 12 && player.moving) player.frameX++;
    else player.frameX = 0;
  }

  if (!player.moving) {
    player.frameY = 2;
  }
}

let biers = [];
function handleObjects() {
  if (gameFrame % 50 == 0) {
    biers.push(new Bier());
  }
  //For enemies
  for (let i = 0; i < biers.length; i++) {
    biers[i].update();
    biers[i].draw();
  }
  for (let i = 0; i < biers.length; i++) {
    if (biers[i].y < 0) {
      biers.splice(i, 1);
      i--;
    }
    if (biers[i]) {
      if (biers[i].distance < 20) {
        if (!biers[i].counted) {
          sound1.play();
          score++;
          biers[i].counted = true;
          biers.splice(i, 1);
          i--;
        }
      }

      if (collision(player, biers[i])) {
        if (!biers[i].counted) {
          score++;
          biers[i].counted = true;
          biers.splice(i, 1);
          i--;
        }
      }
    }
  }
}

let Tree1 = new Tree(5, 170);
let Tree2 = new Tree(canvas.width - 75, 170);
let Tree3 = new Tree(5, canvas.height - 140);
let Tree4 = new Tree(canvas.width - 75, canvas.height - 140);

let degirmen1 = new Degirmen(170, 145);
let degirmen_sail1 = new DegirmenSail();

let aClouds = [];

for (let i = 0; i < canvas.width - 133; i += 95) {
  aClouds.push(new Clouds(i, -5));
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (element of aClouds) {
      element.draw();
    }
    drawHouse();
    drawTisch();
    Tree1.draw(2, 2);
    Tree2.draw(2, 2);
    Tree3.draw(1.5, 1.5);
    Tree4.draw(1.5, 1.5);
    degirmen1.draw();
    degirmen_sail1.update();
    degirmen_sail1.draw();
    handleObjects();
    bier1.update();
    bier1.draw();
    player.update();
    player.draw();
    handleCharacterFrame();
    ctx.fillStyle = 'black';
    ctx.fillText('Bier eingesammelt:' + score, 10, 50); // alle Quark eingesammelt
    gameFrame++;
    /*  cloud1.draw();
  cloud2.draw(); */
  }
}

window.addEventListener('keydown', function (e) {
  keys[e.key] = true;
  player.moving = true;
});

window.addEventListener('keyup', function (e) {
  delete keys[e.key]; // to prevent to get mixed with previous key events
  player.moving = false;
});

startAnimating(27);
