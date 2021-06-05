const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var serverEmbed = new discord.MessageEmbed()
            .setDescription("Community:)")
            .setColor("#00bbff")
            .addField("Bot naam", client.user.username)
            .addField("Join datum:", message.member.joinedAt)
            .addField("Aantal leden", message.guild.memberCount);

        return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo",
    category: "Informatie",
    description: "Serverinfo"
}