let cocktail = document.querySelector('.cocktial-name')
let description = document.querySelector('.description')
let imgContainer =  document.querySelector('.img-container')
let form = document.querySelector('form')
let button = document.querySelector('button')
let img = document.querySelector('img')
let ingredientlist = document.querySelector('.ingreidents')
let measurementlist = document.querySelector('.measurments')


addEventListener('load',getrandomcocktail())
button.addEventListener('click',event=>{
    getcocktail(event)
})

function getmeasuerments(ressponse){
    let measurements = [];
    let items = ressponse.drinks[0];
    let re = /strMeasure/
    for(let item in items){
        if(re.test(item)&&items[item]){

            measurements.push(items[item])
        }
    }
    console.log(measurements)
    return  measurements
        
    

}

function getingredient(ressponse){
    let ingredients = [];
    let items = ressponse.drinks[0];
    let re = /strIngredient/
    for(let item in items){
        if(re.test(item)&&items[item]){

            ingredients.push(items[item])
        }
    }
    console.log(ingredients)
    return ingredients

}

function makelistelM(list1,list2){
    for(let i =0;i<list1.length;i++){
        let li = document.createElement('li')
        li.textContent = list1[i]+" "+list2[i]
        measurementlist.appendChild(li)

    }

}



async function getrandomcocktail(){
    let request =  await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    let response = await request.json()
    console.log(response)
    img.setAttribute('src',response.drinks[0].strDrinkThumb)
    cocktail.innerText = response.drinks[0].strDrink
    getmeasuerments(response)
    getingredient(response)

    makelistelM(getingredient(response),getmeasuerments(response))
    
}






async function getcocktail(event){
    event.preventDefault()

    let data =  new FormData(form)
    let drink =  data.get('cocktail')
    let request =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    let response = await request.json()
    img.setAttribute('src',response.drinks[0].strDrinkThumb)
    cocktail.innerText = response.drinks[0].strDrink
    measurementlist.innerHTML =''
    getmeasuerments(response)
    getingredient(response)

    makelistelM(getingredient(response),getmeasuerments(response))
    


}

