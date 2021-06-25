module.exports = function(Prefix, message, commandName, args, request, client, owner) {
    try {
        message.member.voice.channel.leave();
    } catch (err) {
        console.log(err);
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
    description: "Leaves the vc",
    usage: `leave`,
    aliases: [],
    type: "other",
    optinal: ""
}