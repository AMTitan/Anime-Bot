module.exports = function(Prefix, message) {
	var cmds = require("../cmds.json");
	cmds = JSON.stringify(cmds);
	cmds = cmds.replaceAll("${Prefix}", Prefix);
	cmds = JSON.parse(cmds);
	const Embed = {
		color: '#00ff00',
		title: `Help - Other`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: cmds.other,
		image: {
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	const Embedtwo = {
		color: '#00ff00',
		title: `Help - Auto`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: cmds.auto,
		image: {
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	const Embedthree = {
		color: '#00ff00',
		title: `Help - Nsfw (channel has to be marked nsfw)`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: cmds.nsfw,
		image: {
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	const Embedfive= {
		color: '#00ff00',
		title: `Help - Nsfw (channel has to be marked nsfw)`,
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: ``,
		thumbnail: "",
		fields: cmds.sfw,
		image: {
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	const Embedfour = {
		color: '#00ff00',
		title: `I have dm you the help!`,
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
			url: ""
		},
		fimestamp: new Date(),
		footer: {
			test: '',
			icon_url: "",
		},
	}

	message.channel.send({
		embed: Embedfour
	})

	message.author.send({
		embed: Embed
	})
	.catch(() => message.channel.send({
		embed: Embed
	}));

	message.author.send({
		embed: Embedtwo
	})
	.catch(() => message.channel.send({
		embed: Embedtwo
	}));

	message.author.send({
		embed: Embedthree
	})

	message.author.send({
		embed: Embedfive
	})
	.catch(() => message.channel.send({
		embed: Embedthree
	}));
}