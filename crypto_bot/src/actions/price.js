module.exports = (bot) => {
    bot.action('price', (ctx) => {
        const message = "Get price information, select one of the cryptocurrencies below";
        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "BTC", callback_data: "BTC-price" },
                            { text: "ETH", callback_data: "ETH-price" }
                        ],
                        [
                            { text: "BCH", callback_data: "BCH-price" },
                            { text: "LTC", callback_data: "LTC-price" }
                        ],
                        [
                            { text: "Back to menu", callback_data: "start" }
                        ]
                    ]
                }
            }
        )
    })
}
