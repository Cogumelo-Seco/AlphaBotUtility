class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'sg', 'setgame', 'game', 'jogo' ]
    }

    async run(context) {
        if (!context.badges?.broadcaster && !context.mod) return

        let gameName = this.args.join(' ');
        if (!gameName) return;

        let liveInfo = await this.functions.getLiveInfo(process.env.channelID);
        let gameInfo = await this.functions.getGameInfo(gameName);
        let fetch = require('node-fetch');

        if (!gameInfo) return this.TWClient.say(this.channel, `@${context['display-name']} Erro, a categoria não foi encontrada.`)
        
        fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.channelID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${process.env.appTOKEN}`,
                'Client-Id': process.env.appID,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "is_branded_content": liveInfo.is_branded_content,
                //"content_classification_labels": liveInfo.content_classification_labels,
                game_id: gameInfo.id
            })
        }).then(res => {
            if (res && res.status == 204)
                this.TWClient.say(this.channel, `@${context['display-name']} Categoria da live alterada com sucesso para "${gameName}"`)
            else
                this.TWClient.say(this.channel, `@${context['display-name']} Erro ao alterar a categoria.`)
        });
    }
}

module.exports = Command