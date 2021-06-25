module.exports = function(Prefix, message, commandName, args, request, client, owner, Levels) {
    if (message.author.id === owner) {
        Levels.setXp(message.mentions.users.first().id, message.guild.id, Levels.xpFor(args[1]));
    }
}

module.exports.config = {
    description: "sets someones level",
    usage: `set`,
    aliases: [],
    type: "owner",
    optinal: "(@someone)"
}