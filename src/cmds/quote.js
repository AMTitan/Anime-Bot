module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://animechan.vercel.app/api/random`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: `Random Quote`,
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
                    name: 'Character',
                    value: jsonParsed.character,
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
    })
}

module.exports.config = {
    name: "quote",
    description: "Gives you a quote",
    usage: `quote`,
    accessableby: "",
    aliases: ["quotes"],
    type: "sfw",
    optinal: ""
}