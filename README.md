### Installation

OwOBot requires [Node.js](https://nodejs.org/) to run.

1. Create a [Reddit application](https://www.reddit.com/prefs/apps/).

2. Create a [Discord application and bot](https://discordapp.com/developers/applications) with the following permissions:

- Send Messages
- Embed Links
- View Channels

3. Setup your .env file:

```
NODE_ENV=dev
COMMAND=command you want the bot to respond to
DISCORD_TOKEN=your discord bot token
REDDIT_CLIENT_ID=your reddit app client id
REDDIT_CLIENT_SECRET=your reddit app client secret
REDDIT_USERNAME=your reddit username
REDDIT_PASSWORD=your reddit password
```

4. Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run start:dev
```
