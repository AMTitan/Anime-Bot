#[macro_use]
extern crate lazy_static;

use async_once::AsyncOnce;
use chrono::Utc;
use rand::prelude::SliceRandom;
use rand::Rng;
use regex::Regex;
use reqwest::header::USER_AGENT;
use serde_json::Value;
use serenity::model::gateway::Activity;
use serenity::model::id::UserId;
use serenity::model::prelude::Message;
use serenity::{
    async_trait,
    model::{
        gateway::Ready,
        interactions::{
            application_command::ApplicationCommand, Interaction, InteractionResponseType,
        },
    },
    prelude::*,
};
use std::collections::HashMap;
use std::fs;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use std::io::Write;

lazy_static! {
    static ref CMDS: Value =
        serde_json::from_str(&fs::read_to_string("./src/cmds.json").expect("Unable to read file"))
            .unwrap();
    static ref CMDS_HASH: HashMap<String, (String, &'static Vec<Value>, String, Value)> = {
        let mut m = HashMap::new();
        for i in 0..CMDS.as_array().unwrap().len() {
            m.insert(
                CMDS[i]["usage"].to_string().trim_matches('\"').to_string(),
                (
                    CMDS[i]["url"].to_string().trim_matches('\"').to_string(),
                    CMDS[i]["json_rout"].as_array().unwrap(),
                    CMDS[i]["type"].to_string().trim_matches('\"').to_string(),
                    CMDS[i]["arg"].clone(),
                ),
            );
            for x in CMDS[i]["aliases"].as_array().unwrap() {
                m.insert(
                    x.to_string().trim_matches('\"').to_string(),
                    (
                        CMDS[i]["url"].to_string().trim_matches('\"').to_string(),
                        CMDS[i]["json_rout"].as_array().unwrap(),
                        CMDS[i]["type"].to_string().trim_matches('\"').to_string(),
                        CMDS[i]["arg"].clone(),
                    ),
                );
            }
        }
        m
    };
    static ref CONFIG: Value = {
        if File::open("Config.json").is_ok() {
            serde_json::from_str(&fs::read_to_string("Config.json").expect("Unable to read file"))
                .unwrap()
        } else {
            let _ = set_cont("Config.json".to_string(), "{\t\"Token\": \"(discord bot token)\",\n\t\"Application_id\": 123456789,\n\t\"Owner_id\": 123456789,\n\t\"top\": \"(top.gg token)\",\n\t\"botlist\": \"(discordbotlist token)\",\n\t\"mongodb\": \"(something like mongodb+srv://<username>:<password>@<stuff>\",\n\t\"# If you don't want it to report delete the lines below\": \"null\",\n\t\"GITHUB_REPO\": \"(the repo)\",\n\t\"GITHUB_USERNAME\": \"(username)\",\n\t\"GITHUB_PERSONAL_ACCESS_TOKENS\": \"(token)\"\n}".to_string());
            println!("You need to edit the Config.json");
            std::process::exit(1);
        }
    };
    static ref BANLIST: AsyncOnce<String> = AsyncOnce::new(async {
        return format!(
            "+-{}+-asian+-3d+-photo_(medium)",
            request(
                "https://raw.githubusercontent.com/ScathachGrip/Spell/main/data/tags.txt"
                    .to_string()
            )
            .await
            .unwrap()
            .split('\n')
            .collect::<Vec<&str>>()
            .join("+-")
        );
    });
}

