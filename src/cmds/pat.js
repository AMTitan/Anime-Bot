module.exports = function(Prefix, message, commandName, args, request, client) {
    request(`https://api.waifu.pics/sfw/pat`).then(res => res.text()).then(body => {
        if (body.trim() !== "") {
            var jsonParsed = JSON.parse(body);
            var title = "pat";
            if (message.mentions.users && message.mentions.users.first()) title = `${message.author.username} pats ${message.mentions.users.first().username}`;
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
    description: "Gives you a pat gif",
    usage: `pat`,
    aliases: ["pats", "patting", "headpat"],
    type: "sfw",
    optinal: ""
}