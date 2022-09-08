const Discord = require("discord.js");
const Client = new Discord.Client();
const ytdl = require('discord-ytdl-core')
const pagination = require('discord.js-pagination');
const configs = require("./config.json");
const fivereborn = require('fivereborn-query');
const prefix = "/";
const EventEmitter = require('events');
Client.config = configs;

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬NE PAS MODIFIER ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
function activity() {
    setTimeout(() => {
        fivereborn.query(configs.serverInfo[0], configs.serverInfo[1], (err, data) => {
            if (err) {
                console.log(err);
                Client.user.setActivity('Serveur OFF');
            } else {
                Client.user.setActivity(`Il y'a actuellement ${data.clients}/ ${data.maxclients} Joueurs en ligne`, {
                    type: configs.activityType
                });
            }
        });
        activity();
    }, 10000);
}
activity();

Client.on('message', message => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + 'help')) {
        const Bot = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Commandes  !")
            .addField("**__🌹COMMANDE🌹  : __**", "\u200B")
            .addField("**・__/ad__**", "- Permet de faire des annonces")
            .addField("**・__/sug__**", "- Vous permet de faire une suggestion dans le channel prévue à cette effet")
            .addField("**・__/mp__**", "- Envoyez un message privé à un membre grace au bot ")
            .addField("**・__/reboot__**", "- Permet de restart le bot")
            .addField("**・__/help__**", "- Vous donne la liste des commandes")
            .addField("**・__/clear__**", "- Clear un certain nombre de message")
            .addField("**・__/ban__**", "- Banni un membres")
            .addField("**・__/lock__**", "- Permet de lock un salon")
            .addField("**・__/unlock__**", "- Permet d'unlock un salon")
            .addField("**· __/perm__**", "- Vous dit combien de membres ont la perm ADMIN")
            .setTimestamp()

        const Musique = new Discord.MessageEmbed()
            .setColor("#057435")
            .setTitle("Commandes Musique !")
            .addField("**__🔅COMMANDE MUSIQUE🔅  : __**", "\u200B")
            .addField("**・__/join__**", "- Permet de faire rejoindre le bot dans un channel voc")
            .addField("**・__/leave__**", "- Permet de faire quitter le bot dans un channel voc")
            .addField("**・__/play__**", "- Permet de jouer une musique")
            .addField("**・__/volume__**", "- Permet d'ajuster le volume")
            .addField("**・__/stop__**", "- Permet de couper la musique")
            .addField("**・__/pause__**", "- Permet de mettre stop à la musique")
            .addField("**・__/resume__**", "- Permet de relancer la musique après l'avoir mit en pause")
            .addField("**・__/restart__**", "- Permet de replay la musique précédente")
            .setTimestamp()

        const InfoBot = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Info Bot")
            .addField("**__Crée par <@543420061764026378>__**", "\u200B")
            .addField("**·__Son discord | __** ", "- https://discord.gg/xBhBqCSQXv ")
            .addField("**·__Version | __**", "- 1.0")
            .addField("**·__Status | __**", "- Fini ")
            .setTimestamp()



        const pages = [
            Bot,
            Musique,
            InfoBot
        ]

        const emojiList = ["◀️", "▶️"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
})

