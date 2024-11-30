module.exports = async([ player, track ], { functions, DCClient, TWClient, VKClient }) => {
    const channel = DCClient.channels.cache.get(player.textChannelId);

    console.log(track)
    channel.send(`Tocando agora \`${track.title}\``);
}