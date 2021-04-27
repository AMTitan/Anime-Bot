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
	if (message.channel.nsfw === true || message.guild === null) {
		request('https://waifu.pics/api/nsfw/waifu', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var jsonParsed1 = JSON.parse(body);
				request(`https://trace.moe/api/search?url=${jsonParsed1.url}`, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						var jsonParsed = JSON.parse(body);
						if (jsonParsed.docs[0].season === '') {
							jsonParsed.docs[0].season = '0';
						}
						const Embed = {
							color: '#00ff00',
							title: jsonParsed.docs[0].anime,
							url: `https://duckduckgo.com/?q=${jsonParsed.docs[0].anime.split(" ").join("+")}`,
							author: {
								Name: 'AnimeBot',
								icon_url: jsonParsed1.url,
								url: '',
							},
							description: `${Math.round((jsonParsed.docs[0].similarity) * 100)}% confident`,
							thumbnail: jsonParsed1.url,
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
								url: jsonParsed1.url,
							},
							fimestamp: new Date(),
							footer: {
								test: 'Some footer text here',
								icon_url: jsonParsed1.url,
							},
						}

						message.channel.send({
							embed: Embed
						});
					}
				})
			}
		})
	} else {
		message.channel.send("sorry but the channel is not marked as nsfw");
	}
}