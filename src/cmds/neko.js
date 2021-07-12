module.exports = function(message, commandName, args, client) {
    if (args[0] && args[0].toLowerCase() === "nsfw") {
        if (message.channel.nsfw === true || message.guild === null) {
            client.request(`https://nekos.life/api/lewd/neko`).then(res => res.text()).then(body => {
                if (body.trim() !== "") {
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
            client.request(`https://api.nekos.dev/api/v3/images/nsfw/gif/neko/`).then(res => res.text()).then(body => {
                if (body.trim() !== "") {
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
        client.request(`https://nekos.life/api/neko`).then(res => res.text()).then(body => {
            if (body.trim() !== "") {
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
    description: "Gives you a neko gif or image",
    usage: `neko`,
    aliases: ["nekos"],
    type: "sfw",
    optinal: "(gif or nsfw)"
}