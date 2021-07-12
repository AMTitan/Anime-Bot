module.exports = function(message, commandName, args, client) {
    client.request(`https://api.waifu.pics/sfw/highfive`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
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

module.exports.config = {
    description: "Gives you a highfive gif",
    usage: `highfive`,
    aliases: [],
    type: "sfw",
    optinal: "(@someone)"
}