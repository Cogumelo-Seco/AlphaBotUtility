const fs = require('fs');
const { join } = require('path');

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'r', 'reload' ]
    }

    async run(context) {
        let fileCounter = 0
        let dir = join(__dirname, '..', '..');

        let dirAdd = (file, dir) => {
            if (file && dir) dir += '/'+file
            fs.readdirSync(dir).forEach((file, i) => {
                let listFilesBlocked = [
                    'spotifyConnectServer.js'
                ]

                if (!file.split('.')[1]) return dirAdd(file, dir)
                else if (file.endsWith('.js') && !listFilesBlocked.includes(file)) {
                    const directory = (`${dir}/${file}`).replace(/\\/g, '/')
                    fileCounter++

                    try {
                        delete require.cache[ require.resolve(directory) ];
                        const props = require(directory);
                        const commandName = file.replace('.js', '');
                        const type = directory.split('/')[directory.split('/').length-3]
                        const commandClientType = directory.split('/')[directory.split('/').length-2]

                        if (type == 'Commands' && commandClientType == 'Discord') {
                            let names = (new props()).names

                            for (let name of names) {
                                delete this.DCClient.commands[name];
                                this.DCClient.commands[name] = {
                                    commandClass: props,
                                    commandProps: new props(),
                                    commandName
                                };
                            }
                            
                            if (type == 'Commands' && commandClientType == 'Twitch') {
                                let names = (new props()).names
    
                                for (let name of names) {
                                    delete this.TWClient.commands[name];
                                    this.TWClient.commands[name] = {
                                        commandClass: props,
                                        commandProps: new props(),
                                        commandName
                                    };
                                }
                            }
                        }
                    } catch (err) {
                        this.console.error(err)
                    }
                }
            })
        }
        dirAdd(null, dir)

        this.TWClient.say(this.channel, `@${context['display-name']} Carregado ${fileCounter} arquivos!`)
    }
}

module.exports = Command