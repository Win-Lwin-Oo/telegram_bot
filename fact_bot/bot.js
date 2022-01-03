const Telegraf = require('telegraf');
const bot = new Telegraf('YOUR_TELEGRAM_TOKEN');
const axios = require('axios');

// in this fact_bot test
// I face google sheet v3 turned down
// so, not complete this test

var id = '1hMRraeMELC0hOt3n9pWM05OkdPrVcSMM5dCMYpr8bBM';
var gid = '0';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;


bot.command(['start', 'help'], (ctx) => {
    const message = `
*Help references:*
`;
    // ctx.reply(message);
    bot.telegram.sendMessage(ctx.chat.id, message,
        {
            parse_mode: 'Markdown',
        }
    )
});

getData();

let dataStore = [];

async function getData() {
    try {
        let res = await axios.get(url);
        let data = res.data.substring(47).slice(0, -2);
        console.log(data);
        let jsonData = JSON.parse(data);
        jsonData.table.rows.forEach((item,row) => {
            // console.log('row=> ', index)
            // dataStore.push({row: index})
            let tempData = {};
            item.c.forEach((val,col) => {
                console.log('row=> ', row)
                console.log('col=> ', col)
                console.log('val=> ', val)
                console.log('___________')
                tempData = {row,col,val}
            })
            // dataStore.push(tempData);
            console.log(tempData);
        });
    } catch (error) {
        console.log(error);
    }
}

// bot.command('test', async (ctx) => {
//     await axios.get(url)
//     .then(res => {
//         console.log(res.data.substring(47).slice(0, -2));
//     }).catch(err => {
//         console.log(err);
//     })
// });

bot.launch();
