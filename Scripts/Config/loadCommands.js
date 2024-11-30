const fs = require('fs');
const { join } = require('path');

module.exports = ({ DCClient, TWClient }) => {
    let dir = join(__dirname, "..", "Commands");
    let dirAdd = (file, dir) => {
        if (file && dir) dir += '/'+file
        fs.readdirSync(dir).forEach((file, i) => {
            if (!file.split('.')[1]) return dirAdd(file, dir)
            else if (file.endsWith('.js')) {
                const directory = (`${dir}/${file}`).replace(/\\/g, '/')
                const commandClientType = directory.split('/')[directory.split('/').length-2]

                if (commandClientType == 'Twitch') {
                    let commandClass = require(directory)
                    let commandProps = new commandClass()

                    for (let i in commandProps.names) {
                        TWClient.commands[commandProps.names[i]] = {
                            commandClass,
                            commandProps,
                            commandName: directory.split('/')[directory.split('/').length-1]
                        }
                    }
                }

                if (commandClientType == 'Discord') {
                    let commandClass = require(directory)
                    let commandProps = new commandClass()

                    for (let i in commandProps.names) {
                        DCClient.commands[commandProps.names[i]] = {
                            commandClass,
                            commandProps,
                            commandName: directory.split('/')[directory.split('/').length-1]
                        }
                    }
                }
            }
        })
    }
    dirAdd(null, dir)
}