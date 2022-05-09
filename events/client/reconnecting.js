const Discord = require("discord.js");

module.exports = {
  name: "reconnecting",

  /**
   * @param {Discord.Client} client
   */

  async execute(client) {
    client.logger(`Reconnceting at ${new Date()}.`.bgYellow.black);
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