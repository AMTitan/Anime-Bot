module.exports = function(message, commandName, args, client) {
    client.request(`https://api.waifu.pics/sfw/dance`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            var title = "dance";
            if (message.mentions.users && message.mentions.users.first()) title = `${message.author.username} dances with ${message.mentions.users.first().username}`;
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
    description: "Gives you a dancing gif",
    usage: `dance`,
    aliases: ["dancing"],
    type: "sfw",
    optinal: ""
}