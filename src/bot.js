const fs = require("fs");

// See if .env file exists
try {
    if (fs.existsSync('.env')) {
        console.log("The file exists dont need to make it.");
    } else {
        console.log('The file does not exist so trying to make it.');
        fs.writeFileSync('.env', "Token=(discord bot token)\ntop=(top.gg token)\nbotlist=(discordbotlist token)\nmongodb=(something like mongodb+srv://<username>:<password>@<stuff>)", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
        console.log(".env file made");
        console.log("\nUse any file editor you want and edit the file called \".env\" and replace the brackets")
        process.exit(1);
    }
} catch (err) {
    console.error(err);
}

const request = require('request');
require("dotenv").config();
const owner = "585604715128291328";
const Levels = require("discord-xp");
Levels.setURL(process.env.mongodb);
const mongoose = require("mongoose");

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

const Usage = mongoose.model('Usage', UsageSchema);
mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const {
    Client
} = require('discord.js');
const client = new Client();
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
        topgg: process.env.top,
        discordbotlist: process.env.botlist,
    },
    clientLibrary: 'discord.js'
})

poster.startInterval();

setInterval(function() {
    client.user.setActivity(`${Prefix}help`, {
        type: 'WATCHING'
    }).catch(console.error);
}, 1 * 6e5);

client.on('message', (message) => {
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
                        fimestamp: new Date(),
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
    if (message.mentions.users && message.mentions.users.first()) {
        if (message.mentions.users.first().id === client.user.id) {
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
                fimestamp: new Date(),
                footer: {
                    test: '',
                    icon_url: "",
                },
            }
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
            fimestamp: new Date(),
            footer: {
                test: '',
                icon_url: "",
            },
        }
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
    if (commandName === `help` || commandName === "commands") require("./cmds/help.js")(Prefix, message);
    else if (commandName.toLowerCase() === 'quote') require("./cmds/quote.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'neko') require("./cmds/neko.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'fox') require("./cmds/fox.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'random') require("./cmds/random.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'wallpaper') require("./cmds/wallpaper.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'nsfw' || commandName.toLowerCase() === 'hentai') require("./cmds/nsfw.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'quotequestions') require("./cmds/quotequestions.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'waifu') require("./cmds/waifu.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'blowjob') require("./cmds/blowjob.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'gif') require("./cmds/gif.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'uniform') require("./cmds/uniform.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'school' || commandName.toLowerCase() === 'schoolgirl') require("./cmds/school.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'femdom') require("./cmds/femdom.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'panties') require("./cmds/panties.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'maid') require("./cmds/maid.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'ass') require("./cmds/ass.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'cumslut') require("./cmds/cumslut.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'pussy') require("./cmds/pussy.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'bdsm') require("./cmds/bdsm.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'orgy') require("./cmds/orgy.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'feet') require("./cmds/feet.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'glasses') require("./cmds/glasses.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'thighs') require("./cmds/thighs.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'tentacle') require("./cmds/tentacle.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'masturbation') require("./cmds/masturbation.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'yuri') require("./cmds/yuri.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'anal') require("./cmds/anal.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'search') require("./cmds/search.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'poke') require("./cmds/poke.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'pat') require("./cmds/pat.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'cuddle' && commandName.toLowerCase() === 'cuddles') require("./cmds/cuddle.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'kill') require("./cmds/kill.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'hug') require("./cmds/hug.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'kiss') require("./cmds/kiss.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'lick') require("./cmds/lick.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'blush') require("./cmds/blush.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'awoo') require("./cmds/awoo.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'stats') require("./cmds/stats.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'show') require("./cmds/show.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'invite') require("./cmds/invite.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'server') require("./cmds/server.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'issue' || commandName.toLowerCase() === 'improve') require("./cmds/dm.js")(Prefix, message, commandName, args, request, client, owner);
    else if (commandName.toLowerCase() === "stop") return;
    else if (commandName.toLowerCase() === 'boobs') require("./cmds/boobs.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'spank') require("./cmds/spank.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'solo') require("./cmds/solo.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'baka') require("./cmds/baka.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'yaoi') require("./cmds/yaoi.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'donate') require("./cmds/donate.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'meme' || commandName.toLowerCase() === 'memes') require("./cmds/meme.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'dm' && message.author.id === owner) require("./cmds/dm.js")(Prefix, message, commandName, args, request, client, owner);
    else if (commandName.toLowerCase() === 'dance') require("./cmds/dance.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'cry') require("./cmds/cry.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'smile') require("./cmds/smile.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'highfive') require("./cmds/highfive.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'cum') require("./cmds/cum.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'ero') require("./cmds/ero.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'erofeet') require("./cmds/erofeet.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'erok') require("./cmds/erok.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'hololewd') require("./cmds/hololewd.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'keta') require("./cmds/keta.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'feetjob' || commandName.toLowerCase() === 'feetjob') require("./cmds/feetjob.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'eroyuri') require("./cmds/eroyuri.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'kuni') require("./cmds/kuni.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'tits') require("./cmds/tits.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'lewdkemo') require("./cmds/lewdkemo.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'kemonomimi') require("./cmds/kemonomimi.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'trap') require("./cmds/trap.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'holoero') require("./cmds/holoero.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'futanari') require("./cmds/futanari.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'eron') require("./cmds/eron.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'yiff') require("./cmds/yiff.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'feed') require("./cmds/feed.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'ahegaoavatar') require("./cmds/ahegao_avatar.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'cosplay') require("./cmds/cosplay.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'pantyhose') require("./cmds/pantyhose.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'eropantyhose') require("./cmds/eropantyhose.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'smallboobs') require("./cmds/smallboobs.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'peeing') require("./cmds/peeing.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'eropiersing') require("./cmds/eropiersing.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'piersing') require("./cmds/piersing.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'slap') require("./cmds/slap.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'nhentai') require("./cmds/nhentai.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'rank') require("./cmds/rank.js")(Prefix, message, commandName, args, request, client, Levels);
    else if (commandName.toLowerCase() === 'set' && message.author.id === owner) require("./cmds/set.js")(Prefix, message, commandName, args, request, client, Levels);
    else if (commandName.toLowerCase() === 'leaderboard' || commandName.toLowerCase() === 'lb') require("./cmds/leaderboard.js")(Prefix, message, commandName, args, request, client, Levels);
    else if (commandName.toLowerCase() === 'guild' && message.author.id === owner) require("./cmds/guild.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'asktoleaveguild' && message.author.id === owner) require("./cmds/asktoleaveguild.js")(Prefix, message, commandName, args, request, client);
    else if (commandName.toLowerCase() === 'announcement' && message.author.id === owner) require("./cmds/annouce.js")(Prefix, message, commandName, args, request, client, owner);
    else require("./cmds/else.js")(Prefix, message, commandName, args, request, client);
});

if (!process.env.Token) {
    client.login(process.env.GITHUB);
} else {
    client.login(process.env.Token);
}