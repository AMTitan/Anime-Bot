module.exports = function(Prefix, message, commandName, args, request, client) {
    var jsonParsed;
    const filter = (n) => n.author.id === message.author.id;
    request(`https://animechan.vercel.app/api/random`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: `Guess Who Said This`,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: ``,
                thumbnail: "",
                fields: [{
                    name: 'Anime',
                    value: jsonParsed.anime,
                    inline: true
                }, {
                    name: 'Quote',
                    value: jsonParsed.quote
                }, ],
                image: {
                    url: ""
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
        message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['Line']
            })
            .then((collected) => {
                const msg = collected.first().content;
                if (msg.toLowerCase() === jsonParsed.character.toLowerCase()) {
                    const Embed = {
                        color: '#00ff00',
                        title: `You are right`,
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
                            url: ""
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
                } else {
                    const Embed = {
                        color: '#00ff00',
                        title: `That is not right it was ` + jsonParsed.character,
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
                            url: ""
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
            .catch((err) => {
                const Embed = {
                    color: '#00ff00',
                    title: `You know you have to respond right? Welp it was ` + jsonParsed.character,
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
                        url: ""
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
            });

    })
}