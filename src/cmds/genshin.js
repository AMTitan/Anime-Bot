module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        request(`https://nekobot.xyz/api/image?type=food`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body);
                const lewd = require("ereshkigal");
                const client = new lewd.Client();

                client.genshin().then((data) => {
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
            }
        })
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
    description: "Gives you a genshin image",
    usage: `genshin`,
    aliases: ["genshin_impact"],
    type: "nsfw",
    optinal: ""
}