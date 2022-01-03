const Telegraf = require('telegraf');

const bot = new Telegraf('5023632324:AAGjGs5eB1d4DAHJUEO-kChHDN9Dc1J2Alw');

bot.use((ctx, next) => {
    // console.log(ctx.chat)
    if (ctx.updateSubTypes[0] == "text") {
        // console.log(ctx.from.username + " said " + ctx.message.text);
        bot.telegram.sendMessage(ctx.chat.id, ctx.from.username + " said " + ctx.message.text);
        // bot.telegram.sendMessage(-765809207, ctx.from.username + " said " + ctx.message.text); // for only group chat
    } else if (ctx.updateSubTypes[0] == "sticker") {
        // console.log(ctx.from.username + " sent " + ctx.updateSubTypes[0]);
        bot.telegram.sendMessage(ctx.chat.id, ctx.from.username + " said " + ctx.message.text);
        // bot.telegram.sendMessage(-765809207, ctx.from.username + " said " + ctx.message.text); // for only group chat
    }
    next(); // no need to add ctx obj in next(), because I don't modify ctx obj
});

const helpMessage = `
Say something to me
/start - start the bot
/help  - command reference
`;

bot.start((ctx) => {
    ctx.reply('Hi I\'m Echo bot');
    ctx.reply(helpMessage);
});

const echoMessage = `
/start - start the bot
/echo text - print your text message
`;

bot.help((ctx) => {
    ctx.reply(echoMessage);
});

bot.command("echo", (ctx) => {
    const input = ctx.message.text;
    const inputArr = input.split(" ");
    // console.log(inputArr);
    let message = "";
    if (inputArr.length == 1) {
        message = "You said echo"
    } else {
        inputArr.shift(); // remove first element of array
        message = inputArr.join(" ");
    }

    ctx.reply(message);
});

bot.launch();
