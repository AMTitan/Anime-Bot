module.exports = function(message, commandName, args, client) {
    client.request(`https://api.waifu.pics/sfw/waifu`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: 'Waifu',
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
    description: "Gives you a waifu",
    usage: `waifu`,
    aliases: [],
    type: "sfw",
    optinal: ""
}