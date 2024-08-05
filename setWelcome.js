const { color } = require(`../../config/bot.json`);
module.exports = {
  name: `setWelcome`,
  description: `Set welcome message`,
  category: 'Owner',
  aliases: ['welcome'],
usage: `h?setWelcome <msg>`,
  example: `h?setWelcome Hello (user)!`,
  run: (lb, lbargs, bot, Discord, db) => {
    if(lb.member.roles.cache.some(a => a.id === '927297867528437801')) {
      db.set('welcome_msg', lbargs);
      lb.react('✅')  
    }
  },
};