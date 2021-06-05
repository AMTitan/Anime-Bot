module.exports = function(Prefix, message, commandName, args, request, client, Levels) {
    Levels.setXp(message.mentions.users.first().id, message.guild.id, Levels.xpFor(args[1]));
}