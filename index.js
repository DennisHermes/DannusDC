const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const webhook = require('./webhook');

const client = new Client({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES] , partials : ['CHANNEL', 'MESSAGE']})

//on ready
client.once('ready', () => {
	console.log('[Dannus] Done loading!');

	webhook.longPoll(client);
});

//Login to discord
client.login(token);
