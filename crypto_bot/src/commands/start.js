module.exports = (bot) => {
    const sendStartCommand = require('../common/sendStartCommand');
    bot.command('start', (ctx) => {
        sendStartCommand(ctx,bot);
    });
}
