// **************************************** IMPORTANTE | NON TOCCARE ****************************************

require('events').EventEmitter.prototype._maxListeners = 100;
const { time } = require('console');
const Discord = require("discord.js");
const { Client, Routes, GatewayIntentBits, SlashCommandBuilder, SelectMenuBuilder, Partials, PermissionsBitField, InteractionType, ChannelType, Collection, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle,  ModalBuilder, TextInputBuilder, TextInputStyle, GuildMFALevel, userMention, Events, ActivityType} = require("discord.js");
const { type } = require('os');
const { threadId } = require('worker_threads');
const { token } = require('./config.json')
const ms = require("ms")
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
global.client = new Discord.Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates], partials: [Discord.Partials.Channel, Discord.Partials.Message, Discord.Partials.Reaction]});
client.commands = new Discord.Collection();

// **************************************** BOT ONLINE | CONSOLE ****************************************

client.once("ready", () => {
    console.log("Bot Online!");

    let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)

    client.user.setActivity({
        name: `${membersCount} Membri`,
        type: ActivityType.Watching,
    });
})
// **************************************** SLASH COMMANDS | NON TOCCARE ****************************************

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return 

// ---------------------------------------- COMANDO DI TEST ----------------------------------------

    if (interaction.commandName === "test") {
        var embedtest = new Discord.EmbedBuilder()
            .setColor("#57F287")
            .setTitle("*Status*")
            .setDescription(`Bot online e operativo!`)
        interaction.reply({embeds: [embedtest], ephemeral: true})
    }

