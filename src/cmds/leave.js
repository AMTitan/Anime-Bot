module.exports = function(Prefix, message, commandName, args, request, client, owner) {
    try {
        client.leaveVoiceChannel(message.member.voiceState.channelID);
    }
    catch (err) {
        const Embed = {
            color: '#00ff00',
            title: 'I am not in your vc or you are not in a vc',
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
    }
}

module.exports.config = {
    name: "leave",
    description: "Leaves the vc",
    usage: `leave`,
    aliases: [],
    type: "other",
    optinal: ""
}