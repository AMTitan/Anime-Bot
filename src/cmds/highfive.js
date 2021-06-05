module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://api.waifu.pics/sfw/kiss`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonParsed = JSON.parse(body);
            var title = "HighFive";
            if (message.mentions.users && message.mentions.users.first()) title = `${message.author.username} highfives ${message.mentions.users.first().username}`;
            const Embed = {
                color: '#00ff00',
                title: title,
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
                fimestamp: new Date(),
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