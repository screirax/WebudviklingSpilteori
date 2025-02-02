let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const SW = canvas.width;
const SH = canvas.height;
const TILE_W = 15;
let bgcolor = "green";

function update (){

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

    renderGrid();
}

function play (){
    update()
    render()
}


setInterval(play, 1000/60 );
