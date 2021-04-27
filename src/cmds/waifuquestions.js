module.exports = function(Prefix, message, CommandName, args, request) {
	const Embed = {
		color: '#00ff00',
		title: `I am so sorry this command is not working at this time`,
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
		embed: Embed
	});
	return;
	const options = {
		method: 'GET',
		url: 'https://animu.p.rapidapi.com/waifus',
		headers: {
			'x-rapidapi-key': 'f51fa7a829msh002a66b9e9ebd76p1e3400jsn4c71c0617a59',
			'x-rapidapi-host': 'animu.p.rapidapi.com',
			useQueryString: true
		}
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);
		var jsonParsed = JSON.parse(body);
		console.log(jsonParsed);
		const Embed = {
			color: '#00ff00',
			title: `Guess the waifu`,
			url: "",
			author: {
				Name: 'AnimeBot',
				icon_url: jsonParsed.images[0],
				url: '',
			},
			description: ``,
			thumbnail: args[0],
			fields: [{
				name: 'From',
				value: jsonParsed.from.name,
				inline: true
			}, {
				name: 'Type',
				value: jsonParsed.from.type,
				inline: true
			}, ],
			image: {
				url: jsonParsed.images[0],
			},
			fimestamp: new Date(),
			footer: {
				test: 'Some footer text here',
				icon_url: jsonParsed.images[0],
			},
		}

		const filter = (n) => n.author.id === message.author.id;
		message.channel.send({
			embed: Embed
		});

		message.channel.awaitMessages(filter, {
				max: 1,
				time: 60000,
				errors: ['Line']
			})
			.then((collected) => {
				const msg = collected.first().content;
				if (msg.toLowerCase() === jsonParsed.names.en.toLowerCase()) {
					const Embed = {
						color: '#00ff00',
						title: `You are right`,
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
						embed: Embed
					});
				} else {
					const Embed = {
						color: '#00ff00',
						title: `That is not right it was ` + jsonParsed.names.en,
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
						embed: Embed
					});
				}
			})
			.catch((err) => {
				const Embed = {
					color: '#00ff00',
					title: `You know you have to respond right? Welp it was ` + jsonParsed.names.en,
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
					embed: Embed
				});
			});

	})
}