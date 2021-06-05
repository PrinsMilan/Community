const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const database = require("./database.json");
const mysql = require("mysql");
const fs = require("fs");
const { isFunction } = require("util");

const client = new discord.Client();
const activeSongs = new Map();
client.commands = new discord.Collection();

client.login("ODQ4MjI4OTgwNjU4Mjc0MzQ1.YLJkzA.KqDNu73x1gS1CtGdq_xLIDB9FoU");

var con = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database
});

//  Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");


    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });
});



client.on("ready", async () => {

    console.log(`${client.user.username} is online. `);

    client.user.setActivity("Community:) ", {type: "STREAMING", url: "https://www.twitch.tv/MilanKnol"});

});



// var swearWords = ["koe", "kalf", "varken"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    // var msg = message.content.toLowerCase();

    // for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete({ timeout: 3000 }));

    //     }

    // }


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var senteceUser = "";
    var amountSwearWords = 0;

    for (let y = 0; y < messageArray.length; y++) {

        const word = messageArray[y].toLowerCase();

        var changeWord = "";

        for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

            if (word.includes(swearWords["vloekwoorden"][i])) {

                changeWord = word.replace(swearWords["vloekwoorden"][i], "******");

                senteceUser += " " + changeWord;

                amountSwearWords++;

            }

        }

        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }

    }

    if (amountSwearWords != 0) {

        message.delete();
        message.channel.send(senteceUser);
        message.channel.send("❌Vloeken is niet toegestaan hier!");
    }
    
    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    //  Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    var options = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, options);

});

bot.login(proces.env.token);