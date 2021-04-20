var request = require('request');
require("dotenv").config();
const { Client } = require('discord.js');
const client = new Client();
const Prefix = "A!";
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
  if (!message.content.toLowerCase().startsWith(Prefix.toLowerCase())) return;
  console.log(`[${message.author.tag}]: ${message.content}`);
	const [commandName, ...args] = message.content
		.trim()
		.substring(Prefix.length)
		.split(/\s+/);
  if (commandName === `help`) {
    const Embed = {
		color: '#00ff00',
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
			{ name: `${Prefix}neko`, value: "shows a random neko img" },
			{ name: `${Prefix}random`, value: "shows a random anime img" },
			{ name: `${Prefix}wallpaper`, value: "shows a random anime wallpaper (just a random one from the first 25 hot on the subreddit)" },
			{ name: `${Prefix}nsfw`, value: "shows random nsfw anime img (only in nsfw marked channels)" },
			{ name: `${Prefix}whatisnsfw`, value: "runs nsfw then dose a whatis on it (gets a random hentai)" },
			{ name: `${Prefix}quotequestions`, value: "guess who said a quote" },
			{ name: `${Prefix}waifu`, value: "gets you a waifu" },
			{ name: `${Prefix}whatiswaifu`, value: "guess the waifu you get" },
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
  }else if (commandName.toLowerCase() === `whatis`) {
  	if (!args[0]) {message.channel.send('add a img to the end of the cmd'); return};
    request(`https://trace.moe/api/search?url=${args[0]}`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var jsonParsed = JSON.parse(body);
	  		if (jsonParsed.docs[0].season === '') {
	  			jsonParsed.docs[0].season = '0';
	  		}
	    	const Embed = {
				color: '#00ff00',
				title: jsonParsed.docs[0].anime,
				url: `https://duckduckgo.com/?q=${jsonParsed.docs[0].anime.replaceAll(" ", "+")}`,
				author: {
					Name: 'AnimeBot',
					icon_url: args[0],
					url: '',
				},
				description: `${Math.round((jsonParsed.docs[0].similarity) * 100)}% confident`,
				thumbnail: args[0],
				fields: [
					{ name: 'Season', value: jsonParsed.docs[0].season, inline: true },
					{ name: 'Episode', value: jsonParsed.docs[0].episode, inline: true },
					{ name: 'hentai', value: jsonParsed.docs[0].is_adult, inline: true },
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
  }else if (commandName.toLowerCase() === 'quote') {
  	request(`https://animechan.vercel.app/api/random`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var jsonParsed = JSON.parse(body);
	    	const Embed = {
				color: '#00ff00',
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
  }else if (commandName.toLowerCase() === 'neko') {
  	request(`https://neko-love.xyz/api/v1/neko`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		var jsonParsed = JSON.parse(body);
	    	const Embed = {
				color: '#00ff00',
				title: `Neko`,
				url: jsonParsed.url.replaceAll(" ", "+"),
				author: {
					Name: 'AnimeBot',
					icon_url: "",
					url: "",
				},
				description: ``,
				thumbnail: "",
				fields: [
				],
				image: {
					url: jsonParsed.url
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
  }else if (commandName.toLowerCase() === 'random') {
  	  	let array = ["pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch"];
  	  	var item = array[Math.floor(Math.random() * array.length)];
	  	request(`https://neko-love.xyz/api/v1/${item}`, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var jsonParsed = JSON.parse(body);
		    	const Embed = {
					color: '#00ff00',
					title: `Random Anime Img`,
					url: jsonParsed.url.replaceAll(" ", "+"),
					author: {
						Name: 'AnimeBot',
						icon_url: "",
						url: "",
					},
					description: ``,
					thumbnail: "",
					fields: [
					],
					image: {
						url: jsonParsed.url
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
  	}else if (commandName.toLowerCase() === 'wallpaper') {
  		var aRandomNum = Math.floor((Math.random() * 24) + 2);
  	  	request('http://www.reddit.com/r/Animewallpaper.json?json', function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var jsonParsed = JSON.parse(body);
		  		console.log(jsonParsed.data.children[aRandomNum].data);
		    	const Embed = {
					color: '#00ff00',
					title: jsonParsed.data.children[aRandomNum].data.title,
					url: jsonParsed.data.children[aRandomNum].data.url.replaceAll(" ", "+"),
					author: {
						Name: 'AnimeBot',
						icon_url: "",
						url: "",
					},
					description: ``,
					thumbnail: "",
					fields: [
					],
					image: {
						url: jsonParsed.data.children[aRandomNum].data.url_overridden_by_dest
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
  	}else if (commandName.toLowerCase() === 'nsfw') {
  		if (message.channel.nsfw === true || message.guild === null) {
	  	  	request('https://crunchy-bot.live/api/nsfw/hentai?tag={}', function (error, response, body) {
			  	if (!error && response.statusCode == 200) {
			  		var jsonParsed = JSON.parse(body);
			    	const Embed = {
						color: '#00ff00',
						title: "NSFW",
						url: jsonParsed.url,
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [
						],
						image: {
							url: jsonParsed.url
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
  	  	else {
  	  		message.channel.send("sorry but the channel is not marked as nsfw");
  	  	}
  	}else if (commandName.toLowerCase() === 'whatisnsfw') {
  		if (message.channel.nsfw === true || message.guild === null) {
		    request('https://crunchy-bot.live/api/nsfw/hentai?tag={}', function (error, response, body) {
			  	if (!error && response.statusCode == 200) {
			  		var jsonParsed1 = JSON.parse(body);
				    request(`https://trace.moe/api/search?url=${jsonParsed1.url}`, function (error, response, body) {
					  	if (!error && response.statusCode == 200) {
					  		var jsonParsed = JSON.parse(body);
					  		if (jsonParsed.docs[0].season === '') {
					  			jsonParsed.docs[0].season = '0';
					  		}
					    	const Embed = {
								color: '#00ff00',
								title: jsonParsed.docs[0].anime,
								url: `https://duckduckgo.com/?q=${jsonParsed.docs[0].anime.replaceAll(" ", "+")}`,
								author: {
									Name: 'AnimeBot',
									icon_url: jsonParsed1.url,
									url: '',
								},
								description: `${Math.round((jsonParsed.docs[0].similarity) * 100)}% confident`,
								thumbnail: jsonParsed1.url,
								fields: [
									{ name: 'Season', value: jsonParsed.docs[0].season, inline: true },
									{ name: 'Episode', value: jsonParsed.docs[0].episode, inline: true },
									{ name: 'hentai', value: jsonParsed.docs[0].is_adult, inline: true },
									{ name: 'Image shown', value: `${Math.round(jsonParsed.docs[0].from)} secs in`, inline: true },
								],
								image: {
									url: jsonParsed1.url,
								},
								fimestamp: new Date(),
								footer: {
									test: 'Some footer text here',
									icon_url: jsonParsed1.url,
								},
							}

							message.channel.send({ embed: Embed });
					  	} 
				  	})
				}
			})
		}
		else {
  	  		message.channel.send("sorry but the channel is not marked as nsfw");
  	  	}
  	}else if (commandName.toLowerCase() === 'quotequestions') {
  		var jsonParsed;
  		const filter = (n) => n.author.id === message.author.id;
  		request(`https://animechan.vercel.app/api/random`, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		jsonParsed = JSON.parse(body);
	    	const Embed = {
				color: '#00ff00',
				title: `Guess Who Said This`,
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
	  	console.log(jsonParsed.character);
	  	message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['Line']})
			.then((collected) => {
				const msg = collected.first().content;
				if (msg.toLowerCase() === jsonParsed.character.toLowerCase()) {
					const Embed = {
						color: '#00ff00',
						title: `You are right`,
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [
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
				else {
					const Embed = {
						color: '#00ff00',
						title: `That is not right it was `+ jsonParsed.character,
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [
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
				.catch((err) =>  { 
					const Embed = {
						color: '#00ff00',
						title: `You know you have to respond right? Welp it was `+ jsonParsed.character,
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [
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
				});

  		})
  	}else if (commandName.toLowerCase() === `whatiswaifu`) {
    	const options = {
		  method: 'GET',
		  url: 'https://animu.p.rapidapi.com/waifus',
		  headers: {
		    'x-rapidapi-key': 'f51fa7a829msh002a66b9e9ebd76p1e3400jsn4c71c0617a59',
		    'x-rapidapi-host': 'animu.p.rapidapi.com',
		    useQueryString: true
		  }
		};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			var jsonParsed = JSON.parse(body);
			const Embed = {
				color: '#00ff00',
				title: `Guess the waifu`,
				url: "",
				author: {
					Name: 'AnimeBot',
					icon_url: jsonParsed.images[0],
					url: '',
				},
				description: ``,
				thumbnail: args[0],
				fields: [
					{ name: 'From', value: jsonParsed.from.name, inline: true },
					{ name: 'Type', value: jsonParsed.from.type, inline: true },
				],
				image: {
					url: jsonParsed.images[0],
				},
				fimestamp: new Date(),
				footer: {
					test: 'Some footer text here',
					icon_url: jsonParsed.images[0],
				},
			}

			const filter = (n) => n.author.id === message.author.id;
			message.channel.send({ embed: Embed });

			message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['Line']})
				.then((collected) => {
					const msg = collected.first().content;
					if (msg.toLowerCase() === jsonParsed.names.en.toLowerCase()) {
						const Embed = {
							color: '#00ff00',
							title: `You are right`,
							url: "",
							author: {
								Name: 'AnimeBot',
								icon_url: "",
								url: '',
							},
							description: ``,
							thumbnail: "",
							fields: [
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
					else {
						const Embed = {
							color: '#00ff00',
							title: `That is not right it was `+ jsonParsed.names.en,
							url: "",
							author: {
								Name: 'AnimeBot',
								icon_url: "",
								url: '',
							},
							description: ``,
							thumbnail: "",
							fields: [
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
				.catch((err) =>  { 
					const Embed = {
						color: '#00ff00',
						title: `You know you have to respond right? Welp it was `+ jsonParsed.names.en,
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [
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
				});

	  		})
	}else if (commandName.toLowerCase() === 'waifu') {
  		request(`https://api.slushie.gg/neko/waifu`, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var jsonParsed = JSON.parse(body);
		    	const Embed = {
					color: '#00ff00',
					title: 'Waifu',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [
					],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({ embed: Embed });
		  	} 
	  	})
  	}else {
  		const Embed = {
			color: '#00ff00',
			title: `Sorry I dont know that cmd`,
			url: "",
			author: {
				Name: 'AnimeBot',
				icon_url: "",
				url: '',
			},
			description: ``,
			thumbnail: "",
			fields: [
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
});

client.login(process.env.Token);
