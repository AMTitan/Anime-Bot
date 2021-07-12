module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://api.nekos.dev/api/v3/images/8ball/`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: '8ball',
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.data.response.url.split(" ").join("%20"),
                    url: '',
                },
                description: `${args.join(" ")}`,
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
}

module.exports.config = {
    description: "8ball",
    usage: `8ball`,
    aliases: [],
    type: "games",
    optinal: "(your question)"
}