import fs from "fs";

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    addCart = async ({ product, quantity }) => {

        const arrCart = await this.readFile();

        // Controlar que todos los campos existan
        if (!product || !quantity) {
            console.log(`All fields are required`);
            return;
        }

        const newProduct = arrCart.find(item => item.product === product);
        const id = await this.generateId();
        newProduct ? productInCart.quantity +=1 : arrCart.push({id, newProduct});

    
        //Guardar en el archivo
        await this.saveFile(arrCart)

    }

    getCartById = async (id) => {
        const cart = await this.readFile();
        return cart.find(item => item.id === parseInt(id)) || `Not Found`;
    }

    generateId = async () => {
        const arrProducts = await this.readFile();
        const maxId = arrProducts.reduce((max, product) => {
            return product.id > max ? product.id : max;
        }, 0);
        return maxId + 1;
    }

    saveFile = async (arr) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(arr, null, 2));
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    readFile = async () => {
        try {
            const file = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(file);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

}

export default CartManager;