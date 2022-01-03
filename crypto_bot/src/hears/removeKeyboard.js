module.exports = (bot) => {
    bot.hears('Remove keyboard', (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, "Remove keyboard",
            {
                reply_markup: {
                    remove_keyboard: true
                }
            }
        )
    })
}
