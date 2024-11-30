module.exports = async([ addr, port ], { functions, DCClient, TWClient }) => {
    functions.console.logTW(`Conectado com Twitch. User: ${TWClient.opts.identity.username}`);

    let messages = [
        'Lembre-se de seguir o canal, não irei lhe lembrar para sempre :D. Tente utilizar os comandos !discord ou !pix.',
        'Você pode adicionar músicas a playlist usando o comando !p'
    ]

    let loop = () => {
        let message = messages[Math.floor(Math.random()*messages.length)]
        if (TWClient.autoMessage) TWClient.say('coguteq', message)
        TWClient.autoMessage = false
        setTimeout(loop, 1000*60*20)
    }
    loop()
    
    await functions.refreshSpotifyTokenLoop();
    await functions.spotifyLoop({ TWClient, lastTrackURI: null })
}