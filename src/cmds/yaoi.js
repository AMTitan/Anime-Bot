module.exports = function(message, commandName, args, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        client.request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1000/index.php?page=dapi&s=post&q=index&tags=${client.banlist}${client.banlist}yaoi&json=1`).then(res => res.text()).then(body => {
            if (body.trim() !== "") {
                var jsonParsed = JSON.parse(body);
                jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length - 1))];
                const Embed = {
                    color: '#00ff00',
                    title: 'yaoi nsfw',
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.file_url,
                        url: '',
                    },
                    description: ``,
                    thumbnail: jsonParsed.file_url,
                    fields: [],
                    image: {
                        url: jsonParsed.file_url,
                    },
                    footer: {
                        test: 'Some footer text here',
                        icon_url: jsonParsed.file_url,
                    },
                }

                message.channel.send({
                    embed: Embed
                });
            }
        })
    } else {
        const Embed = {
            color: '#00ff00',
            title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: ``,
            thumbnail: "",
            fields: [],
            image: {
                url: "",
            },
            footer: {
                test: 'Some footer text here',
                icon_url: "",
            },
        }

        message.channel.send({
            embed: Embed
        });
    }
}

module.exports.config = {
    description: "Gives you a yaoi",
    usage: `yaoi`,
    aliases: ["gay"],
    type: "nsfw",
    optinal: ""
}