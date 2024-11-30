const { inspect } = require('util');
require('colors')

module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    write(msg, type = 'log', color1, color2) {
        if (!msg) return
        msg = msg.map(this.constructor._flatten).join('\n');

        switch(type) {
            case 'logVK':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgBrightRed} ${`[VULKAVA] ${str}`.brightRed}`).join('\n'));
                break;
            case 'logSP':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgBrightGreen} ${`[SPOTIFY] ${str}`.brightGreen}`).join('\n'));
                break;
            case 'logDC':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgBrightBlue} ${`[DISCORD] ${str}`.brightBlue}`).join('\n'));
                break;
            case 'logTW':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgMagenta} ${`[TWITCH] ${str}`.brightMagenta}`).join('\n'));
                break;
            case 'log':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgBrightMagenta} ${str}`).join('\n'));
                break;
            case 'error':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgRed} ${str.red}`).join('\n'));
                break;
            case 'warn':
                console.log(msg.split('\n').map(str => `${this.consoleTime().bgYellow} ${str.yellow}`).join('\n'));
                break;
            case 'custom':
                console.log(msg.split('\n').map(str => `${this.consoleTime()[color1 || 'bgBrightMagenta']} ${str[color2 || 'white']}`).join('\n'));
                break;
        }
    }

    consoleTime() {
        return `[${this.formatDate('DD/MM/YYYY HH:mm:ss', +new Date())}]`
    }

    logVK(...msg) {
        return this.write(msg, 'logVK')
    }

    logSP(...msg) {
        return this.write(msg, 'logSP')
    }

    logDC(...msg) {
        return this.write(msg, 'logDC')
    }

    logTW(...msg) {
        return this.write(msg, 'logTW')
    }

    log(...msg) {
        return this.write(msg, 'log')
    }

    error(...msg) {
        return this.write(msg, 'error')
    }

    warn(...msg) {
        return this.write(msg, 'warn')
    }

    custom(color1, color2, ...msg) {
        return this.write(msg, 'custom', color1, color2)
    }

    static _flatten(data) {
		if (typeof data === 'undefined' || typeof data === 'number' || data === null) return String(data);
		if (typeof data === 'string') return data;
		if (typeof data === 'object') {
			const isArray = Array.isArray(data);
			if (isArray && data.every(datum => typeof datum === 'string')) return data.join('\n');
			return data.stack || data.message || inspect(data, { depth: Number(isArray), colors: true });
		}
		return String(data);
	}
}