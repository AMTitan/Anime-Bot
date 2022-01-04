#[macro_use]
extern crate lazy_static;

use async_once::AsyncOnce;
use chrono::Utc;
use rand::Rng;
use regex::Regex;
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
            "-{}-asian-3d-photo_(medium)",
            request(
                "https://raw.githubusercontent.com/ScathachGrip/Spell/main/data/tags.txt"
                    .to_string()
            )
            .await
            .unwrap()
            .split('\n')
            .collect::<Vec<&str>>()
            .join("-")
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
                if CMDS_HASH.contains_key(commands[0]) {
                    let x = &CMDS_HASH[commands[0]];
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
                        if commands.len() > 1 {
                            if !(x.3[commands[1]] != Value::Null
                                && !x.3[commands[1]]["nsfw"].as_bool().unwrap()
                                || ctx
                                    .http
                                    .get_channel(msg.channel_id.0)
                                    .await
                                    .unwrap()
                                    .is_nsfw()
                                || msg.guild_id.is_none())
                            {
                                nsfw_error = true;
                            }
                        } else if !((x.2 != "nsfw" && x.2 != "person")
                            || ctx
                                .http
                                .get_channel(msg.channel_id.0)
                                .await
                                .unwrap()
                                .is_nsfw()
                            || msg.guild_id.is_none())
                        {
                            nsfw_error = true;
                        }
                        if !nsfw_error {
                            if commands[0] == "help" {
                                let msg = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title("The help is located here (Click Me)");
                                            e.url("https://amtitan.github.io/Anime-Bot/");
                                            e.description("➤[Invite](https://discord.com/api/oauth2/authorize?client_id=833682899202080818&permissions=0&scope=bot) ➤[Server](https://discord.gg/sJnVmPZB7Y) ➤[Donate](https://www.patreon.com/AMTItan_Github) ➤[Github](https://github.com/AMTitan/Anime-Bot)");
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
                                let mut image = get_item(
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
                                if commands.len() > 1 && x.3[commands[1]] != Value::Null {
                                    image = get_item(
                                        request(
                                            replace_everything(
                                                x.clone().3[commands[1]]["url"]
                                                    .to_string()
                                                    .trim_matches('\"')
                                                    .to_string()
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
                                let msg_ = msg
                                    .channel_id
                                    .send_message(&ctx.http, |m| {
                                        m.embed(|e| {
                                            e.title(commands.join(" "));
                                            if image.ends_with(".jpg") || image.ends_with(".jpeg") || image.ends_with(".JPG") || image.ends_with(".JPEG") || image.ends_with(".PNG") || image.ends_with(".png") || image.ends_with(".gif") || image.ends_with(".gifv")  {
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
                                if !(image.ends_with(".jpg") || image.ends_with(".jpeg") || image.ends_with(".JPG") || image.ends_with(".JPEG") || image.ends_with(".PNG") || image.ends_with(".png") || image.ends_with(".gif") || image.ends_with(".gifv"))  {
                                    let msg = msg
                                        .channel_id
                                        .say(&ctx.http, image)
                                        .await;
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
                    if ctx
                        .http
                        .get_channel(msg.channel_id.0)
                        .await
                        .unwrap()
                        .is_nsfw()
                        || msg.guild_id.is_none()
                    {
                        let array: Value =
                            serde_json::from_str("[\"random\",\"file_url\"]").unwrap();
                        let image = get_item(
                            request(
                                replace_everything(
                                    format!("https://$booru/index.php?page=dapi&s=post&q=index&limit=1000&json=1/index.php?page=dapi&s=post&q=index&tags=$banlist+{}&json=1", commands.join("+"))
                                        .to_string()
                                        .trim_matches('\"')
                                        .to_string()
                                        .to_string()
                                        .replace(" ", "%20"),
                                )
                                .await,
                            )
                            .await
                            .unwrap(),
                            array.as_array().unwrap(),
                        );
                        if image != "Null" {
                            let msg_ = msg
                                .channel_id
                                .send_message(&ctx.http, |m| {
                                    m.embed(|e| {
                                        e.title(commands.join(" "));
                                        if image.ends_with(".jpg") || image.ends_with(".jpeg") || image.ends_with(".JPG") || image.ends_with(".JPEG") || image.ends_with(".PNG") || image.ends_with(".png") || image.ends_with(".gif") || image.ends_with(".gifv")  {
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
                            if !(image.ends_with(".jpg") || image.ends_with(".jpeg") || image.ends_with(".JPG") || image.ends_with(".JPEG") || image.ends_with(".PNG") || image.ends_with(".png") || image.ends_with(".gif") || image.ends_with(".gifv"))  {
                                let msg = msg
                                    .channel_id
                                    .say(&ctx.http, image)
                                    .await;
                                if let Err(why) = msg {
                                    println!("Error sending message: {:?}", why);
                                }
                            }
                        }
                        else {
                            let msg = msg
                                .channel_id
                                .send_message(&ctx.http, |m| {
                                    m.embed(|e| {
                                        e.title(format!("Sorry I could not find any img of this you can try doing `a!improve {} (reason)`", commands.join(" ")));
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
            let commands: Vec<&str> = re
                .split(command.data.name.as_str()[2..command.data.name.as_str().len()].trim())
                .collect();
            if CMDS_HASH.contains_key(commands[0]) {
                let x = &CMDS_HASH[commands[0]];
                let image = get_item(
                    request(x.clone().0).await.unwrap().as_str().to_string(),
                    x.1,
                );
                /*
                let content = msg
                    .channel_id
                    .send_message(&ctx.http, |m| {
                        m.embed(|e| {
                            e.title(commands[0]);
                            e.image(image);
                            e.colour(0x00ff00);

                            e
                        });
                        m
                    })
                    .await;
                    */

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
            }
        }
    }

    async fn ready(&self, ctx: Context, ready: Ready) {
        println!("{} is connected!", ready.user.name);

        ctx.set_activity(Activity::watching("a!help")).await;

        for i in 0..CMDS.as_array().unwrap().len() {
            let _ = ApplicationCommand::create_global_application_command(&ctx.http, |command| {
                command
                    .name(CMDS[i]["usage"].to_string().trim_matches('\"').to_string())
                    .description(
                        CMDS[i]["description"]
                            .to_string()
                            .trim_matches('\"')
                            .to_string(),
                    )
            })
            .await;
        }
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
    let resp = reqwest::get(&url).await?;
    Ok(resp.text().await?)
}

async fn replace_everything(start: String) -> String {
    start
        .replace("$banlist", BANLIST.get().await)
        //.replace("$booru", "rule34.xxx") // has more extreme images but then sometimes they are not as good
        .replace("$booru", "gelbooru.com") // has softer images but then if you want more hard you dont really get it
}
