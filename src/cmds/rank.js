module.exports = function(Prefix, message, commandName, args, request, client, Levels) {
    const Canvas = require("canvas");
    var id;
    if (!message.mentions.users.first()) {
        id = message.author;
    }else {
        id = message.mentions.users.first();
        
    }
    Levels.fetch(id.id, message.guild.id).then((user) => {
        if (user.xp) {
            var xp;
            if (user.level > 0) {
                xp = user.xp - Levels.xpFor(parseInt(user.level));
            } else {
                xp = user.xp;
            }
            const Embed = {
                color: '#00ff00',
                title: `${id.username} is level ${user.level} and ${xp} xp`,
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
                    url: ""
                },
                fimestamp: new Date(),
                footer: {
                    test: '',
                    icon_url: "",
                },
            }
            message.channel.send({
                embed: Embed
            });
        } else {
            const Embed = {
                color: '#00ff00',
                title: `Sorry but this person does not have any xp`,
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
                    url: ""
                },
                fimestamp: new Date(),
                footer: {
                    test: '',
                    icon_url: "",
                },
            }
            message.channel.send({
                embed: Embed
            });
        }
    })
}