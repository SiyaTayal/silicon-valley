var bg, bgImg,background
var PLAY = 1
var END = 0
var gameState= PLAY
var score=0
function preload(){
bgImg = loadImage("background.png")
princessImg = loadAnimation("princess1.png","princess2.png","princess3.png")
pondImg = loadImage("pond.png")
barrierImg = loadImage("barrier.png")
fallingImg = loadImage("falling_princess.png")
go = loadImage("gameOver.png")
rb = loadImage("restart.png")
gs = loadSound ("gameSound.mp3")
}

function setup(){
createCanvas(1500,700)
//background image
bg = createSprite(750,350,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
princess=createSprite(50,570)
princess.addAnimation("princessRunning",princessImg )
princess.addAnimation("fall",fallingImg)
princess.scale=0.3
bg2 = createSprite(50,620,1500,10);
bg2.visible=false
obstaclesGroup = new Group ()
gameOver= createSprite(width/2,height/2)
gameOver.addImage(go)
restartButton= createSprite(width/2,height/2+100)
restartButton.addImage(rb)
}

function draw() {
  
  background("black");
   gs.play()
       if(gameState===PLAY){
        bg.velocityX=-4
        if (bg.x<0){
          bg.x=750
        }
        
         
              
              if(keyDown("space")){
                princess.velocityY=-12
                score=score+5
              }
             princess.velocityY+=1
                
               
                makeObstacles()
                if (obstaclesGroup.isTouching(princess)){
               gameState = END
                
      
                }

                gameOver.visible=false
                restartButton.visible=false

       } else if (gameState===END){
        gameOver.visible=true
        restartButton.visible=true
        princess.changeAnimation("fall",fallingImg)
        bg.velocityX=0
        princess.velocityX=0
        obstaclesGroup.setVelocityXEach(0)
        obstaclesGroup.setLifetimeEach(-1)
        if(mousePressedOver(restartButton)){
          reset ()
        }
       }
       
       princess.collide(bg2)
        drawSprites();
        textSize(20)
        fill ("green")
        text("score = "+score,width-400,100)
}
function makeObstacles(){
  if(frameCount%200===0){
  obstacles=createSprite(width,610)
  obstacles.velocityX=-4
  
  obstacles.scale = 0.3
 var d= Math.round(random(1,2))
 if (d===1){
  obstacles.addImage(pondImg)
 }else {
  obstacles.addImage(barrierImg)
 }
 obstaclesGroup.add(obstacles)
 obstaclesGroup.lifetime=200
  }
 
}
function reset (){
  gameOver.visible=false
  restartButton.visible=false
  obstaclesGroup.destroyEach()
 princess.changeAnimation("princessRunning" , princessImg)
 gameState=PLAY
}