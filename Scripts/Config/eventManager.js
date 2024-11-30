const fs = require('fs');
const { join } = require('path');

module.exports = ({ DB, functions, DCClient, TWClient, VKClient }) => {
    const fileDCEventsPath = join(__dirname, "..", "Events", "Discord");
    let DCEventsFiles = fs.readdirSync(fileDCEventsPath);
    for (let eventName of DCEventsFiles) {
        let event = require(`${fileDCEventsPath}/${eventName}`)
        DCClient.on(eventName.replace('.js', ''), (...props) => event(props, { DB, functions, DCClient, TWClient, VKClient }))
    }

    DCClient.login(process.env.DCTOKEN)

    /* ------ 

    const fileVKEventsPath = join(__dirname, "..", "Events", "Vulkava");
    let VKEventsFiles = fs.readdirSync(fileVKEventsPath);
    for (let eventName of VKEventsFiles) {
        let event = require(`${fileVKEventsPath}/${eventName}`)
        VKClient.on(eventName.replace('.js', ''), (...props) => event(props, { DB, functions, DCClient, TWClient, VKClient }))
    }

    DCClient.on('ready', () => VKClient.start(DCClient.user.id))

    /* ------ */

    let autoMessage = false
    const fileTWEventsPath = join(__dirname, "..", "Events", "Twitch");
    let TWEventsFiles = fs.readdirSync(fileTWEventsPath);
    for (let eventName of TWEventsFiles) {
        let event = require(`${fileTWEventsPath}/${eventName}`)
        TWClient.on(eventName.replace('.js', ''), (...props) => event(props, { autoMessage, DB, functions, DCClient, TWClient, VKClient }))
    }

    TWClient.connect();
}