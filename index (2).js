const Discord = require('discord.js');

const fs = require('fs');
const efolder = fs.readdirSync('./events');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES]});
const database = require('st.db');
const db = new database({path: 'database/db.json'});
const {prefix} = require(`./config/bot.json`);
bot.config = require(`./config/bot.json`);
bot.commands = new Discord.Collection();
 const folders = fs.readdirSync('./commands');
 for (const folder of folders) {
   const files = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
     for(const file of files) {
       const command = require(`./commands/${folder}/${file}`);
	       bot.commands.set(command.name, command);
 }
 }

bot.on('interactionCreate', lb => {
  if(lb.isSelectMenu()) {
    if(!lb.guild.id === "855466380052791306") return; 
    if(lb.customId === "selectRoles") {
      if(lb.values[0] === "rap") {
        const role = lb.guild.roles.cache.get('927295878643990699');
const member = lb.guild.members.cache.get(lb.user.id);
        if(member.roles.cache.some(role => role.id === '927295878643990699')) {
          member.roles.remove(role);
  lb.reply({content: "Seems like you don't need it, so i take it", ephemeral: true})
        } else {
member.roles.add(role);
  lb.reply({content: "Cool. Now you have the rap role!\nto remove it click on \"Rap\" option agian.", ephemeral: true})
        }
} else if(lb.values[0] === "trap") {
     const role = lb.guild.roles.cache.get('927295881269616660');
const member = lb.guild.members.cache.get(lb.user.id);
        if(member.roles.cache.some(role => role.id === '927295881269616660')) {
          member.roles.remove(role);
  lb.reply({content: "Seems like you don't need it, so i take it", ephemeral: true})
        } else {
member.roles.add(role);
  lb.reply({content: "Cool. Now you have the trap role!\nto remove it click on \"Trap\" option agian.", ephemeral: true})
        }
      } else if(lb.values[0] === "rnp") {
        const role = lb.guild.roles.cache.get('927295880309112852');
const member = lb.guild.members.cache.get(lb.user.id);
        if(member.roles.cache.some(role => role.id === '927295880309112852')) {
          member.roles.remove(role);
  lb.reply({content: "Seems like you don't need it, so i take it", ephemeral: true})
        } else {
member.roles.add(role);
  lb.reply({content: "Cool. Now you have the r&b role!\nto remove it click on \"R&B\" option agian.", ephemeral: true})
  }
      }
    }
  }
})

 bot.on('messageCreate', lb => {
  const [cmd] = lb.content.split(' ');
  if(!cmd.toLowerCase().startsWith(prefix) || lb.author.bot) return;
  const lbargs = lb.content
  .split(' ')
  .slice(1)
  .join(' ');
     bot.commands.find(command => {
if(command.name == cmd.toLowerCase().slice(prefix.length) || command.aliases && command.aliases.includes(cmd.slice(prefix.length))) return command.run(lb, lbargs, bot, Discord, db);
});
});

for (let folder of efolder) {
  let efile = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
  for (let file of efile) {
  let event = require(`./events/${folder}/${file}`);
  if(event.once) {
    bot.once(event.name, (...args) => event.run(...args, bot, Discord));
  } else {
    bot.on(event.name, (...args) => event.run(...args, bot, Discord));
  }
  }};

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(bot);

tempChannels.registerChannel("927528328737480715", {
    childCategory: "927295885602349166",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 0,
    childFormat: (member, count) => `#${count} - ${member.user.username}`
});

bot.login()