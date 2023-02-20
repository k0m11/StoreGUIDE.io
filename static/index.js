let shop = document.querySelector("#shop")

// Если у нас есть DATA то мы берем ее, || а если нет то создаем пустой список
let basket = JSON.parse(localStorage.getItem("data")) || []


let generateShop = () =>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id,name,price,des,img} = x
        let search = basket.find((x)=>x.id === id) || []
        return `
        <div id=product-id-${id} class="item">
        <img width="219" height="250px" src=${img} alt="#">
        <div class="details">
            <h3>${name}</h3>
            <p>${des}</p>
            <div class="price">
                <h2>${"$" + price}</h2>
                <div class="buttons">
                    <button onclick="decrement(${id})" id="minus">-</button>
                    <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                    <button onclick="increment(${id})" id="plus">+</button>
                </div>
            </div>
        </div>
    </div>
        `
        // .join Для того чтобы карты сразу присваивались к Div shop
    }).join(""))
}
generateShop()

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)
     // Если Search Не Существует, то создаем Basket
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }
    // Если Search Уже сущетсвует, то добавляем Один Предмет
    else {
        search.item += 1
    }
    update(selectedItem.id)

    localStorage.setItem("data", JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)

    if(search === undefined)return;

    else if(search.item === 0)return;

    else {
        search.item -= 1
    }
    // В Баскет нам не нужны ID с Item === 0, поэтому фильтруем Баскет чтобы в нем не оказалось Item === 0
    update(selectedItem.id)
    basket = basket.filter((x)=>x.item !== 0 )

    localStorage.setItem("data", JSON.stringify(basket))
}
let update = (id) => {
    // Проходимся по всем ID и Если он совпадает с Кнопкой то продолжаем
    let search = basket.find((x)=> x.id === id)
    // Определенный ID Который нужно изменять
    document.getElementById(id).innerHTML = search.item
    calculation()
}
let calculation = ()=> {
    let cartIcon = document.querySelector("#cartAmount")
    // Берет все обьекты под имя X
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
// Зачем Calculation Еще 1 раз??? Чтобы при перезагрузке страницы, Оно сразу просчитывалось и показывалось на странице
calculation()
