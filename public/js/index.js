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

//refs
const input = document.getElementById('amount-input')
const algoName = document.getElementById('algo-name')
console.log(input)

//runtime

//set placeholder animation
placeholderNumberTyper(100,2000,'amount-input')

//setprices
document.getElementById('price-100').textContent = prices.c100
document.getElementById('price-200').textContent = prices.c200
document.getElementById('price-300').textContent = prices.c300
document.getElementById('price-500').textContent = prices.c500
document.getElementById('price-1000').textContent = prices.c1000

//set algorithim name
input.addEventListener('keyup',() => {
    if(input.value > 3000){
        algoName.textContent = 'speed'
    }
    else{
        algoName.textContent = 'accurate'
    }
})