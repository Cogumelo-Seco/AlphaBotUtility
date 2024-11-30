const fs = require('fs')

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'perdeu', 'lost' ]
    }

    async run() {
        let oldValue = Number(this.DB.getValue('lost') || 0)
        this.DB.setValue('lost', oldValue+1)
        
        fs.writeFileSync('./Scripts/Structure/liveText.txt', `Perdeu: ${oldValue+1}`, {  encoding: "utf8" })

        this.TWClient.say(this.channel, `@CoguTeq perdeu ${oldValue+1} vezes`)
    }
}

module.exports = Command