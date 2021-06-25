module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        const lewd = require("ereshkigal");
        const client = new lewd.Client();

        client.dota().then((data) => {
            const Embed = {
                color: '#00ff00',
                title: commandName,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: data.split("\n")[Math.round(Math.random() * data.split("\n").length-1)],
                    url: '',
                },
                description: ``,
                thumbnail: data.split("\n")[Math.round(Math.random() * data.split("\n").length-1)],
                fields: [],
                image: {
                    url: data.split("\n")[Math.round(Math.random() * data.split("\n").length-1)],
                },
                footer: {
                    test: 'Some footer text here',
                    icon_url: data.split("\n")[Math.round(Math.random() * data.split("\n").length-1)],
                },
            }
            message.channel.send({
                embed: Embed
            });
        });
    } else {
        const Embed = {
            color: '#00ff00',
            title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
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

}

module.exports.config = {
    description: "Gives you a dota image",
    usage: `dota`,
    aliases: [],
    type: "nsfw",
    optinal: ""
}