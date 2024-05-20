const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        
        const embed = new EmbedBuilder().setTitle("Pong 🏓");
        embed.addFields({name: "Latency", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true});
        embed.setColor("#50bc14");
        embed.setTimestamp();
        embed.setThumbnail("https://dannus.net/media/logo.png");
        interaction.reply({ embeds: [embed] });

    },
};