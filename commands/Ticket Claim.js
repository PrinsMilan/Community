const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "847217014572318750";

    if (!message.member.hasPermission("KICK_MEMBER")) return message.reply("❌Voor dit commando heb je `KICK_MEMBERS` nodig.");

    if (message.channel.parentID == categoryID) {

        // Create embed.
        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor("#00bbff")
            .setDescription("Het ticket is gemarkeerd als **Geclaimd**.")
            .setFooter(`Ticket geclaimd door ${message.author}`);

        // Channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "ticket-logs");
        if (!ticketChannel) return message.reply("❌ Logs Kanaal bestaat niet");
        
        //Voor in ticket
        var claimed = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor("#00bbff")
            .setDescription("Het ticket is gemarkeerd als **Geclaimd**.")
            .setFooter(`Ticket geclaimd door ${message.author}`);


        ticketChannel.send(embedCreateTicket);
        return message.channel.send(claimed);

    } else {

        message.channel.send("❌Gelieve dit command te doen bij een ticket.");

    }



}

module.exports.help = {
    name: "claim",
    category: "Tickets",
    description: "Claim een ticket"
}