// ---------------------------------------- DEVELOPER ---------------------------------------- //

    // Developer
    if (interaction.commandName == "developer") {
        var embedDev = new Discord.EmbedBuilder()
            .setColor("#050402")
            .setTitle("Developer di 💎Eternal💎-BOT:")
            .setDescription("\n\n <@769450094486618122>\n\n Per qualsiasi problema contattare il bot developer")
        interaction.reply({embeds:[embedDev], ephemeral: true})
    }

    // ---------------------------------------- FAQ ---------------------------------------- //

    if (interaction.commandName === "info") {
        var embedFAQ = new EmbedBuilder()
            .setColor("#5D8AA8")
            .setTitle("INFO 📚")
            .setDescription("***Cos'è 💎Eternal💎-BOT?***\n\n_💎Eternal💎-BOT è uno dei Bot ufficiali di 💎Eternal💎, prodotto da <@769450094486618122>_.\n\n||Per qualsiasi problema contantate il produttore del Bot||")
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif")
            .setTimestamp()
        interaction.reply({embeds:[embedFAQ]})
    }

     // ---------------------------------------- CHANGE LOG ---------------------------------------- //

    //Changelog
    if (interaction.commandName == "changelog") {
        if (!interaction.member.roles.cache.has("1091122594532560959")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }
        
        var desc = interaction.options.get('descrizione').value
        var ver = interaction.options.get('versione').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("CHANGELOG")
            .setColor("#0000ff")
            .addFields([{name: "DEVELOPER:", value: "<@769450094486618122> ", inline: true}])
            .addFields([{name: "VERSIONE BOT:", value: ver.toString(), inline: true}])
            .setThumbnail("https://avatars.githubusercontent.com/u/26492485?s=200&v=4", true)
            .addFields([{name: "CAMBIAMENTI APPORTATI:", value: "```" + desc.toString() + "```"}])
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' });
            client.channels.cache.get("1091122962448535572").send({ content: "<@&1091122781552398337>", embeds: [embed] })
        interaction.reply("ChangeLog BOT mandato/i con successo")
    }

    //Recensione staff
    if (interaction.commandName == "recensione") {
        if (!interaction.member.roles.cache.has("1091122781552398337")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }
        
        var membero = interaction.member
        var staffer = interaction.options.get('staffer').value
        var recensione = interaction.options.get('recensione').value
        var stelle = interaction.options.get('stelle').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("RECENSIONE ALLO STAFF")
            .setColor("#0000ff")
            .addFields([{name: "STAFFER:", value: '<@' + staffer.toString() + '>', inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "RECENSIONE:", value: "```" + recensione.toString() + "```"}])
            .addFields([{name: "STELLE:", value: stelle.toString()}])
            .addFields([{name: "RECENSIONE MANDATA DA:", value: membero.toString(), inline: true}])
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' });
        client.channels.cache.get("1085327078955679844").send({ embeds: [embed] })
        interaction.reply("Recensione mandata con successo, grazie.")
    }

    // ---------------------------------------- MANUTENZIONE ---------------------------------------- //

     //manutenzione
     if (interaction.commandName == "manutenzione") {
        if (!interaction.member.roles.cache.has("1091122594532560959")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }

        var embed = new Discord.EmbedBuilder()
            .setTitle("BOT DISCORD IN MANUTENZIONE")
            .setColor("#ff0000")
            .addFields([{name: "DEVELOPER:", value: "<@769450094486618122> ", inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "DESCRIZIONE", value: "```Il BOT è in manutenzione, vi avviseremo quando tornerà operativo.```"}])
            .setTimestamp() 
            client.channels.cache.get("989325814908747796").send({ content: "<@&888165652274249769>", embeds: [embed] })    
        interaction.reply("Manutenzione mandata con sucesso")
    }

    //FineManutenzione
    if (interaction.commandName == "fine-manutenzione") {
        if (!interaction.member.roles.cache.has("1091122594532560959")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }
        

        var embed = new Discord.EmbedBuilder()
            .setTitle("LA MANUTENZIONE E' FINITA")
            .setColor("#00ff00")
            .addFields([{name: "DEVELOPER:", value: "<@769450094486618122> ", inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "DESCRIZIONE", value: "```La manutenzione è finita, ora potrete riutilizzare il BOT come prima!```"}])
            .setTimestamp()
            client.channels.cache.get("989325814908747796").send({ content: "<@&888165652274249769>", embeds: [embed] })   
        interaction.reply("Fine Manutenzione inviata con sucesso")
    }

    // Assistenza VC

    if (interaction.commandName == "richiesta-assistenza"){
        
        var embed = new Discord.EmbedBuilder()
            .setTitle("RICHIESTA DI ASSISTENZA VOCALE")
            .setColor('Red')
            .setDescription("**<@" + interaction.member.id + "> Ha richiesto assistenza vocale.**")
        interaction.reply({ content: "**Comando eseguito:**\n**La richiesta è stata inviata allo Staff.**", ephemeral: true })
        client.channels.cache.get("1091123128509415444").send({ embeds: [embed] })
    }

    //Ruoli presi
    
    if(interaction.commandName == "lavori-presi"){
        if (!interaction.member.roles.cache.has("1091122627722100846")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }
        
        var lavori = interaction.options.get('lavori').value
        var presionon = interaction.options.get('presi').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("LAVORI DIRETTORE PRESI/O O NON")
            .setColor("#0000ff")
            .addFields([{name: "LAVORI/O DIRETTORE:", value: lavori.toString(), inline: true}])
            .addFields([{name: "PRESI/O:", value: presionon.toString(), inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' });
        client.channels.cache.get("1091122954521280563").send({ embeds: [embed] })
    interaction.reply("LAVORI/O PRESI/O O NON MANDATI/O CON SUCCESSO")


    }



    //Cartello
    
    if(interaction.commandName == "cartello"){
        if (!interaction.member.roles.cache.has("1091122693786578954")) {
            return interaction.reply({ content: "Non fai parte del cartello o non sei il boss del cartello", ephemeral: true })
        }
        
        var cartello = interaction.options.get('messaggio').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("💀Cartello💀")
            .setColor("#000000")
            .addFields([{name: "Messaggio:", value: cartello.toString(), inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1080877262175469638/1081200023901065306/Cartello2.png", true)
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' });
            client.channels.cache.get("1091122947260960800").send({ content:"<@&1091122781552398337>", embeds: [embed]})
    interaction.reply("Mesaggio da parte del cartello mandato con successo")


    }

    //Anonimo
    
    if(interaction.commandName == "anonimo"){
        if (!interaction.member.roles.cache.has("1091122783305613442")) {
            return interaction.reply({ content: "Non puoi fare questo comando", ephemeral: true })
        }
        
        var anonimo = interaction.options.get('messaggio').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("👥ANONIMO👥")
            .setColor("#000000")
            .addFields([{name: "Messaggio:", value: anonimo.toString(), inline: true}])
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' });
            client.channels.cache.get("1091122947260960800").send({embeds: [embed]})
    interaction.reply("Mesaggio mandato con successo")


    }


    // Help
        if (interaction.commandName == "help") {
            var embedHelp = new Discord.EmbedBuilder()
                .setColor("#050402")
                .setTitle("COMANDI:")
                .setDescription("Ecco tutti i comandi utilizzabili:")
                .addFields(
                            { name: '/developer', value: 'Ti fa vedere il dev di 💎Eternal💎-BOT.', inline: true },
                            { name: '/cartello', value: "Messaggio riservato al cartello.", inline: true },
                            { name: '/recensione', value: 'Per recensire uno staffer.', inline: true },
                        )
                .addFields(
                            { name: '/lavori-presi', value: "Riservato agli staffer.", inline: true },
                            { name: '/richiesta-assistenza', value: 'Per richiedere assistenza vocale.', inline: true },
                            { name: '/changelog', value: 'Riservato ai BOT-Developer.', inline: true },
                        )   
                .addFields(
                            { name: '/test', value: "Potete vedere se il bot funziona." , inline: true },
                            { name: '/manutenzione', value: "Riservato ai BOT-Developer." , inline: true },
                            { name: '/fine-manutenzione', value: 'Riservato ai BOT-Developer.', inline: true },
                        )
                .addFields(
                            { name: '/info', value: "Per vedere le info sul BOT." , inline: true },
                            { name: '/fazione', value: "Altri comandi andranno aggiunti in futuro." , inline: true },


                )
        interaction.reply({embeds:[embedHelp], ephemeral: false})
            }

    //Changelog
    if (interaction.commandName == "changelogrp") {
        if (!interaction.member.roles.cache.has("1093298645551546458")) {
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }
    
        var manu = interaction.options.get('manutentore').value
        var descp = interaction.options.get('descrizione').value
        var vers = interaction.options.get('versione').value

        var embed = new Discord.EmbedBuilder()
            .setTitle("CHANGELOG-RP")
            .setColor("#0000ff")
            .addFields([{name: "MANUTENTORE:", value: '<@' + manu.toString() + '>', inline: true}])
            .addFields([{name: "VERSIONE RP:", value: vers.toString(), inline: true}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "CAMBIAMENTI APPORTATI:", value: "```" + descp.toString() + "```"}])
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' })
            client.channels.cache.get("1091122962448535572").send({ content: "<@&1091122781552398337>", embeds: [embed] })
        interaction.reply("ChangeLog RP mandato/i con successo")

    }

    //modulo-caff

    if (interaction.commandName == 'modulo-assistenza'){
        if(!interaction.member.roles.cache.has("1091122781552398337")){
            return interaction.reply({ content: "Non hai il permesso di eseguire questo comando", ephemeral: true })
        }

        var pers = interaction.member
        var mot = interaction.options.get('motivo-caff').value
        var steam = interaction.options.get('steam-id').value
        var nom = interaction.options.get('nome-in-rp').value
        
        var embed = new Discord.EmbedBuilder()
            .setTitle("RICHIESTA-ASSISTENZA")
            .setColor("#0000ff")
            .addFields([{name: "PERSONA CHE RICHIEDE LA CAFF:", value: pers.toString()}])
            .addFields([{name: "STEAM-ID:", value: steam.toString()}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "NOME-IN-RP:", value: nom.toString()}])
            .addFields([{name: "MOTIVO-CAFF:", value: mot.toString()}])
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' })
            client.channels.cache.get("1091122987572404235").send({ content: "<@&1091122627722100846>", embeds: [embed] })
        interaction.reply("Richiesta assistenza mandata con sucesso.")

    }

    //fazione
    if (interaction.commandName == 'fazione'){
        if(!interaction.member.roles.cache.has("1093297666991067219")){
            return interaction.reply({ content: "Non sei un boss fazione", ephemeral: true })
        }

        var mott = interaction.options.get('fazione').value
        var steamm = interaction.options.get('messaggio').value

        
        var embed = new Discord.EmbedBuilder()
            .setTitle("ANON MESSAGE BY FAZIONE")
            .setColor("#0000ff")
            .addFields([{name: "FAZIONE", value: '<@' + mott.toString() + '>'}])
            .addFields([{name: "MESSAGGIO:", value: "```" + steamm.toString() + "```"}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .setTimestamp()   
            .setFooter({ text: 'by 💎Eternal💎& Dr. Falceemartello', iconURL: 'https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif' })
            client.channels.cache.get("1091122947260960800").send({ content: "<@&1091122627722100846>", embeds: [embed] })
        interaction.reply("Anon message by fazione mandato con sucesso.")

    }

    //registra sanzione
    if (interaction.commandName == 'registra-sanzione'){
        if(!interaction.member.roles.cache.has("1091122627722100846")){
            return interaction.reply({ content: "Non hai il permesso di fare questo comando", ephemeral: true })
        }

        

        var staff = interaction.member
        var sanzione = interaction.options.get('sanzione').value
        var personasanz = interaction.options.get('persona-da-sanzionare').value
        var motivo = interaction.options.get('motivo').value
        var durata = interaction.options.get('tempo').value
        var canale = interaction.options.get('canale').value
        
        

        var embed = new Discord.EmbedBuilder()
            .setTitle("REGISTRO SANZIONE")
            .setColor("#0000ff")
            .addFields([{name: "STAFFER:", value: staff.toString()}])
            .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
            .addFields([{name: "SANZIONE:", value: "<@&" + sanzione.toString() + ">"}])
            .addFields([{name: "MOTIVO SANZIONE:", value: "```" + motivo.toString() + "```"}])
            .addFields([{name: "PERSONA SANZIONATA:", value: "<@" + personasanz.toString() + ">"}])
            .setTimestamp()   
            client.channels.cache.get(`${canale.toString()}`).send({embeds: [embed]})
        interaction.reply({content: "Sanzione mandata con sucesso.", ephemeral: true})
        var guild = client.guilds.cache.get('1066356817543835648')
        const member = await guild.members.fetch(`${personasanz}`)
            await member.roles.add(`${sanzione}`)
                setTimeout( () => {
                    member.roles.remove(`${sanzione}`)
                }, `${durata.toString()}`)
            }
    

    // ---------------------------------------- KICK ---------------------------------------- //

     //Kick
     if (interaction.commandName == "kick") {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: "Non hai il permesso", ephemeral: true })
        }

        var utente = interaction.options.getUser("user")
        var reason = interaction.options.getString("motivo") || "Nessun motivo"

        var member = interaction.guild.members.cache.get(utente.id)
        var intruso = interaction.guild.members.cache.get(interaction.user.id)
        if (!member?.kickable) {
            return interaction.reply({ content: "Non posso kickare questo utente", ephemeral: true })
        }

        member.kick()
        var embed = new Discord.EmbedBuilder()
            .setTitle("Utente espulso con successo!")
            .setColor("#32CD32")
            .setThumbnail(utente.displayAvatarURL())
            .setDescription(utente.toString() + " è stato espulso per " + reason.toString())
         

        var embed1 = new Discord.EmbedBuilder()
            .setTitle("Utente kickato da " + interaction.user.tag)
            .setColor("#ff0000")
            .setThumbnail(utente.displayAvatarURL())
            .addFields([{name: "Membro kickato:", value: utente.toString()}])
            .addFields({name: "ID:", value: interaction.user.id, inline: true})
            .addFields([{name: "Motivo della sanzione:", value: reason.toString()}])
           
        interaction.reply({embeds: [embed]})
        client.channels.cache.get("1091122989824741407").send({embeds: [embed1]})
       

       
    }

     // ---------------------------------------- BAN ---------------------------------------- //

    //Ban
    if (interaction.commandName == "ban") {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: "Non hai il permesso", ephemeral: true })
        }

        var utente = interaction.options.getUser("user")
        var reason = interaction.options.getString("motivo") || "Nessun motivo"

        var member = interaction.guild.members.cache.get(utente.id)
        var intruso = interaction.guild.members.cache.get(interaction.user.id)

        if (!member?.bannable) {
            return interaction.reply({ content: "Non posso bannare questo utente", ephemeral: true })
        }

         member.ban()
        var embed = new Discord.EmbedBuilder()
            .setTitle("Utente bannato con successo!")
            .setColor("#32CD32")
            .setThumbnail(utente.displayAvatarURL())
            .setDescription(utente.toString() + " è stato bannato per " + reason.toString())

        var embed1 = new Discord.EmbedBuilder()
            .setTitle("Utente bannato da " + interaction.user.tag)
            .setColor("#ff0000")
            .setThumbnail(utente.displayAvatarURL())
            .addFields([{name: "Membro bannato:", value: utente.toString()}])
            .addFields({name: "ID:", value: interaction.user.id, inline: true})
            .addFields([{name: "Motivo della sanzione:", value: reason.toString()}])

        client.channels.cache.get("1091122989824741407").send({embeds: [embed1]})
        interaction.reply({ embeds: [embed] })


    }

