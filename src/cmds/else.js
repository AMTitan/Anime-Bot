module.exports = function(Prefix, message, commandName, args, request, client) {
	console.log(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${commandName + " " + args.join(" ")}&json=1`);
	if (message.channel.nsfw === true || message.guild === null) {
		request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${commandName + " " + args.join(" ")}&json=1`, function(error, response, body) {
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
						description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search img ${commandName} ${args.join(" ")}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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
						description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search img ${commandName} ${args.join(" ")}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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
						description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search img ${commandName} ${args.join(" ")}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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
				jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length-1))];
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
						description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search img ${commandName} ${args.join(" ")}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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
					title: `${commandName + " " + args.join(", ")} img`,
					url: "",
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.file_url,
						url: '',
					},
					description: `If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" +` But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName} ${args.join(" ")}` + "`",
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
			description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search img ${commandName} ${args.join(" ")}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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