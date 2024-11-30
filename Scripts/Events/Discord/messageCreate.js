module.exports = ([ message ], { DB, functions, DCClient, TWClient, VKClient }) => {
    if (message.author.id == '741352048271818823' && message.channel.id == '1229133346706292776') functions.coguMoneyMessage(message, DCClient, DB)


    if (!message.content.replace(/[<@!>]/g, '').split(/ +/g).includes(DCClient.user.id)) return
    message.pingTimestamp = +new Date()

    let args = message.content.replace(/[<@!>]/g, '').replace(DCClient.user.id, '').split(/ +/g)
    if (args[0] == '') args.splice(0, 1)

    let commandName = args.shift()?.toLowerCase();
    let command = DCClient.commands[commandName]
    
    if (!command) return;

    new command.commandClass({ 
        TWClient,
        DCClient,
        VKClient,
        args,
        functions,
        console: functions.console
    }).run(message)
}