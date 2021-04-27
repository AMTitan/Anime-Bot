module.exports = function(Prefix, message, commandName, args, request, client) {
	if (message.channel.nsfw === true || message.guild === null) {
		request('https://waifu.pics/api/nsfw/waifu', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: "NSFW",
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
}