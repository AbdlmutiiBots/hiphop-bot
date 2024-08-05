const { color, prefix, gtoken, barnd } = require(`../../config/bot.json`);
module.exports = {
  name: `ready`,
  run: (bot, Discord) => {
  console.clear();
  console.log(`${bot.user.username} Started Successfully`);
    console.log("My servers count is " + bot.guilds.cache.size)
  bot.user.setActivity(`${prefix}help`, {type: `LISTENING`});
  }
}
