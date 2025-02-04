let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const SW = canvas.width;
const SH = canvas.height;
const TILE_W = 25;
let bgcolor = "green";


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
]

function update (){

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
    renderGrid();
}

function play (){
    update()
    render()
}


setInterval(play, 1000/60 );
