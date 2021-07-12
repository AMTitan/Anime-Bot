module.exports = function(message, commandName, args, client) {
    const SnakeGame = require('snakecord');
    const snakeGame = new SnakeGame({
        title: 'Snake Game',
        color: "GREEN",
        timestamp: false,
        gameOverTitle: "Game Over"
    });
    snakeGame.newGame(message);
}

module.exports.config = {
    description: "Snake game",
    usage: `snake`,
    aliases: [],
    type: "games",
    optinal: ""
}