// Alien Math Escape - by Karisha

// Game state
var screen = "start";
var score = 0;
var level = 1;
var userAnswer = "";
var question = "";
var correctAnswer;

// Player and alien
var player = {x: 50, y: 300, size: 30};
var alien = {x: 400, y: 300, size: 30, speed: 1.5};

// Generate a new math question
var generateQuestion = function() {
    var a = floor(random(1, 10 + level));
    var b = floor(random(1, 10 + level));
    correctAnswer = a + b;
    question = a + " + " + b + " = ?";
};

// Start/restart game
var startGame = function() {
    screen = "game";
    score = 0;
    level = 1;
    userAnswer = "";
    player.x = 50;
    player.y = 300;
    alien.x = 400;
    alien.y = 300;
    generateQuestion();
};

// Draw the start screen
var drawStart = function() {
    background(30, 30, 80);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Alien Math Escape ", 100, 20,20, 40);
    textSize(18);
    text("Solve math to unlock the door.", 200, 160);
    text("Avoid the alien!", 200, 190);
    text("Click to start", 200, 250);
};

// Draw the win screen
var drawWin = function() {
    background(0, 150, 50);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("🎉 You Escaped! 🎉", 200, 150);
    textSize(18);
    text("Final Score: " + score, 200, 200);
    text("Click to play again", 200, 240);
};

// Draw the game over screen
var drawGameOver = function() {
    background(150, 0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("💀 Game Over 💀", 200, 150);
    textSize(18);
    text("You were caught!", 200, 200);
    text("Score: " + score, 200, 230);
    text("Click to try again", 200, 260);
};

// Collision detection
var isTouching = function(x1, y1, r1, x2, y2, r2) {
    return dist(x1, y1, x2, y2) < (r1 + r2)/2;
};

// Main game screen
var drawGame = function() {
    background(0, 0, 50);

    // Door
    fill(100, 100, 255);
    rect(370, 150, 20, 100);
    
    // Player
    fill(255);
    ellipse(player.x, player.y, player.size, player.size);
    
    // Alien
    fill(0, 255, 0);
    ellipse(alien.x, alien.y, alien.size, alien.size);
    
    // Move alien towards player
    if (alien.x > player.x) { alien.x -= alien.speed; }
    if (alien.x < player.x) { alien.x += alien.speed; }
    if (alien.y > player.y) { alien.y -= alien.speed; }
    if (alien.y < player.y) { alien.y += alien.speed; }
    
    // Movement
    if (keyIsPressed) {
        if (keyCode === LEFT) { player.x -= 3; }
        if (keyCode === RIGHT) { player.x += 3; }
        if (keyCode === UP) { player.y -= 3; }
        if (keyCode === DOWN) { player.y += 3; }
    }
    
    // Collision with alien
    if (isTouching(player.x, player.y, player.size, alien.x, alien.y, alien.size)) {
        screen = "gameOver";
    }

    // Question
    fill(255);
    textAlign(LEFT, TOP);
    textSize(18);
    text("Level: " + level, 10, 10);
    text("Score: " + score, 10, 35);
    text("Q: " + question, 10, 60);
    text("Your Answer: " + userAnswer, 10, 85);
    textSize(14);
    text("Tip: Go to the door (right side) and answer to escape!", 10, 120);

    // Escape check
    if (player.x > 370 && userAnswer === correctAnswer) {
        score += 10;
        level++;
        player.x = 50;
        player.y = 300;
        alien.x = 400;
        alien.y = 300;
        userAnswer = "";
        generateQuestion();
        
        if (level > 5) {
            screen = "win";
        }
    }
};

// Main draw loop
draw = function() {
    if (screen === "start") {
        drawStart();
    } else if (screen === "game") {
        drawGame();
    } else if (screen === "win") {
        drawWin();
    } else if (screen === "gameOver") {
        drawGameOver();
    }
};

// Mouse click to start or restart
mouseClicked = function() {
    if (screen === "start" || screen === "win" || screen === "gameOver") {
        startGame();
    }
};

// Typing answers
keyPressed = function() {
    if (screen === "game") {
        if (key >= '0' && key <= '9') {
            userAnswer += key;
        } else if (keyCode === BACKSPACE) {
            userAnswer = userAnswer.substring(0, userAnswer.length - 1);
        }
    }
};

