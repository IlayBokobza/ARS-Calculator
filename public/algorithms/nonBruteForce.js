function findCheapestCombination(pricesRaw,target){
    const options = []
    const prices = {
        100:pricesRaw.c100,
        200:pricesRaw.c200,
        300:pricesRaw.c300,
        500:pricesRaw.c500,
        1000:pricesRaw.c1000
    }
    
    function findAllPrices(statingCards = []){
        for(const p in prices){    
            //calculate the new cards total
            const amount = parseInt(p)

            let statingCardsTotal = null
            if(statingCards.length){
                statingCardsTotal = statingCards.reduce((a,b) => a + b)
            }
            else{
                statingCardsTotal = 0
            }


            const closestToTarget = Math.floor((target-statingCardsTotal)/amount) || 1
            const newCards = new Array(closestToTarget).fill(amount)

            const cards = [...statingCards,...newCards]
            const cardsTotal = cards.reduce((a,b) => a + b)
    
            if(cardsTotal < target){
                findAllPrices(cards)
            }
            else{
                //calculate price and adds to list
                const price = cards.reduce((a,b) => a + prices[b],0)
                options.push({cards,price})
            }
        }
    }
    
    findAllPrices()
    const cheapest = options.sort((a,b) => a.price - b.price)[0]
    return cheapest
}

window.algorithms.nonBruteForce = findCheapestCombination