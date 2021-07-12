module.exports = function(message, commandName, args, client) {
    if (args[0] && args[0].toLowerCase() === "nsfw") {
        if (message.channel.nsfw === true || message.guild === null) {
            client.request(`https://akaneko-api.herokuapp.com/api/foxgirl`).then(res => res.text()).then(body => {
                if (body.trim() !== "") {
                    var jsonParsed = JSON.parse(body);
                    const Embed = {
                        color: '#00ff00',
                        title: 'fox nsfw',
                        url: "",
                        author: {
                            Name: 'AnimeBot',
                            icon_url: jsonParsed.url,
                            url: '',
                        },
                        description: ``,
                        thumbnail: jsonParsed.url,
                        fields: [],
                        image: {
                            url: jsonParsed.url,
                        },
                        footer: {
                            test: 'Some footer text here',
                            icon_url: jsonParsed.url,
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
        client.request(`https://akaneko-api.herokuapp.com/api/sfwfoxes`).then(res => res.text()).then(body => {
            if (body.trim() !== "") {
                var jsonParsed = JSON.parse(body);
                const Embed = {
                    color: '#00ff00',
                    title: 'fox',
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.url,
                        url: '',
                    },
                    description: ``,
                    thumbnail: jsonParsed.url,
                    fields: [],
                    image: {
                        url: jsonParsed.url,
                    },
                    footer: {
                        test: 'Some footer text here',
                        icon_url: jsonParsed.url,
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
    description: "Gives you a fox girl image",
    usage: `fox`,
    aliases: ["foxgirl"],
    type: "sfw",
    optinal: "(nsfw)"
}