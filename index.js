require('dotenv').config()

/* --- TWITCH CLIENT --- */

const opts = {
    identity: {
        username: 'CoguBot_',
        password: process.env.TOKEN
    },
    channels: [
        'coguteq'
    ]
};

const tmi = require('tmi.js');
const TWClient = new tmi.client(opts);
TWClient.commands = []

/* --- DISCORD CLIENT --- */

const { Client, GatewayIntentBits  } = require('discord.js');
const DCClient = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
	],
    disableMentions: 'everyone', 
    messageCacheMaxSize: 50,
    autoReconnect: true,
});
DCClient.commands = []



/* --- VULKAVA CLIENT --- */

const { Vulkava } = require('vulkava');
const VKClient = null/*new Vulkava({
    nodes: [
      {
        id: 'Node 1',
        hostname: 'localhost',
        port: 443,
        password: 'cogupass'
      }
    ],
    sendWS: (guildId, payload) => {
        DCClient.guilds.cache.get(guildId)?.shard.send(payload);
    }
})

/* ------ */


const functions = new (require('./Scripts/Structure/Functions/index.js'))
const DB = require('./Scripts/Structure/DB.js')

require('./Scripts/Config/loadCommands.js')({ DCClient, TWClient, VKClient })
require('./Scripts/Config/eventManager.js')({ DB, functions, DCClient, TWClient, VKClient })
//require('./Scripts/Config/spotifyConnectServer.js')

process.on('warning', e => functions.console.warn(e));
process.on('unhandledRejection', e => {
    functions.console.error(e)
});

//require('./Scripts/Config/eventManager.js')*/