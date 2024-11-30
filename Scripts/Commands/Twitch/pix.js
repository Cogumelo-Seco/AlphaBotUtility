class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'pix', 'livepix'  ]
    }

    run(context) {
        this.TWClient.say(this.channel, `@${context['display-name']} Envie uma mensagem na live através do link https://livepix.gg/coguteq a ajude um streamer a comprar um mouse.`)
    }
}

module.exports = Command