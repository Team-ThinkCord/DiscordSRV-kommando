const Plugins = require('discord-kommando.js-plugins');
const Discord = require('discord.js');

const plugin = new Plugins.plugin(Plugins.perms.ALL, {
    channelID: null
});

const srvSend = function(channel, message) {
    channel.send(`[DiscordSRV-kommando]: ${message}`);
}

plugin.on('messageCreate', (msg) => {
    if (!plugin.config.channelID) throw new TypeError("Cannot read property 'channelID' of null");
    
    for (channelId of plugin.config.channelID) {
        var erred = false;
        
        if (msg.channel.id != (channelId + "")) erred = true;
        var output = "";
        try {
            output = eval(msg.content);
        } catch(err) {
            erred = true;
            srvSend(msg.channel, err.stack);
        }
        if (!erred) srvSend(msg.channel, output);
    }
});

plugin.on('error', (err, client) => {
    if (!plugin.config.channelID) throw new TypeError("Cannot read property 'channelID' of null");
    
    for (channelId of plugin.config.channelID) {
        srvSend(client.channels.cache.get(channelId), err.stack);
    }
});

module.exports = plugin;
