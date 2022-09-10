import axios from "axios"
import {load} from "cheerio"

export type card = 'c100' | 'c200' | 'c300' | 'c500' | 'c1000'

export type prices = {
    c100:number,
    c200:number,
    c300:number,
    c500:number,
    c1000:number,
    rate:number,
    rateType:string
}

export async function getPrices(){
    console.log('Getting prices')

    const links = {
        c100:'https://www.g2a.com/steam-gift-card-100-ars-steam-key-i10000000258214',
        c200:'https://www.g2a.com/steam-gift-card-200-ars-steam-key-i10000000258216',
        c300:'https://www.g2a.com/steam-gift-card-300-ars-steam-key-i10000000258215',
        c500:'https://www.g2a.com/steam-gift-card-500-ars-steam-key-i10000000258213',
        c1000:'https://www.g2a.com/steam-gift-card-1000-ars-steam-key-i10000000258217'
    }
    
    const out:prices = {
        c100:0,
        c200:0,
        c300:0,
        c500:0,
        c1000:0,
        rate:0,
        rateType:'',
    }
    let currency = ''
    
    for(const p in links){
        try{
            const link = links[p as card]
            const {data:html} = await axios.get(link,{
                headers:{
                    'Accept-Encoding':'gzip, deflate, br',
                }
            })
            const $ = load(html)
            const elm = $('#collapsible-panel-offers > div > ul:nth-child(2) > li:nth-child(2) > div.indexes__StyledOfferListItemRightSide-sc-1vslyo5-33.bjVUIs > div > span')
            const text = elm.text()
            let price = null

            if(text.includes('$')){
                currency = 'USD'
                price = parseFloat(text.replace('$ ',''))
            }
            if(text.includes('€')){
                currency = 'EUR'
                price = parseFloat(text.replace('€ ',''))
            }

            out[p as card] = price!

            console.log(`${p} is ${elm.text()}`)
        }
        catch(e:any){
            if(e.response){
                console.log(e.response.data)
                console.log(e.response.status)
            }
            else{
                console.log(e)
            }
            process.exit()
        }
    }

    //getting rate
    if(!currency){
        console.log('Invalid Currency')
        process.exit()
    }
    const {data} = await axios.get(`https://api.exchangerate.host/convert?from=${currency}&to=ILS`)
    out.rate = data.info.rate
    out.rateType = currency
    console.log(`Rate is ${out.rate} ${currency}`)

    return out
}