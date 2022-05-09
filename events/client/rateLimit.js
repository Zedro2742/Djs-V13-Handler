const Discord = require("discord.js");

module.exports = {
    name: "rateLimit",

    /**
     * @param {Discord.Client} client
     */

    async execute(client, rateLimitData) {
        client.logger(JSON.stringify(rateLimitData).grey.italic.dim);
    }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/yHdne85PvM
 * @INFO
 * Work for Milanio Development | https://discord.gg/yHdne85PvM
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */