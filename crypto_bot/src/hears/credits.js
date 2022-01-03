module.exports = (bot) => {
    bot.hears('Credits', (ctx) => {
        ctx.reply('This bot was made by @name');
    })
}
