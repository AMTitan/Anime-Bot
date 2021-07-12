module.exports = function(message, commandName, args, client) {
    client.request(`https://api.nekos.dev/api/v3/images/sfw/gif/baka/`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            var title = "baka";
            if (message.mentions.users && message.mentions.users.first()) title = `${message.author.username} says ${message.mentions.users.first().username} is a baka`;
            const Embed = {
                color: '#00ff00',
                title: title,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.data.response.url.split(" ").join("%20"),
                    url: '',
                },
                description: ``,
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
    description: "Gives you a baka gif",
    usage: `baka`,
    aliases: [],
    type: "sfw",
    optinal: "(@someone)"
}