module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        request(`https://nekobot.xyz/api/image?type=paizuri`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body);
                const Embed = {
                    color: '#00ff00',
                    title: 'Paizuri nsfw',
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.message,
                        url: '',
                    },
                    description: ``,
                    thumbnail: jsonParsed.message,
                    fields: [],
                    image: {
                        url: jsonParsed.message,
                    },
                    footer: {
                        test: 'Some footer text here',
                        icon_url: jsonParsed.message,
                    },
                }

                message.channel.send({
                    embed: Embed
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
    name: "boobjob",
    description: "Gives you a boobjob image",
    usage: `boobjob`,
    aliases: ["paizuri"],
    type: "nsfw",
    optinal: ""
}