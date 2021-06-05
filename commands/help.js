const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (client, message, args) => {

    // try {

    //     var text = "**YT BOT** \n\n **__Commands__** \n !hallo - Geeft een hallo terug. \n !info - Geeft info.";

    //     message.author.send(text);

    //     message.reply("Alle commands kan je vinden in je prive berichten");

    // } catch (error) {
    //     message.reply("Er is iets fout gelopen");
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    client.commands.forEach(command => {

        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category
        }

        commandList.push(constructor);

    });

    var response = "**Bot commands**\n\n";
    var general = "**__Algemeen__**\n";
    var info = "\n**__Informatie__**\n";
    var Ticket = "\n**__Tickets__**\n";
    var Moderator = "\n**__Moderator__**\n";

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "Algemeen") {

            general += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if(command["category"] == "Informatie"){

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if(command["category"] == "Tickets"){

            Ticket += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if(command["category"] == "Moderator"){

        Moderator += `${prefix}${command["name"]} - ${command["description"]}\n`;

        }

    }

    response += general;
    response += info;
    response += Ticket;
    response += Moderator;

    message.channel.send(response).then(() => {
        console.log("")
    });

}

module.exports.help = {
    name: "cmds",
    description: "Geeft al de verschillende commands",
    category: "Algemeen"
}