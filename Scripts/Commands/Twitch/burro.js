class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'burro', 'dumb'  ]
    }

    run() {
        let oldValue = Number(this.DB.getValue('dumb') || 0)
        this.DB.setValue('dumb', oldValue+1)

        this.TWClient.say(this.channel, `@CoguTeq já foi burro ${oldValue+1} vezes`)
    }
}

module.exports = Command