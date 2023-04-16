const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId, guildId } = require ('./config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

const comandi = [
    new SlashCommandBuilder()
    .setName('test')
    .setDescription("Comando di status-bot"),

// Developer

new SlashCommandBuilder()
.setName('developer')
.setDescription("Developer"),

// FAQ

new SlashCommandBuilder()
.setName('info')
.setDescription("Info Bot"),

//FINE MANUTENZIONE

new SlashCommandBuilder()
.setName('fine-manutenzione')
.setDescription("manda il messaggio di fine manutenzione"),

//MANUTENZIONE

new SlashCommandBuilder()
.setName('manutenzione')
.setDescription("manda il messaggio di manutenzione"),

//CHANGELOG

new SlashCommandBuilder()
.setName('changelog')
.setDescription("Scrivi tramite bot i cambiamenti")
.addStringOption(option =>
    option
    .setName('descrizione')
    .setDescription("Descrizione della manutenzione")
    .setRequired(true))
.addStringOption(option => 
    option
    .setName('versione')
    .setDescription("Verione del BOT")
    .setRequired(true)),

//RECENSIONE STAFF

new SlashCommandBuilder()
.setName('recensione')
.setDescription("Recensione allo staff")
.addUserOption(option =>
    option
    .setName('staffer')
    .setDescription("Metti lo staff che vuoi recensire")
    .setRequired(true))
.addStringOption(option =>
    option
    .setName('recensione')
    .setDescription("Cosa ne pensi dello staffer in questione")
    .setRequired(true))
.addStringOption(option => 
    option
    .setName('stelle')
    .setDescription("Da 1 a 10 quante stelle dai allo staffer?")
    .setRequired(true)),

//RICHIESTA ASSISTENZA VOCALE

new SlashCommandBuilder()
.setName('richiesta-assistenza')
.setDescription("richiedi assistenza vocale"),

//cartello

new SlashCommandBuilder()
.setName('cartello')
.setDescription("Manda un messaggio da parte del cartello")
.addStringOption(option =>
    option
        .setName('messaggio')
        .setDescription("Scrivi il messaggio che vuoi mandare")
        .setRequired(true)),

//help

new SlashCommandBuilder()
.setName('help')
.setDescription("Elenca tutti i comandi del bot"),

//anonimo

new SlashCommandBuilder()
.setName('anonimo')
.setDescription("Manda un messaggio nella chat anonima")
.addStringOption(option =>
    option
        .setName('messaggio')
        .setDescription("Scrivi il messaggio che vuoi mandare")
        .setRequired(true)),

//CHANGELOG-RP

new SlashCommandBuilder()
.setName('changelogrp')
.setDescription("Scrivi tramite bot i cambiamenti")
.addUserOption(option =>
    option
    .setName('manutentore')
    .setDescription("Chi si sta occupando della manutenzione")
    .setRequired(true))
.addStringOption(option =>
    option
    .setName('descrizione')
    .setDescription("Descrizione della manutenzione")
    .setRequired(true))
.addStringOption(option => 
    option
    .setName('versione')
    .setDescription("Verione dell'RP")
    .setRequired(true)),

//ASSISTENZA-CAFF

new SlashCommandBuilder()
.setName('modulo-assistenza')
.setDescription("Modulo per l'assistenza")
.addStringOption(option =>
    option
    .setName('motivo-caff')
    .setDescription("Motivo dell'assistenza")
    .setRequired(true))
.addStringOption(option => 
    option
    .setName('steam-id')
    .setDescription("Il tuo steam-id")
    .setRequired(true))
.addStringOption(option => 
    option
    .setName('nome-in-rp')
    .setDescription("Il tuo nome in RP")
    .setRequired(true)),

//Fazioni

new SlashCommandBuilder()
.setName('fazione')
.setDescription("Anon message dalle fazioni")
.addRoleOption(option =>
    option
    .setName('fazione')
    .setDescription("Seleziona la tua fazione")
    .setRequired(true))
.addStringOption(option =>
    option
    .setName('messaggio')
    .setDescription("Scrivi il messaggio che vuoi mandare")
    .setRequired(true)),

//regista sanzioni

new SlashCommandBuilder()
.setName('registra-sanzione')
.setDescription("Riservato allo staff")
.addRoleOption(option =>
    option
    .setName('sanzione')
    .setDescription("Segli la sanzione")
    .setRequired(true))
.addUserOption(option =>
    option
    .setName('persona-da-sanzionare')
    .setDescription("MSeleziona la persona da sanzionare")
    .setRequired(true))
.addStringOption(option =>
    option
    .setName('motivo')
    .setDescription("Motivo sanzione")
    .setRequired(true))
.addStringOption(option =>
    option
    .setName('tempo')
    .setDescription("Segli il tempo")
    .setRequired(true))
.addChannelOption(option =>
    option
    .setName('canale')
    .setDescription("Segli il canale dove mandare ciò")
    .setRequired(true)),

//KICK

new SlashCommandBuilder()
.setName('kick')
.setDescription("Espellere un utente")
.addUserOption(option =>
    option.setName('user')
        .setDescription("'L'utente da espellere")
        .setRequired(true))
.addStringOption(option =>
    option
    .setName('motivo')
    .setDescription("Motivazione")
    .setRequired(true)),

//BAN

new SlashCommandBuilder()
.setName('ban')
.setDescription("Bannare un utente")
.addUserOption(option =>
    option
    .setName('user')
    .setDescription("L'utente da bannare")
    .setRequired(true))
.addStringOption(option =>
    option
        .setName('motivo')
        .setDescription("Motivazione")
        .setRequired(true)),

].map(comandi => comandi.toJSON());

const rest = new REST({version: 10}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: comandi})
.then(()=>console.log("Slash Commands registrati con successo!")) 
.catch(console.error);