////////////////////////
// Fine Slash Commands//
////////////////////////
});


// **************************************** MESSAGGIO DI BENVENUTO ****************************************

client.on('guildMemberAdd', member => {
    var embedWelcomeMessage = new Discord.EmbedBuilder()
        .setColor("#00665C")
        .setTitle("BENVENUTO!")
        .setDescription(`Benvenuto/a ${member} su 💎Eternal💎!!\nPer verificarti vai in <#1093304851615719465>`)
        .setThumbnail(member.displayAvatarURL())
        .setImage("https://cdn.discordapp.com/attachments/1092137476627370054/1093527877254926386/f0badf9590b3f16595bf241bbdba42ee4604db0b2c0f7e5e984dfbada718fab1.gif")
    client.channels.cache.get("1091122866663211178").send({content: "<@" + member + ">", embeds:[embedWelcomeMessage]})
    member.send("Heylà!\nMi hanno detto che sei entrato su 💎Eternal💎... *Fantastico!*\nVai a pedere il ping per verificarti.\nBuona permanenza!")
})

//**************************************** MESSAGGIO DI ADDIO (Quit dal Server) ****************************************

client.on('guildMemberRemove', member => {
    var embedQuitMessage = new Discord.EmbedBuilder()
        .setColor("#00A86B")
        .setTitle("ARRIVEDERCI")
        .setDescription(`${member} è appena uscito/a da 💎Eternal💎`)
        .setThumbnail(member.displayAvatarURL())
    client.channels.cache.get("1092139359580459039").send({embeds:[embedQuitMessage]})
})

