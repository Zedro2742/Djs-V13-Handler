const Discord = require("discord.js");

module.exports = {
  name: "shardResume",

  /**
   * @param {Discord.Client} client
   */

  async execute(client, id, replayedEvents) {
    client.logger(`Shard #${id} Resumed`.green)
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