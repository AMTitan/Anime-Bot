module.exports = function(Prefix, message, commandName, args, request, client, Levels) {
    const Canvas = require("canvas");
    const Discord = require("discord.js");
    var id;
    if (!message.mentions.users.first()) {
        id = message.author;
    }else {
        id = message.mentions.users.first();
        
    }
    Levels.fetch(id.id, message.guild.id, true).then((user) => {
        if (user.xp) {
            const canvacord = require("canvacord");
            var xp = [0, 0];
            if (user.level > 0) {
                xp[0] = user.xp - Levels.xpFor(parseInt(user.level))
                xp[1] = Levels.xpFor(parseInt(user.level) + 1) - Levels.xpFor(parseInt(user.level));
            }
            else {
                xp[0] = user.xp;
                xp[1] = Levels.xpFor(parseInt(user.level) + 1);
            }
            const rank = new canvacord.Rank()
                .setAvatar(id.displayAvatarURL({ dynamic: false, format: "png"}))
                .setCurrentXP(xp[0])
                .setRequiredXP(xp[1])
                .setStatus(id.presence.status)
                .setProgressBar("#00ff00", "COLOR")
                .setUsername(id.username)
                .setDiscriminator(id.discriminator)
                .setLevel(user.level)
                .setBackground("IMAGE", "https://img3.gelbooru.com//images/21/0b/210b549e22972e0fb9c76c6e061b709d.jpg")
                .setRank(0, "", false);

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        } else {
            const canvacord = require("canvacord");
            const rank = new canvacord.Rank()
                .setAvatar(id.displayAvatarURL({ dynamic: false, format: "png"}))
                .setCurrentXP(0)
                .setRequiredXP(Levels.xpFor(1))
                .setStatus(id.presence.status)
                .setProgressBar("#00ff00", "COLOR")
                .setUsername(id.username)
                .setDiscriminator(id.discriminator, "")
                .setLevel(0)
                .setBackground("https://img3.gelbooru.com//images/21/0b/210b549e22972e0fb9c76c6e061b709d.jpg", "IMAGE")
                .setRank(0, "", false);

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        }
    })
}