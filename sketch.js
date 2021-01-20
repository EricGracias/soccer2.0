const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var field,fieldImage;
var goalpost,goalpostImage;
var p1,p1Image;
var p1_running;
var ball,ballImage;

var po1,po2,po3,po4;

var gk,gkImage,gk_dive1,gk_dive2,gk_catch;
var b1,b2,b3,b4; 

function preload(){
    fieldImage = loadImage("fg.png");

    p1Image = loadAnimation("p1_2.png");

    p1_running = loadAnimation("pl1.png","pl1_2.png");

    ballImage = loadImage("scb.png");

    goalpostImage = loadImage("gp.png");

    gkImage = loadImage("gk.png");

    gk_dive1 = loadImage("gks_1.png");

    gk_dive2 = loadImage("gks_2.png");

    gk_catch = loadImage("gk_catch.png");

}

function setup(){
    createCanvas(1526,705);
    
    engine = Engine.create();
    world = engine.world;

    field = createSprite(763,352.5);
    field.addImage(fieldImage);
    field.scale=2;
    field.rotation = 90;

    goalpost = createSprite(763,-460);
    goalpost.addImage(goalpostImage);
    goalpost.scale = 0.8;

    p1 = createSprite(763,500);
    p1.scale=0.5;

    p1.addAnimation("p1",p1Image);
    p1.addAnimation("running",p1_running);

    ball = createSprite(763,352.5);
    ball.addImage(ballImage);
    ball.scale=0.05;
    ball.setCollider("circle");

    po1 = createSprite(763,-460,240,5);
    po1.visible = false;

    po2 = createSprite(881,-460,5,50);
    po2.visible = false;

    po3 = createSprite(647.5,-460,5,50);
    po3.visible = false;

    po4 = createSprite(763,-487,240,5);
    po4.visible = false;

    gk = createSprite(763,-430);
    gk.addImage(gkImage);
    gk.scale=0.6;

    b1 = createSprite(763,-542,1130,10);
    b1.shapeColor="green";

    b2 = createSprite(763,1250,1130,10);
    b2.shapeColor="green";

    b3 = createSprite(1322,352.5,10,1800);
    b3.shapeColor="green";
    
    b4 = createSprite(200,352.5,10,1800);
    b4.shapeColor="green";

    var options = {
      'restitution':0.8,
      'friction':1.0,
      'density':1.0
  }

    P1 = Bodies.rectangle(p1.position.x,p1.position.y, options);
  // //P1.addAnimation("running",p1_running);
    World.add(world,P1);
  ball2 = new Ball(ball.position.x,ball.position.y);

  var options = {
  bodyA: p1.body,
  bodyB: ball.body,
  stiffness: 0.04,
  length: 2
   }

  chain = Constraint.create(options);
  World.add(world,chain);
    
}

function draw(){
    background("white");
    ball.bounceOff(p1);
    ball.bounciness=0.01;
    ball.bounceOff(po1);
    ball.bounceOff(po2);
    ball.bounceOff(po3);
    ball.collide(gk);
    gk.collide(po1);
    gk.collide(po2);
    gk.collide(po3);
    ball.collide(b1);
    ball.collide(b2);
    ball.collide(b3);
    ball.collide(b4);
    b1.collide(gk);
    p1.collide(po1);
    p1.collide(po2);
    p1.collide(po3);
    p1.collide(b1);
    p1.collide(b2);
    p1.collide(b3);
    p1.collide(b4);

    Engine.update(engine);

    p1.changeAnimation("p1",p1Image);
    //p1.addAnimation("running",p1_running);

    if(keyDown("space")){
        ball.bounciness=7;
        ball.displace(gk);
      }
    

      if(ball.velocityX<0||ball.velocityX>0||ball.velocityY<0||ball.velocityY>0){
        ball.rotationSpeed=10;
      }

      if (keyDown("up")){
        p1.setSpeedAndDirection(p1.getSpeed()+1, p1.rotation-90);
        p1.changeAnimation("running",p1_running);
      } 

      ball2.display();

      if(keyWentUp("up")){
        p1.velocityX=0;
        p1.velocityY=0;
      }
      
      if (keyDown("down")){
        p1.setSpeedAndDirection(p1.getSpeed()-3, p1.rotation-90);
      }
      if(keyWentUp("down")){
        p1.velocityX=0;
        p1.velocityY=0;
      }
      
      if (keyDown("left")) {
        if (keyDown("/") && keyDown("up") == false ) {
          p1.rotation = p1.rotation-18;
        } else {
          p1.rotation = p1.rotation-5;
        }
      }

      if (keyDown("right")) {
        if (keyDown("/") && keyDown("up") == false) {
          p1.rotation = p1.rotation+18;
        } else {
          p1.rotation = p1.rotation+5;
        }
      }

      if (p1.getSpeed() > 4) {
        p1.setSpeedAndDirection(4, p1.rotation-90);
      }

      if (p1.getSpeed() < -4) {
        p1.setSpeedAndDirection(-4, p1.rotation-90);
      }

      if(ball.collide(gk)){
        gk.addImage(gk_catch);
        ball.rotationSpeed=0;
        ball.velocityX=0;
        ball.velocityY=0;
      }
      else{
        gk.addImage(gkImage);
      }

      if(ball.x<763){
        gk.velocityX=(random(-1,-8));
        //gk.addImage(gk_dive1);
      }
      
      if(ball.x>763){
        gk.velocityX=(random(1,8));
        //gk.addImage(gk_dive2);
      }

      if(keyDown("b")){
        ball.velocityX=0;
        ball.velocityY=0;
      }

      if((P1.body).isTouching(ball.body)){
        chain.bodyA = ball.body;
        if(keyCode === 32){
       chain.bodyA = null;
      }
    }

      camera.x=ball.x;
      camera.y=ball.y;

drawSprites();    
}