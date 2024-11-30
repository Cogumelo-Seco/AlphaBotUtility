class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.totalTimeout = 0
        this.timeout = 0
        this.names = [ 'st', 'settitle', 'title', 'titulo' ]
    }

    async run(context) {
        if (!context.badges?.broadcaster && !context.mod) return

        let title = this.args.join(' ');
        if (!title) return;

        let liveInfo = await this.functions.getLiveInfo(process.env.channelID);
        let fetch = require('node-fetch');

        fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.channelID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${process.env.appTOKEN}`,
                'Client-Id': process.env.appID,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "is_branded_content": liveInfo.is_branded_content,
                //"content_classification_labels": content_classification_labels,
                title
            })
        }).then(res => {
            if (res && res.status == 204)
                this.TWClient.say(this.channel, `@${context['display-name']} Titulo da live alterado com sucesso para "${title}"`)
            else
                this.TWClient.say(this.channel, `@${context['display-name']} Erro ao alterar o título.`)
        });
    }
}

module.exports = Command