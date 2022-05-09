require('dotenv').config();
const Discord = require("discord.js");
const colors = require("colors");

const client = new Discord.Client({
    fetchAllMembers: false,
    restTimeOffset: 0,
    failIfNotExists: false,
    shards: 'auto',
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ],
    presence: {
        activities: [{
            name: `${process.env.PREFIX}help | @djs_v13_handler`,
            type: "PLAYING",
        }],
        status: "online"
    }
});

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

console.log(`\n${`Starting The Service Handler`.brightGreen} ${`(Made By: Milanio Development)`.brightCyan}`);
["extraEvents", "clientVariables", "errorHandler", "eventHandler", "commandHandler", "slashCommandHandler", "mongoDBHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);

/**********************************************************
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/yHdne85PvM
 * @INFO
 * Work for Milanio Development | https://discord.gg/yHdne85PvM
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 *********************************************************/