module.exports = function(Prefix, message, commandName, args, request, client) {
	if (args[0] === "gif") {
		if (args[0] && args[0].toLowerCase() === "nsfw") {
			request(`https://nekos.life/api/v2/img/classic`, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonParsed = JSON.parse(body);
					const Embed = {
						color: '#00ff00',
						title: 'fox',
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
			title: 'sorry but the channel is not marked as nsfw',
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
	}else {
		let array = ["pat", "hug", "waifu", "cry", "kiss", "slap", "smug", "punch"];
		var item = array[Math.floor(Math.random() * array.length)];
		request(`https://neko-love.xyz/api/v1/${item}`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: `Random Anime Img`,
					url: "",
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
	}
}