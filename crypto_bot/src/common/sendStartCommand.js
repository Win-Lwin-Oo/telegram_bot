module.exports = (ctx,bot) => {
    const message = `
    Welcome, this bot give you a cryptocurrency information.
        `;
    bot.telegram.sendMessage(ctx.chat.id, message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Crypto Prices", callback_data: "price" }
                    ],
                    [
                        { text: "Coin Market Cap ", url: "https://coinmarketcap.com/" }
                    ],
                    [
                        { text: "Info ", callback_data: "info" }
                    ]
                ]
            }
        }
    )
}
