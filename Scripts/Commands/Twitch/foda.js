class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 5000
        this.timeout = 0
        this.names = [ 'foda', 'quesefoda', 'qsf' ]
    }

    async run() {
        let oldValue = Number(this.DB.getValue('foda') || 0)
        this.DB.setValue('foda', oldValue+1)

        this.TWClient.say(this.channel, `@CoguTeq falou "Que se foda" ${oldValue+1} vezes`)
    }
}

module.exports = Command