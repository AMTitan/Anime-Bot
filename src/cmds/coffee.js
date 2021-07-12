module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://nekobot.xyz/api/image?type=coffee`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: commandName,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.message,
                    url: '',
                },
                description: ``,
                thumbnail: jsonParsed.message,
                fields: [],
                image: {
                    url: jsonParsed.message,
                },
                footer: {
                    test: 'Some footer text here',
                    icon_url: jsonParsed.message,
                },
            }

            message.channel.send({
                embed: Embed
            });
        }
    })
}

module.exports.config = {
    description: "Gives you a coffee image",
    usage: `coffee`,
    aliases: [],
    type: "sfw",
    optinal: ""
}