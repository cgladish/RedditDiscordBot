### Installation

OwOBot requires [Node.js](https://nodejs.org/) to run.

1. Create a [Reddit application](https://www.reddit.com/prefs/apps/).

2. Create a [Discord application and bot](https://discordapp.com/developers/applications) with the following permissions:

- Send Messages
- Manage Messages
- Embed Links
- View Channels

3. Download PostgreSQL and setup a database: https://www.postgresql.org/download/

4. Setup a Google APIs project and get an api key: https://console.developers.google.com/projectselector2/apis/dashboard

5. Download and install FFMPEG: https://ffmpeg.zeranoe.com/builds/

6. Setup your .env file:

```
NODE_ENV=development
COMMAND=command you want the bot to respond to
DISCORD_TOKEN=your discord bot token
REDDIT_CLIENT_ID=your reddit app client id
REDDIT_CLIENT_SECRET=your reddit app client secret
REDDIT_USERNAME=your reddit username
REDDIT_PASSWORD=your reddit password
DATABASE_URL=postgres://YourUserName:YourPassword@YourHost:5432/YourDatabase
YOUTUBE_API_KEY=your youtube api key
```

7. Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run start:dev
```
