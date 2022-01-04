# <img src="https://github.com/AMTitan/Anime-Bot/raw/master/AnimeBot.png" alt="icon" width="50px"/> Anime-Bot by AMTitan#4994

I have spent [![wakatime](https://wakatime.com/badge/github/AMTitan/Anime-Bot.svg)](https://wakatime.com/badge/github/AMTitan/Anime-Bot) coding this so a donation would be nice! 😄 thank you!

<h3>Links</h3>

- [Dependency](https://github.com/AMTitan/Anime-Bot#dependency)
- [Install](https://github.com/AMTitan/Anime-Bot#install)
- [Usage](https://github.com/AMTitan/Anime-Bot#usage)
- [Uptime](https://status.watchbot.app/bot/833682899202080818)

<h3>Dependency</h3>

- `Git`
- `Node.js`
- and just watch this https://www.youtube.com/watch?v=4X2qsZudLNY

<h3>Install</h3>

```
git clone https://github.com/AMTitan/Anime-Bot.git
cd Anime-Bot
```

Make a file called `Config.json` and inside put 
```json
{
  "Token": "(discord bot token)",
  "top": "(top.gg token)",
  "Owner_id": 123456789,
  "botlist": "(discordbotlist token)",
  "mongodb": "(something like mongodb+srv://<username>:<password>@<stuff>",
  "# If you dont want it to report delete the lines below": "null",
  "GITHUB_REPO": "(the repo)",
  "GITHUB_USERNAME": "(username)",
  "GITHUB_PERSONAL_ACCESS_TOKENS": "(token)"
}
```

Finally

```sh
cargo run --release
```

<h3>Usage</h3>

- a!help
