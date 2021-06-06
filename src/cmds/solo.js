module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        if (args[0] && args[0].toLowerCase() === "gif") {
            request(`https://api.nekos.dev/api/v3/images/nsfw/gif/girls_solo`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'Solo nsfw gif',
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                            url: '',
                        },
                        description: ``,
                        thumbnail: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        fields: [],
                        image: {
                            url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        },
                        fimestamp: new Date(),
                        footer: {
                            test: 'Some footer text here',
                            icon_url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        },
                    }

                    message.channel.send({
                        embed: Embed
                    });
                }
            })
        } else {
            request(`https://api.nekos.dev/api/v3/images/nsfw/img/solo_lewd`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'Solo nsfw',
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                            url: '',
                        },
                        description: ``,
                        thumbnail: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        fields: [],
                        image: {
                            url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        },
                        fimestamp: new Date(),
                        footer: {
                            test: 'Some footer text here',
                            icon_url: jsonParsed.data.response.url.replaceAll(" ", "%20"),
                        },
                    }

                    message.channel.send({
                        embed: Embed
                    });
                }
            })
        }
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
            fimestamp: new Date(),
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