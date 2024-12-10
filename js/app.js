class Store {
    constructor() {

        // track how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            price: 0,
            subtotal: 0,
            subTimesQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0
        }

        this.menu ={

            item1: {
                id: 1,
                dish: 'spaghetti',
                imgUrl: 'images/spaghetti.jpg',
                alt: 'spaghetti',
                desc: 'noodles with meatsauce meatballs and parsely',
                price: 15.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'bakedfish',
                imgUrl: 'images/bakedfish.jpg',
                alt: 'bakedfish with buttersauce',
                desc: 'baked fish drizzeld with butter sauce and vegetables',
                price: 18.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish:'the satchel',
                imgUrl: 'images/grilledcheese.jpg',
                alt: 'grilled cheese sandwich with avocado spread',
                desc: 'Our specialty item Pepper jack',
                price: 10.99,
                qty: 0
            },
            item4: {
                id: 4, 
                dish: 'ceasar salad',
                imgUrl: 'images/ceasarsalad.jpg',
                alt: 'ceasar salad',
                desc: 'colorful leafy greens topped with, feta cheese and ceasar dressing',
                price: 6.99,
                qty: 0
            },
            items5: {
                id: 5,
                dish: 'vegetable soup',
                imgUrl: 'images/vegetablesoup.jpg',
                alt: 'vegetable soup',
                desc: 'homemade broth filled with mixed vegetables and noodles',
                price: 12.99,
                qty: 0
            },
            item6: {
                id: 6, 
                dish: 'cheeseburger',
                imgUrl: 'images/cheeseburger.jpg',
                alt: 'cheeseburger',
                desc: 'toasted bun with grilled beef tomatoes lettuce pickle and ketchup with wedge cut fries',
                price: 15.99,
                qty: 0 
            },
            item7: {
                id: 7, 
                dish: 'chickenwings',
                imgUrl: 'images/friedwings.jpg',
                alt: 'fried drummettes',
                desc:'lemon pepper fried drummettes',
                price: 13.99,
                qty: 0
            },
            item8: {
                id: 8, 
                dish: 'macaronni',
                imgUrl: 'images/macaroni.jpg',
                alt: 'macaronni',
                desc: 'creamy cheesy macarroni',
                price: 6.99,
                qty: 0
            }

        }
    }

    init() {
        this.loadItems()
        this.addToCart()
        this.checkout()
        this.homeSwitch()
        this.confirmOrder()
    }

    loadItems() {
        const itemDiv = document.getElementById('itemDiv')

        /**
         * for in loop
         * 
         * for in loop loops through properties of an object
         */
        for (const key in this.menu) {
            const item = this.menu[key]
        
            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)

            product.innerHTML= ` 
            <figure class="figuire item-figure" >
                <img src="${item.imgUrl}" alt="${item.alt}" class="img-fluid image" />
                <figcaption class="figure-caption item-caption">${item.dish}
                                <span class="item-price" id="itemPrice">${item.price}</span>
                </figcaption>
                <p class="item-desc" id="itemDisc">${item.desc}</p>
                <button class="btn menu-btn text-capitalize" id="menuBtn" data-id="${item.id}"> add to cart</button>
                </figure>
                `
            
                itemDiv.appendChild(product)
        }
    }

    addToCart() {
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        
        let taxRate = .07
        const totalValue = document.getElementById('totalValue')
    
        //loop through this menu
        for (const key in this.menu) {
            const item = this.menu[key]
            
            //loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', ()=> {
                if (button.dataset['id'] == item.id) {
                    this.itemsInCart.itemCount++
                    this.itemsInCart.price+= item.price
                    this.itemsInCart.subtotal = this.itemsInCart.price
    
                    item.qty++
    
                        this.itemsInCart.subTimesQty = (item.price * item.qty).toFixed(2)
                        this.itemsInCart.tax = this.itemsInCart.subtotal * taxRate
                        this.itemsInCart.total = (this.itemsInCart.subtotal + tax + this.itemsInCart.deliveryFee).toFixed(2)
                    }
                    //send to DOM
                    cartItems.innerText = this.itemsInCart.itemCount
                    cartSubtotal.innerText = this.itemsInCart.price.toFixed(2)
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = this.itemsInCart.deliveryFee.toFixed(2)
                    taxValue.innerText = this.itemsInCart.tax.toFixed(2)
                    totalValue.innerText = this.itemsInCart.total

                    //if (this.itemsInCart.itemCount == 1) {
                        //checkoutItemCount.innerText

                    checkoutItemCount.innerText = this.itemsInCart.itemCount == 1 ? `${this.itemsInCart.itemCount} item` : `${this.itemsInCart.itemCount} items`
                    })
                })
            }
        }

        checkout() {
            const cartBtn = document.getElementById('cartBtn')
            const checkoutPage = document.getElementById('checkoutPage')
            const menuSection = document.getElementById('menuSection')
            const tableBody = document.getElementById('tbody')

            let subTimesQty = 0

            cartBtn.addEventListener('click', ()=> {
                console.log('clicked')
                if (menuSection.classList.contains('d-none')) return
    
                checkoutPage.classList.remove('d-none')
                menuSection.classList.add('d-none')

                for (const key in this.menu) {
                    const item = this.menu[key]

                    if (item.qty > 0) {
                        subTimesQty = (item.qty * item.price).toFixed(2)

                        const tableRow = document.createElement('tr')
                        tableRow.className = 'item-checkout'

                        tableRow.innerHTML+=`
                        <td td="itemImg>
                            <img src="${item.img}" alt=${item.alt}" class="img-fluid item-img" />
                        </td>  
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-qurnaity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                        `

                        tableBody.appendChild(tableRow)
                    }
                }
            })
        }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')    
        
        homeSwitch.style.cursor  = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
           // console.log('clicked')
            menuSection.classList.remove('d-none')
            checkoutPage.classList.add('d-none')

            const tableBody = document.getElementById('tbody')
            tableBody.innerHTML = ''
        })
    }    
        confirmOrder() {
            const confirmBtn = document.getElementById('confirmBtn')
            const tableBody = document.getElementById('tbody')
            const cartItems = document.getElementById('cartItems')
            const cartSubtotal = document.getElementById('cartSubtotal')
            const subtotalValue = document.getElementById('subtotalValue')
            const taxValue = document.getElementById('taxValue')
            const totalValue = document.getElementById('totalValue')

            confirmBtn.addEventListener('click', ()=>{
               //this.itemInCart.itemCount = 0
               // this.itemInCart.subtotal = 0
                for (const key in this.itemsInCart) {
                    if(key != 'deliveryFee'){
                        this.itemsInCart[key] 
                    }
                }

                tableBody.innerHTML = '<h2>Your order is confirmed</h2>'

                cartItems.innerText = this.itemsInCart.itemCount
                cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2)
                subtotalValue.innerText = 0
                taxValue.innerText = 0
                totalValue.innerText = 0

                for (const key in this.menu) {
                    const item = this.menu[key]

                    item.qty = 0
                }

            })

        }
    }    





const restaurant = new Store()

restaurant.init()

