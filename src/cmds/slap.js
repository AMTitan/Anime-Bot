module.exports = function(Prefix, message, commandName, args, request, client) {
	request(`https://api.nekos.dev/api/v3/images/sfw/gif/slap/`, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var jsonParsed = JSON.parse(body);
			var title = "poke";
			if (message.mentions.users && message.mentions.users.first()) title = `${message.author.username} pokes ${message.mentions.users.first().username}`;
			const Embed = {
				color: '#00ff00',
				title: title,
				url: "",
				author: {
					Name: 'AnimeBot',
					icon_url: jsonParsed.data.response.url,
					url: '',
				},
				description: ``,
				thumbnail: jsonParsed.data.response.url,
				fields: [],
				image: {
					url: jsonParsed.data.response.url,
				},
				fimestamp: new Date(),
				footer: {
					test: 'Some footer text here',
					icon_url: jsonParsed.data.response.url,
				},
			}

			message.channel.send({
				embed: Embed
			});
		}
	})
}