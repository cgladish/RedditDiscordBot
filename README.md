### Installation

RedditDiscordBot requires [Node.js](https://nodejs.org/) to run.

1. Create a [Reddit application](https://www.reddit.com/prefs/apps/).

2. Create a [Discord application and bot](https://discordapp.com/developers/applications) with the following permissions:

- Send Messages
- Embed Links
- View Channels

3. Create an auth.json file with the following content:

```json
{
  "discord": {
    "token": YOUR_DISCORD_BOT_TOKEN
  },
  "reddit": {
    "userAgent": "lewds-bot",
    "clientId": YOUR_REDDIT_APP_CLIENT_ID,
    "clientSecret": YOUR_REDDIT_APP_CLIENT_SECRET,
    "username": YOUR_REDDIT_USERNAME,
    "password": YOUR_REDDIT_PASSWORD
  }
}
```

4. Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
```
