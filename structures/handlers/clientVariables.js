const Discord = require("discord.js");
const config = require("../botconfig/config.json");

/**
 * @param {Discord.Client} client 
 */

module.exports = async (client) => {

    client.commands = new Discord.Collection();
    client.slashCommands = new Discord.Collection();
    client.events = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.cooldowns = new Discord.Collection();
    client.allEmojis = require("../botconfig/emojis.json");
    client.owners = config.ownerID;

    client.logger(`・Loaded ClientVariables`.brightGreen);
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