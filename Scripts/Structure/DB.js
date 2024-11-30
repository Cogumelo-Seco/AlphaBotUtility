const fs = require('fs');

module.exports = {
    getValue: (id) => {
        let dbData = JSON.parse(fs.readFileSync('./Scripts/Structure/DBData.json', { encoding: 'utf8' }))

        return dbData[id]
    },
    setValue: (id, value) => {
        let dbData = JSON.parse(fs.readFileSync('./Scripts/Structure/DBData.json', { encoding: 'utf8' }))

        dbData[id] = value
        fs.writeFileSync('./Scripts/Structure/DBData.json', JSON.stringify(dbData, null, 4), {  encoding: "utf8" })
        return dbData[id]
    },
    lowDB: {
        lastMusicFromUser: { }
    }
}