import CartModel from "../fs/data/cart.model.js";

class CartManager {

    createCart = async () => {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    addCart = async (cartId, productId, quantity) => {
        // Controlar que todos los campos existan
        if (!cartId || !productId || !quantity) {
            console.log(`All fields are required`);
            return;
        }

        try {
            const cart = await this.getCartById(cartId);
            const existsProduct = cart.products.find(item => item.product.toString() === productId);

            if (existsProduct) {
                existsProduct.quantity += quantity;
            } else {
                cart.product.push({ product: productId, quantity })
            }

            cart.markModified("products");
            await cart.save()
            return cart;

        } catch (error) {
            console.log(`Error: ${error}`)
        }


    }

    getCarts = async () => {
        const cart = await CartModel.find();
        return cart || `Carts Not Found`;
    }

    getCartById = async (id) => {
        const cart = await CartModel.findById(id);
        return cart || `Cart Not Found`;
    }

}

export default CartManager;