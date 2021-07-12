module.exports = function(message, commandName, args, client) {
    client.request(`https://animechan.vercel.app/api/random`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
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
    description: "Gives you a quote",
    usage: `quote`,
    aliases: ["quotes"],
    type: "sfw",
    optinal: ""
}