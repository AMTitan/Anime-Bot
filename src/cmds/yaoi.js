module.exports = function(Prefix, message, commandName, args, request, client) {
	if (message.channel.nsfw === true || message.guild === null) {
		request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=yaoi&json=1`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length-1))];
				const Embed = {
					color: '#00ff00',
					title: 'yaoi nsfw',
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
}