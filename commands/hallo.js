const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("Elianus")


}

module.exports.help = {
    name: "elian",
    description: "Bot antwoord:",
    category: "Moderator"
}