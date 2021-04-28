module.exports = function(Prefix, message, commandName, args, request, client) {
	if (args[0] === "img") {
		if (message.channel.nsfw === true || message.guild === null) {
			args.shift();
			request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${args.join(" ")}&json=1`, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var shouldIReturn = false;
					if (!body) {
						const Embed = {
							color: '#00ff00',
							title: `Sorry but I could not find a img with that tag`,
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
						var shouldIReturn = true;
					}
					if (shouldIReturn) return;
					var jsonParsed = JSON.parse(body);
					if (!jsonParsed ) {
						const Embed = {
							color: '#00ff00',
							title: `Sorry but I could not find a img with that tag`,
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
						var shouldIReturn = true;
					}
					if (jsonParsed === "undefined") {
						const Embed = {
							color: '#00ff00',
							title: `Sorry but could you just try that again?`,
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
						var shouldIReturn = true;
					}
					if (shouldIReturn) return;
					jsonParsed = jsonParsed[Math.round(Math.random() * jsonParsed.length)];
					if (!jsonParsed || !jsonParsed.file_url) {
						const Embed = {
							color: '#00ff00',
							title: `Sorry but I could not find a img with that tag`,
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
						var shouldIReturn = true;
					}
					if (shouldIReturn) return;
					const Embed = {
						color: '#00ff00',
						title: `${args.join(", ")} img`,
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: jsonParsed.file_url,
							url: '',
						},
						description: ``,
						thumbnail: jsonParsed.file_url,
						fields: [],
						image: {
							url: jsonParsed.file_url,
						},
						fimestamp: new Date(),
						footer: {
							test: 'Some footer text here',
							icon_url: jsonParsed.file_url,
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
			title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on)',
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
				url: "",
			},
			fimestamp: new Date(),
			footer: {
				test: 'Some footer text here',
				icon_url: "",
			},
		}

		message.channel.send({
			embed: Embed
		});
		}
	}else if (args[0] === "gif") {
		args.shift();
		request(`https://g.tenor.com/v1/search?q=${args.join("+")}+anime&key=LIVDSRZULELA&limit=50`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				jsonParsed = jsonParsed.results[Math.round(Math.random() * jsonParsed.results.length) - 1]
				if (!jsonParsed) return;
				if (!jsonParsed.url) jsonParsed = jsonParsed.media.gif;
				const Embed = {
					color: '#00ff00',
					title: `${args.join(" ")} gif`,
					url: "",
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.media[0].gif.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.media[0].gif.url,
					fields: [],
					image: {
						url: jsonParsed.media[0].gif.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.media[0].gif.url,
					},
				}

				message.channel.send({
					embed: Embed
				});
			}
		})
	}else {
		const Embed = {
			color: '#00ff00',
			title: `Sorry you have to put "gif" or "img" after the ${Prefix}search (gif is only sfw tho) EXAMPLE: "${Prefix}search gif zero two"`,
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
				url: "",
			},
			fimestamp: new Date(),
			footer: {
				test: 'Some footer text here',
				icon_url: "",
			},
		}

		message.channel.send({
			embed: Embed
		});
	}
}