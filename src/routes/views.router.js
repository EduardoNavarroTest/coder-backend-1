import { Router } from "express";
import ProductManager from "../class/productManager.js"

const router = Router();
const productManager = new ProductManager("./src/db/products.json");

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
});

router.get("/home", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });
    } catch (e) {
        console.log(`Error => ${e}`);
        res.status(500).send(`Error when recovering products => ${e}`);
    }
})


export default router;