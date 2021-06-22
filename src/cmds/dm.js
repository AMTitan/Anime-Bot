module.exports = function(Prefix, message, commandName, args, request, client, owner) {
    if (message.author.id === owner && commandName === "dm") {
        var person = args[0];
        args.shift();
        const Embed = {
            color: '#00ff00',
            title: "Bot Owner: " + args.join(" "),
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: `if you want to respond you can do so with ${Prefix}issue (reply)`,
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
        try {
            client.users.cache.get(person).send({
                embed: Embed
            });
            message.channel.send("sent");
        } catch (err) {
            message.channel.send("try again");
        }
    } else {
        const Embed = {
            color: '#00ff00',
            title: commandName + " - " + message.author.tag + " (" + message.author.id + ")",
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: args.join(" "),
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

        const Embedthree = {
            color: '#00ff00',
            title: "I am so sorry but it did not send maybe try again? If this keeps happening try in one day or so",
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: args.join(" "),
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

        const Embedtwo = {
            color: '#00ff00',
            title: "I have sent it thank you!",
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: "and if you get a friend request from a account right after you send it that is prob me going to ask you what you mean.",
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

        var sent = false;

        if (args[0] === "" || !args[0] || args[0] === " ") {
            const Embedfour = {
                color: '#00ff00',
                title: `can you please write something after the ${commandName}`,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: args.join(" "),
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
                embed: Embedfour
            })
        } else {
            try {
                client.users.cache.get(owner).send({
                    embed: Embed
                });
                sent = true;
            } catch (err) {
                console.log(err);
                sent = false;
                message.channel.send({
                    embed: Embedthree
                })
            }
            if (!sent) return;

            message.channel.send({
                embed: Embedtwo
            })
        }
    }
}

module.exports.config = {
    name: "dm",
    description: "reports a issue or improvement",
    usage: `dm`,
    aliases: ["issue", "improve"],
    type: "other",
    optinal: "[what was the issues or problem]"
}