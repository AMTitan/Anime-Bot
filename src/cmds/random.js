module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        if (args[0] === "gif") {
            request(`https://api.nekos.dev/api/v3/images/nsfw/gif/all_tags`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'Random gif',
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: jsonParsed.data.response.url.split(" ").join("%20"),
                            url: '',
                        },
                        description: ``,
                        thumbnail: jsonParsed.data.response.url.split(" ").join("%20"),
                        fields: [],
                        image: {
                            url: jsonParsed.data.response.url.split(" ").join("%20"),
                        },
                        fimestamp: new Date(),
                        footer: {
                            test: 'Some footer text here',
                            icon_url: jsonParsed.data.response.url.split(" ").join("%20"),
                        },
                    }

                    message.channel.send({
                        embed: Embed
                    });
                }
            })
        } else {
            request(`https://api.nekos.dev/api/v3/images/nsfw/img/all_tags_lewd`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: `Random Anime Img`,
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: "",
                            url: "",
                        },
                        description: ``,
                        thumbnail: "",
                        fields: [],
                        image: {
                            url: jsonParsed.data.response.url
                        },
                        fimestamp: new Date(),
                        footer: {
                            test: '',
                            icon_url: "",
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

module.exports.config = {
    name: "random",
    description: "Gives you a radom gif or image",
    usage: `random`,
    accessableby: "",
    aliases: [],
    type: "nsfw",
    optinal: "(gif)"
}