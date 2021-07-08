var fighterPlane , fighterPlaneImage1 , fighterPlaneImage2; 
var obsticle1 , obsticle2 , obsticle3
var obsticle1Img , obsticle2Img , ob3Img , ob4Img;
var power , power1 , power2, power3 , power4;
var bg , bgImage;
var bullet  ,bulletImg
var healthImage ,health  , health2 , health3  
var obsticleGroup , obsticelGroup2
var bkImg 
var bk
var coin , coinImg , coinCount=0 , coinGroup
var healthCount = 3
var bullet , bulletGroup
var score = 0 
var gameState = "start" 
var gameOver , gameOverImg
var shootSound , hitSound , pointSound , exploSound , bkSound
var blastImage
var score2 = score*coinCount
var edges 
var playButton , buttonImage
var retryButtom , retryImage


    

 


function preload(){

  fighterPlaneImage1 = loadImage("IMAGES/plane.png");
  healthImage = loadImage("IMAGES/health.png")
  obsticle1Img = loadImage("IMAGES/sprite_0.png")
  obsticle2Img = loadImage("IMAGES/sprite_1.png");
  ob3Img = loadImage("IMAGES/sprite_2.png")
ob4Img = loadImage("IMAGES/sprite_3.png")
  bkImg = loadImage("sprite_0.png");
  coinImg = loadImage("IMAGES/point.png");
  bulletImg = loadImage("IMAGES/fire ball.png")
  gameOverImg = loadImage("IMAGES/gameover.png")
  shootSound = loadSound("MUSIC/Shoot.wav")
  hitSound = loadSound("MUSIC/Hit.wav")
  pointSound = loadSound("MUSIC/point.wav")
  exploSound = loadSound("MUSIC/explosive.wav")
  blastImage = loadImage("IMAGES/blast 1.png");
  bkSound = loadSound("MUSIC/bkSound.mp3");
  buttonImage = loadImage("IMAGES/button.png");
retryImage = loadImage("IMAGES/retry.png");


}



function setup() {
  createCanvas(displayWidth,displayHeight-110);



bk = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
bk.addImage(bkImg);
bk.scale = 0.8
bk.velocityY = 2

fighterPlane = createSprite(displayWidth/2, displayHeight-200, 50, 50);
fighterPlane.addImage(fighterPlaneImage1);

retryButtom = createSprite(displayWidth/2,displayHeight/2,50,50);
retryButtom.addImage(retryImage);
retryButtom.scale = 0.3
retryButtom.visible = false

 
  

  health = createSprite(displayWidth-100,50,30,30);
  health.addImage(healthImage);
  health.scale = 0.15
  health2 = createSprite(displayWidth-40,50,30,30);
  health2.addImage(healthImage);
  health2.scale  = 0.15
  health3 = createSprite(displayWidth-160,50,30,30);
  health3.addImage(healthImage);
  health3.scale = 0.15

  gameOver = createSprite(displayWidth/2,displayHeight/2-150,50,50)
  gameOver.addImage(gameOverImg);

  playButton = createSprite(displayWidth/2,displayHeight/2,50,50);
playButton.addImage(buttonImage);
playButton.scale = 0.5





obsticleGroup = new Group();
obsticleGroup2 = new Group();
coinGroup = new Group();
bulletGroup = new Group();

bkSound.loop();
  



}