Client.on("message", message => {

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ANTISCAM▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.includes("discord.gift") || message.content.includes("https://discord.gift/nitro") || message.content.includes("discord.gift/nitro") || message.content.includes("https://discord.gift")) {
        message.delete()
        message.reply("**Tu n'a pas le droit de __poster des liens discord __ ! **")
        message.member.guild.channels.cache.find(channel => channel.id == "947236199083425862").send({
            embed: {
                title: 'SCAM ',
                color: '#2f3136',
                description: `**Un membre [ ${ message.author.tag} ] vient de poster un lien ( LIEN SUPPRIME ) ! aller dans le salon [ ${ message.channel} ] en question pour voir qui a posté le lien **`
            }
        });
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ANTIGROSMOTS▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.includes("discord.gift") || message.content.includes("ntm") || message.content.includes("baisse ta mère") || message.content.includes("fdp")) {
        message.delete()
        message.reply("**Tu n'a pas le droit de __poster des liens discord __ ! **")
        message.member.guild.channels.cache.find(channel => channel.id == "947236199083425862").send({
            embed: {
                title: 'INSULTE',
                color: '#2f3136',
                description: `**Un membre [ ${ message.author.tag} ] vient de poster un lien ( LIEN SUPPRIME ) ! aller dans le salon [ ${ message.channel} ] en question pour voir qui a posté le lien **`
            }
        });
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ANTI MASS EVERYONE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    const usersEveryoneMap = new Map();
    if (message.mentions.everyone) {
        if (usersEveryoneMap.has(message.author.id)) {
            const userData = usersEveryoneMap.get(message.author.id);
            let {
                numberEveryoneSent
            } = userData
            numberEveryoneSent += 1;
            userData.numberEveryoneSent = numberEveryoneSent
            usersEveryoneMap.set(message.author.id, userData)
            if (numberEveryoneSent >= 3) {
                message.delete();
            }
            if (numberEveryoneSent === 5) {
                message.guild.member(message.author.id).ban({
                    reason: 'Abu de mention everyone'
                })
            }
        } else {
            usersEveryoneMap.set(message.author.id, {
                numberEveryoneSent: 1
            });
            setTimeout(() => {
                usersEveryoneMap.delete(message.author.id);
            }, 20000);
        }
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬PERM ADMIN▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.startsWith(prefix + "perm")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;

        var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
        var str_map = str_filtrer.map(m => `${m.user.id}: ${m.user.username},`).join("\n")
        message.channel.send(`Liste des membres ayant les permissions \`ADMINISTRATOR\` (**${str_filtrer.size}**)`)
        for (let i = 0; i < str_map.length; i += 1995) {
            const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
            message.channel.send(`\`\`\`json\n${str_content}\`\`\``);
        }
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬CLEAR▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (!message.member) return false
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        if (message.content.startsWith(prefix + "clear")) {
            let args = message.content.split(" ");

            if (args[1] == undefined) {
                message.reply(" Nombre de __message non ou mal __ défini . ")
            } else {
                let number = parseInt(args[1]);

                if (isNaN(number)) {
                    message.reply("Nombre de __ message non ou mal __ défini ")
                } else {
                    message.channel.bulkDelete(number).then(messages => {
                        message.author.send(" Supression de " + messages.size + " message réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear :" + err)
                    })
                }
            }
        }
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬BAN▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.content.startsWith(prefix + "ban")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("**Membre __non ou mal__ mentionné**");
            } else {
                if (mention.bannable) {
                    mention.ban();
                    message.channel.send(mention.displayName + "a été __banni avec succès__");
                } else {
                    message.reply("__Imposible__ de bannir ce membre !")
                }
            }
        }
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬MP▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.startsWith(prefix + 'mp')) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            var error_permissions = new Discord.MessageEmbed()
                .setDescription(":x: Vous ne disposez pas les permissions nécessaires pour effectuer cette commande.")
                .setColor("#FF0000")
            message.channel.send(error_permissions)
        }
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const member = message.mentions.members.first();
            if (!member) return message.channel.send(":x: Merci de __mentionner un utilisateur__ pour envoyer un message privé depuis le bot.")
            let arg = message.content.split(" ").slice(2);
            let content_msg = arg.join(" ");
            member.send(`:pushpin: | Vous avez reçu un message de ${message.author.tag} depuis le serveur ${message.guild.name} | ` + content_msg + ``)
            message.channel.send(` ❤️ | Votre message privé a bien été envoyé à ${member.user.tag} !`)
            message.delete();
        }
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬REBOOT▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.startsWith(prefix + 'reboot')) {
        if (message.author.id !== '543420061764026378') return message.reply("Vous n'êtes pas autorisé à utiliser cette commande");
        message.channel.send("🕙 | Reboot en cours ...").then(async msg => {
            msg.edit("🕙 | Reboot en cours ...")
            Client.destroy();
            await Client.login("OTAyMTk5OTcyNTg0Mzc0MzAz.YXa9Mw.LDE0WZVlt4Dbt3kZ6rkJFG53rpY");
            await msg.edit("🕙 | Reboot en cours ...")
            msg.edit("☑️ | Reboot bien effectué")
        })
    }
})

