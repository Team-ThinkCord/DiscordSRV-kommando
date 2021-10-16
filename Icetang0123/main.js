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
    if (msg.channel.id != (plugin.config.channelID + "")) return;
    var output = "";
    try {
        output = eval(msg.content);
    } catch(err) {
        return srvSend(msg.channel, err.stack);
    }
    srvSend(msg.channel, output);
});

plugin.on('error', (err, client) => srvSend(client.channels.cache.get(plugin.config.channelID), err.stack));

module.exports = plugin;