class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'cc' ]
    }

    run(context) {
        if (!context.badges?.broadcaster) return

        console.clear()
    }
}

module.exports = Command