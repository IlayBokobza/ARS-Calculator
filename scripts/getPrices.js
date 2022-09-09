const {getPrices} = require('../build/getPrices')
const fs = require('fs')
const path = require('path')

getPrices().then(prices => {
    fs.writeFileSync(path.resolve(__dirname,'./price.json'),JSON.stringify(prices,null,4))
})