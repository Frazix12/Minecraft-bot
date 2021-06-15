require('dotenv').config()
const token = process.env.TOKEN;

const PREFIX = '+';

 

express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
	res.send('MC SERVER BOT');
});

app.listen(port, () => {
	console.log(`Example app listening at Port: ${port}`);
});

const {Client, MessageEmbed } = require('discord.js');
const bot = new Client();


bot.on('ready', () => {
	console.log('Bot has come online.');
});

bot.on('message', message => {
	const ping = require('minecraft-server-util');

	let args = message.content.substring(PREFIX.length).split(' ');
	switch (args[0]) {
		case 'mc':
			if (!args[1]) return message.channel.send('TYPE A SERVER IP');
			if (!args[2])
				return message.channel.send(
					'TYPE A SERVER IP AND PORT E.G.(play.example.xyz 10000'
				);

			ping
				.status(args[1], {
					port: parseInt(args[2]),
					enableSRV: true,
					timeout: 5000
				}) // These are the default options
				.then(response => {
const Embed = new MessageEmbed()
.setTitle('Server Status')
.setColor('RANDOM')
.addField('Server IP', response.host)
.addField('Server Version', response.version)
.addField('Online Players', response.onlinePlayers)
.addField('Max Players', response.maxPlayers);

					message.channel.send(Embed);
				})
				.catch(error => {
					console.error(error);
				});
	}
});

bot.login(token);
