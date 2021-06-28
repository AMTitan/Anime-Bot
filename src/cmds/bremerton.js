module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.channel.nsfw === true || message.guild === null) {
        const client = require('scathach-api');
        const {
            nsfw
        } = new client();

        nsfw.bremerton().then(url => {
            const Embed = {
                color: '#00ff00',
                title: commandName,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: url.url,
                    url: '',
                },
                description: ``,
                thumbnail: url.url,
                fields: [],
                image: {
                    url: url.url,
                },
                footer: {
                    test: 'Some footer text here',
                    icon_url: url.url,
                },
            }
            message.channel.send({
                embed: Embed
            });

            if (!url.url.endsWith(".jpg") && !url.url.endsWith(".jpeg") && !url.url.endsWith(".JPG") && !url.url.endsWith(".JPEG") && !url.url.endsWith(".png") && !url.url.endsWith(".PNG") && !url.url.endsWith(".gif") && !url.url.endsWith(".gifv")) {
                message.channel.send(url.url);
            }
        });
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
    description: "Gives you a images of bremerton (azur_lane)",
    usage: `bremerton`,
    aliases: [],
    type: "person",
    optinal: ""
}