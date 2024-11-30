class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 10000
        this.timeout = 0
        this.names = [ 'dc', 'discord'  ]
    }

    run(context) {
        this.TWClient.say(this.channel, `@${context['display-name']} Caso queira entrar no limbo, ele está aqui: https://discord.gg/33Zsrg5dTc`)
    }
}

module.exports = Command