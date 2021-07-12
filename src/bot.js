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


const Discord = require('discord.js');
const client = new Discord.Client();
client.request = require('node-fetch');
const config = JSON.parse(fs.readFileSync("Config.json"));
client.owner = "585604715128291328";
client.Levels = require("discord-xp");
client.Levels.setURL(config.mongodb);
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

client.request(`https://raw.githubusercontent.com/ScathachGrip/Spell/main/data/tags.txt`).then(res => res.text()).then(body => {
    client.banlist = "-"+body.split("\n").join("-")+"-asian-3d-photo_(medium)+";
})

const Usage = mongoose.model('Usage', UsageSchema);
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
client.Prefix = "a!";
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.tag} bot is on`);
    client.user.setActivity(`${client.Prefix}help`, {
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
    client.user.setActivity(`${client.Prefix}help`, {
        type: 'WATCHING'
    }).catch(console.error);
}, 6e5);

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

client.error = function(err) {
    if (config.GITHUB_PERSONAL_ACCESS_TOKENS) {
        octokit.client.request('POST /repos/{client.owner}/{repo}/issues', {
            owner: config.GITUB_USERNAME,
            repo: config.GITHUB_REPO,
            title: 'Auto',
            body: err.stack.toString(),
            
        })
        console.log(err);
    }
    else {
        console.log(err);
    }
}

const types_save = {"fgo": "/nsfw/r34/?tags=fate/grand_order",
    "azur_lane": "/nsfw/r34/?tags=azur_lane",
    "genshin_impact": "/nsfw/r34/?tags=genshin_impact",
    "girls_frontline": "/nsfw/r34/?tags=girls_frontline",
    "league_of_legends": "/nsfw/r34/?tags=league_of_legends",
    "dota_2": "/nsfw/r34/?tags=dota_2",

    "scathach": "/nsfw/r34/?tags=scathach_(fate/grand_order)",
    "raikou": "/nsfw/r34/?tags=minamoto_no_raikou_(fate/grand_order)",
    "jeanne": "/nsfw/r34/?tags=jeanne_d'arc_(fate)_(all)",
    "ereshkigal": "/nsfw/r34/?tags=ereshkigal_(fate/grand_order)",
    "artoria": "/nsfw/r34/?tags=artoria_pendragon_(all)",
    "okita": "/nsfw/r34/?tags=okita_souji_(fate)_(all)",

    "kama": "/nsfw/r34/?tags=kama_(fate/grand_order)",
    "davinci": "/nsfw/r34/?tags=leonardo_da_vinci_(fate/grand_order)",
    "anastasia": "/nsfw/r34/?tags=anastasia_(fate/grand_order)",
    "saint_martha": "/nsfw/r34/?tags=saint_martha",
    "gudako": "/nsfw/r34/?tags=fujimaru_ritsuka_(female)",
    "mashu": "/nsfw/r34/?tags=mash_kyrielight",
    "abigail": "/nsfw/r34/?tags=abigail_williams_(fate/grand_order)",
    "ushiwakamaru": "/nsfw/r34/?tags=ushiwakamaru_(fate/grand_order)",
    "consort_yu": "/nsfw/r34/?tags=consort_yu_(fate)",
    "mordred": "/nsfw/r34/?tags=mordred_(fate)_(all)",
    "himiko": "/nsfw/r34/?tags=himiko_(fate)",
    "kiara": "/nsfw/r34/?tags=sesshouin_kiara",
    "xuanzang": "/nsfw/r34/?tags=xuanzang_(fate/grand_order)",
    "bb": "/nsfw/r34/?tags=bb_(fate)_(all)",
    "nero": "/nsfw/r34/?tags=nero_claudius_(fate)_(all)",

    "atago": "/nsfw/r34/?tags=atago_(azur_lane)",
    "takao": "/nsfw/r34/?tags=takao_(azur_lane)",
    "bremerton": "/nsfw/r34/?tags=bremerton_(azur_lane)",
    "st_louis": "/nsfw/r34/?tags=st._louis_(azur_lane)",
    "sirius": "/nsfw/r34/?tags=sirius_(azur_lane)",
    "belfast": "/nsfw/r34/?tags=belfast_(azur_lane)",
    "enterprise": "/nsfw/r34/?tags=enterprise_(azur_lane)",
    "taihou": "/nsfw/r34/?tags=taihou_(azur_lane)",
    "dido": "/nsfw/r34/?tags=dido_(azur_lane)",
    "hood": "/nsfw/r34/?tags=hood_(azur_lane)",
    "formidable": "/nsfw/r34/?tags=formidable_(azur_lane)",

    "jean": "/nsfw/r34/?tags=jean_gunnhildr",
    "beidou": "/nsfw/r34/?tags=beidou_(genshin_impact)",
    "mona": "/nsfw/r34/?tags=mona_(genshin_impact)",
    "lumine": "/nsfw/r34/?tags=lumine_(genshin_impact)",
    "lisa": "/nsfw/r34/?tags=lisa_(genshin_impact)",
    "keqing": "/nsfw/r34/?tags=keqing",
    "barbara": "/nsfw/r34/?tags=barbara_(genshin_impact) ",
    "klee": "/nsfw/r34/?tags=klee_(genshin_impact)",
    "amber": "/nsfw/r34/?tags=amber_(genshin_impact)",

    "thick": "/nsfw/gel/?tags=thick_thighs",
    "cum": "/nsfw/gel/?tags=cum",
    "pout": "/nsfw/gel/?tags=pout",
    "ugly_man": "/nsfw/gel/?tags=ugly_man",
    "netorare": "/nsfw/gel/?tags=netorare",
    "pregnant": "/nsfw/gel/?tags=pregnant",
    "ass": "/nsfw/gel/?tags=ass",
    "yuri": "/nsfw/gel/?tags=yuri",
    "yaoi": "/nsfw/gel/?tags=yaoi",
    "futanari": "/nsfw/gel/?tags=futanari",
    "double_penetration": "/nsfw/gel/?tags=double_penetration",
    "rape": "/nsfw/gel/?tags=rape",
    "armpits": "/nsfw/gel/?tags=armpits",
    "armpit_hair": "/nsfw/gel/?tags=armpit_hair",
    "armpit_licking": "/nsfw/gel/?tags=armpit_licking",
    "smell": "/nsfw/gel/?tags=smell",
    "pantyhose": "/nsfw/gel/?tags=pantyhose",
    "large_breasts": "/nsfw/gel/?tags=large_breasts",
    "blush": "/nsfw/gel/?tags=blush",
    "blowjob": "/nsfw/gel/?tags=blowjob",
    "masturbation": "/nsfw/gel/?tags=masturbation",
    "pervert": "/nsfw/gel/?tags=pervert",
    "pubic_hair": "/nsfw/gel/?tags=pubic_hair",
    "sweat": "/nsfw/gel/?tags=sweat",
    "footjob": "/nsfw/gel/?tags=footjob",
    "foot_licking": "/nsfw/gel/?tags=foot_licking",
    "housewife": "/nsfw/gel/?tags=housewife",
    "milf": "/nsfw/gel/?tags=milf",
    "school_uniform": "/nsfw/gel/?tags=school_uniform",
    "bikini": "/nsfw/gel/?tags=bikini",
    "cowgirl_position": "/nsfw/gel/?tags=cowgirl_position",
    "doggystyle": "/nsfw/gel/?tags=doggystyle",
    "dark_skin": "/nsfw/gel/?tags=dark_skin",
    "impregnation": "/nsfw/gel/?tags=impregnation",
    "animated": "/nsfw/gel/?tags=animated",
    "gangbang": "/nsfw/gel/?tags=gangbang",
    "clothed_sex": "/nsfw/gel/?tags=clothed_sex",
    "uncensored": "/nsfw/gel/?tags=uncensored",
    "twintails": "/nsfw/gel/?tags=twintails",
    "pussy_juice": "/nsfw/gel/?tags=pussy_juice",
    "furry": "/nsfw/gel/?tags=furry"}

client.search = async function(term) {
    const types = types_save;
    if (types[term]) {
        term = types[term].split("?tags=")[1];
    }
    var x = await client.request(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&json=1/index.php?page=dapi&s=post&q=index&tags=${client.banlist}${term}+${client.banlist}&json=1`);
    x = await x.text();
    return JSON.parse(x)[Math.round(Math.random() * (JSON.parse(x).length - 1))];
}

