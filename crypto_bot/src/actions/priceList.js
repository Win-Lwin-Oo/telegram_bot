module.exports = (bot,axios,api_key) => {
    let priceActionList = ["BTC-price", "ETH-price", "BCH-price", "LTC-price"];
    bot.action(priceActionList, async (ctx) => {
        // console.log(ctx.match);
        let symbol = ctx.match[0].split("-")[0];
        console.log(symbol);
        try {
            let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${api_key}`);
            // console.log(res.data);
            let data = res.data.DISPLAY[symbol].USD;
            let message = `
Symbol: ${symbol}
Price: ${data.PRICE}
Open: ${data.OPENDAY}
High: ${data.HIGHDAY}
Low:  ${data.LOWDAY}
Supply:  ${data.SUPPLY}
Market Cap:  ${data.MKTCAP}
    `;
            ctx.deleteMessage();
            bot.telegram.sendMessage(ctx.chat.id, message,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Back to price", callback_data: "price" }
                            ]
                        ]
                    }
                }
            )
        } catch (err) {
            console.log(err);
            ctx.reply("Encountered error");
        }
    });
}
