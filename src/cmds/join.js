module.exports = function(message, commandName, args, client) {
    const {
        voice
    } = message.member;
    if (!voice.channelID) {
        const Embed = {
            color: '#00ff00',
            title: 'Your have to be in an vc',
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
            footer: {
                test: 'Some footer text here',
                icon_url: "",
            },
        }

        message.channel.send({
            embed: Embed
        });
        return;
    }

    const streamOptions = {
        seek: 0,
        volume: 1
    };
    voice.channel.join().then(connection => {
        const stream = `Images/moan/moan.mp3`;
        const dispatcher = connection.play(stream, streamOptions);
        client.on('voiceStateUpdate', (oldMember, newMember) => {
            if (oldMember.guild.channels.cache.get(oldMember.channelID)) {
                if (oldMember.guild.channels.cache.get(oldMember.channelID).members.size === 1) {
                    oldMember.guild.channels.cache.get(oldMember.channelID).leave();
                    return;
                }
            }
        })
        dispatcher.on('end', () => {
            play(connection);
        });

    }).catch(err => client.error(err));
}

module.exports.config = {
    description: "Join the vc and moans",
    usage: `join`,
    aliases: [],
    type: "other",
    optinal: ""
}