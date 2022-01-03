require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TOKEN);
const axios = require('axios');
const api_key = process.env.API_KEY;

const startCommand = require('./src/commands/start');
startCommand(bot);

const startAction = require('./src/actions/start');
startAction(bot);

const priceAction = require('./src/actions/price');
priceAction(bot);

const priceList = require('./src/actions/priceList');
priceList(bot, axios, api_key);

const info = require('./src/actions/info');
info(bot);

const help = require('./src/commands/help');
help(bot);

const credits = require('./src/hears/credits');
credits(bot);

const api = require('./src/hears/api');
api(bot);

const removeKeyboard = require('./src/hears/removeKeyboard');
removeKeyboard(bot);

// bot.command('start', (ctx) => {
//     sendStartCommand(ctx);
// });

// bot.action('start', (ctx) => {
//     ctx.deleteMessage();
//     sendStartCommand(ctx);
// })

// function sendStartCommand(ctx) {
//     const message = `
// Welcome, this bot give you a cryptocurrency information.
//     `;
//     bot.telegram.sendMessage(ctx.chat.id, message,
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "Crypto Prices", callback_data: "price" }
//                     ],
//                     [
//                         { text: "Coin Market Cap ", url: "https://coinmarketcap.com/" }
//                     ],
//                     [
//                         { text: "Info ", callback_data: "info" }
//                     ]
//                 ]
//             }
//         }
//     )
// }

// bot.action('price', (ctx) => {
//     const message = "Get price information, select one of the cryptocurrencies below";
//     ctx.deleteMessage();
//     bot.telegram.sendMessage(ctx.chat.id, message,
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "BTC", callback_data: "BTC-price" },
//                         { text: "ETH", callback_data: "ETH-price" }
//                     ],
//                     [
//                         { text: "BCH", callback_data: "BCH-price" },
//                         { text: "LTC", callback_data: "LTC-price" }
//                     ],
//                     [
//                         { text: "Back to menu", callback_data: "start" }
//                     ]
//                 ]
//             }
//         }
//     )
// })

// let priceActionList = ["BTC-price", "ETH-price", "BCH-price", "LTC-price"];
// bot.action(priceActionList, async (ctx) => {
//     // console.log(ctx.match);
//     let symbol = ctx.match[0].split("-")[0];
//     console.log(symbol);
//     try {
//         let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${api_key}`);
//         // console.log(res.data);
//         let data = res.data.DISPLAY[symbol].USD;
//         let message = `
// Symbol: ${symbol}
// Price: ${data.PRICE}
// Open: ${data.OPENDAY}
// High: ${data.HIGHDAY}
// Low:  ${data.LOWDAY}
// Supply:  ${data.SUPPLY}
// Market Cap:  ${data.MKTCAP}
// `;
//         ctx.deleteMessage();
//         bot.telegram.sendMessage(ctx.chat.id, message,
//             {
//                 reply_markup: {
//                     inline_keyboard: [
//                         [
//                             { text: "Back to price", callback_data: "price" }
//                         ]
//                     ]
//                 }
//             }
//         )
//     } catch (err) {
//         console.log(err);
//         ctx.reply("Encountered error");
//     }
// });

// bot.action('info', (ctx) => {
//     ctx.answerCbQuery('Info');
//     ctx.telegram.sendMessage(ctx.chat.id, "Basic Info",
//         {
//             reply_markup: {
//                 keyboard: [
//                     [
//                         { text: 'Credits' },
//                         { text: 'API' }
//                     ],
//                     [
//                         { text: '/help' },
//                         { text: 'Remove keyboard'}
//                     ],
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true
//             }
//         }
//     )
// })

// bot.hears('Credits', (ctx) => {
//     ctx.reply('This bot was made by @name');
// })

// bot.hears('API', (ctx) => {
//     ctx.reply('This bot use cryptocompare API');
// })

// bot.command('help', (ctx) => {
//     sendStartCommand(ctx);
// });

// bot.hears('Remove keyboard', (ctx) => {
//     ctx.telegram.sendMessage(ctx.chat.id, "Remove keyboard",
//         {
//             reply_markup: {
//                 remove_keyboard: true
//             }
//         }
//     )
// })


// bot.command("test", (ctx) => {
//     bot.telegram.sendMessage(ctx.chat.id, "Welcom",
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "Click me", callback_data: "one" }
//                     ]
//                 ]
//             }
//         }
//     )
// })

// bot.action('one', (ctx) => {
//     ctx.answerCbQuery("Hello World");
//     ctx.reply('You click the button');
// })

// bot.command("mainmenu", (ctx) => {
//     bot.telegram.sendMessage(ctx.chat.id, "Main menu",
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "See fruit list", callback_data: "fruit" }
//                     ],
//                     [
//                         { text: "See meat list", callback_data: "meat" }
//                     ]
//                 ]
//             }
//         }
//     )
// })

// bot.action('fruit', (ctx) => {
//     ctx.deleteMessage();
//     const fruitList = `
// List of fruit:
// - Apple
// - Orange
// - Mango
// `;
//     bot.telegram.sendMessage(ctx.chat.id, fruitList,
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "Back to menu", callback_data: "menu" }
//                     ]
//                 ]
//             }
//         }
//     )
// })

// bot.action('menu', (ctx) => {
//     ctx.deleteMessage();
//     bot.telegram.sendMessage(ctx.chat.id, "Main menu",
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: "See fruit list", callback_data: "fruit" }
//                     ],
//                     [
//                         { text: "See meat list", callback_data: "meat" }
//                     ]
//                 ]
//             }
//         }
//     )
// })

// bot.action('meat', (ctx) => {
//     ctx.reply('You click meat button');
// })

bot.launch();
