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
    if (!msg.channel.id == (channelID + "")) return;
    var output = "";
    try {
        output = eval(msg);
    } catch(err) {
        return srvSend(msg.channel, err.toString());
    }
    srvSend(msg.channel, output);
});

plugin.on('error', (err, client) => srvSend(client.channels.cache.get(plugin.config.chanelID), err.stack));

module.exports = plugin;