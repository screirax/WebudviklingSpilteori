let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const SW = canvas.width;
const SH = canvas.height;
const TILE_W = 25;
let bgcolor = "green";
let highscore = 1;
let lives = 10;
let waves = 1;
let gold = 50;

class Soldier {
    constructor(pos,color,r,health,damage) {
        this.pos = pos;
        this.color = color;
        this.r = r;
        this.health = health;
        this.damage = damage;

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
        this.speed = 4;
        this.Mintargetdistance = 2;



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
function gameOver() {
    clearInterval(gamerLoop);


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
        <button onclick="playAgain()">Play Again</button>
    `;


    document.body.appendChild(popup);


    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top + rect.height / 2}px`;
    popup.style.transform = "translate(-50%, -50%)";

}

function playAgain() {

    let popup = document.getElementById("gameOverPopup");
    if (popup) {
        popup.remove();
    }


    lives = 10;
    highscore = 0;
    waves = 1;
    gold = 50;


    soldiers = [];
    let soldierStart = new vector(100, 0);
    for (let i = 0; i < NUM_SOLDIERS; i++) {
        let newSoldier = new Soldier(new vector(soldierStart.x, soldierStart.y), "blue", 20, 50, 1);
        soldiers.push(newSoldier);
        soldierStart.y -= 50;
    }


    gamerLoop = setInterval(play, 1000 / 60);
}
function saveScore() {
    let playerName = document.getElementById("playerName").value || "Anomyous";
    let playerScore = highscore;

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




// 10|phJ5zwoundpVVSB7SP5efJNbpcTSaK25ZDsgCKq229b28198

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

// let soldier = new Soldier(new vector(start.x, start.y), "red", 20, 50 , 1);

let soldiers = [];
const NUM_SOLDIERS = 10;

let solderStart = new vector(100,0);

for (let i = 0; i < NUM_SOLDIERS; i++) {
    let newSoldier = new Soldier(new vector(solderStart.x,solderStart.y), "blue",20,50,1);
    soldiers[soldiers.length] = newSoldier;
    solderStart.y -= 50;
}

function update (){
    //soldier.update();
    soldiers.forEach(function (s){
        s.update();
    });

    document.getElementById("gold").innerText = gold;
    document.getElementById("highscore").innerText = highscore;
    document.getElementById("wave").innerText = waves;
    document.getElementById("lives").innerText = lives;

    if (lives <= 0 ){
        gameOver();
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
function infoarea(){
    var statusbar = document.createElement("div");
    statusbar.setAttribute("id", "statusbar");
    statusbar.setAttribute("class", "statusbar");
    statusbar.innerHTML = '<p> Cash: <span id="gold">$0</span> Score: <span id="score">0</span> Wave: <span id="wave">0</span> Lives: <span id="lives">0</span></p>';
    document.body.appendChild(statusbar);
}
function render(){
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, SW, SH);


    renderPath();
    //renderGrid();

    //soldier.render();
    soldiers.forEach(function (s){
        s.render();
    });

}

function play (){
    update()
    render()

}


let gamerLoop = setInterval(play, 1000/60 );






















