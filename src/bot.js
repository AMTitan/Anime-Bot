const fs = require("fs");

// See if config file exists
try {
    if (fs.existsSync('Config.json')) {
        console.log("The file exists dont need to make it.");
    } else {
        console.log('The file does not exist so trying to make it.');
        fs.writeFileSync('Config.json', "{\n" +
            "  \"Token\": \"(discord bot token)\",\n" +
            "  \"top\": \"(top.gg token)\",\n" +
            "  \"botlist\": \"(discordbotlist token)\",\n" +
            "  \"mongodb\": \"(something like mongodb+srv://<username>:<password>@<stuff>\",\n" +
            "  \"# If you dont want it to report delete the lines below\": \"null\",\n" +
            "  \"GITHUB_REPO\": \"(the repo)\",\n" +
            "  \"GITUB_USERNAME\": \"(username)\",\n" +
            "  \"GITHUB_PERSONAL_ACCESS_TOKENS\": \"(token)\"\n" +
            "}", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
        console.log(".env file made");
        console.log("\nUse any file editor you want and edit the file called \"Config.json\" and replace the brackets")
        process.exit(1);
    }
} catch (err) {
    console.error(err);
}

const request = require('request');
const config = JSON.parse(fs.readFileSync("Config.json"));
const owner = "585604715128291328";
const Levels = require("discord-xp");
Levels.setURL(config.mongodb);
const mongoose = require("mongoose");
const { Octokit } = require("@octokit/core");

var octokit;

if (config.GITHUB_PERSONAL_ACCESS_TOKENS) octokit = new Octokit({ auth: config.GITHUB_PERSONAL_ACCESS_TOKENS });

const UsageSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    times: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

request(`https://raw.githubusercontent.com/ScathachGrip/Spell/main/data/tags.txt`, function(error, response, body) {
    client.banlist = "-"+body.split("\n").join("+-")+"+";
})

const Usage = mongoose.model('Usage', UsageSchema);
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const Discord = require('discord.js');
const client = new Discord.Client();
const Prefix = "a!";
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.tag} bot is on`);
    client.user.setActivity(`${Prefix}help`, {
            type: 'WATCHING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
});
const dbots = require('dbots');
const poster = new dbots.Poster({
    client,
    apiKeys: {
        topgg: config.top,
        discordbotlist: config.botlist,
    },
    clientLibrary: 'discord.js'
})

poster.startInterval();

setInterval(function() {
    client.user.setActivity(`${Prefix}help`, {
        type: 'WATCHING'
    }).catch(console.error);
}, 1 * 6e5);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir(__dirname + `/cmds/`, (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    fs.truncate('src/cmds.json', 0, function() {
        console.log('Reset cmds.json');

        jsfile.forEach((f, i) => {
            let pull = require(__dirname + `/cmds/${f}`);
            pull.config.name = f;
            console.log(`Reading : ${__dirname}/cmds/${f}`);
            const jsonParsed = fs.readFileSync("src/cmds.json");
            if (jsonParsed.length === 0) {
                fs.writeFileSync("src/cmds.json", `[${JSON.stringify(pull.config)}`);
            } else {
                fs.writeFileSync("src/cmds.json", `${jsonParsed}, ${JSON.stringify(pull.config)}`);
            }
            client.commands.set(pull.config.usage, pull);
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.usage)
            });
        });
        const jsonParsed = fs.readFileSync("src/cmds.json");
        fs.writeFileSync("src/cmds.json", `${jsonParsed}]`);
    })
});

request(`https://raw.githubusercontent.com/ScathachGrip/Spell/main/data/tags.txt`, function(error, response, body) {
    client.banlist = "-"+body.split("\n").join("+-")+"+";
})

client.error = function(err) {
    if (config.GITHUB_PERSONAL_ACCESS_TOKENS) {
        octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: config.GITUB_USERNAME,
            repo: config.GITHUB_REPO,
            title: 'Auto',
            body: JSON.stringify(err)
            
        })
    }
    else {
        console.log(err);
    }
}

client.on('message', (message) => {
    try {
        if (message.guild && !message.author.bot) {
            Levels.appendXp(message.author.id, message.guild.id, Math.round(message.content.length / 10) + 1).then((hasLeveledUp) => {
                if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("SEND_MESSAGES")) return;
                if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) return;
                if (hasLeveledUp) {
                    Levels.fetch(message.author.id, message.guild.id).then((user) => {
                        const Embed = {
                            color: '#00ff00',
                            title: `Hey you leveled up you are now level ${user.level}`,
                            url: "",
                            author: {
                                Name: 'AnimeBot',
                                icon_url: "",
                                url: '',
                            },
                            description: ``,
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
                        });
                    })
                }
            })
        }
        if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("SEND_MESSAGES")) return;
        if (message.author.bot === true) return;
        if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) {
            message.channel.send("Sorry I cant send embeds");
        }
        if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) return;
        if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("ADD_REACTIONS")) {
            message.channel.send("Sorry I cant add reactions");
        }
        if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("ADD_REACTIONS")) return;
        const Embed = {
            color: '#00ff00',
            title: `My help cmd is ${Prefix}help`,
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: ``,
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
        if (message.mentions.users && message.mentions.users.first()) {
            if (message.mentions.users.first().id === client.user.id) {
                message.channel.send({
                    embed: Embed
                });
            }
        }
        if (!message.content.toLowerCase().startsWith(Prefix.toLowerCase())) return;
        console.log(`[${new Date}]: ${message.content}`);
        var [commandName, ...args] = message.content.toLowerCase()
            .trim()
            .substring(Prefix.length)
            .split(/\s+/);
        if (!commandName) {
            var [commandName, ...args] = message.content.toLowerCase()
                .trim()
                .substring(Prefix.length + 1)
                .split(/\s+/);
        }
        if (!commandName) {
            message.channel.send({
                embed: Embed
            });
        }
        if (!commandName) return;
        Usage.findOne({
            userID: message.author.id
        }).then((user) => {
            if (!user) {
                const newUser = new Usage({
                    userID: message.author.id,
                    times: 1,
                });

                newUser.save().then(() => {
                    user.times += 1;
                    user.lastUpdated = new Date;
                    user.save().catch(e => console.log(`Failed to set times: ${e}`));
                }).catch(e => {

                });
            } else {
                user.times += 1;
                user.lastUpdated = new Date;
                user.save().catch(e => console.log(`Failed to set times: ${e}`));
            }
        });
        let commandfile = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (commandfile) require(`./cmds/${commandfile.config.name}`)(Prefix, message, commandName, args, request, client, owner, Levels);
        else require("./else.js")(Prefix, message, commandName, args, request, client);
    }
    catch (e) {
        client.error(e);
    }
});

if (!config.Token) {
    client.login(config.GITHUB);
} else {
    client.login(config.Token);
}