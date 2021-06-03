module.exports = function(Prefix, message, commandName, args, request, client, Levels) {
	Levels.fetch(message.author.id, message.guild.id).then((user) => {
        const Embed = {
            color: '#00ff00',
            title: `You are level ${user.level} and have ${user.xp.toLocaleString()} xp`,
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
    })
}