const Discord = require("discord.js");

module.exports = {
  name: "disconnected",

  /**
   * @param {Discord.Client} client 
   */

  async execute(client) {
    client.logger(`MongoDB have been disconnected at ${new Date()}`.brightRed)
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