function draw() {

  background("black");
   
   drawSprites();
   

 edges = createEdgeSprites();

fighterPlane.collide(edges);

if(gameState==="start"){

gameOver.visible = false

  if(mousePressedOver(playButton)){
    gameState = "play"
  }

textAlign(CENTER);
textSize(30)
fill("RED")
text("INSTRUCTIONS :-",displayWidth/2,displayHeight/2-250)
fill("yellow")
text("* USE ARROW KEYS TO MOVE THE PLANE",displayWidth/2,displayHeight/2-200)
text("* PRESS 'S' TO SHOOT ",displayWidth/2,displayHeight/2-150)
text("* CLICK THE 'PLAY' BUTTON TO START ",displayWidth/2,displayHeight/2-100)
fill("BLUE")
text("DISCRIPTION :- ",displayWidth/2,displayHeight/2+125)
text("*THIS IS A INFINITE GAME",displayWidth/2,displayHeight/2+175);
text("*THIS GAME IS ALL ABOUT KILLING THE MONSTERS \n AND COLLECTING THE STARS AND  CREATING THE HIGHIST SCORE \n CLICK THE PLAY BUTTON TO ENJOY THE GAME!",displayWidth/2,displayHeight/2+225)
}


if(gameState==="play"){
  score2 = score*coinCount
  console.log(gameState);
gameOver.visible = false
playButton.visible = false
bk.velocityY = 2

retryButtom.visible = false

  if(bk.y>700){
    bk.y = displayWidth/4
  }

  
createEdgeSprites();
  
  if(keyDown("LEFT_ARROW")){
    fighterPlane.x -=8
  }

  if(keyDown("RIGHT_ARROW")){
    fighterPlane.x +=8
  }

  
  if(keyDown("UP_ARROW")){
    fighterPlane.y -=8
  }

  
  if(keyDown("DOWN_ARROW")){
    fighterPlane.y +=8
  }




  if(keyWentUp("S")){
    bullet = createSprite(fighterPlane.x , fighterPlane.y , 20,20)
    bullet.addImage(bulletImg)
    bullet.scale = 0.15
    bullet.velocityY = -14
    shootSound.play();
    fighterPlane.depth = bullet.depth+1
    bulletGroup.add(bullet)

  }

  if(bulletGroup.isTouching(obsticleGroup)){
    obsticleGroup.destroyEach();
    hitSound.play();
    score = score+1
    
    
  }

  if(bulletGroup.isTouching(obsticleGroup2)){
    obsticleGroup2.destroyEach();
    hitSound.play();
    score = score+1
    
  }

  console.log(healthCount);

 

  if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===3)){
    obsticleGroup.destroyEach();
    healthCount = 2
    health3.visible = false
    hitSound.play();
  
  }

  if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===2)){
    obsticleGroup.destroyEach();
    healthCount = 1
    health.visible = false
    hitSound.play();
    }

    if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===1)){
      obsticleGroup.destroyEach();
    
      health2.visible = false
      healthCount = 0
      exploSound.play();
      fighterPlane.addImage(blastImage);
      }


      if(fighterPlane.isTouching(obsticleGroup2)&&(healthCount===3)){
        obsticleGroup2.destroyEach();
        healthCount = 2
        health3.visible = false
        hitSound.play();
      
      }
    
      if(fighterPlane.isTouching(obsticleGroup2)&&(healthCount===2)){
        obsticleGroup2.destroyEach();
        healthCount = 1
        health.visible = false
        hitSound.play();
        }
    
        if(fighterPlane.isTouching(obsticleGroup2)&&(healthCount===1)){
          obsticleGroup2.destroyEach();
        
          health2.visible = false
          healthCount = 0
          fighterPlane.addImage(blastImage);
          exploSound.play();
          }

          if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===3)){
            obsticleGroup.destroyEach();
            healthCount = 2
            health3.visible = false
            hitSound.play();
          
          }
        
          if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===2)){
            obsticleGroup.destroyEach();
            healthCount = 1
            health.visible = false
            hitSound.play();
            
            }

            if(fighterPlane.isTouching(obsticleGroup)&&(healthCount===1)){
              obsticleGroup.destroyEach();
            
              health2.visible = false
              healthCount = 0
              fighterPlane.addImage(blastImage);
              exploSound.play();
              }
        
            if(healthCount===0){
              gameState= "end"
              health2.visible = false
              healthCount = 0
              }
            

      if(fighterPlane.isTouching(coinGroup)){
        coinGroup.destroyEach();
        coinCount = coinCount+1
        pointSound.play();
      }
      

  

  spawnObstacles();
  Coin();


    }
   

    if(gameState==="end"){
console.log("end");
score = 0
coinCount = 0
score = 0
bk.velocityY = 0
coinGroup.destroyEach();
obsticleGroup2.destroyEach();
obsticleGroup.destroyEach();
gameOver.visible = true
push();
textSize(50);
textAlign(CENTER)
//fill("blue")
//text("PRESS 'R' TO START AGIAN",displayWidth/2,displayHeight/2+100)
pop();

retryButtom.visible = true

if(mousePressedOver(retryButtom)){
  healthCount=3
  gameState = "play"

  if(healthCount===3){
    health.visible = true
    health2.visible= true
    health3.visible = true
  
  }

  fighterPlane.x = displayWidth/2
  fighterPlane.y =  displayHeight-200

  fighterPlane.addImage(fighterPlaneImage1);

}


    }

  
  
  fill("RED")
  textSize(30)
  text("Coin Count :- "+coinCount,50,90);
  fill("Black")
  
  text("Score :- "+score,50,120)
  fill("yellow")
  text("Total Score :- "+score2,50,150)

  
}
function spawnObstacles(){
  
  if(frameCount%80===0){
    obsticle1 = createSprite(random(10,displayWidth),-10,20,20)
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1 : obsticle1.addImage(obsticle1Img)
      break;
      case 2 : obsticle1.addImage(obsticle2Img)
      break;
      case 3 : obsticle1.addImage(ob3Img)
      break;
      case 4 : obsticle1.addImage(ob4Img)
      default:break;

    }
    
    obsticle1.scale = 0.15
    obsticle1.velocityY = 4
    obsticle1.lifetime = 200
    fighterPlane.depth = obsticle1.depth+1
    gameOver.depth = fighterPlane.depth+1
    retryButtom.depth = fighterPlane.depth+1
    obsticleGroup.add(obsticle1)
  
  }

  if(frameCount%80===0){
    obsticle2 = createSprite(-10,random(10,displayHeight-100,-10,20,20))
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1 : obsticle2.addImage(obsticle2Img)
      break;
      case 2 : obsticle2.addImage(obsticle1Img)
      break;
      case 3 : obsticle2.addImage(ob3Img)
      break;
      case 4 : obsticle2.addImage(ob4Img)

  
    }
    
    obsticle2.scale = 0.2
    obsticle2.velocityX = 4
    obsticle2.lifetime = 390
    obsticleGroup2.add(obsticle2)
  }






}


function Coin(){
  if (frameCount%150===0){
  coin =   createSprite(random(10,displayWidth),-10,20,20)
  coin.addImage(coinImg);
  coin.scale = 0.04
  coin.velocityY = 4
  coinGroup.add(coin);
  }
}


