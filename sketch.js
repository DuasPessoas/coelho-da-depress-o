const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var fruit_con2;
var fruit_con3;
var backgroundimg;
var coelhoimg, coelho;
var melanciaimg;
var tesouraimg;
var muteimg;
var sad;
var eat;
var blink;

var airmusic;
var cuttingmusic;
var eatingmusic;
var ropecutmusic;
var bkmusic;
var sadmusic;

var balaum;
var muteb;

var rope2;
var rope3;

function preload(){

  backgroundimg = loadImage("background.png");
  coelhoimg = loadImage("Rabbit-01.png");
  melanciaimg = loadImage("melon.png");
  sad = loadAnimation ("sad_1.png", "sad_2.png", "sad_3.png");
  eat = loadAnimation ("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  blink = loadAnimation ("blink_1.png", "blink_2.png", "blink_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;

  airmusic = loadSound("air.wav");
  cuttingmusic = loadSound("Cutting Through Foliage.mp3");
  eatingmusic = loadSound("eating_sound.mp3");
  ropecutmusic = loadSound("rope_cut.mp3");
  bkmusic = loadSound("sound1.mp3");
  sadmusic = loadSound("sad.wav");

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  //ground = new Ground(200,680,600,20);

  rope = new Rope(5,{x:245,y:30});
  rope2 = new Rope(7,{x:43,y:45});
  rope3 = new Rope(7,{x:385,y:215});

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  //usamo pra centraliza imagem
  imageMode(CENTER);
  
  //atraso de quadro
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  //usamu p5 play pra fazer a imagem do cuieu
  coelho = createSprite(250, 630, 100, 100);
  coelho.addImage(coelhoimg);
  coelho.scale = 0.2;
  //animação do cuielho
  coelho.addAnimation("piscando", blink);
  coelho.addAnimation("comendo", eat);
  coelho.addAnimation("depressão", sad);
  coelho.changeAnimation("piscando");

  //usamu p5 js pra fazer o butaom
  button = createImg("cut_btn.png");
  button.position(220,30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png");
  button2.position(20,30);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_btn.png");
  button3.position(360,200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);



  //usamu p5 js pra fazer o balaum
  balaum = createImg("balloon.png");
  balaum.position(10,250);
  balaum.size(150, 100);
  balaum.mouseClicked(airblow);

  //usamu p5 js pra fazer o mute
  muteb = createImg("mute.png");
  muteb.position(400,50);
  muteb.size(50, 50);
  muteb.mouseClicked(mute);
}

function draw() 
{
  background(51);
  //imagem de fundo
  image(backgroundimg, width/2, height/2, 500, 700);
  rope.show();
  rope2.show();
  rope3.show();
  //so moxtra fruta se o corpo existir
  if(fruit!=null){
    //melacia imagem
    image(melanciaimg, fruit.position.x,fruit.position.y,61,61);
  }
  if(collide(fruit,coelho)==true){
    coelho.changeAnimation("comendo");
    bkmusic.stop();
    eatingmusic.play();
  }
  if(fruit!=null && fruit.position.y>=650){
    coelho.changeAnimation("depressão");
    sadmusic.play();

  }       
  Engine.update(engine);
  //ground.show();
  drawSprites();


   
}

//dropa ou seja corta
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;

  cuttingmusic.play();
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;

  cuttingmusic.play();
}

function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;

  cuttingmusic.play();
}

function collide(body, sprite){
  //verifica se o corpo existe ou não
  if(fruit!=null){
    //calcula a dixtancia entre doix corpos
    var d =dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);

    //determina a condição da dixtancia que causa a colisão
    if(d <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }else{
      return false;
    }
  }
}

function airblow(){
  //aplicar força em um corpo
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});
}

function mute(){
  if(bkmusic.isPlaying()){
    bkmusic.stop();
  }
  else{bkmusic.play()}
}