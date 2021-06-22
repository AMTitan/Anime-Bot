module.exports = function(Prefix, message, commandName, args, request, client, owner) {
    if (message.author.id === owner) {
        try {
            const Embed = {
                color: '#00ff00',
                title: "ANNOUNCEMENT",
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `\`\`\`I am so sorry but you have multiple servers that I am in, could you kick me from one of them?\`\`\`if you want to respond you can do so with ${Prefix}issue (reply)`,
                thumbnail: "",
                fields: [],
                image: {
                    url: "",
                },
                fimestamp: new Date(),
                footer: {
                    test: 'Some footer text here',
                    icon_url: "",
                },
            }
            var users = [];
            message.client.guilds.cache.map((guild) => {
                users.push(guild.ownerID);
            });
            counter = {};
            counterOfDup = [];
            users.forEach(function(obj) {
                var key = JSON.stringify(obj);
                counter[key] = (counter[key] || 0) + 1;
                if (counter[key] > 1) counterOfDup.push(key);
            })
            counterOfDup.forEach(function(id) {
                message.client.guilds.cache.map((guild) => {
                    //console.log(Number(id.slice(1).slice(0, -1)), guild.ownerID);
                    if (Number(guild.ownerID) === Number(id.slice(1).slice(0, -1))) {
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
                        console.log(message.client.guilds.cache.get(guild.id).toString());
                    }
                });
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports.config = {
    name: "asktoleaveguild",
    description: "Asks everyone if they have the bot in 2 or more servers to kick it from one of them",
    usage: `asktoleaveguild`,
    accessableby: "",
    aliases: [],
    type: "owner",
    optinal: ""
}