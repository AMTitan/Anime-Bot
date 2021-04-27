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
	if (!args[0]) {
		message.channel.send('add a img to the end of the cmd');
		return
	};
	request(`https://trace.moe/api/search?url=${args[0]}`, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var jsonParsed = JSON.parse(body);
			if (jsonParsed.docs[0].season === '') {
				jsonParsed.docs[0].season = '0';
			}
			var name = jsonParsed.docs[0].title_english;
			if (!jsonParsed.docs[0].title_english) name = jsonParsed.docs[0].title_native;
			const Embed = {
				color: '#00ff00',
				title: name,
				url: `https://duckduckgo.com/?q=${name.split(" ").join("+")}`,
				author: {
					Name: 'AnimeBot',
					icon_url: args[0],
					url: '',
				},
				description: `${Math.round((jsonParsed.docs[0].similarity) * 100)}% confident`,
				thumbnail: args[0],
				fields: [{
					name: 'Season',
					value: jsonParsed.docs[0].season,
					inline: true
				}, {
					name: 'Episode',
					value: jsonParsed.docs[0].episode,
					inline: true
				}, {
					name: 'hentai',
					value: jsonParsed.docs[0].is_adult,
					inline: true
				}, {
					name: 'Image shown',
					value: `${Math.round(jsonParsed.docs[0].from)} secs in`,
					inline: true
				}, ],
				image: {
					url: args[0],
				},
				fimestamp: new Date(),
				footer: {
					test: 'Some footer text here',
					icon_url: args[0],
				},
			}

			message.channel.send({
				embed: Embed
			});
		}
	})
}