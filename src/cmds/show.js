module.exports = function(Prefix, message, commandName, args, request, client) {
    var shownum = Math.round(Math.random() * 16292);
    request(`https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=${shownum}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonParsed = JSON.parse(body);
            const Embed = {
                color: '#00ff00',
                title: `${jsonParsed.data[0].type} - ${jsonParsed.data[0].attributes.canonicalTitle}`,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: jsonParsed.data[0].attributes.posterImage.original,
                    url: '',
                },
                description: jsonParsed.data[0].attributes.description,
                thumbnail: jsonParsed.data[0].attributes.posterImage.original,
                fields: [{
                    name: `Age Rating`,
                    value: jsonParsed.data[0].attributes.ageRating,
                    inline: true
                }, {
                    name: `Popularty Count`,
                    value: `${jsonParsed.data[0].attributes.popularityRank}/16292`,
                    inline: true
                }, {
                    name: `Status`,
                    value: `${jsonParsed.data[0].attributes.status}`,
                    inline: true
                }, {
                    name: `Hentai`,
                    value: `${jsonParsed.data[0].attributes.nsfw}`,
                    inline: true
                }, {
                    name: `Episode Count`,
                    value: `${jsonParsed.data[0].attributes.episodeCount}`,
                    inline: true
                }, {
                    name: `Total Length`,
                    value: `${jsonParsed.data[0].attributes.totalLength}mins`,
                    inline: true
                }, {
                    name: `Subtype`,
                    value: `${jsonParsed.data[0].attributes.subtype}`,
                    inline: true
                }, {
                    name: `Favorites Count`,
                    value: `${jsonParsed.data[0].attributes.favoritesCount}`,
                    inline: true
                }, {
                    name: `Age Rating Guide`,
                    value: `${jsonParsed.data[0].attributes.ageRatingGuide}`,
                    inline: true
                }, ],
                image: {
                    url: jsonParsed.data[0].attributes.posterImage.original,
                },
                fimestamp: new Date(),
                footer: {
                    test: 'Some footer text here',
                    icon_url: jsonParsed.data[0].attributes.posterImage.original,
                },
            }

            message.channel.send({
                embed: Embed
            });
        }
    })
}