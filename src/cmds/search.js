module.exports = function(Prefix, message, commandName, args, request, client) {
	if (message.channel.nsfw === true || message.guild === null) {
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
				if (!jsonParsed) {
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
				jsonParsed = jsonParsed[Math.round(Math.random() * jsonParsed.length)];
				if (!jsonParsed.file_url) {
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
		message.channel.send("sorry but the channel is not marked as nsfw");
	}
}