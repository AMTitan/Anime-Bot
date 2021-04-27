module.exports = function(Prefix, message, commandName, args, request, client) {
	const Embed = {
		color: '#00ff00',
		title: `Sorry I dont know that cmd`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: `maybe do ${Prefix}help ? But if you think this was a mistake then do ${Prefix}server then join it then in rules make a issue.`,
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
}