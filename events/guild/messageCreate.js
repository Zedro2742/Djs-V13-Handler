const Discord = require("discord.js");
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const config_support = require(`${process.cwd()}/structures/botconfig/support.json`);
const functions = require(`${process.cwd()}/structures/handlers/functions`);

module.exports = {
    name: "messageCreate",

    /**
     * @param {Discord.Client} client 
     * @param {Discord.ActivityOptionsMessage} message
     */

    async execute(client, message) {

        try {
            if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
            if (message.channel?.partial) await message.channel.fetch().catch(() => {});
            if (message.member?.partial) await message.member.fetch().catch(() => {});

            if (config.role_color) embedcolor = client.guilds.cache.get(message.guild.id).me.displayHexColor
            else embedcolor = config.color;


            let prefix = process.env.PREFIX;

            if (message.author.bot) return;

            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${functions.escapeRegex(prefix)})`);
            if (!prefixRegex.test(message.content)) return;
            const [, mPrefix] = message.content.match(prefixRegex);

            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
                return message.reply({
                    content: `>>> ❌ I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
                return message.reply({
                    content: `>>> ${client.allEmojis.x} I am missing the Permission to \`EMBED_LINKS\``
                })
            if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
                return message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor(config.wrongcolor)
                        .setAuthor({
                            name: `Missing Permission`,
                            iconURL: message.guild.iconURL({
                                dynamic: true
                            }),
                            url: config_support.server_link
                        })
                        .setTitle(`>>> ${client.allEmojis.x} I am missing the Permission to \`ADD_REACTIONS\``)
                    ]
                })

            const args = message.content.slice(mPrefix.length).trim().split(/ +/);
            const cmd = args.shift()?.toLowerCase();

            if (cmd.length === 0) {
                if (mPrefix.includes(client.user.id))
                    return message.reply({
                        embeds: [new Discord.MessageEmbed()
                            .setAuthor({
                                name: `Hey, I'm ${client.user.tag}!`,
                                iconURL: client.user.displayAvatarURL({
                                    dynamic: true
                                }),
                                url: config_support.server_link
                            })
                            .setColor(embedcolor)
                            .setDescription(`>>> My Prefix For **${message.guild.name}** is **\`${prefix}\`**
To see all the available commands type: **\`${prefix}help\`** or **\`/help\`**
*If you face any problems, consider asking for help in **[${config_support.server_name}](${config_support.server_link})**!*`)
                            .setFooter({
                                text: `Djs v13 Handler! | Made By: Zedro#2742`,
                                iconURL: client.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                        ]
                    }).catch(() => {});
                return;
            }

            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                try {

                    if (config.maintenance_mode) {
                        if (!client.owners.includes(message.author.id)) return await message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setAuthor({
                                    name: `Maintenance Mode On`,
                                    iconURL: message.author.displayAvatarURL({
                                        dynamic: true
                                    }),
                                    url: config_support.server_link
                                })
                                .setDescription(`>>> ${client.allEmojis.x} *Please use the bot after sometime! Currently bot is in **Maintenance Mode**!*`)
                                .setColor(config.wrongcolor)
                            ]
                        })
                    } else {

                        if (command.toggleOff) {
                            return await message.reply({
                                embeds: [new Discord.MessageEmbed()
                                    .setAuthor({
                                        name: `Command Disabled`,
                                        iconURL: message.author.displayAvatarURL({
                                            dynamic: true
                                        }),
                                        url: config_support.server_link
                                    })
                                    .setDescription(`>>> ${client.allEmojis.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                                    .setColor(config.wrongcolor)
                                ]
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete().catch(() => {});
                                }, 3000)
                            }).catch(() => {});
                        }

                        if (command.ownerOnly) {
                            if (!client.owners.includes(message.author.id)) return await message.reply({
                                embeds: [new Discord.MessageEmbed()
                                    .setAuthor({
                                        name: `Owner Commands`,
                                        iconURL: message.author.displayAvatarURL({
                                            dynamic: true
                                        }),
                                        url: config_support.server_link
                                    })
                                    .setDescription(`>>> ${client.allEmojis.x} **You cannot use \`${prefix}${command.name}\` command as this is a developer command.**`)
                                    .setColor(config.wrongcolor)
                                ]
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete().catch(() => {});
                                }, 3000)
                            }).catch(() => {});
                        }

                        if (!message.member.permissions.has(command.userPermissions)) return await message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setAuthor({
                                    name: `Missing Permission`,
                                    iconURL: message.author.displayAvatarURL({
                                        dynamic: true
                                    }),
                                    url: config_support.server_link
                                })
                                .setDescription(`>>> ${client.allEmojis.x} **You do not have \`${command.userPermissions}\` permission to use \`${prefix}${command.name}\` command!**`)
                                .setColor(config.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch(() => {});
                            }, 5000)
                        }).catch(() => {});

                        if (!message.guild.me.permissions.has(command.botPermissions)) return await message.reply({
                            embeds: [new Discord.MessageEmbed()
                                .setAuthor({
                                    name: `Missing Permission`,
                                    iconURL: message.author.displayAvatarURL({
                                        dynamic: true
                                    }),
                                    url: config_support.server_link
                                })
                                .setDescription(`>>> ${client.allEmojis.x} **I do not have \`${command.botPermissions}\` permission to use \`${prefix}${command.name}\` command!**`)
                                .setColor(config.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch(() => {});
                            }, 5000)
                        }).catch(() => {});

                        if (functions.onCoolDown(message, command)) {
                            return await message.reply({
                                embeds: [new Discord.MessageEmbed()
                                    .setAuthor({
                                        name: `You are on Cooldown`,
                                        iconURL: message.author.displayAvatarURL({
                                            dynamic: true
                                        }),
                                        url: config_support.server_link
                                    })
                                    .setColor(config.wrongcolor)
                                    .setDescription(`>>> ${client.allEmojis.x} **Please wait \`${functions.onCoolDown(message, command).toFixed(1)} seconds\` Before using the \`${prefix}${command.name}\` command again!.**`)
                                ]
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete().catch(() => {});
                                }, 5000)
                            }).catch(() => {});
                        }
                    }

                    command.execute(client, message, args, config, embedcolor, prefix);

                } catch (e) {
                    console.log(e);
                    return message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor(config.wrongcolor)
                            .setAuthor({
                                name: `Error Occured`,
                                iconURL: message.guild.iconURL({
                                    dynamic: true
                                }),
                                url: config_support.server_link
                            })
                            .setDescription(`>>> \`\`\`${e}\`\`\``)
                        ]
                    });
                }
            }
        } catch (e) {
            console.log(String(e.stack).bgRed);
        }
    }
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/yHdne85PvM
 * @INFO
 * Work for Milanio Development | https://discord.gg/yHdne85PvM
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */