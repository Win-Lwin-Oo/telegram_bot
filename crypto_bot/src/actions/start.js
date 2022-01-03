module.exports = (bot) => {
    const sendStartCommand = require('../common/sendStartCommand');
    bot.action('start', (ctx) => {
        ctx.deleteMessage();
        sendStartCommand(ctx,bot);
    })
}