#[tokio::main]
async fn main() {
    let mut client = Client::builder(CONFIG["Token"].to_string().trim_matches('\"').to_string())
        .event_handler(Handler)
        .application_id(CONFIG["Application_id"].as_u64().unwrap())
        .await
        .expect("Error creating client");

    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why);
    }
}

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn message(&self, ctx: Context, msg: Message) {
        if !msg.author.bot {
            let content = msg.content.to_lowercase();
            if content.starts_with("a!") {
                println!("[{}]: {}", Utc::now().to_rfc2822(), msg.content);
                let re = Regex::new(r"\s+").unwrap();
                let mut commands: Vec<&str> =
                    re.split(content[2..msg.content.len()].trim()).collect();
                let mut x: Option<&(String, &'static Vec<Value>, String, Value)> = None;
                if CMDS_HASH.contains_key(commands[0]) {
                    x = Some(&CMDS_HASH[commands[0]]);
                }
                if CMDS_HASH.contains_key(commands[0])
                    && match x {
                        Some(x) => x.2 != "search".to_string(),
                        None => true,
                    }
                {
                    let x = x.unwrap();
                    if !(x.2 == "client.owner"
                        && msg.author.id.0
                            != CONFIG["Owner_id"]
                                .to_string()
                                .trim_matches('\"')
                                .to_string()
                                .parse::<u64>()
                                .unwrap())
                    {
                        let mut nsfw_error = false;
                        if msg.guild_id.is_some()
                            && !ctx
                                .http
                                .get_channel(msg.channel_id.0)
                                .await
                                .unwrap()
                                .is_nsfw()
                        {
                            if commands.len() > 1 {
                                if (x.3[commands[1]].to_string() != "null"
                                    && x.3[commands[1]]["nsfw"].as_bool().unwrap())
                                    || (x.3[commands[1]].to_string() == "null"
                                        && (x.2 == "nsfw" || x.2 == "person"))
                                {
                                    nsfw_error = true;
                                }
                            } else if x.2 == "nsfw" || x.2 == "person" {
                                nsfw_error = true;
                            }
                        }
                        if !nsfw_error {
                            if commands[0] == "help" || commands[0] == "commands" {
                                let msg = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title("The help is located here (Click Me)");
                                            e.url("https://amtitan.github.io/Anime-Bot/");
                                            e.description("➤[Invite](https://discord.com/api/oauth2/authorize?client_id=927745984065314816&permissions=0&scope=bot%20applications.commands) ➤[Server](https://discord.gg/sJnVmPZB7Y) ➤[Donate](https://www.patreon.com/AMTItan_Github) ➤[Github](https://github.com/AMTitan/Anime-Bot)");
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            } else if commands[0] == "donate" {
                                let msg = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title("Donate Page (Click Me)");
                                            e.url("https://www.patreon.com/AMTItan_Github");
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            } else if commands[0] == "invite" {
                                let msg = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title("Invite link (Click Me)");
                                            e.url(format!("https://discord.com/oauth2/authorize?client_id={}&permissions=0&scope=bot%20applications.commands", CONFIG["Application_id"].as_u64().unwrap()));
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            } else if commands[0] == "server" {
                                let msg = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title("server link (Click Me)");
                                            e.url("https://discord.gg/sJnVmPZB7Y");
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            } else if commands[0] == "dm" {
                                let user = UserId(commands[1].parse::<u64>().unwrap())
                                    .to_user(ctx.clone().http)
                                    .await;
                                commands.remove(0);
                                commands.remove(0);
                                if msg.author.id == CONFIG["Owner_id"].as_u64().unwrap() {
                                    let msg = user
                                        .unwrap()
                                        .direct_message(&ctx.http, |m| {
                                            m.embed(|e| {
                                                e.title("Bot Owner");
                                                e.description(commands.join(" "));
                                                e.colour(0x00ff00);

                                                e
                                            });
                                            m
                                        })
                                        .await;
                                    if let Err(why) = msg {
                                        println!("Error sending message: {:?}", why);
                                    }
                                }
                            } else if commands[0] == "issue" || commands[0] == "improve" {
                                let user = UserId(CONFIG["Owner_id"].as_u64().unwrap())
                                    .to_user(ctx.clone().http)
                                    .await;
                                let type_of_request = commands[0];
                                commands.remove(0);
                                let msg = user
                                    .unwrap()
                                    .direct_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title(format!(
                                                "{} - {}",
                                                type_of_request, msg.author.id
                                            ));
                                            e.description(commands.join(" "));
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            } else {
                                let mut image;
                                if x.0
                                    .to_string()
                                    .trim_matches('\"')
                                    .to_string()
                                    .ends_with(".txt")
                                {
                                    let reader = BufReader::new(
                                        File::open(x.0.to_string().trim_matches('\"').to_string())
                                            .unwrap(),
                                    );
                                    let lines: Vec<String> =
                                        reader.lines().collect::<Result<_, _>>().unwrap();
                                    image =
                                        lines.choose(&mut rand::thread_rng()).unwrap().to_string();
                                } else {
                                    image = get_item(
                                        request(
                                            replace_everything(
                                                x.0.to_string()
                                                    .trim_matches('\"')
                                                    .to_string()
                                                    .replace(" ", "%20"),
                                            )
                                            .await,
                                        )
                                        .await
                                        .unwrap(),
                                        x.1,
                                    );
                                }
                                if commands.len() > 1 && x.3[commands[1]].to_string() != "null" {
                                    if x.clone().3[commands[1]]["url"]
                                        .to_string()
                                        .trim_matches('\"')
                                        .to_string()
                                        .ends_with(".txt")
                                    {
                                        let reader = BufReader::new(
                                            File::open(
                                                x.clone().3[commands[1]]["url"]
                                                    .to_string()
                                                    .trim_matches('\"')
                                                    .to_string(),
                                            )
                                            .unwrap(),
                                        );
                                        let lines: Vec<String> =
                                            reader.lines().collect::<Result<_, _>>().unwrap();
                                        image = lines
                                            .choose(&mut rand::thread_rng())
                                            .unwrap()
                                            .to_string();
                                    } else {
                                        image = get_item(
                                            request(
                                                replace_everything(
                                                    x.clone().3[commands[1]]["url"]
                                                        .to_string()
                                                        .trim_matches('\"')
                                                        .to_string()
                                                        .replace(" ", "%20"),
                                                )
                                                .await,
                                            )
                                            .await
                                            .unwrap(),
                                            x.3[commands[1]]["json_rout"].as_array().unwrap(),
                                        );
                                    }
                                }
                                image = image.trim().to_string();
                                let msg_ = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title(commands.join(" "));
                                            if image.to_ascii_lowercase().ends_with(".jpg")
                                                || image.to_ascii_lowercase().ends_with(".jpeg")
                                                || image.to_ascii_lowercase().ends_with(".png")
                                                || image.to_ascii_lowercase().ends_with(".gif")
                                                || image.to_ascii_lowercase().ends_with(".gifv")
                                            {
                                                e.image(image.replace(" ", "%20"));
                                            }
                                            e.colour(0x00ff00);

                                            e
                                        });
                                        m
                                    })
                                    .await;
                                if let Err(why) = msg_ {
                                    println!("Error sending message: {:?}", why);
                                }
                                if !(image.to_ascii_lowercase().ends_with(".jpg")
                                    || image.to_ascii_lowercase().ends_with(".jpeg")
                                    || image.to_ascii_lowercase().ends_with(".png")
                                    || image.to_ascii_lowercase().ends_with(".gif")
                                    || image.to_ascii_lowercase().ends_with(".gifv"))
                                {
                                    let msg = msg.channel_id.say(&ctx.http, image).await;
                                    if let Err(why) = msg {
                                        println!("Error sending message: {:?}", why);
                                    }
                                }
                            }
                        } else {
                            let msg = msg
                                .channel_id
                                .send_message(&ctx.http, |m| {
                                    m.embed(|e| {
                                        e.title("sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!");
                                        e.colour(0x00ff00);
                                        e
                                    });
                                    m
                                })
                                .await;
                            if let Err(why) = msg {
                                println!("Error sending message: {:?}", why);
                            }
                        }
                    }
                } else {
                    let array: Value = serde_json::from_str("[\"random\",\"file_url\"]").unwrap();
                    let commands_clone = commands.clone();
                    if x.is_some() {
                        commands.remove(0);
                    }
                    if !ctx
                        .http
                        .get_channel(msg.channel_id.0)
                        .await
                        .unwrap()
                        .is_nsfw()
                        && msg.guild_id.is_some()
                    {
                        commands.push("rating:safe");
                    }
                    for i in 0..commands.len() {
                        if commands[i] == "safe" {
                            commands[i] = "rating:safe"
                        } else if commands[i] == "explicit" {
                            commands[i] = "rating:explicit"
                        } else if commands[i] == "questionable" {
                            commands[i] = "rating:questionable"
                        }
                    }
                    let mut returns;
                    let cont = request(
                        replace_everything(
                            format!(
                                "https://$boorus=post&q=index&tags=+{}$banlist&json=1",
                                commands.join("+")
                            )
                            .to_string()
                            .trim_matches('\"')
                            .to_string()
                            .replace(" ", "%20")
                            .replace(
                                "$booru",
                                match x {
                                    Some(x) => {
                                        let url = &x.0;
                                        returns = if url.trim_matches('\"').ends_with(".json") {
                                            format!("{}?", url.trim_matches('\"'))
                                        } else {
                                            format!("{}?page=dapi&", url.trim_matches('\"'))
                                        };
                                        &returns
                                    }
                                    None => "$booru?page=dapi&",
                                },
                            ),
                        )
                        .await,
                    )
                    .await
                    .unwrap();
                    let image = if cont.clone().trim() != "" {
                        get_item(
                            cont.clone(),
                            match x {
                                Some(x) => x.1,
                                None => array.as_array().unwrap(),
                            },
                        )
                    } else {
                        "Null".to_string()
                    };
                    if image != "Null" && cont.trim() != "" {
                        let msg_ = msg
                            .channel_id
                            .send_message(&ctx.http, |m| {
                                m.embed(|e| {
                                    e.title(commands_clone.join(" "));
                                    if image.to_ascii_lowercase().ends_with(".jpg")
                                        || image.to_ascii_lowercase().ends_with(".jpeg")
                                        || image.to_ascii_lowercase().ends_with(".png")
                                        || image.to_ascii_lowercase().ends_with(".gif")
                                        || image.to_ascii_lowercase().ends_with(".gifv")
                                    {
                                        e.image(image.replace(" ", "%20"));
                                    }
                                    e.colour(0x00ff00);

                                    e
                                });
                                m
                            })
                            .await;
                        if let Err(why) = msg_ {
                            println!("Error sending message: {:?}", why);
                        }
                        if !(image.to_ascii_lowercase().ends_with(".jpg")
                            || image.to_ascii_lowercase().ends_with(".jpeg")
                            || image.to_ascii_lowercase().ends_with(".png")
                            || image.to_ascii_lowercase().ends_with(".gif")
                            || image.to_ascii_lowercase().ends_with(".gifv"))
                        {
                            let msg = msg.channel_id.say(&ctx.http, image).await;
                            if let Err(why) = msg {
                                println!("Error sending message: {:?}", why);
                            }
                        }
                    } else {
                        let mut add = "";
                        if !ctx
                            .http
                            .get_channel(msg.channel_id.0)
                            .await
                            .unwrap()
                            .is_nsfw()
                            && msg.guild_id.is_some()
                        {
                            add = ", but you are not in a nsfw channel so you can try it there to see if you get a different result. If you still think this is an error"
                        }
                        let msg = msg
                                .channel_id
                                .send_message(&ctx.http, |m| {
                                    m.embed(|e| {
                                        e.title(format!("Sorry I could not find any img of this{} you can try doing `a!improve {} (reason)`", add, commands_clone.join(" ")));
                                        e.colour(0x00ff00);

                                        e
                                    });
                                    m
                                })
                                .await;
                        if let Err(why) = msg {
                            println!("Error sending message: {:?}", why);
                        }
                    }
                }
            }
        }
    }

    async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        if let Interaction::ApplicationCommand(command) = interaction {
            println!(
                "[{}]: /{}",
                Utc::now().to_rfc2822(),
                command.data.name.as_str()
            );
            let re = Regex::new(r"\s+").unwrap();
            let commands: Vec<&str> = re.split(command.data.name.as_str().trim()).collect();
            if CMDS_HASH.contains_key(commands[0]) {
                let x = &CMDS_HASH[commands[0]];
                let mut nsfw_error = false;
                if commands.len() > 1 {
                    if !(x.3[commands[1]].to_string() != "null"
                        && !x.3[commands[1]]["nsfw"].as_bool().unwrap()
                        || ctx
                            .http
                            .get_channel(command.channel_id.0)
                            .await
                            .unwrap()
                            .is_nsfw()
                        || command.guild_id.is_none())
                    {
                        nsfw_error = true;
                    }
                } else if !((x.2 != "nsfw" && x.2 != "person")
                    || ctx
                        .http
                        .get_channel(command.channel_id.0)
                        .await
                        .unwrap()
                        .is_nsfw()
                    || command.guild_id.is_none())
                {
                    nsfw_error = true;
                }
                if !nsfw_error {
                    let image = get_item(
                        request(
                            replace_everything(
                                x.0.to_string()
                                    .trim_matches('\"')
                                    .to_string()
                                    .to_string()
                                    .replace(" ", "%20"),
                            )
                            .await,
                        )
                        .await
                        .unwrap(),
                        x.1,
                    );

                    let _ = command
                        .create_interaction_response(&ctx.http, |response| {
                            response
                                .kind(InteractionResponseType::ChannelMessageWithSource)
                                .interaction_response_data(|message| {
                                    message.create_embed(|e| {
                                        e.title(commands[0]);
                                        e.image(image);
                                        e.colour(0x00ff00);

                                        e
                                    })
                                })
                        })
                        .await;
                } else {
                    let _ = command
                        .create_interaction_response(&ctx.http, |response| {
                            response
                                .kind(InteractionResponseType::ChannelMessageWithSource)
                                .interaction_response_data(|m| {
                                    m.create_embed(|e| {
                                        e.title("sorry but the channel is not marked as nsfw (to make it nsfw go to the channel settings and make nsfw on) or you can always use the bot in dms!");
                                        e.colour(0x00ff00);
                                        e
                                    });
                                    m
                                })
                        })
                        .await;
                }
            }
        }
    }

    async fn ready(&self, ctx: Context, ready: Ready) {
        println!("{} is connected!", ready.user.name);

        ctx.set_activity(Activity::watching("a!help")).await;

        let _ = ApplicationCommand::set_global_application_commands(&ctx.http, |commands| {
            commands.create_application_command(|command| {
                for cmd in CMDS.as_array().unwrap() {
                    command
                        .name(cmd["usage"].to_string().trim_matches('\"').to_string())
                        .description(
                            cmd["description"]
                                .to_string()
                                .trim_matches('\"')
                                .to_string(),
                        );
                }

                command
            })
        })
        .await;
    }
}

