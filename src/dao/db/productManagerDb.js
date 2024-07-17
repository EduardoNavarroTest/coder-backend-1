
import ProductModel from "../fs/data/products.model.js";

class ProductManager {


    addProduct = async ({ title, description, code, price, stock, thumbnails, category }) => {

        const status = true;

        // Controlar que todos los campos existan
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            console.log(`All fields are required`);
            return;
        }

        const existsProduct = await ProductModel.findOne({ code: code });
        if (existsProduct) {
            console.log(`Existing code ${code}`);
            return;
        };

        //Agregar al array
        const newProduct = new ProductModel({ title, description, price, thumbnails, code, stock, status, category })

        await newProduct.save();
    }

    getProducts = async () => {
        const arrProducts = await ProductModel.find();
        return arrProducts;
    }

    getProductById = async (id) => {
        const product = await ProductModel.findById(id);
        return product || `Not Found`;
    }

    updateProduct = async (id, productUpdate) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, productUpdate);

            if (!product) {
                console.log(`Product not found`);
                return null;
            } else {
                console.log(`Product update`)
            }
            return product
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    deleteProduct = async (id) => {
        try {
            const productDelete = await ProductModel.findByIdAndDelete(id);

            if (!productDelete) {
                console.log(`Product not found`);
                return null;
            } else {
                console.log(`Product delete`)
            }
            return productDelete
        } catch (e) {
            console.log("Error: ", e);
        }
    }

}

export default ProductManager;