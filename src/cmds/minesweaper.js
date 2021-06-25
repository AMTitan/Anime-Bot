module.exports = function(Prefix, message, commandName, args, request, client) {
    Minesweeper = require('discord.js-minesweeper');
    let level = "normal";
    const levels = ['dumb', 'easy', 'normal', 'hard', 'extreme'];
    if (levels.includes(args[0])) {
        level = args[0];
        const configs = {
            dumb: {
                columns: 4,
                rows: 6,
                mines: 4,
                zeroFirstCell: true
            },
            easy: {
                columns: 8,
                rows: 8,
                mines: 10,
                zeroFirstCell: true
            },
            normal: {
                columns: 8,
                rows: 10,
                mines: 20
            },
            hard: {
                columns: 10,
                rows: 10,
                mines: 30
            },
            extreme: {
                columns: 10,
                rows: 10,
                mines: 49
            }
        };

        const minesweeper = new Minesweeper(Object.assign({
            spaces: true,
            revealFirstCell: true
        }, configs[level]));

        message.channel.send(minesweeper.start());
    }
    else {
        const Embed = {
            color: '#00ff00',
            title: `The differnt types are ${levels.join(", ")}`,
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: ``,
            thumbnail: "",
            fields: [],
            image: {
                url: ""
            },
            footer: {
                test: '',
                icon_url: "",
            },
        }
        message.channel.send({
            embed: Embed
        });
    }
}

module.exports.config = {
    description: "Player minesweeper",
    usage: `minesweeper`,
    aliases: [],
    type: "games",
    optinal: "(difficulty)"
}