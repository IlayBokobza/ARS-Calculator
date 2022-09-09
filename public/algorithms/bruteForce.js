function findCheapestCombination(pricesRaw,target){
    const pricesCopy = {...pricesRaw}
    const prices = {}

    //sort the prices
    while(Object.keys(pricesCopy).length > 0){
        let cheapest = Infinity
        let prop = null
        for(const p in pricesCopy){
            const amount = pricesCopy[p]
            if(amount < cheapest){
                cheapest = amount
                prop = p
            }
        }

        delete pricesCopy[prop]
        prices[prop.split('c')[1]] = cheapest
    }
    
    let best = {price:Infinity}
    function findAllPrices(statingCards = []){
        for(const p in prices){    
            const amount = parseInt(p)
            const cards = [...statingCards,amount]
            
            //calculate the new cards total
            const cardsTotal = cards.reduce((a,b) => a + b)
            
            //calculate price
            const price = cards.reduce((a,b) => a + prices[b],0)
            
            if(best.price <= price) return;
            else if(cardsTotal < target){
                findAllPrices(cards)
            }
            else{
                best = {cards,price}
                return;
            }
        }
    }
    
    findAllPrices()
    return best
}

window.algorithms.bruteForce = findCheapestCombination