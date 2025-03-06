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

<!-- martoin's api leaderboard generater
<div class="title">
    Highscore API cennection
</div>
<div class="credits">
    <a href="https://github.com/madh-zealand/highscores-api" target="_blank">Highscores API Github</a>
</div>
<div class="container">
    <div data-player class="player"></div>
    <div data-score class="score"></div>
    <button data-send-button class="send-button">Send</button>
    <pre data-response-preview class="response-preview"><php  echo $response ? json_encode($response, JSON_PRETTY_PRINT) : '' ?></pre>

</div>

<script>
    const playerElement = document.querySelector('[data-player]');
    const scoreElement = document.querySelector('[data-score');
    const sendButton = document.querySelector('[data-send-button]');
    const responsePreviewElement = document.querySelector('[data-response-preview]');

    const player = generatePirateName();
    const score = Math.round(Math.random() * 1000);

    playerElement.textContent = player;
    scoreElement.textContent = score.toString();
    function generatePirateName () {
        const firstNames = ["Blackbeard", "Salty", "One-Eyed", "Mad", "Captain", "Peg-Leg", "Red", "Stormy", "Jolly", "Barnacle"];
        const lastNames = ["McScurvy", "Silverhook", "Rumbelly", "Seadog", "Plankwalker", "Bones", "Squidbeard", "Driftwood", "Sharkbait", "Bootstraps"];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }

    sendButton.addEventListener('click', () => {
        fetch(
            'submit-highscore.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    player: player,
                    score: score,
                }),
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                responsePreviewElement.textContent = JSON.stringify(data, null, 2);
            })
            .catch(function (error){
                console.error(error);
                responsePreviewElement.textContent = JSON.stringify(error, null, 2);
            });
    });




</script>
-->

<script type="module" src="main.js"></script>
</body>
</html>