class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'gemida', 'ain' ]
    }

    async run() {
        let oldValue = Number(this.DB.getValue('gemida') || 0)
        this.DB.setValue('gemida', oldValue+1)

        this.TWClient.say(this.channel, `${oldValue+1}º gemida de @CoguTeq`)
    }
}

module.exports = Command