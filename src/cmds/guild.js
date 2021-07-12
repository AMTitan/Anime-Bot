module.exports = function(message, commandName, args, client) {
    if (message.author.id === client.owner) {
        message.channel.send(message.client.guilds.cache.get(args[0]).toString());
    }
}

module.exports.config = {
    description: "Gives the guild",
    usage: `guild`,
    aliases: [],
    type: "client.owner",
    optinal: ""
}