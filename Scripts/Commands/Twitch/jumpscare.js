class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'jumpscare' ]
    }

    async run() {
        let oldValue = Number(this.DB.getValue('jumpscare') || 0)
        this.DB.setValue('jumpscare', oldValue+1)

        this.TWClient.say(this.channel, `@CoguTeq tomou ${oldValue+1} jumpscares`)
    }
}

module.exports = Command