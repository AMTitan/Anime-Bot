module.exports = function(Prefix, message, commandName, args, request, client, owner) {
    if (message.author.id === owner) {
        const Embed = {
            color: '#00ff00',
            title: "ANNOUNCEMENT",
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: `\`\`\`${args.join(" ")}\`\`\`if you want to respond you can do so with ${Prefix}issue (reply)`,
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
        try {
            message.client.guilds.cache.map((guild) => {
                var channels = [];
                guild.channels.cache.map((channel) => {
                    if (channel.type === 'text' && channel.permissionsFor(guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) {
                        channels.push(channel);
                    }
                });
                if (channels.length > 0) {
                    channels = channels.sort((a, b) => {
                        return a.calculatedPosition - b.calculatedPosition;
                    });
                    channels[0].send({
                        embed: Embed
                    }).catch(e => console.error(e));
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports.config = {
    name: "annouce",
    description: "make an announcement",
    usage: `annouce`,
    aliases: [],
    type: "owner",
    optinal: ""
}