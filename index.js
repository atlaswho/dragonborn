require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js

const client = new Discord.Client({ intents: JSON.parse(process.env.INTENTS) });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var banifbeg = process.env.BAN_IF_BEG == "true";

client.on("messageCreate", async (message) => {
  try {
    await message.delete();
  } catch (error) {
    console.log(error);
  }
  if (new RegExp(process.env.ROLE_TRIGGER, "i").test(message?.content)) {
    try {
      const { roles } = await message.guild.members.cache
        .find((member) => member.user.id == message.author.id);
      
      await roles.add(
        message.guild.roles.cache.find(
          (role) => role.name == process.env.ROLE
        )
      );
      
      await roles.add(
        message.guild.roles.cache.find(
          (role) => role.name == 'Gunter'
        )
      );
    } catch (error) {
      console.log(error);
    }
  } else if (banifbeg && /can i be a mod/i.test(message?.content)) {
    const coinflipresult = getRandomInt(1);
    if (coinflipresult) {
      console.log("promoting user to mod", message.author.username);
      const member = message.guild.members.cache.find(
        (member) => member.user.id == message.author.id
      );
      const role = message.guild.roles.cache.find(
        (role) => role.name == "Dungeon Master"
      );
      await member.roles.add(role);
    } else {
      console.log("promoting ban of user", message.author.username);
      try {
        await message.guild.bans.create(message.author.id);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
function getRandomInt(max) {
  return Math.round(Math.random() * max);
}
