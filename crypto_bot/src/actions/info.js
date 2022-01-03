module.exports = (bot) => {
    bot.action('info', (ctx) => {
        ctx.answerCbQuery('Info');
        ctx.telegram.sendMessage(ctx.chat.id, "Basic Info",
            {
                reply_markup: {
                    keyboard: [
                        [
                            { text: 'Credits' },
                            { text: 'API' }
                        ],
                        [
                            { text: '/help' },
                            { text: 'Remove keyboard'}
                        ],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }
        )
    })
}
