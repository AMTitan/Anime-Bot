module.exports = function(Prefix, message, commandName, args, request, client) {
    const { HAnimeAPI } = require('hanime');
    const api = new HAnimeAPI();
    api.search(args.join(" ")).then(results => {
        var id = results.videos.length;
        var skip = false;
        for(var i = 0; i < results.videos.length; i++) {
            if (!results.videos[i].tags.includes("loli") && !skip) {
                id = i;
                skip = true;
            }
        }
        if (id === results.videos.length) {
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
            const video = results.videos[id];
            const Embed = {
                color: '#00ff00',
                title: `${video.name}`,
                url: `https://hanime.tv/videos/hentai/${video.slug}`,
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `${video.description.replace("<p>", "").replace("</p>", "").replace("<br>", "\n")}\n\n\`${video.tags.join(" | ")}\``,
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