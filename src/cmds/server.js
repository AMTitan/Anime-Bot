module.exports = function(Prefix, message, commandName, args, request, client) {
	const Embed = {
		color: '#00ff00',
		title: 'Server link (click me)',
		url: "https://discord.gg/sJnVmPZB7Y",
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