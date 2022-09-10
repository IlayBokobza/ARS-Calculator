console.log('script loaded')

//functions
function randomNum(min,max){
    return Math.floor(Math.random() * max) + min
}

function placeholderNumberTyper(min,max,id){
    const ref = document.getElementById(id)
    let num = randomNum(min,max).toString()
    let index = 0
    let curretText = ''
    let reverse = false

    setInterval(() => {
        if(index === num.length && !reverse){
            reverse = true
        }

        if(reverse){
            curretText = curretText.slice(0, -1)
            index--
        }
        else{
            curretText += num[index]
            index++
        }

        if(index === 0 && reverse){
            reverse = false
            num = randomNum(min,max).toString()
        }

        ref.setAttribute('placeholder',curretText)
    },500)
}

function setLoading(value,btn){
    if(value){
        document.body.style.cursor = 'progress'
        btn.style.cursor = 'progress'
    }
    else{
        document.body.style.cursor = 'auto'
        btn.style.cursor = null
    }
}

function handleInputUpdate(){
    if(input.value > algoChange){
        algoName.textContent = 'speed'
    }
    else{
        algoName.textContent = 'accurate'
    }

    btn.disabled = input.value <= 0
}

function handleCalculation(cardsRaw){
    //groups cards
    const total = cardsRaw.price
    const cards = {}
    
    cardsRaw.cards.forEach(card => {
        cards[card] = (cards[card]) ? cards[card] + 1 : 1;
    })

    //disable everything
    const everyCard = [100,200,300,500,1000]
    everyCard.forEach(card => {
        document.getElementById(`${card}-card`).style.display = 'none'
    })
    
    //enable needed cards
    main.style.display = 'block'
    UsdTotal.textContent = `${total.toFixed(2)} ${prices.rateType}`
    NisTotal.textContent = (total * prices.rate).toFixed(2)

    for(const card in cards){
        document.getElementById(`${card}-card`).style.display = 'block'
        document.getElementById(`${card}-amount`).textContent = `x${cards[card]}`
    }
}

//data and refs
const input = document.getElementById('amount-input')
const algoName = document.getElementById('algo-name')
const btn = document.getElementById('calculate-btn')
const main = document.getElementById('main')
const UsdTotal = document.getElementById('usd-total')
const NisTotal = document.getElementById('nis-total')
const NisRate = document.getElementById('nis-usd-rate')

const algoChange = 3000;

//runtime

//set placeholder animation
placeholderNumberTyper(1000,2000,'amount-input')

//setprices
let rateIcon = null;

if(prices.rateType === 'USD'){
    rateIcon = '$'
}
else if(prices.rateType === 'EUR'){
    rateIcon = '€'
}
else{
    rateIcon = '?'
}

document.getElementById('price-100').textContent = prices.c100 + rateIcon
document.getElementById('price-200').textContent = prices.c200 + rateIcon
document.getElementById('price-300').textContent = prices.c300 + rateIcon
document.getElementById('price-500').textContent = prices.c500 + rateIcon
document.getElementById('price-1000').textContent = prices.c1000 + rateIcon
NisRate.textContent = prices.rate

//set algorithim name and enable/disable button
input.addEventListener('keyup',handleInputUpdate)


//handle submit
btn.addEventListener('click',() => {
    setLoading(true,btn)

    setTimeout(() => {
        const value = input.value
        const data = {...prices}
        delete data.rate
        delete data.rateType
    
        if(value > algoChange){
            var out = algorithms.nonBruteForce(data,value)
        }
        else{
            var out = algorithms.bruteForce(data,value)
        }

        input.value = ''
        handleInputUpdate()
        handleCalculation(out)
        setLoading(false,btn)
    },5)
})