module.exports = function(Prefix, message, commandName, args, request, client) {
    if (args[0] && args[0].toLowerCase() === "nsfw") {
        if (message.channel.nsfw === true || message.guild === null) {
            request(`https://nekos.life/api/lewd/neko`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'Neko nsfw',
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: jsonParsed.neko,
                            url: '',
                        },
                        description: ``,
                        thumbnail: jsonParsed.neko,
                        fields: [],
                        image: {
                            url: jsonParsed.neko,
                        },
                        fimestamp: new Date(),
                        footer: {
                            test: 'Some footer text here',
                            icon_url: jsonParsed.neko,
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
    } else if (args[0] && args[0].toLowerCase() === "gif") {
        if (message.channel.nsfw === true || message.guild === null) {
            request(`https://api.nekos.dev/api/v3/images/nsfw/gif/neko/`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'Neko nsfw gif',
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
    } else {
        request(`https://nekos.life/api/neko`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body);
                const Embed = {
                    color: '#00ff00',
                    title: 'Neko',
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.neko,
                        url: '',
                    },
                    description: ``,
                    thumbnail: jsonParsed.neko,
                    fields: [],
                    image: {
                        url: jsonParsed.neko,
                    },
                    fimestamp: new Date(),
                    footer: {
                        test: 'Some footer text here',
                        icon_url: jsonParsed.neko,
                    },
                }

                message.channel.send({
                    embed: Embed
                });
            }
        })
    }
}

module.exports.config = {
    name: "neko",
    description: "Gives you a neko gif or image",
    usage: `neko`,
    accessableby: "",
    aliases: ["nekos"],
    type: "sfw",
    optinal: "(gif or nsfw)"
}