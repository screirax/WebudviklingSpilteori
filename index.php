<?php
require_once __DIR__ . '/api.php';

$url = 'https://highscores.martindilling.com/api/v1/games';
/* bruges til at se hvilke games der er
try {
    $response = apiGet($url);
}catch (Throwable $e){
    var_dump($e);
}
*/
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Arcade Games</title>
</head>
<body>
<div id="gameBox">
    <canvas id="canvas" width="800" height="600"></canvas>
    <div id="infoarea">
        <p>Gold: <span id="gold">50</span></p>
        <p>Score: <span id="highscore">0</span></p>
        <p>Wave: <span id="wave">1</span></p>
        <p>Lives: <span id="lives">20</span></p>
        <button onclick="selectedTower = 'Standard Tower'">Standard Tower (15 Gold)</button>
        <button onclick="selectedTower = 'Rapid Tower'">Rapid Tower (30 Gold)</button>
        <button onclick="selectedTower = 'Sniper Tower'">Sniper Tower (40 Gold)</button>
        <button onclick="selectedTower = 'Splash Tower'">Splash Tower (50 Gold)</button>
    </div>
</div>

<div id="startPopup" class="popup">
    <h2>Tower Defense</h2>
    <p>Survive 20 waves to win</p>
    <iframe src="https://highscores.martindilling.com/games/24/embed?fontSize=80" title="Highscore table for Tower Defense" width="100%" height="100%"></iframe>
    <button id="playButton" style="margin-top: 5px">Play</button><!--Det næste spil ide er 61-->
</div>

<script type="module" src="main.js"></script>
</body>
</html>