module.exports = function(Prefix, message, commandName, args, request, client) {
	if (message.channel.nsfw === true || message.guild === null) {
		const NanaAPI = require("nana-api");
		const nana = new NanaAPI();
		var info;
		if (args[0] === "popular") {
			nana.popular().then((gTwo) => {
				const id = gTwo.results[Math.round(gTwo.results.length * Math.random())].id;
				nana.g(id).then(g => {
					info = g;
				})
				.then(() => {
					var n = 0;
					var msgSent = 0;
					for (var i = 0; i < info.images.pages.length; i++) {
						setTimeout(function(){
							n++;
							var img;
							if (info.images.pages[n].t === "j") {
								img = `https://i.nhentai.net/galleries/${info["media_id"]}/${n}.jpg`;
							}
							else if (info.images.pages[n].t === "p") {
								img = `https://i.nhentai.net/galleries/${info["media_id"]}/${n}.png`;
							}
							const Embed = {
								color: '#00ff00',
								title: `${info.title.pretty} ${n}/${info.images.pages.length + 1}`,
								url: "",
								author: {
									Name: 'AnimeBot',
									icon_url: img,
									url: '',
								},
								description: ``,
								thumbnail: img,
								fields: [],
								image: {
									url: img,
								},
								fimestamp: new Date(),
								footer: {
									test: 'Some footer text here',
									icon_url: img,
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
							
						}, 10 * i * 1000);
					}
				})
			})
		}
		else {
			nana.random().then((g) => {
				info = g;
			}).then(() => {
				var n = 0;
				var msgSent = 0;
				for (var i = 0; i < info.images.pages.length; i++) {
					setTimeout(function(){
						n++;
						var img;
						if (info.images.pages[n].t === "j") {
							img = `https://i.nhentai.net/galleries/${info["media_id"]}/${n}.jpg`;
						}
						else if (info.images.pages[n].t === "p") {
							img = `https://i.nhentai.net/galleries/${info["media_id"]}/${n}.png`;
						}
						const Embed = {
							color: '#00ff00',
							title: `${info.title.pretty} ${n}/${info.images.pages.length + 1}`,
							url: "",
							author: {
								Name: 'AnimeBot',
								icon_url: img,
								url: '',
							},
							description: ``,
							thumbnail: img,
							fields: [],
							image: {
								url: img,
							},
							fimestamp: new Date(),
							footer: {
								test: 'Some footer text here',
								icon_url: img,
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
						
					}, 10 * i * 1000);
				}
			});
		}
	} else {
		const Embed = {
			color: '#00ff00',
			title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
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
		});
	}
}