module.exports = (bot) => {
    bot.hears('API', (ctx) => {
        ctx.reply('This bot use cryptocompare API');
    })
}
