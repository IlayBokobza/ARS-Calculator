import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cron from 'node-cron'
import { getPrices, prices } from './getPrices'

dotenv.config()
const app = express()

let currentPrices:prices | null = null;

async function setPrices(){
    if(process.env.DEV == 'true'){
        console.log('Running in dev mode using fake prices.')
        currentPrices = {
            c100:3.01,
            c200:5.03,
            c300:4.22,
            c500:6.43,
            c1000:17.12,
        }
    }
    else{
        currentPrices = await getPrices()
    }
}

async function main(){

    await setPrices()

    cron.schedule('0 0 0 * * * *',setPrices)


    app.get('/prices',(req,res) => {
        res.send(currentPrices)
    })

    const publicPath = path.resolve(__dirname,'../public')
    app.use('/',express.static(publicPath))

    const port = process.env.PORT
    app.listen(port,() => {
        console.log(`App is running on port ${port}`)
    })
}

main()