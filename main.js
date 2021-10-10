const { Client, Intents, Collection } = require('discord.js');
const { exec } = require('child_process');
const client = new Client({ intents: Object.values(Intents.FLAGS) });
const bot_token = 'BOT TOKEN HERE'
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { PassThrough } = require('stream');
const prefix = '!';

var today = new Date()
var day = today.getDay()
var hour = today.getHours()	
var minute = today.getMinutes()
var state = 'AM'

if(hour >= 12){
	state = 'PM'
}

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
	const channel = client.channels.cache.find(channel => channel.name === 'CHANNEL NAME HERE')
	
	if(hour > 12){
		newhour = hour - 12
		
	}
	const exampleEmbed = new MessageEmbed()
	.setColor('#6DFF5E')
	.setTitle('Bot Status')
	.addFields(
		{ name: 'Bot is Now Online!  <:green_circle:896616948257918986>', value: `Online at ${newhour}:${minute} ${state}`},
		
	)


    channel.send(exampleEmbed);
	console.log(`Logged in as ${client.user.tag}!`);
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
		
		case '!innocent':
			await msg.channel.send('https://tenor.com/view/amazing-world-of-gumball-gumball-crying-gumball-fast-forward-fast-forward-gif-dscify-gif-20832789');
			break;	
		default:
	}
	
	
	if(msg.content === 'close'){
	if(msg.author.id != 'ID HERE') return;
	
		var offtoday = new Date()
var offday = offtoday.getDay()
var offhour = offtoday.getHours()
var offminute = offtoday.getMinutes()
const channel = client.channels.cache.find(channel => channel.name === 'CHANNEL NAME HERE')

var onhour = offhour - hour 
var onminute = offminute - minute

if(onminute < 0){
	onhour -= 1 
	onminute += 60
	
}
	const endEmbed = new MessageEmbed()
	.setColor('#FF4242')
	.setTitle('Bot Status')
	.addFields(
		{ name: 'Bot is Now Offline!  <:red_circle:896436659699200060>', value: `Online for ${onhour} hours and ${onminute} minutes`},
		
	)
	channel.send(endEmbed).then(() => {
		client.destroy()
		})
			
				
	}
}

