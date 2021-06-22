module.exports = function(Prefix, message) {
    const Embed = {
        color: '#00ff00',
        title: `The help is located here (Click Me)`,
        url: "https://amtitan.github.io/Anime-Bot/",
        author: {
            Name: 'AnimeBot',
            icon_url: "",
            url: '',
        },
        description: `➤[Invite](https://discord.com/api/oauth2/authorize?client_id=833682899202080818&permissions=0&scope=bot) ➤[Server](https://discord.gg/sJnVmPZB7Y) ➤[Donate](https://www.patreon.com/AMTItan_Github)`,
        thumbnail: "",
        fields: [],
        image: {
            url: ""
        }, footer: { test:
            '',
            icon_url: "",
        },
    }

    message.channel.send({
        embed: Embed
    })
}

module.exports.config = {
    name: "help",
    description: "Gives you the help",
    usage: `help`,
    aliases: [],
    type: "other",
    optinal: ""
}