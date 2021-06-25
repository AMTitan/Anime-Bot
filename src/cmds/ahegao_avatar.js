module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        request(`https://api.nekos.dev/api/v3/images/nsfw/img/ahegao_avatar/`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body);
                const Embed = {
                    color: '#00ff00',
                    title: 'Ahegao avatar nsfw',
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
    name: "ahegao_avatar",
    description: "Gives you a ahegao avatar",
    usage: `ahegaoavatar`,
    aliases: ["ahegao_avatar"],
    type: "nsfw",
    optinal: ""
}