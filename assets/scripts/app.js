class Product {
	// title = 'DEFAULT'
	// imageUrl
	// description
	// price

	constructor(title, image, desc, price) {
		this.title = title
		this.imageUrl = image
		this.description = desc
		this.price = price
	}
}

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName
		this.value = attrValue
	}
}

class Component {
	constructor(renderHookId) {
		this.hookId = renderHookId
	}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag)
		if (cssClasses) {
			rootElement.className = cssClasses
		}
		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value)
			}
		}
		document.getElementById(this.hookId).append(rootElement)
		return rootElement
	}
}

class ShoppingCart extends Component {
	items = []

	set cartItems(value) {
		this.items = value
		this.totalOutput.innerHTML = `Total: \$${this.totalAmount.toFixed(2)}`
	}

	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, curItem) => prevValue + curItem.price,
			0
		)
		return sum
	}

	constructor(renderHookId) {
		super(renderHookId)
	}

	addProduct(product) {
		const updatedItems = [...this.items]
		updatedItems.push(product)
		this.cartItems = updatedItems
	}

	render() {
		const cartEl = this.createRootElement('section', 'cart')
		cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `
		this.totalOutput = cartEl.querySelector('h2')
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId)
		this.product = product
	}

	addToCart() {
		App.addProductToCart(this.product)
	}

	render() {
		const prodEl = this.createRootElement('li', 'product-item')
		prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" />
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `
		const addCartButton = prodEl.querySelector('button')
		addCartButton.addEventListener('click', this.addToCart.bind(this))
	}
}

class ProductList extends Component {
	products = [
		new Product(
			'A Pillow',
			'https://www.maxpixel.net/static/photo/1x/Sofa-Living-Room-Real-Estate-Table-Picture-6893109.jpg',
			'A soft pillow!',
			19.99
		),
		new Product(
			'A Carpet',
			'https://www.maxpixel.net/static/photo/1x/Colors-Clothing-Fabric-Rugs-Material-Carpet-6782082.jpg',
			'A carpet which you might like - or not.',
			89.99
		),
	]

	constructor(renderHook) {
		super(renderHook)
	}

	render() {
		this.createRootElement('ul', 'product-list', [
			new ElementAttribute('id', 'prod-list'),
		])
		for (const prod of this.products) {
			const productItem = new ProductItem(prod, 'prod-list')
			productItem.render()
		}
	}
}

class Shop {
	render() {
		this.cart = new ShoppingCart('app')
		this.cart.render()
		const productList = new ProductList('app')
		productList.render()
	}
}

class App {
	static cart

	static init() {
		const shop = new Shop()
		shop.render()
		this.cart = shop.cart
	}

	static addProductToCart(product) {
		this.cart.addProduct(product)
	}
}

App.init()
