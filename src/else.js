module.exports = function(Prefix, message, commandName, args, request, client) {
    const types = ["", "rating:safe", "rating:questionable", "rating:explicit"];
    var nsfw = false;
    var questinable = false;
    var sfw = false;
    const Embed = {
        color: '#00ff00',
        title: ":one: `Safe`, :two: `Questionable`, :three: `Explicit`, :four: `Random`",
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
    }).then(function(messageSent) {

        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        messageSent.awaitReactions(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '1️⃣') {
                    sfw = true;
                } else if (reaction.emoji.name === '2️⃣') {
                    questinable = true;
                } else if (reaction.emoji.name === '3️⃣') {
                    nsfw = true;
                }
                if (nsfw == true) {
                    if (message.channel.nsfw === true || message.guild === null) {
                        request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-loli -asian -3d -photo_(medium) ${types[3]} ${commandName + " " + args.join(" ")}&json=1`, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var shouldIReturn = false;
                                if (!body) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                var jsonParsed = JSON.parse(body);
                                if (!jsonParsed) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (jsonParsed === "undefined") {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry but could you just try that again?`,
                                        url: "",
                                        author: {
                                            Name: 'AnimeBot',
                                            icon_url: "",
                                            url: '',
                                        },
                                        description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length - 1))];
                                if (!jsonParsed || !jsonParsed.file_url) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                const Embed = {
                                    color: '#00ff00',
                                    title: `${commandName + " " + args.join(", ")} img`,
                                    url: "",
                                    author: {
                                        Name: 'AnimeBot',
                                        icon_url: jsonParsed.file_url,
                                        url: '',
                                    },
                                    description: `(I need to fix this but if you get no img do do this again) If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" + ` But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} ${args.join(" ")} (reason)` + "`\n\n**Tags: **" + "```" + jsonParsed.tags + "```",
                                    thumbnail: jsonParsed.file_url,
                                    fields: [],
                                    image: {
                                        url: jsonParsed.file_url,
                                    },
                                    fimestamp: new Date(),
                                    footer: {
                                        test: 'Some footer text here',
                                        icon_url: jsonParsed.file_url,
                                    },
                                }

                                message.channel.send({
                                    embed: Embed
                                });

                                if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                                    message.channel.send(jsonParsed.file_url);
                                }
                            }
                        })
                    } else {
                        const Embed = {
                            color: '#00ff00',
                            title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
                            url: "",
                            author: {
                                Name: 'AnimeBot',
                                icon_url: "",
                                url: '',
                            },
                            description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} (what to improve)` + "`",
                            thumbnail: "",
                            fields: [],
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
                    }
                } else if (questinable == true) {
                    if (message.channel.nsfw === true || message.guild === null) {
                        request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-loli -asian -3d -photo_(medium) ${types[3]} ${commandName + " " + args.join(" ")}&json=1`, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var shouldIReturn = false;
                                if (!body) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                var jsonParsed = JSON.parse(body);
                                if (!jsonParsed) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (jsonParsed === "undefined") {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry but could you just try that again?`,
                                        url: "",
                                        author: {
                                            Name: 'AnimeBot',
                                            icon_url: "",
                                            url: '',
                                        },
                                        description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length - 1))];
                                if (!jsonParsed || !jsonParsed.file_url) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                const Embed = {
                                    color: '#00ff00',
                                    title: `${commandName + " " + args.join(", ")} img`,
                                    url: "",
                                    author: {
                                        Name: 'AnimeBot',
                                        icon_url: jsonParsed.file_url,
                                        url: '',
                                    },
                                    description: `(I need to fix this but if you get no img do do this again) If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" + ` But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} ${args.join(" ")} (reason)` + "`\n\n**Tags: **" + "```" + jsonParsed.tags + "```",
                                    thumbnail: jsonParsed.file_url,
                                    fields: [],
                                    image: {
                                        url: jsonParsed.file_url,
                                    },
                                    fimestamp: new Date(),
                                    footer: {
                                        test: 'Some footer text here',
                                        icon_url: jsonParsed.file_url,
                                    },
                                }

                                message.channel.send({
                                    embed: Embed
                                });

                                if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                                    message.channel.send(jsonParsed.file_url);
                                }
                            }
                        })
                    } else {
                        const Embed = {
                            color: '#00ff00',
                            title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
                            url: "",
                            author: {
                                Name: 'AnimeBot',
                                icon_url: "",
                                url: '',
                            },
                            description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} (what to improve)` + "`",
                            thumbnail: "",
                            fields: [],
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
                    }
                } else if (sfw == true) {
                    request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-loli -asian -3d -photo_(medium) ${types[1]} ${commandName + " " + args.join(" ")}&json=1`, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var shouldIReturn = false;
                            if (!body) {
                                const Embed = {
                                    color: '#00ff00',
                                    title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                var shouldIReturn = true;
                            }
                            if (shouldIReturn) return;
                            var jsonParsed = JSON.parse(body);
                            if (!jsonParsed) {
                                const Embed = {
                                    color: '#00ff00',
                                    title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                var shouldIReturn = true;
                            }
                            if (jsonParsed === "undefined") {
                                const Embed = {
                                    color: '#00ff00',
                                    title: `Sorry but could you just try that again?`,
                                    url: "",
                                    author: {
                                        Name: 'AnimeBot',
                                        icon_url: "",
                                        url: '',
                                    },
                                    description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName}` + "`",
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
                                var shouldIReturn = true;
                            }
                            if (shouldIReturn) return;
                            jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length - 1))];
                            if (!jsonParsed || !jsonParsed.file_url) {
                                const Embed = {
                                    color: '#00ff00',
                                    title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                var shouldIReturn = true;
                            }
                            if (shouldIReturn) return;
                            const Embed = {
                                color: '#00ff00',
                                title: `${commandName + " " + args.join(", ")} img`,
                                url: "",
                                author: {
                                    Name: 'AnimeBot',
                                    icon_url: jsonParsed.file_url,
                                    url: '',
                                },
                                description: `(I need to fix this but if you get no img do do this again) If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" + ` But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} ${args.join(" ")} (reason)` + "`\n\n**Tags: **" + "```" + jsonParsed.tags + "```",
                                thumbnail: jsonParsed.file_url,
                                fields: [],
                                image: {
                                    url: jsonParsed.file_url,
                                },
                                fimestamp: new Date(),
                                footer: {
                                    test: 'Some footer text here',
                                    icon_url: jsonParsed.file_url,
                                },
                            }

                            message.channel.send({
                                embed: Embed
                            });

                            if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                                message.channel.send(jsonParsed.file_url);
                            }
                        }
                    })
                } else {
                    if (message.channel.nsfw === true || message.guild === null) {
                        request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-loli -asian -3d -photo_(medium) ${commandName + " " + args.join(" ")}&json=1`, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var shouldIReturn = false;
                                if (!body) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                var jsonParsed = JSON.parse(body);
                                if (!jsonParsed) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (jsonParsed === "undefined") {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry but could you just try that again?`,
                                        url: "",
                                        author: {
                                            Name: 'AnimeBot',
                                            icon_url: "",
                                            url: '',
                                        },
                                        description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                jsonParsed = jsonParsed[Math.round(Math.random() * (jsonParsed.length - 1))];
                                if (!jsonParsed || !jsonParsed.file_url) {
                                    const Embed = {
                                        color: '#00ff00',
                                        title: `Sorry I could not find any img of this you can try doing ` + "`" + `a!improve ${commandName} ${args.join(" ")}` + "`",
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
                                    var shouldIReturn = true;
                                }
                                if (shouldIReturn) return;
                                const Embed = {
                                    color: '#00ff00',
                                    title: `${commandName + " " + args.join(", ")} img`,
                                    url: "",
                                    author: {
                                        Name: 'AnimeBot',
                                        icon_url: jsonParsed.file_url,
                                        url: '',
                                    },
                                    description: `(I need to fix this but if you get no img do do this again) If this is not very good it is bc I dont have this cmd coded but to see my offical cmds you can do ` + "`" + `${Prefix}help` + "`" + ` But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} ${args.join(" ")} (reason)` + "`\n\n**Tags: **" + "```" + jsonParsed.tags + "```",
                                    thumbnail: jsonParsed.file_url,
                                    fields: [],
                                    image: {
                                        url: jsonParsed.file_url,
                                    },
                                    fimestamp: new Date(),
                                    footer: {
                                        test: 'Some footer text here',
                                        icon_url: jsonParsed.file_url,
                                    },
                                }

                                message.channel.send({
                                    embed: Embed
                                });

                                if (!jsonParsed.file_url.endsWith(".jpg") && !jsonParsed.file_url.endsWith(".jpeg") && !jsonParsed.file_url.endsWith(".JPG") && !jsonParsed.file_url.endsWith(".JPEG") && !jsonParsed.file_url.endsWith(".png") && !jsonParsed.file_url.endsWith(".PNG") && !jsonParsed.file_url.endsWith(".gif") && !jsonParsed.file_url.endsWith(".gifv")) {
                                    message.channel.send(jsonParsed.file_url);
                                }
                            }
                        })
                    } else {
                        const Embed = {
                            color: '#00ff00',
                            title: 'sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!',
                            url: "",
                            author: {
                                Name: 'AnimeBot',
                                icon_url: "",
                                url: '',
                            },
                            description: `maybe do ` + "`" + `${Prefix}help` + "`" + ` or you can do ` + "`" + `${Prefix}search img ${commandName} ${args.join(" ")}` + "`" + `? But if you really want this command you can ` + "`" + `${Prefix}improve ${commandName} (what to improve)` + "`",
                            thumbnail: "",
                            fields: [],
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
                    }
                }
            })
            .catch(collected => {
                const Embed1 = {
                    color: '#00ff00',
                    title: "You have to emote what you want",
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
                    embed: Embed1
                });
            });
        messageSent.react("1️⃣")
            .then(() => messageSent.react("2️⃣"))
            .then(() => messageSent.react("3️⃣"))
            .then(() => messageSent.react("4️⃣"));
    });
}