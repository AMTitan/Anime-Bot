module.exports = function(Prefix, message, commandName, args, request, client, owner) {
	const Embed = {
		color: '#00ff00',
		title: commandName + " - " + message.author.tag + " ("+message.author.id+")",
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: args.join(" "),
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

	const Embedthree = {
		color: '#00ff00',
		title: "I am so sorry but it did not send maybe try again?",
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: args.join(" "),
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

	const Embedtwo = {
		color: '#00ff00',
		title: "I have sent it thank you!",
		url: "",
		author: {
			Name: 'AnimeBot',
			icon_url: "",
			url: '',
		},
		description: "and if you get a friend request from a accound right after you send it that is prob me going to ask you what you mean.",
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

	var sent = false;

	if (args[0] === "" || !args[0] || args[0] === " ") {
		const Embedfour = {
			color: '#00ff00',
			title: `can you please write something after the ${commandName}`,
			url: "",
			author: {
				Name: 'AnimeBot',
				icon_url: "",
				url: '',
			},
			description: args.join(" "),
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
			embed: Embedfour
		})
	}else {
		try {
			client.users.cache.get(owner).send({
				embed: Embed
			});
			sent = true;
		}
		catch(err) {
			sent = false;
			message.channel.send({
				embed: Embedthree
			})
		}
		if (!sent) return;

		message.channel.send({
			embed: Embedtwo
		})
	}

}