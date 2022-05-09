const Discord = require("discord.js");
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const sponsor_config = require(`${process.cwd()}/structures/botconfig/sponsor.json`);

module.exports = {
  name: "ready",
  once: true,

  /**
   * @param {Discord.Client} client
   */

  async execute(client) {
    try {
      try {
        client.logger(`Discord Bot is online!`.bold.brightGreen);

        client.logger(
          `Bot User: `.brightBlue + `${client.user.tag}`.blue + `\n` +
          `Guild(s): `.brightBlue + `${client.guilds.cache.size} Servers`.blue + `\n` +
          `Watching: `.brightBlue + `${Math.ceil(client.users.cache.size / 1000)}k Members`.blue + `\n` +
          `Prefix: `.brightBlue + `${process.env.PREFIX}`.blue + `\n` +
          `Commands: `.brightBlue + `${client.commands.size}`.blue + `\n` +
          `Slash Commands: `.brightBlue + `${client.slashCommands.size}`.blue + `\n` +
          `Discord.js: `.brightBlue + `v${Discord.version}`.blue + `\n` +
          `Node.js: `.brightBlue + `${process.version}`.blue + `\n` +
          `Plattform: `.brightBlue + `${process.platform} ${process.arch}`.blue + `\n` +
          `Memory: `.brightBlue + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`.blue
        );
      } catch {
        /* */
      }

      if (config.maintenance_mode) {
        client.user.setActivity(`On Maintenance Mode!`)
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
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