fn get_item(input: String, items: &[Value]) -> String {
    let mut v: Value = serde_json::from_str(&input).unwrap();
    if v["post"] != Value::Null {
        v = v["post"].clone();
    }
    for x in items {
        if x.to_string().trim_matches('\"') == "random" {
            if v.as_array().is_none() {
                return "Null".to_string();
            }
            v = v[rand::thread_rng().gen_range(0..v.as_array().unwrap().len())].clone();
        } else {
            v = v[x.to_string().trim_matches('\"').to_string()].clone();
        }
    }
    return v.to_string().trim_matches('\"').to_string();
}

fn set_cont(loc: String, cont: String) -> std::io::Result<()> {
    let mut file = File::create(loc)?;
    file.write_all(cont.as_bytes())?;
    Ok(())
}

async fn request(url: String) -> Result<String, Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let resp = client
        .get(&url)
        .header(
            USER_AGENT,
            "Anime Bot (github: https://github.com/AMTitan/Anime-Bot)",
        )
        .send()
        .await?;
    Ok(resp.text().await?)
}

async fn replace_everything(start: String) -> String {
    start
        .replace("$banlist", BANLIST.get().await)
        //.replace("$booru", "rule34.xxx/index.php") // has more extreme images but then sometimes they are not as good
        .replace("$booru", "gelbooru.com/index.php") // has softer images but then if you want more hard you dont really get it
}
