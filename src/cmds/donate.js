module.exports = function(Prefix, message, commandName, args, request, client) {
    const Embed = {
        color: '#00ff00',
        title: 'Donate link (click me)',
        url: "https://www.patreon.com/AMTItan_Github",
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
        footer: {
            test: 'Some footer text here',
            icon_url: "",
        },
    }

    message.channel.send({
        embed: Embed
    });
}

module.exports.config = {
    description: "Gets you the donate page",
    usage: `donate`,
    aliases: [],
    type: "other",
    optinal: ""
}