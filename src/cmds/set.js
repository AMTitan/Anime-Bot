module.exports = function(Prefix, message, commandName, args, request, client, owner, Levels) {
    Levels.setXp(message.mentions.users.first().id, message.guild.id, Levels.xpFor(args[1]));
}

module.exports.config = {
    name: "set",
    description: "sets someones level",
    usage: `set`,
    accessableby: "",
    aliases: [],
    type: "owner",
    optinal: "(@someone)"
}