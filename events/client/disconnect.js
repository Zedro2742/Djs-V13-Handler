const Discord = require("discord.js");

module.exports = {
    name: "disconnect",

    /**
     * @param {Discord.Client} client
     */

    async execute(client) {
        client.logger(`You have been disconnected at ${new Date()}.`.dim);
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