let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const SW = canvas.width;
const SH = canvas.height;
const TILE_W = 25;

let gamerLoop = null;
let towers = [];
let bgcolor = "green";
let highscore = 0;
let lives = 20;
let waves = 0;
let gold = 50;
let soldiers = [];

class Soldier {
    constructor(pos,color,r,health,damage, gainGold, speed) {
        this.pos = pos;
        this.color = color;
        this.r = r;
        this.health = health;
        this.damage = damage;
        this.gainGold = gainGold
        this.speed = speed

        this.targets = [];
        this.targets[0] = new vector(start.x + pathData[0].x, start.y + pathData[0].y);


        for (let i = 1; i < pathData.length; i++) {
            let prevtarget = this.targets[i - 1];
            let path = pathData[i];

            let newtarget = new vector (prevtarget.x + path.x, prevtarget.y + path.y);
            this.targets[i] = newtarget;

        }
        this.currenttartget = this.targets[0];
        this.direction = new vector(0,0);
        this.Mintargetdistance = 4;



    }
    update() {
        if (this.currenttartget == null) return;


        let direction = new vector (this.currenttartget.x - this.pos.x, this.currenttartget.y - this.pos.y);
        let distance = (direction.x**2 + direction.y**2) ** (1/2);

        if (distance === 0 ) return;

        direction.x /= distance;
        direction.y /= distance;

        this.pos.x += direction.x * this.speed;
        this.pos.y += direction.y * this.speed;


        let xDist = Math.abs(this.pos.x - this.currenttartget.x);
        let yDist = Math.abs(this.pos.y - this.currenttartget.y);

        if(xDist <= this.Mintargetdistance && yDist <= this.Mintargetdistance) {
            this.targets.splice(0,1);

            if (this.targets.length === 0){
                this.currenttartget = null;
            }
            else{
                this.currenttartget = this.targets[0];
            }
        }
        if (this.currenttartget === null) {
            lives--;
            soldiers.splice(soldiers.indexOf(this), 1);
        }


    }
    render(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        context.fill();
    }

}




class Tower {
    constructor(x, y, range, damage, towerAttackSpeed, goldPrice) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.damage = damage;
        this.towerAttackSpeed = towerAttackSpeed
        this.LastTowerAttack = 0;
        this.cost = goldPrice

    }

    attack(enemy) {
        let towertime = Date.now();

        if(towertime - this.LastTowerAttack >= 1000 / this.towerAttackSpeed) {

            const distance = Math.sqrt(Math.pow(enemy.pos.x - this.x, 2) + Math.pow(enemy.pos.y - this.y, 2));

            if (distance <= this.range) {
                enemy.health -= this.damage;
                this.LastTowerAttack = towertime;
            }

        }

    }

}

function placeTower(x, y) {
    let towerPrice = 15;
    let towerRadius = 15;
    let minDistance = towerRadius * 2;

    if (gold < towerPrice){
        return;
    }

    for (let tower of towers) {
        let distance = Math.sqrt(Math.pow(tower.x - x, 2) + Math.pow(tower.y - y, 2));
        if (distance < minDistance){
            return;
        }
    }

    gold -= towerPrice;
    let newTower = new Tower(x, y, 100, 7, 4);
    towers.push(newTower);

}



function renderTowers() {
    context.fillStyle = "Blue";
    towers.forEach(tower => {
        context.beginPath();
        context.arc(tower.x, tower.y, 15, 0, Math.PI * 2);
        context.fill();


        context.strokeStyle = "rgba(0, 0, 0, 0.3)";
        context.beginPath();
        context.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
        context.stroke();
    });
}

function updateTowers() {


    towers.forEach(tower => {
        soldiers.forEach(enemy => {
            tower.attack(enemy);
            if (enemy.health <= 0) {
                soldiers.splice(soldiers.indexOf(enemy), 1);
                highscore += 10;
                gold += enemy.gainGold;

            }
        });
    });
}

canvas.addEventListener("click", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    placeTower(x, y);
});



