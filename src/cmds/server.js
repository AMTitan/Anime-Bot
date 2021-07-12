module.exports = function(message, commandName, args, client) {
    const Embed = {
        color: '#00ff00',
        title: 'Server link (click me)',
        url: "https://discord.gg/sJnVmPZB7Y",
        author: {
            Name: 'AnimeBot',
            icon_url: "",
            url: '',
        },
        description: ``,
        thumbnail: "",
        fields: [],
        image: {
            url: "",
        },
        footer: {
            test: 'Some footer text here',
            icon_url: "",
        },
    }

    message.channel.send({
        embed: Embed
    });
}

module.exports.config = {
    description: "Gives you the server invite link",
    usage: `server`,
    aliases: ["servers"],
    type: "other",
    optinal: ""
}