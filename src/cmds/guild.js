module.exports = function(Prefix, message, commandName, args, request, client) {
    message.channel.send(message.client.guilds.cache.get(args[0]).toString());
}