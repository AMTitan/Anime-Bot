module.exports = function(Prefix, message, commandName, args, request, client) {
    const fs = require("fs")
    const glob = require("glob");
	glob(`./src` + '/**/*', function (er, files) {
		var lines = 0;
		files.forEach(function(item) {
			if (item.endsWith(".js")) fs.createReadStream(item)
			  	.on('data', function(chunk) {
			    	for (var i = 0; i < chunk.length; i++)
			      		if (chunk[i] == 10) lines++;
		  	})
		  	.on('end', function() {
	    		if (files[files.length - 1] === item) {
				    let count = 0;
					var uptime = process.uptime();
					var days = Math.floor((uptime % 31536000) / 86400);
					var hours = Math.floor((uptime % 86400) / 3600);
					var minutes = Math.floor((uptime % 3600) / 60);
					var seconds = Math.round(uptime % 60);
					var botuptime = (days > 0 ? days + " days, ":"") + (hours > 0 ? hours + " hours, ":"") + (minutes > 0 ? minutes + " minutes, ":"") + (seconds > 0 ? seconds + " seconds":"");
					switch(process.platform){
						case "win32": var os = "Windows"; break;
						case "linux": var os = "Linux"; break;
						case "darwin": var os = "Darwin"; break;
						case "openbsd": var os = "OpenBSD"; break;
						case "sunos": var os = "Solaris"; break;
						case "freebst": var os = "FreeBSD"; break;
					};
					const Embed = {
						color: '#00ff00',
						title: 'Stats',
						url: "",
						author: {
							Name: 'AnimeBot',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [{
									name: 'Server Count',
									value: client.guilds.cache.size,
									inline: true
								}, {
									name: 'User Count',
									value: message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c),
									inline: true
								}, {
									name: 'Average Server Size',
									value: (Math.round((message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)/client.guilds.cache.size) * 100))/100,
									inline: true
								}, {
									name: 'Bot Creation Date',
									value: Math.round((new Date().getTime() - client.user.createdAt.getTime())/86400000) + " days ago",
									inline: true
								}, {
									name: 'Average Servers Per Day',
									value: Math.round((client.guilds.cache.size)/(Math.round((new Date().getTime() - client.user.createdAt.getTime())/86400000)) * 100)/100,
									inline: true
								}, {
									name: 'Lines of Code',
									value: lines,
									inline: true
								}, {
									name: 'Uptime',
									value: botuptime,
									inline: true
								}, {
									name: 'Memory',
									value: `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`,
									inline: true
								}, {
									name: 'OS',
									value: os,
									inline: true
								},],
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
	    		};
	  		});
		})
	});
}