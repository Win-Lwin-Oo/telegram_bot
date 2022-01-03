const Telegraf = require('telegraf');

const bot = new Telegraf('YOUR_TELEGRAM_TOKEN');

bot.command(['start', 'help'], (ctx) => {
    const message = `
    Help references:
/bagan - get photo of bagan
/dubai - get gif photo of dubai
/cities - get photo of cities
/citieslist - get text file of cities
/yangon - get location of yangon
`;
    ctx.reply(message);
});

bot.on("message", async (ctx, next) => {
    console.log(ctx);
    if (ctx.updateSubTypes[0] == "document") {
        try {
            const link = await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply('Your download link: ' + link);
        } catch (error) {
            console.log(error);
            ctx.reply(error.description);
        }
    } else if (ctx.updateSubTypes[0] == "photo") {
        try {
            const link = await bot.telegram.getFileLink(ctx.message.photo[2].file_id);
            ctx.reply('Your download link: ' + link);
        } catch (error) {
            console.log(error);
            ctx.reply(error.description);
        }
    }
    next();
});

/**
 * Supported file sources:
 * Url
 * File path
 * Existing file_id
 * Buffer
 * ReadStream
 */
// bot.command("test", (ctx) => {

//     // url
//     // bot.telegram.sendPhoto(ctx.chat.id, "https://via.placeholder.com/600/501fe1");

//     // file path
//     // bot.telegram.sendPhoto(ctx.chat.id, { source: "res/kalaw.jpeg" });

//     // file id from telegram server
//     bot.telegram.sendPhoto(ctx.chat.id, "AgACAgUAAxkBAAMVYc0kfxm-Z5MJOxbIje-4xe91MK8AAuexMRsWK2BWRAVK_ZyEN7YBAAMCAANzAAMjBA");
// });

bot.command("bagan", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    bot.telegram.sendPhoto(ctx.chat.id,
        {
            source: 'res/bagan.jpeg'
        },
        {
            reply_to_message_id: ctx.message.message_id
        }
    );
});

bot.command("dubai", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        {
            source: 'res/dubai.gif'
        },
        {
            reply_to_message_id: ctx.message.message_id
        }
    );
});

bot.command("cities", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    const cities = ["res/yangon.jpeg", "res/mandalay.jpeg", "res/pyinoolwin.jpeg"];
    const result = cities.map(city => {
        return {
            type: "photo",
            media: {
                source: city
            }
        }
    });
    bot.telegram.sendMediaGroup(ctx.chat.id, result);
});

bot.command("citieslist", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
    bot.telegram.sendDocument(ctx.chat.id,
        {
            source: "res/citieslist.txt"
        },
        {
            thumb: { source: "res/kalaw.jpeg" }
        }
    );
});

//location
bot.command("yangon", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "find_location");
    bot.telegram.sendLocation(ctx.chat.id, 16.8409, 96.1735);
});

bot.launch();
