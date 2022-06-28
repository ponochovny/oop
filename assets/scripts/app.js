const productList = {
	products: [
		{
			title: 'A Pillow',
			imageUrl:
				'https://www.maxpixel.net/static/photo/1x/Sofa-Living-Room-Real-Estate-Table-Picture-6893109.jpg',
			price: 19.99,
			description: 'A soft pillow!',
		},
		{
			title: 'A Carpet',
			imageUrl:
				'https://www.maxpixel.net/static/photo/1x/Colors-Clothing-Fabric-Rugs-Material-Carpet-6782082.jpg',
			price: 89.99,
			description: 'A carpet which you might like - or not.',
		},
	],
	render() {
		const renderHook = document.getElementById('app')
		const prodList = document.createElement('ul')
		prodList.className = 'product-list'
		for (const prod of this.products) {
			const prodEl = document.createElement('li')
			prodEl.className = 'product-item'
			prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}" />
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `
			prodList.append(prodEl)
		}
		renderHook.append(prodList)
	},
}

productList.render()
