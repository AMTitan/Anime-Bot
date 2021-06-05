module.exports = function(Prefix, message, commandName, args, request, client) {
    const Embed = {
        color: '#00ff00',
        title: 'Invite link (click me)',
        url: "https://discord.com/api/oauth2/authorize?client_id=833682899202080818&permissions=0&scope=bot",
        author: {
            Name: 'AnimeBot',
            icon_url: "",
            url: '',
        },
        description: ``,
        thumbnail: "",
        fields: [],
        image: {
            url: "",
        },
        fimestamp: new Date(),
        footer: {
            test: 'Some footer text here',
            icon_url: "",
        },
    }

    message.channel.send({
        embed: Embed
    });
}