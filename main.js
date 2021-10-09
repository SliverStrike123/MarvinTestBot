const { Client, Intents, Collection } = require('discord.js');
const { exec } = require('child_process');
const client = new Client({ intents: Object.values(Intents.FLAGS) });
const bot_token = 'BOT TOKEN HERE'

const fs = require('fs');
const { PassThrough } = require('stream');
const prefix = '!';

var today = new Date()
var day = today.getDay()
var hour = today.getHours()
var state = 'AM'

if(hour>=12){
	state = 'PM' 
	}
	
if(hour	> 12){
	hour -= 12
	}
	
var minute = today.getMinutes()

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message =>{
	dumbAssStuff(message)
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache.get("CHANNEL ID HERE").send(`Started at ${hour}:${minute}${state}`);
});

client.login(bot_token)
/*
*
*
* DUMB ASS STUFF IS NOW HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*
*/
const dumbAssStuff =async (msg) => {
	
	switch (msg.content){
		case '!guoba':
			await msg.channel.send('https://tenor.com/view/guoba-genshin-impact-happy-vibing-cute-gif-23243750');
			break;
			
		case '!wooper':
			await msg.channel.send('https://tenor.com/view/wooper-pokemon-woopersupremacy-ilovewooper-papapa-gif-22271720');
			break;	
			
		case '!wednesday':
			await msg.channel.send('https://tenor.com/view/wooper-wednesday-wooper-wednesday-pokemon-gif-21444101');
			break;
		default:
	}
	if(msg.content === 'close'){
		if(msg.author.id !== 'DISCORD USER ID HERE') return;  
			await client.channels.cache.get("CHANNEL ID HERE").send(`Closed at ${hour}:${minute}${state}`).then (() =>{
			  client.destroy();
				})
			}
}

