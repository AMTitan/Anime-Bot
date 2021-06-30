module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        client.search("pregnant").then((jsonParsed) => {
            const Embed = {
                color: '#00ff00',
                title: commandName,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.file_url.split(" ").join("%20"),
                    url: '',
                },
                description: ``,
                thumbnail: jsonParsed.file_url.split(" ").join("%20"),
                fields: [],
                image: {
                    url: jsonParsed.file_url.split(" ").join("%20"),
                },
                footer: {
                    test: 'Some footer text here',
                    icon_url: jsonParsed.file_url.split(" ").join("%20"),
                },
            }

            message.channel.send({
                embed: Embed
            });

            if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                message.channel.send(jsonParsed.file_url);
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
    description: "Gives you a images of pregnant",
    usage: `pregnant`,
    aliases: [],
    type: "nsfw",
    optinal: ""
}