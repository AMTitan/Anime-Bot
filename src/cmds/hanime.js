module.exports = function(message, commandName, args, client) {
    const { HAnimeAPI } = require('hanime');
    const api = new HAnimeAPI();
    api.search(args.join(" ")).then(results => {
        var id = [];
        for(var i = 0; i < results.videos.length; i++) {
            if (!results.videos[i].tags.includes("loli")) {
                id.push(i);
            }
        }
        if (id.length === 0) {
            const Embed = {
                color: '#00ff00',
                title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")} (reason)` + "`",
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
                footer: {
                    test: '',
                    icon_url: "",
                },
            }
            message.channel.send({
                embed: Embed
            });
        }
        else {
            const video = results.videos[id[Math.round((id.length-1)*Math.random())]];
            const Embed = {
                color: '#00ff00',
                title: `${video.name}`,
                url: `https://hanime.tv/videos/hentai/${video.slug}`,
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `${video.description.split("<p>").join("").split("</p>").join("").split("<br>").join("\n")}\n\n\`${video.tags.join(" | ")}\``,
                thumbnail: "",
                fields: [],
                image: {
                    url: video.cover_url
                },
                footer: {
                    test: '',
                    icon_url: "",
                },
            }

            message.channel.send({
                embed: Embed
            })
        }
    });
}

module.exports.config = {
    description: "Gives you a hanime video",
    usage: `hanime`,
    aliases: [],
    type: "nsfw",
    optinal: "[search]"
}