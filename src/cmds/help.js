module.exports = function(Prefix, message, commandName, args, request, client, owner, Levels) {
    if (args[0]) {
        let commandfile = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
        if (commandfile) {
            const Embed = {
                color: '#00ff00',
                title: args[0],
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `**Command name**: ${commandfile.config.usage  || 'None'}\n**Aliases**: ${commandfile.config.aliases.map(a => `\`${a}\``).join(", ")  || 'None'}\n**Description**: ${commandfile.config.description  || 'None'}\n**Type**: ${commandfile.config.type  || 'None'}\n\n**Usage**: ${Prefix + commandfile.config.usage + " " + (commandfile.config.optinal  || '')  || 'None'}`,
                thumbnail: "",
                fields: [],
                image: {
                    url: ""
                },
                footer: {
                    test: '',
                    icon_url: "",
                },
            }

            message.channel.send({
                embed: Embed
            })
        }
        else {
            const Embed = {
                color: '#00ff00',
                title: "Kinda awkward but I dont have this command",
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `if you want this command do \`a!improve ${args[0]} [reason]\``,
                thumbnail: "",
                fields: [],
                image: {
                    url: ""
                },
                footer: {
                    test: '',
                    icon_url: "",
                },
            }

            message.channel.send({
                embed: Embed
            })
        }
    }
    else {
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
            },
            footer: {
                test: '',
                icon_url: "",
            },
        }

        message.channel.send({
            embed: Embed
        })
    }
}

module.exports.config = {
    description: "Gives you the help",
    usage: `help`,
    aliases: [],
    type: "other",
    optinal: "(command)"
}