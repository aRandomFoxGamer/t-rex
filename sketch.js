var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var imgground;
var invisibleGround;
var cloudImg, cloud;
var cactusImg, cactus, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var score = 0;
var PLAY = 1, END = 0, gamestate = PLAY;
var cacti;
var clouds;
var gameover, gameoverImg, restart, restartImg;
var die, jump, checkpoint;

function preload() {
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkpoint.mp3");

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  cactus1 = loadImage("cactus1.png");
  cactus2 = loadImage("cactus2.png");
  cactus3 = loadImage("cactus3.png");
  cactus4 = loadImage("cactus4.png");
  cactus5 = loadImage("cactus5.png");
  cactus6 = loadImage("cactus6.png");
}

function setup() {
createCanvas(600, 200);

cacti = new Group();
clouds = new Group();

trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addImage("collided", trex_collided);
trex.scale = 0.5;

ground = createSprite(200,180,400,20);
ground.addImage("ground2",groundImage);
ground.x = ground.width /2;
invisibleGround=createSprite(200, 190, 400, 10)
invisibleGround.visible =false;

trex.setCollider("circle",0,0,40);
}

function draw() {
background(rgb(240,240, 240));
gameover = createSprite(trex.x + 150, trex.y - 100, 50, 50);
gameover.addImage(gameoverImg);
restart = createSprite(trex.x + 100, trex.y - 50, 20, 20);
restart.addImage(restartImg);

text("score " + score, 500, 50);

console.log(frameCount);
console.log(trex.y);

trex.collide(invisibleGround);

if(gamestate === PLAY){
score = score+ Math.round(frameCount / 60);
ground.velocityX = -(4+3*score/100);

if (keyDown("space") && (trex.y > 160)) {
  trex.velocityY = -15;
  jump.play();
}
trex.velocityY = trex.velocityY + 0.8;
if (ground.x < 0) {
  ground.x = ground.width / 10;
}
spawnclouds();
spawnCactus();
ground.velocityX = -5;
if(trex.isTouching(cacti)){
gamestate = END;
die.play();
}
if(score > 0 && score % 100 === 0){
checkpoint.play();
}
restart.visible = false;
gameover.visible = false;
}

else if(gamestate === END){
ground.velocityX = 0;
clouds.setLifetimeEach(-1);
cacti.setLifetimeEach(-1);
gameover.scale = 2;
restart.visible = true;
gameover.visible = true;
restart.scale = 0.5;
trex.velocityY = 0;
cacti.setVelocityXEach(0);
clouds.setVelocityXEach(0);
trex.changeAnimation("collided");
if(mousePressedOver(restart)){
reset();
}
}
drawSprites();
}

function spawnclouds(){
if (frameCount % 80 === 0){
  cloud= createSprite(600, random(20, 100), 10, 10);
  cloud.addImage(cloudImg);
  cloud.scale= 0.1,5
  cloud.velocityX = -5;

  cloud.lifetime = 210;

 cloud.depth=trex.depth;
 trex.depth=trex.depth+1;
 clouds.add(cloud);
}
}
function spawnCactus(){
  if (frameCount % 60 === 0) {
    cactus.velocityX = -(6+score/100);
    cactus = createSprite(610,165,10,40);
    var rand = Math.round(random(1, 6));
    switch(rand){
    case 1: cactus.addImage(cactus1);
    break;
    case 2: cactus.addImage(cactus2);
    break;
    case 3: cactus.addImage(cactus3);
    break;
    case 4: cactus.addImage(cactus4);
    break;
    case 5: cactus.addImage(cactus5);
    break;
    case 6: cactus.addImage(cactus6);
    break;
    default: break;
    }
    cactus.scale = 0.07;
    cactus.velocityX = -5;
    cactus.lifetime = 220;
    cacti.add(cactus);
  }
}
function reset(){
restart.visible = false;
gameover.visible = false;
gamestate = PLAY;
cacti.destroyEach();
clouds.destroyEach();
}