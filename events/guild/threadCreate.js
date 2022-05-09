const Discord = require("discord.js");

module.exports = {
  name: "threadCreate",

  /**
   * @param {Discord.Client} client
   */

  async execute(client, thread) {
    try {
      if (thread.joinable && !thread.joined) {
        await thread.join();
      }
    } catch (e) {
      console.log(String(e).grey)
    }

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