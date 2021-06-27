module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        request(`https://scathach.redsplit.org/v3/nsfw/r34/?tags=asuna_(sao)`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body);
                const Embed = {
                    color: '#00ff00',
                    title: commandName,
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.url.split(" ").join("%20"),
                        url: '',
                    },
                    description: ``,
                    thumbnail: jsonParsed.url.split(" ").join("%20"),
                    fields: [],
                    image: {
                        url: jsonParsed.url.split(" ").join("%20"),
                    },
                    footer: {
                        test: 'Some footer text here',
                        icon_url: jsonParsed.url.split(" ").join("%20"),
                    },
                }

                message.channel.send({
                    embed: Embed
                });

                if (!jsonParsed.url.endsWith(".jpg") && !jsonParsed.url.endsWith(".jpeg") && !jsonParsed.url.endsWith(".JPG") && !jsonParsed.url.endsWith(".JPEG") && !jsonParsed.url.endsWith(".png") && !jsonParsed.url.endsWith(".PNG") && !jsonParsed.url.endsWith(".gif") && !jsonParsed.url.endsWith(".gifv")) {
                    message.channel.send(url.url);
                }
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
    description: "Gives you a images of asuna (sword art online)",
    usage: `asuna`,
    aliases: [],
    type: "nsfw",
    optinal: ""
}