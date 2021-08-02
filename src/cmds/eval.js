module.exports = function(message, commandName, args, client) {
    if (message.author.id === client.owner) {
        let value = eval(args.join(" "));
        message.channel.send(value);
    }
}

module.exports.config = {
    description: "Gives the guild",
    usage: `eval`,
    aliases: [],
    type: "client.owner",
    optinal: ""
}