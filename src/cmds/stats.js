module.exports = function(Prefix, message, commandName, args, request, client) {
	const Embed = {
		color: '#00ff00',
		title: 'Stats',
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: [{
					name: 'Server Count',
					value: client.guilds.cache.size,
					inline: true
				}, {
					name: 'User Count',
					value: message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c),
					inline: true
				}, {
					name: 'Average Server Size',
					value: (Math.round((message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)/client.guilds.cache.size) * 100))/100,
					inline: true
				},],
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