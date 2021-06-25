module.exports = function(Prefix, message, commandName, args, request, client, owner, Levels) {
    if (message.author.id === owner) {
        message.channel.send(message.client.guilds.cache.get(args[0]).toString());
    }
}

module.exports.config = {
    description: "Gives the guild",
    usage: `guild`,
    aliases: [],
    type: "owner",
    optinal: ""
}