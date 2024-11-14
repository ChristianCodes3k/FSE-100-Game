// variables for Target Game
let targets = [];
let clicksCount = 0;
let gameOver = false;
let startTime, finalTime;

// variables for Balloon Popper Game
let pinY = 0;
let pinSpeed = 3;
let randX; 
let randY; 
let score = 0;
let screen = 1;

function setup() {
  createCanvas(400, 400);

  // random variables initialized for Pin Game
  randX = random(25, 375);
  randY = random(200, 375);
  
  // Create targets at specific positions
  x1 = random(30, 100);
  x2 = random(30, 100);
  x3 = random(235, 370);
  x4 = random(235, 370);
  y1 = random(90, 170);
  y2 = random(90, 170);
  y3 = random(210, 360);
  y4 = random(210, 360);
  y5 = random(90, 360);
  
  targets.push(new Target(x1, y1));
  targets.push(new Target(x3, y2));
  targets.push(new Target(x2, 350));
  targets.push(new Target(x4, 350));
  targets.push(new Target(200, y5));

  
}

function draw() {
  background(0, 153, 255);

  if (screen === 1){
    background(106,13,173);
    fill(255,255,255);
    
    rect(40,60,110,60);
    rect(240,60,110,60);
    rect(40,280,110,60);
    rect(240,280,110,60);
    textSize(20);
    fill(0);
    text('Aim Trainer',43,95);
    text('Balloon Pop', 241,95);
    text('Breakout',54,316);
    text('Keyboard',251,307);
    text('Hero',273,330);
    textSize(70);
    text('Arcade', 90,220);

    //Starts Aim Trainer
    if(mouseX >= 40 && mouseX <= 150 && mouseY >= 60 && mouseY <= 120 && mouseIsPressed){
      screen = 2;
      for (let i = 0; i < targets.length; i++) {
        targets[i].isBroken = false;
      }
      startTime = millis();
    }
    
    //Starts Balloon Popper
    if(mouseX >= 240 && mouseX <= 350 && mouseY >= 60 && mouseY <= 120 && mouseIsPressed){
      screen = 4;
    }

  }

  if (screen === 2) {
    let seconds = (millis() - startTime) / 1000; // Calculate the elapsed time in seconds

    // Ensure text is aligned to the top-left for the timer
    //textAlign(LEFT, TOP);  // Reset text alignment for the timer
    textSize(32);
    fill(0);
    text('Time: ' + nf(seconds, 0, 2) + ' seconds', 10, height / 14);

    // Draw each target
    for (let i = 0; i < targets.length; i++) {
      targets[i].show();
    }


  }

  if (screen === 3 || gameOver) {
    // Game complete screen
    background(106,13,173);
    textSize(32);
    fill(0);
    //textAlign(CENTER, CENTER);  // Center the game complete text
    text('Game Complete!', width / 2, height / 2 - 60);
    text('Final Time: ' + nf(finalTime, 0, 2) + ' seconds', width / 2, (height / 2) - 20);
    
    fill(255,255,255);
    rect(90,220,90,50);
    rect(240,220,90,50);
    fill(0);
    textSize(20);
    text('Home',135,245);
    text('Play',285,235);
    text('Again',285,255);

    if(mouseX >= 90 && mouseX <= 180 && mouseY >= 220 && mouseY <= 270 && mouseIsPressed){
      resetHome();
      screen = 1;
    }

    if(mouseX >= 240 && mouseX <= 330 && mouseY >= 220 && mouseY <= 270 && mouseIsPressed){
      resetGame();
      screen = 2;
    }


  }

  if (screen === 4){
    background(220);
    
    textSize(50);
    fill(255);
    rect(140,150,120,70);
    fill(0);
    text('Play', 150, 200);

    text('Balloon Popper', 30, 60);
    
    if(mouseX >= 140 && mouseX <= 260 && mouseY >= 150 && mouseY <= 220 && mouseIsPressed){
      screen = 5;
    }
  }

  if (screen === 5){
    background(220);
    textSize(50);
    text('Score: ', 100, 50);
    text(score, 250, 50);
    
   if(mouseX >= randX - 25 && mouseX <= randX + 25 && pinY + 50 >= randY-25 ){
    randX = random(25, 375);
    randY = random(200, 375);
    pinY = 0;
    score = score + 1;
  }
  
    circle(randX,randY,50);
  
    triangle(mouseX - 5, pinY, mouseX + 5, pinY, mouseX, pinY + 50);
  
    pinY = pinY + pinSpeed;
  
    if(pinY > height) {
      screen = 6;
      pinY = 0;
    }
  }

  if (screen === 6){
    background(220);
    textSize(50);
    fill(255);
    rect(130,250,140,70);
    fill(0);
    text('Home', 135, 300);
    text('Score: ', 100, 50);
    text(score, 250, 50);
    text('Game Over', 75, 150);
    
    if(mouseX >= 130 && mouseX <= 270 && mouseY >= 250 && mouseY <= 320 && mouseIsPressed){
      screen = 1;
      score = 0;
    }
  }
}

// Class to handle each target
class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.isBroken = false;  // To track if the target is broken
  }

  // Draw the target
  show() {
    if (!this.isBroken) {  // Only show if it's not broken
      // Draw red outer circle
      fill('red');
      circle(this.x, this.y, this.size);
  
      // Draw white inner circle
      fill('white');
      circle(this.x, this.y, this.size - 10);
  
      // Draw smaller red circle
      fill('red');
      circle(this.x, this.y, this.size - 30);
  
      // Draw smallest white circle
      fill('white');
      circle(this.x, this.y, this.size - 50);
    }
  }

  // Check if the target was clicked
  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);  // Calculate distance from mouse to target
    if (d < this.size / 2 && !this.isBroken) {  // Only break the target if it's not already broken
      this.isBroken = true;
      clicksCount++;
      checkGameStatus();  // Check if the game is complete
    }
  }
}

// follows each mouse click
function mousePressed() {
  if (!gameOver) {
    for (let i = 0; i < targets.length; i++) {
      targets[i].clicked();  // Check if a target was clicked
    }
  }
  else{
    screen = 1;
  }
}

// checks if all targets are clicked
function checkGameStatus() {
  if (clicksCount >= targets.length) {
    gameOver = true;
    screen = 3;
    finalTime = (millis() - startTime) / 1000;  // Capture the final time
  }
}

// reset game
function resetGame() {
  gameOver = false;
  clicksCount = 0;
  startTime = millis();  // Restart the timer
  finalTime = 0;

  // Reset the targets
  for (let i = 0; i < targets.length; i++) {
    targets[i].show();
    
    targets[i].isBroken = false;

     // Rerandomize positions for each target
  x1 = random(30, 100);
  x2 = random(30, 100);
  x3 = random(235, 370);
  x4 = random(235, 370);
  y1 = random(90, 170);
  y2 = random(90, 170);
  y3 = random(210, 360);
  y4 = random(210, 360);
  y5 = random(90, 360);

  // Reset the targets with new positions
  targets = [
    new Target(x1, y1),
    new Target(x3, y2),
    new Target(x2, 350),
    new Target(x4, 350),
    new Target(200, y5)
  ];
  }
}

function resetHome(){
  gameOver = false;
  clicksCount = 0;
  startTime = millis();  // Restart the timer
  finalTime = 0;
}