// **************************************** AUTORUOLI ****************************************

client.on("messageCreate", message => {
        if (message.content == "+verifica125") {
 

        var embed = new EmbedBuilder()
        .setTitle("***Verifica***")
        .setDescription("**Clicca sul bottone per ottenere la verifica**")
        .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
        .setColor("#ff00ff")

        var button = new ButtonBuilder()
        .setLabel("Verifica")
        .setCustomId("erp")
        .setStyle(ButtonStyle.Success)


        var row = new Discord.ActionRowBuilder()
         .addComponents(button)


    message.channel.send({embeds: [embed], components: [row]})
    message.delete()
    }
})

client.on("interactionCreate", async interaction => {
    if (interaction.customId == "erp") {

    
        var embed = new EmbedBuilder()
        .setTitle("Verifica ottenuta con successo!")
        .setDescription("Hai ottenuto la verifica")

        var guild = client.guilds.cache.get('1066356817543835648')
        const member = await guild.members.fetch(interaction.user.id)
        const ruolo = "1091122783305613442"
        const ruolo1 = "1091122781552398337"

        if(interaction.member.roles.cache.has("1091122783305613442" || "1091122781552398337")){

            var embed = new EmbedBuilder()
            .setTitle("Già possiedi questo ruolo")

    
            interaction.reply({embeds: [embed], ephemeral: true})
        }else{
            await member.roles.add(ruolo)
            await member.roles.add(ruolo1)
            interaction.reply({embeds: [embed], ephemeral: true})
        }
    }
});

