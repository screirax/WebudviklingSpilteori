<?php
require_once __DIR__ . '/api.php';

$url = 'https://highscores.martindilling.com/api/v1/games';
$payload = [
    'title' => 'Tower Defense',
];
$response = apiPost($url, $payload);

echo '<pre>';
echo json_encode($response, JSON_PRETTY_PRINT);
echo '</pre>';
