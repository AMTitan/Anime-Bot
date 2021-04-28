module.exports = function(Prefix, message) {
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
		fields: [{
			name: `EXAMPLE`,
			value: `${Prefix}neko [optinal nsfw]`
		}, {
			name: `${Prefix}awoo`,
			value: "gets you a awoo gif or img"
		}, {
			name: `${Prefix}blush [optinal @ person]`,
			value: "gets you a blush gif or img"
		}, {
			name: `${Prefix}cuddle [optinal @ person]`,
			value: "gets you a cuddle gif or img"
		}, {
			name: `${Prefix}fact`,
			value: "gets you a anime fact"
		}, {
			name: `${Prefix}fox [optinal nsfw]`,
			value: "shows a random foxgirl img"
		}, {
			name: `${Prefix}hug [optinal @ person]`,
			value: "gets you a hug gif or img"
		}, {
			name: `${Prefix}invite`,
			value: "gets you the invite to invite the bot to your server"
		}, {
			name: `${Prefix}kiss [optinal @ person]`,
			value: "gets you a kiss gif or img"
		}, {
			name: `${Prefix}neko [optinal nsfw]`,
			value: "shows a random neko img or gif"
		}, {
			name: `${Prefix}pat [optinal @ person]`,
			value: "gets you a pat gif or img"
		}, {
			name: `${Prefix}poke [optinal @ person]`,
			value: "gets you a poke gif"
		}, {
			name: `${Prefix}quote`,
			value: "shows a random anime quote"
		}, {
			name: `${Prefix}quotequestions`,
			value: "guess who said a quote"
		}, {
			name: `${Prefix}random [optinal gif]`,
			value: "shows a random anime img"
		}, {
			name: `${Prefix}search gif [tags (you can do more than one) example : "${Prefix}search gif zero two"]`,
			value: "gets you a custom gif"
		}, {
			name: `${Prefix}server`,
			value: "gets you the main anime bot server"
		}, {
			name: `${Prefix}show`,
			value: "gets you a random "
		}, {
			name: `${Prefix}stats`,
			value: "gets you the bot stats"
		}, {
			name: `${Prefix}stop`,
			value: "stops a auto anything but you have to be the msg author or able to delete msges"
		}, {
			name: `${Prefix}waifu`,
			value: "gets you a waifu"
		}, {
			name: `${Prefix}waifuquestions`,
			value: "guess the waifu you get"
		}, {
			name: `${Prefix}wallpaper [optinal nsfw]`,
			value: "shows a random anime wallpaper (just a random one from the first 25 hot on the subreddit)"
		}, {
			name: `${Prefix}whatis {link to a img of a anime}`,
			value: "tries to find what anime it was in"
		},],
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
		fields: [{
			name: `EXAMPLE`,
			value: `${Prefix}autonekonsfw`
		},  {
			name: `${Prefix}autoawoo (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose awoo a set number of times"
		},  {
			name: `${Prefix}autoblowjob (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose awoo a set number of times"
		},  {
			name: `${Prefix}automaid (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose maid a set number of times"
		},  {
			name: `${Prefix}autoneko (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose neko a set number of times"
		},   {
			name: `${Prefix}autonekonsfw (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose neko nsfw a set number of times"
		},  {
			name: `${Prefix}autonsfw (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose nsfw a set number of times"
		},  {
			name: `${Prefix}autowaifu (number of times to run nsfw - default 10) (delay in secs - defualt 5)`,
			value: "dose waifu a set number of times"
		},],
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
		fields: [ {
			name: `EXAMPLE`,
			value: `${Prefix}panties nsfw`
		},{
			name: `${Prefix}anal`,
			value: `gets you a anal gif`
		},  {
			name: `${Prefix}ass`,
			value: "gets you a ass img"
		},  {
			name: `${Prefix}bdsm`,
			value: "gets you a bdsm (you like it or you dont) gif"
		}, {
			name: `${Prefix}blowjob`,
			value: "gets you a blowjob gif"
		}, {
			name: `${Prefix}cumslut`,
			value: "gets you a cumslut gif"
		}, {
			name: `${Prefix}feet`,
			value: "gets you a feet img"
		}, {
			name: `${Prefix}femdom`,
			value: "gets you a female dominance img"
		}, {
			name: `${Prefix}gif`,
			value: "gets you a nsfw gif!"
		}, {
			name: `${Prefix}glasses`,
			value: "gets you a glasses img"
		}, {
			name: `${Prefix}maid`,
			value: "gets you a maid img"
		}, {
			name: `${Prefix}masturbation`,
			value: "gets you a masturbation img"
		}, {
			name: `${Prefix}nsfw`,
			value: "shows random nsfw anime img"
		}, {
			name: `${Prefix}orgy`,
			value: "gets you a orgy (group) img"
		}, {
			name: `${Prefix}panties`,
			value: "gets you a panties img"
		}, {
			name: `${Prefix}pussy [optinal gif]`,
			value: "gets you a pussy img"
		}, {
			name: `${Prefix}school`,
			value: "gets you a school girl img"
		}, {
			name: `${Prefix}search img [tags (you can do more than one) example : "${Prefix}search img school_girl"]`,
			value: "gets you a custom image"
		}, {
			name: `${Prefix}tentacle`,
			value: "gets you a tentacle img"
		}, {
			name: `${Prefix}thighs`,
			value: "gets you a thighs img"
		}, {
			name: `${Prefix}uniform`,
			value: "gets you a uniform img"
		}, {
			name: `${Prefix}whatisnsfw`,
			value: "runs nsfw then dose a whatis on it (gets a random hentai)"
		}, {
			name: `${Prefix}yuri`,
			value: "gets you a girl on girl"
		},],
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
	});

	message.author.send({
		embed: Embedtwo
	})
	.catch(() => message.channel.send({
		embed: Embedtwo
	});

	message.author.send({
		embed: Embedthree
	})
	.catch(() => message.channel.send({
		embed: Embedthree
	});
}