module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://nekobot.xyz/api/image?type=food`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
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
    description: "Gives you a food image",
    usage: `food`,
    aliases: [],
    type: "sfw",
    optinal: ""
}