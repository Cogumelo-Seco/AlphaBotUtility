class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'tw', 'twitter', 'x'  ]
    }

    run(context) {
        this.TWClient.say(this.channel, `@${context['display-name']} Twitter de Cogu: https://twitter.com/CoguWell`)
    }
}

module.exports = Command