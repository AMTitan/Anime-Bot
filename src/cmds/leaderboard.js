module.exports = function(Prefix, message, commandName, args, request, client, Levels) {
    Levels.fetchLeaderboard(message.guild.id, 10).then((rawLeaderboard) => {
        if (rawLeaderboard.length < 1) {
            const Embed = {
                color: '#00ff00',
                title: `No one is on the leaderboard`,
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
        }
        Levels.computeLeaderboard(client, rawLeaderboard, true).then((leaderboard) => {
            const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp- Levels.xpFor(e.level)}`);
            const Embed = {
                color: '#00ff00',
                title: `Leaderboard`,
                url: "",
                author: {
                    Name: 'AnimeBot',
                    icon_url: "",
                    url: '',
                },
                description: `${lb.join("\n\n")}`,
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
        });
    })
}