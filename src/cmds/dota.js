module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {

        request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-loli -asian -3d -photo_(medium) rating:explicit dota_2 -loli&json=1`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonParsed = JSON.parse(body)[Math.round(Math.random() * (JSON.parse(body).length - 1))];
                const Embed = {
                    color: '#00ff00',
                    title: commandName,
                    url: "",
                    author: {
                        Name: 'AnimeBot',
                        icon_url: jsonParsed.file_url,
                        url: '',
                    },
                    //description: `(I need to fix this but if you get no img do do this again) If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" + ` But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} ${args.join(" ")} (reason)` + "`\n\n**Tags: **" + "```" + jsonParsed.tags + "```",
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

                if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                    message.channel.send(jsonParsed.file_url);
                }
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
    description: "Gives you a dota image",
    usage: `dota`,
    aliases: ["dota_2"],
    type: "nsfw",
    optinal: ""
}