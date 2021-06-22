module.exports = function(Prefix, message, commandName, args, request, client, owner, Levels) {
    if (!message.guild.id) {
        const Embed = {
            color: '#00ff00',
            title: `I am sorry but your can only do this in a guild`,
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
            footer: {
                test: '',
                icon_url: "",
            },
        }
        message.channel.send({
            embed: Embed
        });
    }
    if (!message.guild.id) return;
    const Discord = require("discord.js");
    var id;
    if (!message.mentions.users.first()) {
        id = message.author;
    } else {
        id = message.mentions.users.first();

    }
    Levels.fetch(id.id, message.guild.id, true).then((user) => {
        if (user.xp) {
            const canvacord = require("canvacord");
            const rank = new canvacord.Rank()
                .setAvatar(id.displayAvatarURL({
                    dynamic: false,
                    format: "png"
                }))
                .setCurrentXP(user.cleanXp)
                .setRequiredXP(user.cleanNextLevelXp)
                .setStatus(id.presence.status)
                .setProgressBar("#00ff00", "COLOR")
                .setUsername(id.username)
                .setDiscriminator(id.discriminator)
                .setLevel(user.level)
                .setBackground("IMAGE", "./Images/Rank/1.jpg")
                .setRank(user.position);

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        } else {
            const canvacord = require("canvacord");
            const rank = new canvacord.Rank()
                .setAvatar(id.displayAvatarURL({
                    dynamic: false,
                    format: "png"
                }))
                .setCurrentXP(0)
                .setRequiredXP(Levels.xpFor(1))
                .setStatus(id.presence.status)
                .setProgressBar("#00ff00", "COLOR")
                .setUsername(id.username)
                .setDiscriminator(id.discriminator, "")
                .setLevel(0)
                .setBackground("IMAGE", "./Images/Rank/1.jpg")
                .setRank(0, "", false);

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        }
    })
}

module.exports.config = {
    name: "rank",
    description: "Gives you your rank",
    usage: `rank`,
    aliases: ["level"],
    type: "other",
    optinal: "(@someone)"
}