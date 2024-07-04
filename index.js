require('dotenv').config();
const {Telegraf} = require('telegraf');
const express = require('express');
const app = express();
const axios = require('axios');
// const ctrl = require("./Controller/controller");
const service = require("./Services/service");
const DB = require("./DB");
const asyncERR = require('express-async-errors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;


const bot = new Telegraf(process.env.TELEGRAM_KEY);


// ------------------------------------------------------------------
// DB CONNECTION

DB.connect((err) => {
    if(err) throw err;
    console.log("PG DB Connected Successfully!");
    app.listen( port, () => {
        console.log(`server started at ${port}`);
    });
})


// ------------------------------------------------------------------
// ROUTES

app.use(bodyParser.json());

app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong...')
})

app.get("/", (req,res) => {
    res.redirect('https://t.me/Affliate_earn_bot');
});

// app.get("/go", ctrl);
//-----

// ---------------------------------------------------------------------------------------------------
// BOT FUNCTIONS

const websiteUrl = 'https://affliate-earn.onrender.com/';

bot.start(async (ctx) => {
  try {
    // Send an HTTP GET request to your website
    const response = await axios.get(websiteUrl);
    if (response.status === 200) {
      ctx.reply('Website is now active!');
        let affectedrows = await service.insertTELUser(ctx)

    } else {
      ctx.reply('Failed to wake up the website.');
    }
  } catch (error) {
    ctx.reply('Error while trying to wake up the website.');
    console.error(error);
  }
});


bot.command('whatAll', async (msg) => {
    let users = await service.users();
    console.log("users" + users)
    msg.reply(users)
})

bot.command('what', async (msg) => {

    let user = await service.user(msg.chat.id)

    if(user == undefined)
        msg.reply("User not found for id: "+ msg.chat.id)
    else
        msg.reply(user)
        console.log("user" + user)

})


// ---------------------------------------------------------------------------------------------------
// BALANCE
bot.command('balance', async (msg) => {
    let bal = await service.balance(msg)

    if(bal != undefined)
        msg.reply('Balance: ' + bal['balance']);
    else
        msg.reply("Error..")
})


// ---------------------------------------------------------------------------------------------------
// WITHDRAW
bot.command('withdraw', (msg) => {
    const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng4YnJ2NTJzZHZ3MzRnMGVqejM3anQ0ZGo2OXI3bzR1cjdveW5kMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HeDrk9Gt5nKZAgVsue/giphy.gif'; // Replace with your GIF URL
    // msg.sendDocument(gifUrl).catch(console.error);

    msg.sendAnimation(gifUrl, {
        caption: '\nComing sooooon...🦖\n',
        reply_markup: {
            inline_keyboard: [
                /* Inline buttons. 2 side-by-side */
                [ { text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" } ],

                /* One button */
                [ { text: "Next", callback_data: "next" } ],
                
                /* Also, we can have URL buttons. */
                [ { text: "Open in browser", url: "telegraf.js.org" } ]
            ]
        }
    });
})



// ---------------------------------------------------------------------------------------------------
// TASK

bot.command('task', (msg) => {

    const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbng4YnJ2NTJzZHZ3MzRnMGVqejM3anQ0ZGo2OXI3bzR1cjdveW5kMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HeDrk9Gt5nKZAgVsue/giphy.gif'; // Replace with your GIF URL

    msg.sendAnimation(gifUrl, {
        caption: 'Today Tasks ℹ️ \n\nComplete each task & enter the id\'s \n\n🤖⚔️',
        reply_markup: {
            inline_keyboard: [

                [ { text: "Task 1 🎯", url: "http://xnxx.com" } ],
                [ { text: "Task 2 🎯", url: "http://xnxx.com" } ],
                [ { text: "Task 3 🎯", url: "http://xnxx.com" }, { text: "Task 4 🎯", url: "http://xnxx.com" } ],
                [ { text: "Task 5 🎯", url: "http://xnxx.com" } ]

            ]
        }
    });
});

//--------------------------------------------------------------------------

// bot.use((msg) => {
//     msg.reply('Hello 🦖')
// })
// bot.start((msg) => {
//     msg.reply('Hello 🦖')
// })

// bot.help((msg) => {
//     msg.reply('No fear. Because I\'m here');
// })

// bot.command('what', (msg) => {
//     msg.reply('It is affliate earning bot, You can earn money through completing tasks daily.');
// })

// bot.command('time', (msg) => {
//     msg.reply(Date().toLocaleString());
// })

// bot.hears(['HI','hi','Hi','Hello','hello'], (msg) => {
//     msg.reply('Hello 🦖, It is affliate earning bot, You can earn money through completing tasks daily.');
// })

// bot.on(['photo','sticker','gif'], (msg) => {
//     msg.reply('Nice 😁');
// })



bot.launch();
