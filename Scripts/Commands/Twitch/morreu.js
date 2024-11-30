const fs = require('fs')

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'morreu', 'died', 'f', 'died' ]
    }

    async run() {
        let oldValue = Number(this.DB.getValue('died') || 0)
        this.DB.setValue('died', oldValue+1)
        
        //fs.writeFileSync('./Scripts/Structure/liveText.txt', `Mortes: ${oldValue+1}`, {  encoding: "utf8" })

        this.TWClient.say(this.channel, `@CoguTeq morreu ${oldValue+1} vezes`)
    }
}

module.exports = Command