const { EventEmitter } = require('events');
const fs = require('fs');

class plugin extends EventEmitter {
    /**
     * @param [perms] {string[]} Plugin permissions
     * @param [config] {object} Plugin configs
     */
    constructor(perms, config) {
        super();
        const pkg = require('../../../../package.json');
        
        if (!pkg.name) throw new TypeError("Cannot read property 'name' of undefined");
        
        this.name = pkg.name;
        this.perms = perms ?? [];
        this.defaultConfig = config ?? {}
        
        this.emit("debug", "Load succeeded!");
        setTimeout(() => this.emit("debug", `Info:
Plugin name: ${this.name}
Plugin permissions: ${this.perms.join(', ')}
Plugin default config values: ${JSON.stringify(this.defaultConfig)}`), 5000);
    }
    
    // @type {object}
    get config() {
        if (!fs.existsSync("kommando_config.json")) return this.emit("warn", "No config found");
        return JSON.parse(fs.readFileSync("kommando_config.json")).pluginConfigs[this.name];
    }
    
    // @type {string}
    get prefix() {
        if (!fs.existsSync("kommando_config.json")) return this.emit("warn", "No config found");
        return JSON.parse(fs.readFileSync("kommando_config.json")).prefix;
    }
    
    // @param config {object} Config to reset
    setDefaultConfig(config) {
        this.defaultConfig = config?? {};
        this.emit("debug", "Default config reset");
    }
}

module.exports = plugin;