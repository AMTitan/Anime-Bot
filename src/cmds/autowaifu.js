module.exports = function(Prefix, message, commandName, args, request, client) {
	if (parseInt(args[0]) > 86400) {
		const Embed = {
			color: '#00ff00',
			title: `I am so sorry but they bot can only do up to 86400 (24hrs)`,
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
		})
	}
	if (parseInt(args[0]) > 86400) return;
	if (!args[0]) args[0] = 3;
	if (!args[1]) args[1] = 5;
	var n = 0;
	var run = true;
	var msgSent = 0;
	const filter = message.author.id;
	for (var i = 0; i < args[0]; i++) {
		setTimeout(function(){
			if (run === false) return;
			n++;
			request(`https://api.waifu.pics/sfw/waifu`, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed = JSON.parse(body);
				const Embed = {
					color: '#00ff00',
					title: `Waifu ${n}/${args[0]}`,
					url: "",
					author: {
						Name: 'AnimeBot',
						icon_url: jsonParsed.url,
						url: '',
					},
					description: ``,
					thumbnail: jsonParsed.url,
					fields: [],
					image: {
						url: jsonParsed.url,
					},
					fimestamp: new Date(),
					footer: {
						test: 'Some footer text here',
						icon_url: jsonParsed.url,
					},
				}

				if (n === 1) {
					message.channel.send({
						embed: Embed
					}).then(id => {
						msgSent = id;
					});
				}
				else {
					msgSent.edit({
						embed: Embed
					});
				}

				client.on('message', (message1) => {
					if (run === true && (filter === message1.author.id || (message1.member && message1.member.hasPermission("MANAGE_MESSAGES"))) && message1.content.toLowerCase() === `${Prefix.toLowerCase()}stop` && message1.channel.id === message.channel.id) {
						run = false;
						return;
					}else if(message1.author.Bot === false) {
						const Embed = {
							color: '#00ff00',
							title: `Sorry you have to be the message author or the an admin`,
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

			}
		})
			
		}, args[1] * i * 1000);
	}
}