module.exports = (bot) => {
    const sendStartCommand = require('../common/sendStartCommand');
    bot.command('help', (ctx) => {
        sendStartCommand(ctx, bot);
    });
}
