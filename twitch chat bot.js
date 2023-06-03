const tmi = require('tmi.js');
const reputation ={};
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'bot_name',
		password: 'oauth: code'
	},
	channels: [ 'channelname' ]
});

let viewers = [];
let onAirViewers = [];

client.connect().catch(console.error);

client.on('join', (channel, username, self) => {
    if (!self) {
        viewers.push(username);
        console.log(`${username} joined the channel.`);
    }
});
client.on('part', (channel, username, self) => {
    if (!self) {
        viewers = viewers.filter(viewer => viewer !== username);
        console.log(`${username} left the channel.`);
    }
});

client.on('message', (channel, tags, message, self) => {
	if(self) return;
    switch(message.toLowerCase()){
        case 'hi':
            client.say(channel, `@${tags.username}, hi, welcome! What's up.`);
            break;
        case 'nickname':
            client.say(channel, `info`);
            break;
        case '!yt':
            client.say(channel, `youtube.com`);
            break;
        case '!tiktok':
            client.say(channel, `tiktok.com`);
            break;
        case '!insta':
            client.say(channel, `instagram.com`);
            break;
        case '!twitter':
            client.say(channel, `twitter.com`);
            break;      
        case '!dc':
            client.say(channel, `You can join our discord server to have a pleasant time...`);
            break;
        case '!prime':
            client.say(channel, `You can subscribe with Amazon Prime for $14.99...`);
            break;   
        case '!donate':
            client.say(channel, `@${tags.username} You can support by donating`);
            break;
        
        }
       
            
            
});

client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    const args = message.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
        case '!dice':
            const min = 1;
            const max = 6;
            const result = Math.floor(Math.random() * (max - min + 1)) + min;
            client.say(channel, `${userstate['username']} rolled a ${result}.`);
            break;
        case '!blackjack':
            // your blackjack game logic here
            break;
        case '!bomb':
            // your bomb game logic here
            break;
        case '!drop':
            // your drop game logic here
            break;
        case '!lovehate':
            const loveHateResult = Math.random() >= 0.5 ? 'love' : 'hate';
            client.say(channel, `${userstate['username']} the channel ${loveHateResult}!`);
            break;
        case '!onair':
            onAirViewers.push(userstate['username']);
            break;
        default:
            break;
    }


});

