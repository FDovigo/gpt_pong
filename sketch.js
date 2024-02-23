// Declare variables for the ball, player paddle, computer paddle,
// player score, computer score, and ball speed
let ball;
let player;
let computer;
let playerScore = 0;
let computerScore = 0;
let ballSpeed = 5; // Initial speed of the ball

function setup() {
  // Create canvas with dimensions 800x600
  createCanvas(800, 600);

  // Initialize instances of Ball, Player Paddle, and Computer Paddle
  ball = new Ball();
  player = new Paddle(true); // Player paddle on the left side
  computer = new Paddle(false); // Computer paddle on the right side
}

function draw() {
  // Set background color to black
  background(28, 37, 65);

  // Draw edges of the game area
  drawEdges();

  // Draw the ball, player paddle, and computer paddle
  drawBall();
  drawPaddle(player);
  drawPaddle(computer);

  // Update ball and paddles
  ball.update();
  player.update();
  computer.autoPlay(); // Computer AI controls the computer paddle

  // Handle collisions with paddles and scoring
  handleCollisionsAndScoring();

  // Draw scores on the screen
  drawScores();
}

// Function to draw the ball on the canvas
function drawBall() {
  fill(230, 175, 46); // Set ball color to white
  ellipse(ball.x, ball.y, 20); // Draw ball as a white ellipse
}

// Function to draw a paddle on the canvas
function drawPaddle(paddle) {
  fill(224, 226, 219); // Set paddle color to white
  rect(paddle.x, paddle.y, paddle.w, paddle.h); // Draw paddle as a white rectangle
}

// Function to draw the edges of the game area
function drawEdges() {
  fill(11, 19, 43); // Set edge color to blue
  rect(0, 0, width, 20); // Draw top edge
  rect(0, height - 20, width, 20); // Draw bottom edge
}

// Function to draw scores on the screen
function drawScores() {
  textSize(32); // Set text size
  fill(224, 226, 219); // Set text color to red
  text(playerScore, 256, 64); // Draw player score
  text(computerScore, width - 256, 64); // Draw computer score
}

// Class representing the ball object
class Ball {
  constructor() {
    this.reset(); // Initialize ball properties
  }

  // Reset the position and velocity of the ball
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    let angle = random(-PI / 4, PI / 4);
    this.vx = ballSpeed * Math.cos(angle);
    this.vy = ballSpeed * Math.sin(angle);
  }

  // Update the position of the ball
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.edges(); // Check if the ball hits the top or bottom edge
  }

  // Check if the ball hits the top or bottom edge and change direction if needed
  edges() {
    if (this.y < 30 || this.y > height - 30) { // Adjusted for increased bar height
      this.vy *= -1;
    }
  }

  // Check if the ball hits a paddle
  hits(paddle) {
    // Adjusted collision box to be more precise
    return (
      this.x - 10 < paddle.x + paddle.w &&
      this.x + 10 > paddle.x &&
      this.y - 10 < paddle.y + paddle.h &&
      this.y + 10 > paddle.y
    );
  }

  // Set the speed and direction of the ball
  setSpeed(speed, angle) {
    this.vx = speed * Math.cos(angle);
    this.vy = speed * Math.sin(angle);
  }

  // Check if the ball is off-screen (out of bounds)
  offScreen() {
    return (this.x < 0 || this.x > width);
  }
}

// Class representing a paddle object
class Paddle {
  constructor(isPlayer) {
    this.w = 10; // Paddle width
    this.h = 80; // Paddle height
    this.y = height / 2 - this.h / 2; // Initial y-coordinate (centered vertically)
    this.isPlayer = isPlayer; // Boolean indicating if the paddle belongs to the player
    if (this.isPlayer) {
      this.x = 20; // Player paddle starts on the left side
    } else {
      this.x = width - 30; // Computer paddle starts on the right side
    }
  }

  // Update the position of the paddle
  update() {
    if (this.isPlayer) {
      this.y = mouseY - this.h / 2; // Player controls paddle with mouse
    } else {
      // AI for the computer
      let target = ball.y; // Computer paddle follows the ball
      this.y = target - this.h / 2;
    }
    this.y = constrain(this.y, 30, height - this.h - 30); // Constrain paddle within bounds
  }

  // Simple AI for the computer paddle
  autoPlay() {
    let target = ball.y;
    this.y = target - this.h / 2;
    this.y = constrain(this.y, 30, height - this.h - 30); // Constrain paddle within bounds
  }
}

// Function to handle collisions between the ball and paddles, and scoring
function handleCollisionsAndScoring() {
  if (ball.hits(player)) { // Check if ball hits player paddle
    let swing = (ball.y - player.y) / 3; // Calculate angle of deflection
    ball.setSpeed(ballSpeed, radians(swing)); // Set new speed and direction for the ball
    ballSpeed += 0.5; // Increase ball speed
  }

  if (ball.hits(computer)) { // Check if ball hits computer paddle
    let swing = (ball.y - computer.y) / 3; // Calculate angle of deflection
    ball.setSpeed(-ballSpeed, radians(swing)); // Set new speed and direction for the ball
    ballSpeed += 0.5; // Increase ball speed
  }

  if (ball.offScreen()) { // Check if ball goes off-screen
    if (ball.x < 0) {
      computerScore++; // Increment computer score if ball goes off the left side
    } else {
      playerScore++; // Increment player score if ball goes off the right side
    }
    ball.reset(); // Reset ball position and speed
    ballSpeed = 5; // Reset ball speed
  }
}







