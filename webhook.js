const axios = require('axios');
const { MessageEmbed } = require("discord.js")

function longPoll(client) {
    let checkpoint = new Date();

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dannus.net/api/plugins/receive');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

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

                const embed = new MessageEmbed().setTitle("New Notification");
                const fields = new Array();
                for(var obj in data) {
                    if (obj == "date" || obj == "discord_channel") continue;
                    fields.push({name: obj, value: data[obj] + "     ", inline: true});
                }
                embed.setFields(fields);
                embed.setTimestamp(data.date);
                embed.setColor("#50bc14");
                embed.setThumbnail("https://dannus.net/media/logo.png");
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