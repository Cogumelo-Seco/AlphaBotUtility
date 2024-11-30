module.exports = async([ channel, context, message, self ], { DB, functions, DCClient, TWClient }) => {
    if (self) return;

    TWClient.autoMessage = true

    if (context['first-msg']) return TWClient.say(channel, `@${context['display-name']} OIII, Seja bem-vindo(a) ao chat <3 <3`)
    
    if (message.toLocaleLowerCase().includes('@cogubot_')) return TWClient.say(channel, `@${context['display-name']} Oii, tenha um ótimo dia :D`)
    
    if (message[0] == '!') {
        let commandName = message.split(' ')[0].replace('!', '').toLocaleLowerCase()
        let args = message.split(' ').splice(1)

        let command = TWClient.commands[commandName]
        let users = [ '825193658', '525292819' ]

        if (command && (users.includes(context['user-id']) || command.commandProps.timeout-+new Date() <= 0)) {
            command.commandProps.timeout = +new Date()+command.commandProps.totalTimeout

            new command.commandClass({ 
                TWClient,
                DCClient,
                args,
                context,
                channel,
                message,
                DB,
                functions,
                console: functions.console
            }).run(context)
        }
    }
}