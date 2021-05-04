module.exports = function(Prefix, message) {
	const Embed = {
		color: '#00ff00',
		title: `The help is located here (Click Me)`,
		url: "https://amtitan.github.io/Anime-Bot/",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
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
	})
}