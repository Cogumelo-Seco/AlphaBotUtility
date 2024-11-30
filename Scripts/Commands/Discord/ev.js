const { EmbedBuilder } = require('discord.js');
const { inspect } = require('util');

class Command {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i]
        }

        this.names = [ 'ev', 'eval' ]
    }

    async run(message) {
        if (!this.args[0]){
			const embed = new EmbedBuilder()
				.setColor(process.env.color2)
				.setDescription(`**Adicione um argumento!**`)
			return message.reply({ content: `${message.author}`, embeds: [embed] })
		}

		try{
			let toEval = this.args.join(" ");
			let evaluated = null

			try {
				evaluated = await eval(toEval);
			} catch {
				evaluated = await eval(`(async () => {\n${toEval}\n})();`);
			}

			let type = ``
			if (typeof(evaluated)) type = `**Tipo:**\`\`\`json\n${typeof(evaluated)}\`\`\``
			if (typeof evaluated !== 'string') {
				evaluated = inspect(evaluated, {
					depth: toEval.depth ? parseInt(toEval.depth) || 0 : 0,
					showHidden: Boolean(toEval.showHidden),
				});
			}

			let resp = ``
			
			if (evaluated && evaluated.length < 1800)
				resp = `**Resposta:**\`\`\`json\n${evaluated}\`\`\`\n`

			
			if (!this.args.join(" ").toLowerCase().includes("//nomsg")){
				const embed = new EmbedBuilder()
					.setColor(process.env.color1)
					.setTitle('EVAL')
					.setDescription(`**Argumento:**\n\`\`\`js\n${toEval}\`\`\`\n${resp}\n${type}`)
				return message.reply({ content: `${message.author}`, embeds: [embed] }).then().catch((err) => {
					const embed = new EmbedBuilder()
						.setColor(process.env.color2)
						.setTitle(`ERRO ${err.code ? `(${err.code})` : ''}`)
						.setDescription(`\`\`\`json\n${err}\`\`\``)
					return message.reply({ content: `${message.author}`, embeds: [embed] })
				})
			}
			return;
		} catch (err) {
			const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack

			const embed = new EmbedBuilder()
				.setColor(process.env.color2)
				if (err.code) embed.setTitle(`ERRO (${err.code})`)
				else embed.setTitle('ERRO')
				embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)
			return message.reply({ content: `${message.author}`, embeds: [embed] })
		}
    }
}

module.exports = Command