client.on(`GUILD_MEMBER_REMOVE`, (member) => {
    client.Levels.deleteUser(member.id, member.guild.id);
})

client.on(`GUILD_DELETE`, (guild) => {
    client.Levels.deleteGuild(guild.id);
})

client.on('message', (message) => {
    try {
        if (message.guild && !message.author.bot) {
            client.Levels.appendXp(message.author.id, message.guild.id, Math.round(message.content.length / 10) + 1).then((hasLeveledUp) => {
                if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("SEND_MESSAGES")) return;
                if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) return;
                if (hasLeveledUp) {
                    client.Levels.fetch(message.author.id, message.guild.id).then((user) => {
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
            title: `My help cmd is ${client.Prefix}help`,
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
        if (!message.content.toLowerCase().startsWith(client.Prefix.toLowerCase())) return;
        console.log(`[${new Date}]: ${message.content}`);
        var [commandName, ...args] = message.content.toLowerCase()
            .trim()
            .substring(client.Prefix.length)
            .split(/\s+/);
        if (!commandName) {
            [commandName, ...args] = message.content.toLowerCase()
                .trim()
                .substring(client.Prefix.length + 1)
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
                })
            } else {
                user.times += 1;
                user.lastUpdated = new Date;
                user.save().catch(e => console.log(`Failed to set times: ${e}`));
            }
        });
        let commandfile = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (commandfile) require(`./cmds/${commandfile.config.name}`)(message, commandName, args, client);
        else require("./else.js")(message, commandName, args, client);
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