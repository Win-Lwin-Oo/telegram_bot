const Telegraf = require('telegraf');
const bot = new Telegraf('5023632324:AAGjGs5eB1d4DAHJUEO-kChHDN9Dc1J2Alw');
const axios = require('axios');
const fs = require('fs');

bot.command(['start', 'help'], (ctx) => {
    const message = `
*Help references:*
/fortune - get fortune cookie
/cat - get random cat photo
/cat \`<text>\` - get cat photo with text caption
/dogbreeds - get all of dog breeds list
/dog \`<breed>\` - get dog breed image
`;
    // ctx.reply(message);
    bot.telegram.sendMessage(ctx.chat.id, message,
        {
            parse_mode: 'Markdown',
        }
    )
});

bot.command("fortune", async (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    await axios.get("http://yerkee.com/api/fortune")
        .then(res => {
            // console.log(res.data.fortune);
            ctx.reply(res.data.fortune);
        }).catch(err => {
            console.log(err);
        })
});

bot.command("cat", async (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    let input = ctx.message.text;
    let inputArr = input.split(" ");
    if (inputArr.length == 1) {
        try {
            const res = await axios.get("https://aws.random.cat/meow");
            ctx.replyWithPhoto(res.data.file);
        } catch (error) {
            console.log(error);
        }
    } else {
        inputArr.shift();
        input = inputArr.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
});

bot.command('dogbreeds', (ctx) => {
    let rawData = fs.readFileSync("./dogbreeds.json", "utf8");
    let data = JSON.parse(rawData);
    // console.log(data);

    let message = "Dog Breeds:\n";
    data.forEach(item => {
        message += `-${item}\n`
    });

    ctx.reply(message);
});

bot.command("dog", async (ctx) => {
    let input = ctx.message.text.split(" ");
    if (input.length == 1) {
        ctx.reply("You must give a dog breed as the second argument");
        return;
    }
    input.shift();
    let breedInput = input.join(" ");

    let rawData = fs.readFileSync("./dogbreeds.json", "utf8");
    let data = JSON.parse(rawData);

    if (data.includes(breedInput)) {
        await axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
            .then(res => {
                // console.log(res.data);
                ctx.replyWithPhoto(res.data.message);
            }).catch(err => {
                console.log(err);
            })
    } else {
        let suggestion = data.filter(item => {
            return item.startsWith(breedInput);
        })

        let message = "Did you mean:\n";
        suggestion.forEach(item => {
            message += `-${item}\n`
        });

        if (suggestion.length == 0) {
            ctx.reply("Can\'t find breed");
        } else {
            ctx.reply(message);
        }

    }
});

bot.launch();
