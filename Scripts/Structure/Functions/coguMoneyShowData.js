const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js')

module.exports = class {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }
    }

    async run([ message, DCClient, DB, configData ]) {
        let data = DB.getValue('COGUMONEY')
        let files = []

        async function createGraph(data, color, name) {
            const canvas = Canvas.createCanvas(2000, 800);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            let dataInAscendingOrder = JSON.parse(JSON.stringify(data)).sort((a, b) => a-b)
            let greaterValue = dataInAscendingOrder[dataInAscendingOrder.length-1]
            let lowestValue = dataInAscendingOrder[0]
            let amountOfData = dataInAscendingOrder.length-1

            let graphBorder = 10

            let lastGraphInfo = { value: 0, x: 0,  y: canvas.height-(((canvas.height-300)*(data[0]/greaterValue))-lowestValue) }
            for (let i in data) {
                let x = graphBorder+(canvas.width-(graphBorder*2))*(Number(i)/amountOfData)
                let y = (canvas.height+(graphBorder)-500)+((500-(graphBorder*2))-(500-(graphBorder*2))*((data[i]-lowestValue)/(greaterValue-lowestValue)))

                ctx.lineWidth = 7
                ctx.strokeStyle = color

                ctx.beginPath();
                ctx.moveTo(lastGraphInfo.x, lastGraphInfo.y);
                ctx.lineTo(x, y);
                ctx.stroke();

                ctx.fillStyle = lastGraphInfo.value <= data[i] ? 'green' : 'rgb(255, 50, 50)'
                ctx.font = `bold 25px Arial`
                ctx.fillText(`R$${Number(data[i]).toFixed(2)}`, x >= canvas.width*0.10 ? x-ctx.measureText(`R$${Number(data[i]).toFixed(2)}`).width-5 : x, y <= canvas.height*0.5 ? y+25 : y-5);

                lastGraphInfo = { x, y, value: data[i] }
            }

            ctx.fillStyle = 'white'
            ctx.fillRect(0, 300, canvas.width, graphBorder)
            ctx.fillRect(0, 300, graphBorder, canvas.height)
            ctx.fillRect(canvas.width-graphBorder, 300, graphBorder, canvas.height)
            ctx.fillRect(0, canvas.height-graphBorder, canvas.width, graphBorder)

            ctx.fillStyle = color
            ctx.font = `bold 249px Arial`
            ctx.fillText(name, canvas.width-ctx.measureText(name).width, canvas.height-610)

            ctx.fillStyle = color
            ctx.font = `bold 50px Arial`
            ctx.fillText(`R$${Number(data[data.length-1]).toFixed(2)}`, canvas.width-ctx.measureText(`R$${Number(data[data.length-1]).toFixed(2)}`).width-10, canvas.height-515)

            ctx.fillStyle = data[data.length-1]-data[data.length-2] >= 0 ? 'green' : 'rgb(255, 50, 50)'
            ctx.fillText(`R$ ${(data[data.length-1]-data[data.length-2]).toFixed(2)}`, 5, 50)
            let percen1 = ((data[data.length-1]/data[data.length-2] == Infinity && data[data.length-1] > data[data.length-2] ? 2 : data[data.length-1]/data[data.length-2] == Infinity && data[data.length-1] > data[data.length-2] ? -1 : data[data.length-1]/data[data.length-2])*100-100).toFixed(4)
            ctx.fillText(`${isNaN(percen1) ? 0 : percen1}%`, 5, 100)

            ctx.fillStyle = data[data.length-1]-data[0] >= 0 ? 'green' : 'rgb(255, 50, 50)'
            ctx.fillText(`R$ ${(data[data.length-1]-data[0]).toFixed(2)}`, 5, 200)
            let percen2 = (((data[data.length-1]/data[0] == Infinity && data[data.length-1] > data[0] ? 2 : data[data.length-1]/data[0] == Infinity && data[data.length-1] > data[0] ? -1 : data[data.length-1]/data[0])*100-100).toFixed(4))
            ctx.fillText(`${isNaN(percen2) ? 0 : percen2}%`, 5, 250)
            
            if (name != 'Total') files.push(new AttachmentBuilder(canvas.toBuffer(), `cogu-${name}.png`))
            else message.channel.send({ content: `## ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`, files: [new AttachmentBuilder(canvas.toBuffer(), `cogu-data.png`)] })
        }

        let itau = []
        let cash = []
        let ng = []
        let bf = []
        let picpay = []
        let nubank = []
        let sum = []
        let size = isNaN(Number(configData.size)) ? 30 : Number(configData.size) || 30

        for (let i in data) {
            itau.push(Number(data[i].itau.replace(/[,]/g, '.')))
            cash.push(Number(data[i].cash.replace(/[,]/g, '.')))
            ng.push(Number(data[i].ng.replace(/[,]/g, '.')))
            bf.push(Number(data[i].bf.replace(/[,]/g, '.')))
            picpay.push(Number(data[i].picpay.replace(/[,]/g, '.')))
            nubank.push(Number(data[i].nubank.replace(/[,]/g, '.')))
            sum.push(data[i].sum)
        }

        await createGraph(itau.slice(itau.length-size, itau.length), '#FF6200', 'Itaú')
        await createGraph(cash.slice(cash.length-size, cash.length), '#03F034', 'Dinheiro')
        await createGraph(ng.slice(ng.length-size, ng.length), '#FFFFFF', 'NG cash')
        await createGraph(bf.slice(bf.length-size, bf.length), '#122845', 'BF')
        await createGraph(picpay.slice(picpay.length-size, picpay.length), '#21C25E', 'PicPay')
        await createGraph(nubank.slice(nubank.length-size, nubank.length), '#820AD1', 'Nubank')
        await createGraph(sum.slice(sum.length-size, sum.length), 'purple', 'Total')

        message.channel.send({ files })
    }
}