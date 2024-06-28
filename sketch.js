let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(800, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  
  // Draw middle line
  stroke(255);
  line(width / 2, 0, width / 2, height);
  
  // Draw paddles
  leftPaddle.show();
  rightPaddle.show();
  
  // Move paddles
  leftPaddle.move();
  rightPaddle.move();
  
  // Draw ball
  ball.show();
  ball.update();
  ball.edges();
  
  // Check collision with paddles
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);
  
  // Check for score
  if (ball.checkScore()) {
    if (ball.x < width / 2) {
      rightScore++;
    } else {
      leftScore++;
    }
    ball.reset();
  }
  
  // Display scores
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 5;
    this.yspeed = 5;
    this.r = 10;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
  }

  checkPaddleCollision(paddle) {
    if (this.x - this.r < paddle.x + paddle.w / 2 &&
        this.x + this.r > paddle.x - paddle.w / 2 &&
        this.y - this.r < paddle.y + paddle.h / 2 &&
        this.y + this.r > paddle.y - paddle.h / 2) {
      this.xspeed *= -1;
    }
  }

  checkScore() {
    if (this.x - this.r < 0 || this.x + this.r > width) {
      return true;
    }
    return false;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed *= random([-1, 1]);
    this.yspeed *= random([-1, 1]);
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2;
    if (isLeft) {
      this.x = this.w;
    } else {
      this.x = width - this.w;
    }
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }
}
