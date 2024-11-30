module.exports = async([ packet ], { functions, DCClient, TWClient, VKClient }) => {
    VKClient.handleVoiceUpdate(packet)
}