module.exports = function(Prefix, message, commandName, args, request, client) {
    if (message.author.id === owner) {
        message.channel.send(message.client.guilds.cache.get(args[0]).toString());
    }
}

module.exports.config = {
    name: "guild",
    description: "Gives the guild",
    usage: `guild`,
    accessableby: "",
    aliases: [],
    type: "owner",
    optinal: ""
}