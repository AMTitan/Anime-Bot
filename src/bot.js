var request = require('request');
require("dotenv").config();
const {
	Client
} = require('discord.js');
const client = new Client();
const Prefix = "a!";
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
	client.user.setActivity(`${Prefix}help`, {
			type: 'WATCHING'
		})
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
			fields: [{
				name: `${Prefix}fact`,
				value: "gets you a anime fact"
			}, {
				name: `${Prefix}neko [optinal nsfw]`,
				value: "shows a random neko img"
			}, {
				name: `${Prefix}nsfw`,
				value: "shows random nsfw anime img (only in nsfw marked channels)"
			}, {
				name: `${Prefix}quote`,
				value: "shows a random anime quote"
			}, {
				name: `${Prefix}quotequestions`,
				value: "guess who said a quote"
			}, {
				name: `${Prefix}random`,
				value: "shows a random anime img"
			}, {
				name: `${Prefix}waifu [optional nsfw]`,
				value: "gets you a waifu"
			}, {
				name: `${Prefix}wallpaper`,
				value: "shows a random anime wallpaper (just a random one from the first 25 hot on the subreddit)"
			}, {
				name: `${Prefix}whatis {link to a img of a anime}`,
				value: "tries to find what anime it was in"
			}, {
				name: `${Prefix}whatisnsfw`,
				value: "runs nsfw then dose a whatis on it (gets a random hentai)"
			}, {
				name: `${Prefix}waifuquestion`,
				value: "guess the waifu you get"
			}, {
				name: `${Prefix}autonsfw (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
				value: "dose nsfw a set number of times"
			},{
				name: `${Prefix}blowjob`,
				value: "gets you a blowjob gif"
			},{
				name: `${Prefix}poke`,
				value: "gets you a poke gif"
			},{
				name: `${Prefix}pat`,
				value: "gets you a pat gif or img"
			},{
				name: `${Prefix}cuddle`,
				value: "gets you a cuddle gif or img"
			},{
				name: `${Prefix}hug`,
				value: "gets you a hug gif or img"
			},{
				name: `${Prefix}kiss`,
				value: "gets you a kiss gif or img"
			},{
				name: `${Prefix}blush`,
				value: "gets you a blush gif or img"
			},{
				name: `${Prefix}awoo`,
				value: "gets you a awoo gif or img"
			}, ],
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
	} else if (commandName.toLowerCase() === `whatis`) {
		if (!args[0]) {
			message.channel.send('add a img to the end of the cmd');
			return
		};
		request(`https://trace.moe/api/search?url=${args[0]}`, function(error, response, body) {
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
					fields: [{
						name: 'Season',
						value: jsonParsed.docs[0].season,
						inline: true
					}, {
						name: 'Episode',
						value: jsonParsed.docs[0].episode,
						inline: true
					}, {
						name: 'hentai',
						value: jsonParsed.docs[0].is_adult,
						inline: true
					}, {
						name: 'Image shown',
						value: `${Math.round(jsonParsed.docs[0].from)} secs in`,
						inline: true
					}, ],
					image: {
						url: args[0],
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: args[0],
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	} else if (commandName.toLowerCase() === 'quote') {
		request(`https://animechan.vercel.app/api/random`, function(error, response, body) {
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
					fields: [{
						name: 'Anime',
						value: jsonParsed.anime,
						inline: true
					}, {
						name: 'Character',
						value: jsonParsed.character,
						inline: true
					}, {
						name: 'Quote',
						value: jsonParsed.quote
					}, ],
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
		})
	} else if (commandName.toLowerCase() === 'neko') {
		if (args[0] && args[0].toLowerCase() === "nsfw") {
			if (message.channel.nsfw === true || message.guild === null) {
				request(`https://waifu.pics/api/nsfw/neko`, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var jsonParsed = JSON.parse(body);
						const Embed = {
							color: '#00ff00',
							title: 'Neko nsfw',
							url: jsonParsed.url,
							author: {
								Name: 'AnimeBot',
								icon_url: jsonParsed.url,
								url: '',
							},
							description: ``,
							thumbnail: jsonParsed.url,
							fields: [],
							image: {
								url: jsonParsed.url,
							},
							fimestamp: new Date(),
							footer: {
								test: 'Some footer text here',
								icon_url: jsonParsed.url,
							},
						}

						message.channel.send({
							embed: Embed
						});
					}
				})
			} else {
				message.channel.send("sorry but the channel is not marked as nsfw");
			}
		}else {
			request(`https://waifu.pics/api/sfw/neko`, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonParsed = JSON.parse(body);
					const Embed = {
						color: '#00ff00',
						title: 'Neko',
						url: jsonParsed.url,
						author: {
							Name: 'AnimeBot',
							icon_url: jsonParsed.url,
							url: '',
						},
						description: ``,
						thumbnail: jsonParsed.url,
						fields: [],
						image: {
							url: jsonParsed.url,
						},
						fimestamp: new Date(),
						footer: {
							test: 'Some footer text here',
							icon_url: jsonParsed.url,
						},
					}

					message.channel.send({
						embed: Embed
					});
				}
			})
		}
	} else if (commandName.toLowerCase() === 'random') {
		let array = ["pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch"];
		var item = array[Math.floor(Math.random() * array.length)];
		request(`https://neko-love.xyz/api/v1/${item}`, function(error, response, body) {
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
					fields: [],
					image: {
						url: jsonParsed.url
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
		})
	} else if (commandName.toLowerCase() === 'wallpaper') {
		var aRandomNum = Math.floor((Math.random() * 24) + 2);
		request('http://www.reddit.com/r/Animewallpaper.json?json', function(error, response, body) {
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
					fields: [],
					image: {
						url: jsonParsed.data.children[aRandomNum].data.url_overridden_by_dest
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
		})
	} else if (commandName.toLowerCase() === 'nsfw') {
		if (message.channel.nsfw === true || message.guild === null) {
			request('https://crunchy-bot.live/api/nsfw/hentai?tag={}', function(error, response, body) {
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
						fields: [],
						image: {
							url: jsonParsed.url
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
			})
		} else {
			message.channel.send("sorry but the channel is not marked as nsfw");
		}
	} else if (commandName.toLowerCase() === 'whatisnsfw') {
		if (message.channel.nsfw === true || message.guild === null) {
			request('https://crunchy-bot.live/api/nsfw/hentai?tag={}', function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonParsed1 = JSON.parse(body);
					request(`https://trace.moe/api/search?url=${jsonParsed1.url}`, function(error, response, body) {
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
								fields: [{
									name: 'Season',
									value: jsonParsed.docs[0].season,
									inline: true
								}, {
									name: 'Episode',
									value: jsonParsed.docs[0].episode,
									inline: true
								}, {
									name: 'hentai',
									value: jsonParsed.docs[0].is_adult,
									inline: true
								}, {
									name: 'Image shown',
									value: `${Math.round(jsonParsed.docs[0].from)} secs in`,
									inline: true
								}, ],
								image: {
									url: jsonParsed1.url,
								},
								fimestamp: new Date(),
								footer: {
									test: 'Some footer text here',
									icon_url: jsonParsed1.url,
								},
							}

							message.channel.send({
								embed: Embed
							});
						}
					})
				}
			})
		} else {
			message.channel.send("sorry but the channel is not marked as nsfw");
		}
	} else if (commandName.toLowerCase() === 'quotequestions') {
		var jsonParsed;
		const filter = (n) => n.author.id === message.author.id;
		request(`https://animechan.vercel.app/api/random`, function(error, response, body) {
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
					fields: [{
						name: 'Anime',
						value: jsonParsed.anime,
						inline: true
					}, {
						name: 'Quote',
						value: jsonParsed.quote
					}, ],
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
			console.log(jsonParsed.character);
			message.channel.awaitMessages(filter, {
					max: 1,
					time: 60000,
					errors: ['Line']
				})
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
					} else {
						const Embed = {
							color: '#00ff00',
							title: `That is not right it was ` + jsonParsed.character,
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
				})
				.catch((err) => {
					const Embed = {
						color: '#00ff00',
						title: `You know you have to respond right? Welp it was ` + jsonParsed.character,
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
				});

		})
	} else if (commandName.toLowerCase() === `waifuquestions`) {
		const options = {
			method: 'GET',
			url: 'https://animu.p.rapidapi.com/waifus',
			headers: {
				'x-rapidapi-key': 'f51fa7a829msh002a66b9e9ebd76p1e3400jsn4c71c0617a59',
				'x-rapidapi-host': 'animu.p.rapidapi.com',
				useQueryString: true
			}
		};

		request(options, function(error, response, body) {
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
				fields: [{
					name: 'From',
					value: jsonParsed.from.name,
					inline: true
				}, {
					name: 'Type',
					value: jsonParsed.from.type,
					inline: true
				}, ],
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
			message.channel.send({
				embed: Embed
			});

			message.channel.awaitMessages(filter, {
					max: 1,
					time: 60000,
					errors: ['Line']
				})
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
					} else {
						const Embed = {
							color: '#00ff00',
							title: `That is not right it was ` + jsonParsed.names.en,
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
				})
				.catch((err) => {
					const Embed = {
						color: '#00ff00',
						title: `You know you have to respond right? Welp it was ` + jsonParsed.names.en,
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
				});

		})
	} else if (commandName.toLowerCase() === 'waifu') {
		if (args[0] && args[0].toLowerCase() === "nsfw") {
			if (message.channel.nsfw === true || message.guild === null) {
				request(`https://waifu.pics/api/nsfw/waifu`, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var jsonParsed = JSON.parse(body);
						const Embed = {
							color: '#00ff00',
							title: 'Waifu nsfw',
							url: jsonParsed.url,
							author: {
								Name: 'AnimeBot',
								icon_url: jsonParsed.url,
								url: '',
							},
							description: ``,
							thumbnail: jsonParsed.url,
							fields: [],
							image: {
								url: jsonParsed.url,
							},
							fimestamp: new Date(),
							footer: {
								test: 'Some footer text here',
								icon_url: jsonParsed.url,
							},
						}

						message.channel.send({
							embed: Embed
						});
					}
				})
			} else {
				message.channel.send("sorry but the channel is not marked as nsfw");
			}
		}else {
			request(`https://waifu.pics/api/sfw/waifu`, function(error, response, body) {
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
						fields: [],
						image: {
							url: jsonParsed.url,
						},
						fimestamp: new Date(),
						footer: {
							test: 'Some footer text here',
							icon_url: jsonParsed.url,
						},
					}

					message.channel.send({
						embed: Embed
					});
				}
			})
		}
	} else if (commandName.toLowerCase() === 'fact') {
		const options = {
			method: 'GET',
			url: 'https://animu.p.rapidapi.com/fact',
			headers: {
				'x-rapidapi-key': 'f51fa7a829msh002a66b9e9ebd76p1e3400jsn4c71c0617a59',
				'x-rapidapi-host': 'animu.p.rapidapi.com',
				useQueryString: true
			}
		};

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			var jsonParsed = JSON.parse(body);
			const Embed = {
				color: '#00ff00',
				title: "",
				url: "",
				author: {
					Name: 'AnimeBot',
					icon_url: "",
					url: '',
				},
				description: ``,
				thumbnail: "",
				fields: [{
					name: 'Fact',
					value: jsonParsed.fact,
					inline: true
				}, ],
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
		});
	} else if (commandName.toLowerCase() === 'autonsfw') {
		if (!args[0]) args[0] = 3;
		if (!args[1]) args[1] = 5;
		if (message.channel.nsfw === true || message.guild === null) {
			var n = 0;
			for (i = 0; i < args[0]; i++) {
				setTimeout(function(){
					n++;
					request('https://crunchy-bot.live/api/nsfw/hentai?tag={}', function(error, response, body) {
						if (!error && response.statusCode == 200) {
							var jsonParsed = JSON.parse(body);
							const Embed = {
								color: '#00ff00',
								title: `NSFW - ${n}/${args[0]}`,
								url: jsonParsed.url,
								author: {
									Name: 'AnimeBot',
									icon_url: "",
									url: '',
								},
								description: ``,
								thumbnail: "",
								fields: [],
								image: {
									url: jsonParsed.url
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
					})
					
				}, args[1] * i * 1000);
			}
		} else {
			message.channel.send("sorry but the channel is not marked as nsfw");
		}
	} else if (commandName.toLowerCase() === 'blowjob') {
		if (message.channel.nsfw === true || message.guild === null) {
			request(`https://waifu.pics/api/nsfw/blowjob`, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonParsed = JSON.parse(body);
					const Embed = {
						color: '#00ff00',
						title: 'Blowjob nsfw',
						url: jsonParsed.url,
						author: {
							Name: 'AnimeBot',
							icon_url: jsonParsed.url,
							url: '',
						},
						description: ``,
						thumbnail: jsonParsed.url,
						fields: [],
						image: {
							url: jsonParsed.url,
						},
						fimestamp: new Date(),
						footer: {
							test: 'Some footer text here',
							icon_url: jsonParsed.url,
						},
					}

					message.channel.send({
						embed: Embed
					});
				}
			})
		} else {
			message.channel.send("sorry but the channel is not marked as nsfw");
		}
	} else if (commandName.toLowerCase() === 'poke') {
		request(`https://waifu.pics/api/sfw/poke`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Poke',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	} else if (commandName.toLowerCase() === 'pat') {
		request(`https://waifu.pics/api/sfw/pat`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Pat',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	} else if (commandName.toLowerCase() === 'cuddle') {
		request(`https://waifu.pics/api/sfw/cuddle`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Cuddle',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	}else if (commandName.toLowerCase() === 'hug') {
		request(`https://waifu.pics/api/sfw/hug`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Hug',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	}else if (commandName.toLowerCase() === 'kiss') {
		request(`https://waifu.pics/api/sfw/kiss`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Kiss',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	}else if (commandName.toLowerCase() === 'blush') {
		request(`https://waifu.pics/api/sfw/blush`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Blush',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	}else if (commandName.toLowerCase() === 'awoo') {
		request(`https://waifu.pics/api/sfw/awoo`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'Awoo',
					url: jsonParsed.url,
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	} else {
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
});

client.login(process.env.Token);