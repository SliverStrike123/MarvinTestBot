const { Client, Intents } = require('discord.js');
const { exec } = require('child_process');
const client = new Client({ intents: Object.values(Intents.FLAGS) });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
var today = new Date()
var day = today.getDay()
var time = today.getHours()

client.on('messageCreate', (msg) => {
 
 //dumb ass stuff
 switch (msg.content){
	 
	case '!guoba':
		msg.channel.send('https://tenor.com/view/guoba-genshin-impact-happy-vibing-cute-gif-23243750');
		break;
		
	case '!wooper':
		msg.channel.send('https://tenor.com/view/wooper-pokemon-woopersupremacy-ilovewooper-papapa-gif-22271720');
		break;	
		
	case '!wednesday':
		msg.channel.send('https://tenor.com/view/wooper-wednesday-wooper-wednesday-pokemon-gif-21444101');
		break;	
}
   
  //Restart command
  if(msg.content === 'restart'){
  if(msg.author.id !== '226298201773178884') return;  
	msg.channel.send('Restarting!').then (() =>{
		client.destroy();
			})
		}
  });

