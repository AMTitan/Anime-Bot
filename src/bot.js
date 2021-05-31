var request = require('request');
require("dotenv").config();
const owner = "585604715128291328";
const fs = require("fs");
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

client.on('message', (message) => {
	if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("SEND_MESSAGES")) return;
	if (message.author.bot === true) return;
	if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) {
		message.channel.send("Sorry I cant send embeds");
	}
	if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("EMBED_LINKS")) return;
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
	if (commandName === `help`) require("./cmds/help.js")(Prefix, message);
	else if (commandName.toLowerCase() === `whatis`) require("./cmds/whatis.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'quote') require("./cmds/quote.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'neko') require("./cmds/neko.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'fox') require("./cmds/fox.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'random') require("./cmds/random.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'wallpaper') require("./cmds/wallpaper.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'nsfw') require("./cmds/nsfw.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'whatisnsfw') require("./cmds/whatisnsfw.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'quotequestions') require("./cmds/quotequestions.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === `waifuquestions`) require("./cmds/waifuquestions.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'waifu') require("./cmds/waifu.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'fact') require("./cmds/fact.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autonsfw') require("./cmds/autonsfw.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autonekonsfw') require("./cmds/autonekonsfw.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autoblowjob') require("./cmds/autoblowjob.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autoneko') require("./cmds/autoneko.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autoawoo') require("./cmds/autoawoo.js")(Prefix, message, commandName, args, request, client);
	else if (commandName.toLowerCase() === 'autowaifu') require("./cmds/autowaifu.js")(Prefix, message, commandName, args, request, client);
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
	else if (commandName.toLowerCase() === 'automaid') require("./cmds/automaid.js")(Prefix, message, commandName, args, request, client);
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
	else require("./cmds/else.js")(Prefix, message, commandName, args, request, client);
});

if (!process.env.Token) {
	client.login(process.env.GITHUB);
} else {
	client.login(process.env.Token);
}