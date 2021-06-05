module.exports = function(Prefix, message, commandName, args, request, client) {
    const options = {
        method: 'GET',
        url: 'https://animu.p.rapidapi.com/fact',
        headers: {
            'x-rapidapi-key': 'f51fa7a829msh002a66b9e9ebd76p1e3400jsn4c71c0617a59',
            'x-rapidapi-host': 'animu.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        var jsonParsed = JSON.parse(body);
        const Embed = {
            color: '#00ff00',
            title: "",
            url: "",
            author: {
                Name: 'AnimeBot',
                icon_url: "",
                url: '',
            },
            description: ``,
            thumbnail: "",
            fields: [{
                name: 'Fact',
                value: jsonParsed.fact,
                inline: true
            }, ],
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
}