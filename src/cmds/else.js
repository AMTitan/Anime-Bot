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
		description: `maybe do ` + "`" + `${Prefix}help` + "`" +` or you can do ` + "`" +`${Prefix}search ${commandName}` + "`" +`? But if you really want this command you can ` + "`" +`${Prefix}improve ${commandName}` + "`",
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