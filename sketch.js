//criando nossas variáveis
var trex, trex_running, trex_triste;
var ground, invisibleGround, groundImage;
var clouds;
var imgclouds;
var score;
var obs1,obs2,obs3,obs4,obs5,obs6;
var Tempodejogo;
var gameoverimg,gameover,restartimg,restart;
var sompulo;
var somtristeza;
var somvida;

var grupodenuvens, grupodeobs;
var jogando = 1;
var gameover = 0;
var estadodojogo = jogando;

//Escopo local e global de variáveis
//var mensagem = "isso é uma mensagem";
//console.log(mensagem);

function preload(){
  //carrega a animação com imagens
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  //carrega a imagem para o sprite
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage ("restart.png");

  imgclouds= loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  trex_triste = loadAnimation("trex_collided.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  sompulo = loadSound("jump.mp3");
  somtristeza = loadSound("die.mp3");
  somvida = loadSound("checkPoint.mp3");
}

function setup() {

  //cria a área do nosso jogo (tela)
  createCanvas(windowWidth,windowHeight);
  
  //crie um sprite de trex, adiciona a animação a ele e ajusta o tamanho
  trex = createSprite(50,height-70,20,50);

  trex.addAnimation("running", trex_running);
  trex.addAnimation("tristeza", trex_triste);

  trex.scale = 0.5;
  
  //crie sprite ground (solo), adiciona a imagem a ele e reinicia o solo
  ground = createSprite(width/2,height-80,width,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameover = createSprite(width/2,height/2-50);
  gameover.addImage("Fim",gameoverimg);
  gameover.scale = 0.5;

  restart = createSprite(width/2,height/2);
  restart.addImage("tentenovamente",restartimg);
  restart.scale = 0.5;
  
  //crie um solo invisível
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;

  //criar os grupos
  grupodenuvens = new Group();
  grupodeobs = new Group();

  //console.log(5+"     Oi");
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100));
  //console.log(rand)

  trex.setCollider("circle",0,0,40);
  //trex.debug = true;

//coloca o valor inicial para o tempo de jogo
Tempodejogo = 0;
}

function draw() {

  
//console.log(frameCount);
  //definir cor do plano de fundo
  background(180);
  //console.log(trex.y)

//Coloando o texto do tempo de jogatina (CONCATENAÇÃO)
text("Tempo De Jogatina:"+Tempodejogo,250,50);

//console.log("Estado do jogo atual:"+estadodojogo);

if(estadodojogo === jogando){
  ground.velocityX = -(4+Tempodejogo/100);

//Aumenta o tempo de jogo de acordo com os frames do jogo
Tempodejogo = Tempodejogo + Math.round(frameRate()/60);

if(Tempodejogo%100 ===0&& Tempodejogo>0){
somvida.play();


}

//reinicia o solo
if (ground.x < 0){
  ground.x = ground.width/2;
}

 // pulando o trex ao pressionar a tecla de espaço
 if(keyDown("space") || touches.length > 0 && trex.y >= 150) {
  trex.velocityY = -10;
  sompulo.play();
  touches = [];
 }
  //sistema de gravidade
  trex.velocityY = trex.velocityY + 0.8;
   
  //Gerar Nuvens
  spawnClouds();
 
  //Gerar obstáculos
  gerarobstaculos();

  gameover.visible = false;
  restart.visible = false;


  if(grupodeobs.isTouching(trex)){
    estadodojogo = gameover;
    trex.changeAnimation("tristeza",trex_triste);
    grupodeobs.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
    somtristeza.play();
  
  }

}else if (estadodojogo === gameover){
  ground.velocityX = 0;
  grupodeobs.setVelocityXEach(0);
  grupodenuvens.setVelocityXEach(0);
  trex.velocityY = 0;
  gameover.visible = true;
  restart.visible = true; 

  if(mousePressedOver(restart)){
    recomeco();
  }

}

  //impedir que o trex caia
  trex.collide(invisibleGround);

  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
if(frameCount%60 ===0){
  clouds= createSprite(width+20,height-300,40,10);
  clouds.y = Math.round(random(10,height/2));
  clouds.addImage(imgclouds);
  clouds.depth = trex.depth;
  trex.depth = trex.depth+1;
  clouds.velocityX= -3;

  grupodenuvens.add(clouds);

  clouds.lifetime = 250;
  
}

//função para gerar obstáculos
}
function gerarobstaculos(){
  if(frameCount%60 ===0){
var obstaculos = createSprite(width,height-95,10,40);
obstaculos.velocityX =-(6+Tempodejogo/100);
var numeroRan = Math.round(random (1,6));
switch(numeroRan){
case 1:
  obstaculos.addImage(obs1);
break

case 2:
  obstaculos.addImage(obs2);
  break

  case 3:
  obstaculos.addImage(obs3);
  break

  case 4:
  obstaculos.addImage(obs4);
 break

 case 5:
 obstaculos.addImage(obs5);
 break

 case 6:
 obstaculos.addImage(obs6);
break

default:break
}
obstaculos.scale =0.45;

grupodeobs.add(obstaculos);

obstaculos.lifetime = 300;
  }

}

function recomeco(){
estadodojogo = jogando;

restart.visible = false;
gameover.visible = false;
grupodeobs.destroyEach();
grupodenuvens.destroyEach();
trex.changeAnimation("running",trex_running);
Tempodejogo = 0;
}




