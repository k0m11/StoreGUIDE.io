let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = ()=> {
    let cartIcon = document.querySelector("#cartAmount")
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
calculation()

let generateCartItems = ()=>{
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket
        .map((x)=> {
            let {id,item,} = x
            // Проверка если ID из Basket Соответствует с ID из Data.js
            let search = shopItemsData.find((y)=>y.id === id) || []
            let {img, name, price} = search
            return `
            <div class="cart-item">
                <img  width="100" src="${img}" alt="">
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">${"$ " + price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="cart-buttons"></div>
                        <div class="buttons">
                        <button onclick="decrement(${id})" id="minus">-</button>
                        <div id=${id} class="quantity">${item}</div>
                        <button onclick="increment(${id})" id="plus">+</button>
                    </div>
                    <h3>${"$ " + item * price}</h3>
                </div>
            </div>
            `
        })
        .join("")
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `
        
    }
}

generateCartItems()

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

    generateCartItems()

    totalAmount()

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
    // Так как у нас удаляется Карточка если ее значение 0, Мы проверяем всю страницу с помощью нижней функции СНОВА))
    generateCartItems()

    totalAmount()

    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    // Проходимся по всем ID и Если он совпадает с Кнопкой то продолжаем
    let search = basket.find((x)=> x.id === id)
    // Определенный ID Который нужно изменять
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCartItems()
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
    basket = []
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation()
}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item, id} = x
            let search = shopItemsData.find((y)=>y.id === id) || []
            return item * search.price

        }).reduce((x,y)=> x+y, 0)
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button onclick="" class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `
    }else return
}
totalAmount()