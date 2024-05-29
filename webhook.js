const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

function longPoll(client) {
    let checkpoint = new Date();

    const fetchData = async (retries = 5, delay = 5000) => {
        try {
            const response = await axios.get('https://dannus.net/api/plugins/receive');
            return response.data;
        } catch (error) {
            if (retries === 0) {
                console.error('Error fetching data:', error);
                throw error;
            } else {
                console.warn(`Retrying... (${retries} retries left)`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchData(retries - 1, delay);
            }
        }
    };

    const poll = async () => {
        try {
            const data = await fetchData();
            const messageDate = new Date(data.date);
            if (messageDate > checkpoint) {
                checkpoint = messageDate;

                const channel = client.channels.cache.get(data.discord_channel);
                if (!channel) {
                    console.error('Channel not found');
                    return;
                }

                const embed = new EmbedBuilder()
                    .setTitle("New DannuSecurity Notification")
                    .setTimestamp(new Date(data.date))
                    .setColor("#50bc14")
                    .setThumbnail("https://dannus.net/media/logo.png");

                const fields = [];
                for (const obj in data) {
                    if (obj === "date" || obj === "discord_channel") continue;
                    fields.push({ name: obj, value: `${data[obj]} `, inline: true });
                }
                embed.addFields(fields);

                channel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error during polling:', error);
        }
    };

    setInterval(poll, 10000);
}

module.exports = {
    longPoll: longPoll
};