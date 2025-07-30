
export const getProductsAfterAdditionToCart = (newItem, basket) => {
    let products = []
    const productIds = basket.products.map(product => product.product._id)
    if(productIds.includes(newItem.product)){
        products = basket.products.map(
            p => p.product._id === newItem.product ?
                {product: p.product, amount: newItem.amount + p.amount} :
                {product: p.product, amount: p.amount}
        )
    }
    else {
        products =  [...basket.products, newItem]
    }
    return products;
}

export const getProductsAfterDeletionFromCart = (id, basket) => {
    return basket.products.filter(p => p._id !== id)
}