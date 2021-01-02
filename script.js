const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

ctx.font = '30px Georgia';

window.addEventListener('DOMContentLoaded', (event) => {
  const audio = document.querySelector('audio');
  audio.volume = 0.4;
  audio.play();
});

let score = 0;
let gameFrame = 0;
let gameOver = false;
let itemSpeed;
let level = 0;
let level_indicator = false;
let Leben = 100;
let current_frame = 0;
let current_score = 5;
let collision_effect = false;

//key activity
keys = [];

//Adding the assets

const background = new Image();
background.src = './static/example.png';

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
bier.src = './static/bier_mug.png';
const uzoo = new Image();
uzoo.src = './static/uzo.png';

const cupmagic = new Image();
cupmagic.src = './static/cupmagic.png';

const cupmagic2 = new Image();
cupmagic2.src = './static/cupmagic2.png';

const judi = new Image();
judi.src = './static/Sprite-0001_last.png';

//audios

const ouzo_audio = document.createElement('audio');
ouzo_audio.src = './static/sounds/ouzo.mp3';
ouzo_audio.volume = 1;

const point = document.createElement('audio');
point.src = './static/sounds/point.wav';

const fehler = document.createElement('audio');
fehler.src = './static/sounds/fehler.wav';

const game_over = document.createElement('audio');
game_over.src = './static/sounds/game_over.wav';

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
    this.spriteWidth = 4900 / 12; // - 330; //needs to be changed based on the characted
    this.spriteHeight = 3300 / 5; //1102 / 2; //- 33; //needs to be changed based on the characted
    this.x = 580; //350;
    this.y = 370; //337;
    this.width = this.spriteWidth; //6;
    this.height = this.spriteHeight; //2;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.speed = 5;
    this.moving = false;
    this.collisonWidth = this.width / 5;
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
    if (collision_effect) {
      /* window.addEventListener('keydown', function (e) {
        e.preventDefault();
      }); */
      return;
    }

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

  collisionEffect() {
    if (gameFrame % 5 == 0) {
      this.frame++;
      /*   if (this.frame >= 8) this.frame = 0;

      if (this.frame == 8) {
        this.frameX = 0;
      } else {
        this.frameX++;
      } */
      if (this.frame % 12 == 0) {
        this.frameX = 0;
        collision_effect = false;
      } else {
        this.frameY = 2;
        this.frameX++;
      }
    }
  }

  draw() {
    /* ctx.fillStyle = 'red';
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
    this.speed = Math.random() * 5 + 1;
    this.width = 335;
    this.height = 368;
    this.counted = false;
    this.collisonHeight = this.height / 8;
    this.collisonWidth = this.width / 8 - 5;
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;
    this.y = 0;
  }

  update() {
    this.y += this.speed;
    /* const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy); */
  }
  draw() {
    /* ctx.fillStyle = 'red';
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill(); */
    ctx.drawImage(
      bier,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.collisonWidth,
      this.collisonHeight
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
    canvas.width - 190,
    190,
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

class Uzo {
  constructor() {
    this.speed = Math.random() * 10 + 5;
    this.distance; //Keep the information of the distance between objects and player
    this.width = 130;
    this.height = 500;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.collisonHeight = this.height / 4.5;
    this.collisonWidth = this.width / 4.5;
    this.counted = false;
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;; //Math.random() * canvas.width;
    this.y = 0;

    /*
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;
    this.y = 0;
    */
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    /* ctx.fillStyle = 'blue';
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill();
 */
    ctx.drawImage(
      uzoo,
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

class Enemy {
  constructor() {
    this.speed = Math.random() * 8 + itemSpeed + 1;
    this.distance; //Keep the information of the distance between objects and player
    this.width = 121;
    this.height = 140;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.collisonHeight = this.height / 4;
    this.collisonWidth = this.width / 4;
    this.counted = false;
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;; //Math.random() * canvas.width;
    this.y = 0;

    /*
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;
    this.y = 0;
    */
  }

  update() {
    this.y += this.speed + itemSpeed;
  }

  draw() {
    /*  ctx.fillStyle = 'green';
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.rect(this.x, this.y, this.collisonWidth, this.collisonHeight);
    ctx.fill();
 */
    ctx.drawImage(
      cupmagic,
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

class Enemy2 {
  constructor() {
    this.speed = Math.random() * 8 + itemSpeed + 1;
    this.distance; //Keep the information of the distance between objects and player
    this.width = 121;
    this.height = 140;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.collisonHeight = this.height / 4;
    this.collisonWidth = this.width / 4;
    this.counted = false;
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;; //Math.random() * canvas.width;
    this.y = 0;

    /*
    this.x =
      Math.random() * (canvas.width - this.collisonWidth) + this.collisonWidth; //Math.random() * canvas.width;
    this.y = 0;
    */
  }

  update() {
    this.y += this.speed + itemSpeed;
  }

  draw() {
    ctx.drawImage(
      cupmagic2,
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
let enemies = [];
let enemies2 = [];
let uzo = [];
let player = new Player();
let bier1 = new Bier();
let enemy1 = new Enemy();
let enemy = new Enemy2();

function handleEnemies() {
  if (gameFrame % 80 == 0) {
    enemies.push(new Enemy());
  }

  if (level >= 2 && gameFrame % 150 == 0) {
    enemies2.push(new Enemy2());
  }
  //For enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
  }
  for (let i = 0; i < enemies2.length; i++) {
    enemies2[i].update();
    enemies2[i].draw();
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y < 0) {
      enemies.splice(i, 1);
      i--;
    }
    if (enemies[i]) {
      if (enemies[i].distance < 20) {
        if (!enemies[i].counted) {
          //sound1.play();
          ///score++;
          enemies[i].counted = true;
          enemies.splice(i, 1);
          i--;
        }
      }

      if (collision(player, enemies[i])) {
        if (!enemies[i].counted) {
          //score = score - 2;
          fehler.play();
          Leben = Leben - 10;
          enemies[i].counted = true;
          enemies.splice(i, 1);
          i--;
        }
        collision_effect = true;
      }
    }
  }
  for (let i = 0; i < enemies2.length; i++) {
    if (enemies2[i].y < 0) {
      enemies2.splice(i, 1);
      i--;
    }
    if (enemies2[i]) {
      if (enemies2[i].distance < 20) {
        if (!enemies2[i].counted) {
          //sound1.play();
          //score++;
          enemies2[i].counted = true;
          enemies2.splice(i, 1);
          i--;
        }
      }

      if (collision(player, enemies2[i])) {
        if (!enemies2[i].counted) {
          //score = score - 2;
          fehler.play();
          if (Leben > 0) {
            Leben = Leben - 20;
          }
          enemies2[i].counted = true;
          enemies2.splice(i, 1);
          i--;
        }
        collision_effect = true;
      }
    }
  }
}

function handleUzo() {
  if (gameFrame % 500 == 0) {
    uzo.push(new Uzo());
  }
  //For enemies
  for (let i = 0; i < uzo.length; i++) {
    uzo[i].update();
    uzo[i].draw();
  }
  for (let i = 0; i < uzo.length; i++) {
    if (uzo[i].y < 0) {
      uzo.splice(i, 1);
      i--;
    }
    if (uzo[i]) {
      if (uzo[i].distance < 20) {
        if (!uzo[i].counted) {
          //sound1.play();
          score++;
          uzo[i].counted = true;
          uzo.splice(i, 1);
          i--;
        }
      }

      if (collision(player, uzo[i])) {
        if (!uzo[i].counted) {
          //score = score + 10;
          ouzo_audio.play();
          Leben = Leben + 10;
          uzo[i].counted = true;
          uzo.splice(i, 1);
          i--;
        }
      }
    }
  }
}

function handleCharacterFrame() {
  if (gameFrame % 3 == 0) {
    if (player.frameX < 11 && player.moving) player.frameX++;
    else player.frameX = 0;
  }

  /* if (!player.moving) {
    player.frameY = 2;
  } */
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
          //sound1.play();
          score++;
          biers[i].counted = true;
          biers.splice(i, 1);
          i--;
        }
      }

      if (collision(player, biers[i])) {
        if (!biers[i].counted) {
          point.play();
          score++;
          biers[i].counted = true;
          biers.splice(i, 1);
          i--;
        }
      }
    }
  }
}

let Tree1 = new Tree(5, 200);
let Tree2 = new Tree(canvas.width - 60, 190);
let Tree3 = new Tree(5, canvas.height - 140);
let Tree4 = new Tree(canvas.width - 75, canvas.height - 140);

let degirmen1 = new Degirmen(170, 145);
let degirmen_sail1 = new DegirmenSail();

let aClouds = [];

for (let i = 0; i < canvas.width - 133; i += 95) {
  aClouds.push(new Clouds(i, -5));
}

function checkLevel() {
  if (score % 10 == 0 && score > 0) {
    level = score / 10;
    //itemSpeed = score / ;
  }
}

function checkDifficulty() {
  itemSpeed = level * 0.5;
}

function handleGameOver() {
  const audio = document.querySelector('audio');
  audio.pause();
  ctx.fillStyle = 'black';
  ctx.fillText('GAME OVER', 290, 250);
  ctx.fillText('Your Score: ' + score, 290, 300);
  gameOver = true;
  game_over.play();
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
function animate() {
  if (!gameOver) requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (element of aClouds) {
      element.draw();
    }
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

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
    //bier1.update();
    //bier1.draw();
    handleEnemies();
    handleUzo();
    player.update();
    player.draw();
    handleCharacterFrame();
    checkLevel();
    checkDifficulty();
    /*   if (score % 10 == 0 || level_indicator) {
      level_indicator = true;

      if (gameFrame % 100 == 0) {
        current_frame++;
      }
      ctx.fillStyle = 'red';
      ctx.fillText(' Level:' + level, canvas.width / 2, canvas.height / 2); // alle Quark eingesammelt
      if (current_frame == 4) {
        level_indicator = false;
        level++;
        current_frame = 0;
        itemSpeed++;
      }
    } */
    if (collision_effect) {
      player.collisionEffect();
    }
    ctx.fillStyle = 'red';
    ctx.fillText(' Level:' + level, canvas.width - 260, 50);
    ctx.fillStyle = 'red';
    ctx.fillText(' Leben:' + Leben, canvas.width - 150, 50);
    ctx.fillStyle = 'black';
    ctx.fillText('Bier eingesammelt:' + score, 10, 50); // alle Quark eingesammelt
    if (Leben < 0) {
      handleGameOver();
    }
    if (score > 8 && score < 12) {
      ctx.fillStyle = 'black';
      ctx.fillText('GUAD', 320, 150);
    }
    if (score > 20 && score < 24) {
      ctx.fillStyle = 'black';
      ctx.fillText(' SAKRISCH GUAD', 320, 150);
    }
    if (score > 30 && score < 34) {
      ctx.fillStyle = 'black';
      ctx.fillText(' WER KO, DEA KO', 320, 150);
    }
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

startAnimating(32);
