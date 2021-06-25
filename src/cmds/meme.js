module.exports = function(Prefix, message, commandName, args, request, client) {
    request("https://www.reddit.com/r/GoodAnimemes/hot.json?limit=100&t=month", function(error, response, body) {
        if (error) throw new Error(error);
        var jsonParsed = JSON.parse(body);
        jsonParsed = jsonParsed.data.children[Math.round(Math.random() * 100) - (jsonParsed.data.dist - 100)].data;
        if (jsonParsed.thumbnail != "nsfw") {
            const Embed = {
                color: '#00ff00',
                title: jsonParsed.title,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.url_overridden_by_dest,
                    url: '',
                },
                description: ``,
                thumbnail: jsonParsed.url_overridden_by_dest,
                fields: [],
                image: {
                    url: jsonParsed.url_overridden_by_dest,
                },
                footer: {
                    test: 'Some footer text here',
                    icon_url: "",
                },
            }

            message.channel.send({
                embed: Embed
            });
        } else {
            const Embed = {
                color: '#00ff00',
                title: "The meme is nsfw do you want to see it? (type yes or no)",
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

            const filter = (n) => n.author.id === message.author.id;
            message.channel.send({
                embed: Embed
            });

            message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['Line']
                })
                .then((collected) => {
                    const msg = collected.first().content;
                    if (msg.toLowerCase() === "yes") {
                        if (message.channel.nsfw === true || message.guild === null) {
                            const Embed = {
                                color: '#00ff00',
                                title: jsonParsed.title,
                                url: "",
                                author: {
                                    Name: 'AnimeBot',
                                    icon_url: jsonParsed.url_overridden_by_dest,
                                    url: '',
                                },
                                description: ``,
                                thumbnail: jsonParsed.url_overridden_by_dest,
                                fields: [],
                                image: {
                                    url: jsonParsed.url_overridden_by_dest,
                                },
                                footer: {
                                    test: 'Some footer text here',
                                    icon_url: "",
                                },
                            }

                            message.channel.send({
                                embed: Embed
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
                })
                .catch((err) => {});

        }
    })
}

module.exports.config = {
    description: "Gives you a meme",
    usage: `meme`,
    aliases: ["memes"],
    type: "sfw",
    optinal: ""
}