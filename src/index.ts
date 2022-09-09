import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { getPrices } from './getPrices'

dotenv.config()
const app = express()

async function main(){
    // const prices = await getPrices()

    //temp
    const prices = {
        c100:3.01,
        c200:5.03,
        c300:4.22,
        c500:6.43,
        c1000:17.12,
    }

    app.get('/prices',(req,res) => {
        res.send(prices)
    })

    const publicPath = path.resolve(__dirname,'../public')
    app.use('/',express.static(publicPath))

    const port = process.env.PORT
    app.listen(port,() => {
        console.log(`App is running on port ${port}`)
    })
}

main()