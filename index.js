require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({ intents: JSON.parse(process.env.INTENTS) });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on ('messageCreate',(message)=>{
    if (message?.content==process.env.ROLE_TRIGGER)
    message.guild.members.cache.find(member => member.user.id == message.author.id)
      .roles.add(message.guild.roles.cache.find(role => role.name==process.env.ROLE))
})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token