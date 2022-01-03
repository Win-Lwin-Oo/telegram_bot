const Telegraf = require('telegraf');

const bot = new Telegraf('YOUR_TELEGRAM_TOKEN');

// use middleware
// bot.use((ctx, next) => {
//     ctx.state.apple = 5;
//     console.log(ctx);
//     ctx.reply("You use the bot");
//     next(ctx);
// });

// telegram common command
// bot.start((ctx) => {
//     // ctx.reply(ctx.from.first_name + " have entered the start command and it is a " + ctx.updateSubTypes[0]);
//     // console.log(ctx);
//     // console.log('from=> ', ctx.from);
//     // console.log('chat=> ', ctx.chat);
//     // console.log('message=> ', ctx.message);
//     // console.log('updateSubTypes=> ', ctx.updateSubTypes);
//     console.log('ctx state=> ', ctx.state.apple);
//     ctx.reply(ctx.state.apple);
// });

// bot.help((ctx) => {
//     ctx.reply("You have entered the help command 👋")
// });

// bot.settings((ctx) => {
//     ctx.reply("You have entered the settings command ✊")
// });

// // custom command
// bot.command(["test", "Test", "TEST"], (ctx) => {
//     ctx.reply("Hello World");
// });


// bot.hears("cat", (ctx) => {
//     ctx.reply("Meow..")
// });

// bot.on("sticker", (ctx) => {
//     ctx.reply("This is a sticker message");
// });

// handle username eg: @botfather
// bot.mention("botfather", (ctx) => {
//     ctx.reply("mention method");
// });

// not work clip:14
// bot.phone("+959 778 633 987", (ctx) => {
//     ctx.reply("Phone mention")
// });

//hashtag eg: #hash
// bot.hashtag("hash", (ctx) => {
//     ctx.reply("Hashtag mention");
// });

bot.command("start", (ctx) => {
    // ctx.reply(text, [extra])
    // ctx method shortcuts doesn't require chatId
    ctx.reply("Hello World",
        {
            parse_mode: 'Markdown',
            disable_notification: false
        }
    );

    // bot.telegram.sendMessage(chatId, text, [extra])
    // bot,telegram.sendMessaeg require chatId
    bot.telegram.sendMessage(ctx.chat.id, "Hello World !",
        {
            parse_mode: 'Markdown',
            disable_notification: true
        }
    )
});


bot.launch();
