# <img src="https://github.com/AMTitan/Anime-Bot/raw/master/AnimeBot.png" alt="icon" width="50px"/> Anime-Bot by AMTitan#4994

I have spent [![wakatime](https://wakatime.com/badge/github/AMTitan/Anime-Bot.svg)](https://wakatime.com/badge/github/AMTitan/Anime-Bot) coding this so a donation would be nice! 😄 thank you!

<h3>Links</h3>

- [Dependency](https://github.com/AMTitan/Anime-Bot#dependency)
- [Linux](https://github.com/AMTitan/Anime-Bot#linux)
- [Windows](https://github.com/AMTitan/Anime-Bot#windows)
- [Mac](https://github.com/AMTitan/Anime-Bot#mac)
- [Usage](https://github.com/AMTitan/Anime-Bot#usage)

<h3>Dependency</h3>

- `Git`
- `Node.js`
- and just watch this https://www.youtube.com/watch?v=4X2qsZudLNY

<h3>Linux</h3>

```
git clone https://github.com/AMTitan/Anime-Bot.git
cd Anime-Bot
npm i
```

Make a file called `.env` and inside put 
```
Token=(discord bot token)
top=(top.gg token)
botlist=(discordbotlist token)
mongodb=(something like mongodb+srv://<username>:<password>@<stuff>)
```

Finally
```
npm run dev
```

<h3>Windows</h3>

```
git clone https://github.com/AMTitan/Anime-Bot.git
cd Anime-Bot
npm i
```

- Open control panel and search for `environment variables`
- Click `edit the system environment variables`
- Click `Environment Variables...`
- Then on `System variables` click `New...`
- In `Variable name` type `Token`
- In `Variable Value` put your discord bot token
- Then click `Ok`
- Do these same steps for the below environment variables
```
top=(top.gg token)
botlist=(discordbotlist token)
mongodb=(something like mongodb+srv://<username>:<password>@<stuff>)
```

- Then restart the computer

Finally
```
npm run dev
```

<h3>Mac</h3>

```
git clone https://github.com/AMTitan/Anime-Bot.git
cd Anime-Bot
npm i
```

Then
```
export Token=(discord bot token)
export top=(top.gg token)
export botlist=(discordbotlist token)
mongodb=(something like mongodb+srv://<username>:<password>@<stuff>)
```

Finally
```
npm run dev
```

<h3>Usage</h3>

- a!help
