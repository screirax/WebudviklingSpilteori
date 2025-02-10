<?php
require_once __DIR__ . '/api.php';

$url = 'https://highscores.martindilling.com/api/v1/games';
$response = apiGet($url);

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
        <p>Gold: <span id="gold">$0</span></p>
        <p>Score: <span id="score">0</span></p>
        <p>Wave: <span id="wave">0</span></p>
        <p>Lives: <span id="lives">10</span></p>
    </div>
</div>

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
    <pre data-response-preview class="response-preview"><?php // echo $response ? json_decode($response, JSON_PRETTY_PRINT) : '' ?></pre>

</div>

<script>
    const playerElement = document.querySelector('[data-player]');
    const scoreElement = document.querySelector('[data-score');
    const sendButton = document.querySelector('[data-send-button]');
    const responsePreviewElement = document.querySelector('[data-response-preview]');

    const player = generatePireateName();
    const score = Math.round(Math.random() * 1000);

    playerElement.textContent = player;
    scoreElement.textContent = score.toString();
    function generatePireateName () {
        const firstNames = ["Blackbeard", "Salty", "One-Eyed", "Mad", "Captain", "Peg-Leg", "Red", "Stormy", "Jolly", "Barnacle"];
        const lastNames = ["McScurvy", "Silverhook", "Rumbelly", "Seadog", "Plankwalker", "Bones", "Squidbeard", "Driftwood", "Sharkbait", "Bootstraps"];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }





</script>


<script src="main.js"> </script>
</body>
</html>