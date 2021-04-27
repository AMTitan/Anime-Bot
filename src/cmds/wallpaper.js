module.exports = function(Prefix, message, CommandName, args, request) {
	if (args[0] && args[0].toLowerCase() === "nsfw") {
		if (message.channel.nsfw === true || message.guild === null) {
			request(`https://akaneko-api.herokuapp.com/api/nsfwwallpapers`, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonParsed = JSON.parse(body);
					const Embed = {
						color: '#00ff00',
						title: 'wallpaper nsfw',
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
			message.channel.send("sorry but the channel is not marked as nsfw");
		}
	}else {
		request(`https://akaneko-api.herokuapp.com/api/wallpapers`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: 'wallpaer',
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
	}
}