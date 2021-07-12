module.exports = function(message, commandName, args, client) {
    if (message.author.id === client.owner) {
        client.Levels.setXp(message.mentions.users.first().id, message.guild.id, client.Levels.xpFor(args[1]));
    }
}

module.exports.config = {
    description: "sets someones level",
    usage: `set`,
    aliases: [],
    type: "client.owner",
    optinal: "(@someone)"
}