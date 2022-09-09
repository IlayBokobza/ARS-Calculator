import puppeteer from "puppeteer";

export type prices = {
    c100:number,
    c200:number,
    c300:number,
    c500:number,
    c1000:number
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
        c1000:0
    }
    
    for(const p in links){
        const browser = await puppeteer.launch({headless:false}).catch()
        const tab = await browser.newPage().catch()

        const link = links[p as keyof prices]
        const priceSelector = '#collapsible-panel-offers > div > ul:nth-child(2) > li:nth-child(2) > div.indexes__StyledOfferListItemRightSide-sc-1vslyo5-33.bjVUIs'
        await tab.goto(link)
        await tab.waitForSelector(priceSelector)
        const rawPrice = await tab.evaluate((selector) => {
            return document.querySelector(selector)!.textContent
        },priceSelector)
        
        const price = parseFloat(rawPrice!.replace('$','').trim())
        out[p as keyof prices] = price
        console.log(`Price for ${p} is: ${price}$`)

        await tab.close()
        await browser.close()
    }

    return out
}