function wavesStarter (){
    waves++;

    let soldierStart = new vector(100,0);
    const NUM_SOLDIERS = 10;

    for (let i = 0; i < NUM_SOLDIERS + waves * 2; i++) {
        let newSoldier = new Soldier(new vector(soldierStart.x, soldierStart.y), "red", 20, 25 + waves * 10, 1, 5, 2);
        soldiers.push(newSoldier);
        soldierStart.y -= 50;
    }
}



function gameOver() {
    clearInterval(gamerLoop);
    // skal bruge denne linje for at sende scores nu da mit html har problemer med at loade min save funktion
    window.saveScore = saveScore;

    let canvas = document.getElementById("canvas");
    let rect = canvas.getBoundingClientRect();


    let popup = document.createElement("div");
    popup.setAttribute("id", "gameOverPopup");
    popup.setAttribute("class", "popup");
    popup.innerHTML = `
        <h2>You Lose!</h2>
        <p>Your Score: <span id="finalScore">${highscore}</span></p>
        <p>Enter your name:</p>
        <input type="text" id="playerName" placeholder="Your Name">
    
        <button onclick="saveScore()">Submit Score</button>
        
        
    `;


    document.body.appendChild(popup);


    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top + rect.height / 2}px`;
    popup.style.transform = "translate(-50%, -50%)";

}

function saveScore() {
    let playerName = document.getElementById("playerName").value || "Anomyous";
    let playerScore = highscore;


    console.log(`Sending score: ${playerName} - ${playerScore}`); // Debug

    fetch('submit-highscore.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            player: playerName,
            score: playerScore,
        }),
    })
    location.reload();

}

document.addEventListener("DOMContentLoaded", function() {
    let popup = document.getElementById("startPopup");
    let playButton = document.getElementById("playButton");


    popup.style.display = "block";


    playButton.addEventListener("click", function() {
        popup.style.display = "none";
        startGame();
    });
});

function startGame() {

    if( gamerLoop === null){
        gamerLoop = setInterval(play, 1000 / 60);
    }

}
class vector{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let start = new vector(100,0);

let pathData  =[
    new vector(0,150),
    new vector(600,0),
    new vector(0,150),
    new vector(-550,0),
    new vector(0, 200),
    new vector(400,0),
    new vector(0,150)
]


function update (){
    soldiers.forEach(function (s){
        s.update();
    });

    updateTowers();
    document.getElementById("gold").innerText = gold;
    document.getElementById("highscore").innerText = highscore;
    document.getElementById("wave").innerText = waves;
    document.getElementById("lives").innerText = lives;

    if (lives <= 0 ){
        gameOver();
    }
    if (soldiers.length === 0 ){
        wavesStarter();
    }

}

function renderPath () {
    let drawPath = new vector(start.x, start.y);

    context.fillStyle="grey";

    pathData.forEach(function (path){
        if (path.x == 0 ){
            let x = drawPath.x - TILE_W;
            let y = drawPath.y - TILE_W;
            let w = TILE_W * 2;
            let h = path.y + TILE_W  * 2;

            context.fillRect(x, y, w, h);
        }
        else {
            let x = drawPath.x - TILE_W;
            let y = drawPath.y - TILE_W;
            let w = path.x + TILE_W * 2;
            let h = TILE_W * 2;

            context.fillRect(x, y, w, h);
        }

        drawPath.x += path.x;
        drawPath.y += path.y;
    })

}

function renderGrid (){
    context.fillStyle = "black";

    let x = 0;
    for (let i =0; i < SW / TILE_W; i++){

        context.beginPath();
        context.moveTo(x,0);
        context.lineTo(x,SH);
        context.stroke();
        x += TILE_W;
    }
    let y = 0;
    for (let i =0; i < SH / TILE_W; i++){
        context.beginPath();
        context.moveTo(0,y);
        context.lineTo(SW,y);
        context.stroke();
        y += TILE_W;

    }

}

function render(){
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, SW, SH);


    renderPath();
    renderTowers(context);
    soldiers.forEach(function (s){
        s.render();
    });


}

function play (){
    update();
    render();
    updateTowers();

}























