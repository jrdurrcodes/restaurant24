class Store {
    constructor() {

        // track how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menu ={

            item1: {
                id: 1,
                dish: 'spaghetti',
                imgUrl: 'spaghetti',
                alt: 'spaghetti',
                desc: 'noodles with meatsauce meatballs and parsely',
                price: 15.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'bakedfish',
                imgUrl: 'bakedfish',
                alt: 'bakedfish with buttersauce',
                desc: 'baked fish drizzeld with butter sauce and vegetables',
                price: 18.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish:'the satchel',
                imgUrl: 'grilled_cheese',
                alt: 'grilled cheese sandwich with tomato soup',
                desc: 'Our specialty item. Pepper jack',
                price: 10.99,
                qty: 0
            },
            item4: {
                id: 4, 
                dish: 'ceasar salad',
                imgUrl: 'salad',
                alt: 'ceasar salad',
                desc: 'colorful leafy greens topped with, feta cheese and ceasar dressing',
                price: 6.99,
                qty: 0
            },
            items5: {
                id: 5,
                dish: 'vegetable soup',
                imgUrl: 'vegetable soup',
                alt: 'vegetable soup',
                desc: 'homemade broth filled with mixed vegetables and noodles',
                price: 12.99,
                qty: 0
            },
            item6: {
                id: 6, 
                dish: 'cheeseburger',
                imgUrl: 'cheeseburger',
                alt: 'cheeseburger',
                desc: 'toasted bun with grilled beef tomatoes lettuce pickle and ketchup with wedge cut fries',
                price: 15.99,
                qty: 0 
            },
            item7: {
                id: 7, 
                dish: 'chickenwings',
                imgUrl: 'chickenwings',
                alt: 'fried drummettes',
                desc:'lemon pepper fried drummettes',
                price: 13.99,
                qty: 0
            },
            item8: {
                id: 8, 
                dish: 'macaronni',
                imgUrl: 'macaronni',
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
        let price = 0
    
        let subTimesQty = 0
        const subtotalValue = document.getElementById('subtotalValue')
        const Value = document.getElementById('taxValue')
        let tax = 0
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        let deliveryFee = 6
        let total = 0
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
                    price+= item.price
                    this.itemsInCart.subtotal = price
    
                    item.qty++
    
                        subTimesQty = (item.price * item.qty).toFixed(2)
                        tax = this.itemsInCart.subtotal * taxRate
                        total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2)
                    }
                        //sendt to DOM
                        cartItems.innerText = this.itemsInCart.itemCount
                        cartSubtotal.innerText = price.toFixed(2)
                        subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                        deliveryValue.innerText = deliveryFee.toFixed(2)
                        taxValue.innerText = tax.toFixed(2)
                        totalValue.innerText = total

                        if (this.itemsInCart.itemCount == 1) {
                            checkoutItemCount.innerText

                        
                        }
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
    }   


const restaurant = new Store()

restaurant.init()

