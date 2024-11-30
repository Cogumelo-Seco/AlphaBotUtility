const request = require('node-superfetch');

module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async currencyConverter(val1, val2, amount) {
        let href = await request.get(`https://economia.awesomeapi.com.br/all/${val1}-${val2}`).catch(() => null)
        let value = amount*Number(href.body[val1].low)
        console.log(amount, value)
        console.log(href.body[val1])
        return value
    }

    async run([ message, DCClient, DB ]) {
        let lines = message.content.split('\n')
        let data = { date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}` }
        let listOfValues = { itau: 1, cash: 1, ng: 1, picpay: 1, bf: 1, nubank: 1 }
        let configData = {}

        for (let i in lines) {
            if (lines[i].includes('-') && listOfValues[lines[i].split('-')[0]]) {
                if (lines[i].split('-')[1].includes('+')) {
                    data[lines[i].split('-')[0]] = 0
                    for (let a in lines[i].split('-')[1].split('+')) data[lines[i].split('-')[0]] += Number(lines[i].split('-')[1].split('+')[a])
                    data[lines[i].split('-')[0]] = String(data[lines[i].split('-')[0]])
                } else data[lines[i].split('-')[0]] = lines[i].split('-')[1]
                delete listOfValues[lines[i].split('-')[0]]
            } else if (lines[i].includes('-')) {
                configData[lines[i].split('-')[0]] = lines[i].split('-')[1]
            }
        }

        if (Object.keys(listOfValues).length > 0) return message.reply({ content: `Falta de informações: \`\`${Object.keys(listOfValues).join(', ')}\`\``})

        data.sum = 0
        for (let i in data) {
            if (i != 'date' && i != 'sum') data.sum += Number(data[i].replace(/[,]/g, '.'))
        }
        data.sum = data.sum.toFixed(2)
        
        let oldValue = DB.getValue('COGUMONEY')
        oldValue[data.date] = data
        await DB.setValue('COGUMONEY', oldValue)

        this.coguMoneyShowData(message, DCClient, DB, configData)
    }
}