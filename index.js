const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES] , partials : ['CHANNEL', 'MESSAGE']})


//on ready
client.once('ready', () => {
	console.log('[Dannus] Done loading!');
});

//Login to discord
client.login(token);
