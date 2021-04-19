var request = require('request');
require("dotenv").config();
const { Client } = require('discord.js');
const client = new Client();
const Prefix = "!A";
fs = require('fs');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
/*
request(`https://animechan.vercel.app/api/random`, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
  		var jsonParsed = JSON.parse(body);
  		console.log(jsonParsed);
  	}
});
*/
client.on('ready', () => {
  console.log(`${client.user.tag} bot is on`);
   client.user.setActivity(`${Prefix}help`, { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
})
client.on('message', (message) => {
  if (message.author.bot === true) return;
  if (!message.content.startsWith(Prefix)) return;
	console.log(`[${message.author.tag}]: ${message.content}`);
	const [commandName, ...args] = message.content
		.trim()
		.substring(Prefix.length)
		.split(/\s+/);
  if (commandName === `help`) {
    const Embed = {
		color: '#0099ff',
		title: `Help`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: [
			{ name: `${Prefix}whatis {link to a img of a anime}`, value: "tries to find what anime it was in" },
			{ name: `${Prefix}quote`, value: "shows a random anime quote" },
		],
		image: {
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	message.channel.send({ embed: Embed });
  }
  if (commandName === `whatis`) {
  	if (!args[0]) {message.channel.send('add a img to the end of the cmd'); return};
    request(`https://trace.moe/api/search?url=${args[0]}`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var jsonParsed = JSON.parse(body);
	  		if (jsonParsed.docs[0].season === '') {
	  			jsonParsed.docs[0].season = '0';
	  		}
	    	console.log(jsonParsed.docs[0]);
	    	const Embed = {
				color: '#0099ff',
				title: jsonParsed.docs[0].anime,
				url: args[0],
				author: {
					Name: 'AnimeBot',
					icon_url: args[0],
					url: 'https://discord.js.org',
				},
				description: `${Math.round((jsonParsed.docs[0].similarity) * 100)}% confident`,
				thumbnail: args[0],
				fields: [
					{ name: 'Season', value: jsonParsed.docs[0].season, inline: true },
					{ name: 'Episode', value: jsonParsed.docs[0].episode, inline: true },
					{ name: 'is an adult film', value: jsonParsed.docs[0].is_adult, inline: true },
					{ name: 'Image shown', value: `${Math.round(jsonParsed.docs[0].from)} secs in`, inline: true },
				],
				image: {
					url: args[0],
				},
				fimestamp: new Date(),
				footer: {
					test: 'Some footer text here',
					icon_url: args[0],
				},
			}

			message.channel.send({ embed: Embed });
	  	} 
  	})
  }
  if (commandName === 'quote') {
  	request(`https://animechan.vercel.app/api/random`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var jsonParsed = JSON.parse(body);
	    	const Embed = {
				color: '#0099ff',
				title: `Random Quote`,
				url: "",
				author: {
					Name: 'AnimeBot',
					icon_url: "",
					url: '',
				},
				description: ``,
				thumbnail: "",
				fields: [
					{ name: 'Anime', value: jsonParsed.anime, inline: true },
					{ name: 'Character', value: jsonParsed.character, inline: true },
					{ name: 'Quote', value: jsonParsed.quote},
				],
				image: {
					url: ""
				},
				fimestamp: new Date(),
				footer: {
					test: '',
					icon_url: "",
				},
			}

			message.channel.send({ embed: Embed });
	  	} 
  	})
  }
});

client.login(process.env.Token);
