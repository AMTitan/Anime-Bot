module.exports = function(Prefix, message, commandName, args, request, client) {
	if (message.channel.nsfw === true || message.guild === null) {
		request(`https://waifu.pics/api/boobs`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'boobs nsfw',
					url: "",
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