client.on("messageCreate", message => {
    if (message.content == "+mannaggia123") {


    var embed = new EmbedBuilder()
    .setTitle("**Verifica**")
    .setDescription("**Clicca sul bottone per ottenere la verifica**")
    .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
    .setColor("#ff00ff")

    var button = new ButtonBuilder()
    .setLabel("Verifica")
    .setCustomId("suca")
    .setStyle(ButtonStyle.Success)


    var row = new Discord.ActionRowBuilder()
     .addComponents(button)


message.channel.send({embeds: [embed], components: [row]})
message.delete()

    }})

client.on("interactionCreate", async interaction => {
    if (interaction.customId == "suca") {


        var guild = client.guilds.cache.get('1066356817543835648')
        const member = await guild.members.fetch(interaction.user.id)
        const ruolo = "1091122589784625222"
        const ruolo1 = "1094731040276357250"


        await member.roles.add(ruolo)
        await member.roles.add(ruolo1)

}
})





// ****************************************** BOTTA E RISPOSTA***************************** \\

client.on("messageCreate", message => {
    if (message.content == "server") {

        var embed = new EmbedBuilder()
        .setTitle("**Info-Server**")
        .addFields([{name: 'IP Server:', value: "```💎Eternal💎.vpsgh.it```"}])
        .addFields([{name: 'IP TeamSpeak:', value: "```💎Eternal💎.voicehosting.it```"}])
        .setThumbnail("https://cdn.discordapp.com/attachments/1094278233970712586/1095081143122014359/eternal_logo_rbdv.gif", true)
        .setColor("#F01B1B")

    message.reply({embeds: [embed]})
    
    }
});


// **************************************** TOKEN **************************************** \\

client.login("MTA4NTMyMTUyMTAzMzEzNDA5MQ.GPcIJI.mQT_t56JELQKfDJNQrmIG6RUjpjzLKSb-xNS_4");

//---------------------------------------------------------ERRORI------------------------------------------------------//


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});