Client.on('message', async message => {
    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOCK + UNLOCK + LOGS▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    //Lock:
    if (message.content.startsWith(prefix + 'lock')) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send("Vous n'avez pas les permissions")
        }
        const channel = message.mentions.channels.first()
        if (!channel) return message.channel.send('Veuillez fournir un channel !')
        channel.overwritePermissions([{
            id: message.guild.id,
            deny: ['SEND_MESSAGES'],
        }, ], );
        const embed = new Discord.MessageEmbed()
            .setTitle("Channel Updates")
            .setDescription(`${channel} a été verouillé`)
            .setColor("#2f3136");
        await message.channel.send(embed);
        message.delete();
        message.guild.channels.cache.find(channel => channel.id === "947236199083425862").send({
            embed: {
                title: 'LOCK',
                color: '#2f3136',
                description: `${channel} vien d'être verouillé`
            }
        })

    }

    //Unlock
    if (message.content.startsWith(prefix + 'unlock')) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send("Vous n'avez pas les permissions")
        }
        const channels = message.mentions.channels.first()
        if (!channels) return message.channel.send('Veuillez fournir un channel !')
        channels.overwritePermissions([{
            id: message.guild.id,
            allow: ['SEND_MESSAGES'],
        }, ], );
        const embed = new Discord.MessageEmbed()
            .setTitle("Channel Updates")
            .setDescription(`${channels} a été deverouillé`)
            .setColor("#2f3136");
        await message.channel.send(embed);
        message.guild.channels.cache.find(channel => channel.id === "947236199083425862").send({
            embed: {
                title: 'UNLOCK',
                color: '#2f3136',
                description: `${channel} vien d'être deverouillé`
            }
        })
        message.delete();
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ANTI SPAM▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    const usersSpamMap = new Map();
    if (usersSpamMap.has(message.author.id)) {
        const userData = usersSpamMap.get(message.author.id);
        let {
            msgCount
        } = userData;
        msgCount += 1
        userData.msgCount = msgCount;
        usersSpamMap.set(message.author.id, userData)
        if (msgCount >= 6) message.delete();
        if (msgCount >= 9) message.guild.member(message.author.id).ban({
            reason: 'Spam'
        })
    } else {
        usersSpamMap.set(message.author.id, {
            msgCount: 1
        })
        setTimeout(() => {
            usersSpamMap.delete(message.author.id);
        }, 10000);
    }

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬SUGGESTION▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'sug')) {
        message.content.split(' ');
        let suggestion = message.content.slice(5);
        if (suggestion) {
            const suggestionEmbed = new Discord.MessageEmbed()
                .setTitle(`Suggestion de ${message.author.username}`)
                .setDescription(`${message.author.username}  a __proposé__ :  __${suggestion}__`)
                .addField(` Que pensez vous de la suggestion de __${message.author.username}__ ? `, `\u200B`)
                .setColor('#003372');
            const messageEnvoyeParLeBot = await message.guild.channels.cache.find(channel => channel.id === "862052813298335791").send(suggestionEmbed);
            await messageEnvoyeParLeBot.react('✅')
            messageEnvoyeParLeBot.react('❌')
            message.delete();
        }
    };

    /* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ANNONCE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
    if (message.content.startsWith(prefix + 'ad')) {
        message.content.split(' ');
        let annonce = message.content.slice(7);
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (annonce) {
                const annonceEmbed = new Discord.MessageEmbed()
                    .setTitle(`Annonce de ${message.author.username}`)
                    .setDescription(`${message.author.username}  a annoncé :  __***${annonce}***__`)
                    .setColor('#003372');
                const messageEnvoyeParLeBot = await message.guild.channels.cache.find(channel => channel.id === "862052812849807438").send(annonceEmbed);
                await messageEnvoyeParLeBot.react('✅')
                message.delete();
            }
        }
    };
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOGS  BANS▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.on("guildBanAdd", function (guild, user) {
    const logChannel = Client.channels.cache.get('947236199083425862')

    const logs = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setDescription(`**${user.username} vien d'etre ban du serveur**`)
        .setTimestamp()
    logChannel.send(logs);
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOGS DELETE D'UNE INVITE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.on("inviteDelete", async invite => {
    const LogsInviteDelete = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('Suppresion d\'une invitation', invite.guild.iconURL({
            dynamic: true
        }))
        .addField('Lien d\'invitation suprimé', `discord.gg/${invite.code}`)

    Client.guilds.cache.get('862052812028117022').channels.cache.get('947236199083425862').send(LogsInviteDelete)
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOGS CREATION D'UNE INVITE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.on("inviteCreate", async invite => {
    const LogsInviteCreate = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor(invite.inviter.username, invite.inviter.displayAvatarURL({
            dynamic: true
        }))
        .addField('Lien d\'invitation crée', `discord.gg/${invite.code}`)

    Client.guilds.cache.get('862052812028117022').channels.cache.get('947236199083425862').send(LogsInviteCreate)
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOGS DELETE D'UN ROLE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.on("roleDelete", async role => {
    const LogsRolesDelete = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor("Une modification à été faites !")
        .addField('Rôle suprimé', role.name)

    Client.guilds.cache.get('862052812028117022').channels.cache.get('947236199083425862').send(LogsRolesDelete)
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬LOGS CREATION D'UN ROLE▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.on("roleCreate", async role => {
    const LogsRolesCreate = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor("Une modification à été faites !")
        .addField('Rôle crée', role.name)

    Client.guilds.cache.get('862052812028117022').channels.cache.get('947236199083425862').send(LogsRolesCreate)
})

/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬START BOT▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
Client.login(process.env.TOKEN);
console.log("ON");
