let targets = [];
let clicksCount = 0;
let gameOver = false;
let startTime, finalTime;

function setup() {
  createCanvas(400, 400);
  
  // Create targets at specific positions
  targets.push(new Target(50, 100));
  targets.push(new Target(350, 100));
  targets.push(new Target(50, 350));
  targets.push(new Target(350, 350));
  targets.push(new Target(200, 200));

  startTime = millis();  // Record the start time
}

function draw() {
  background(0, 153, 255);

  if (!gameOver) {
    let seconds = (millis() - startTime) / 1000; // Calculate the elapsed time in seconds

    // Ensure text is aligned to the top-left for the timer
    textAlign(LEFT, TOP);  // Reset text alignment for the timer
    textSize(32);
    fill(0);
    text('Time: ' + nf(seconds, 0, 2) + ' seconds', 10, height / 14);

    // Draw each target
    for (let i = 0; i < targets.length; i++) {
      targets[i].show();
    }

  } else {
    // Game complete screen
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);  // Center the game complete text
    text('Game Complete!', width / 2, height / 2 - 40);
    text('Final Time: ' + nf(finalTime, 0, 2) + ' seconds', width / 2, height / 2);
    text('Click to play again', width / 2, height / 2 + 40);
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
  } else {
    resetGame();  // If game is over, clicking restarts the game
  }
}

// checks if all targets are clicked
function checkGameStatus() {
  if (clicksCount >= targets.length) {
    gameOver = true;
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
    targets[i].isBroken = false;
  }
}