import express from "express";
import CartManager from "../class/cartManager.js";
const router = express.Router();


const cartManager = new CartManager("./src/db/cart.json");


router.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await cartManager.getCartById(id);
        res.json(cart.products);
    } catch (e) {
        console.error("Error recovering the product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const newProduct = req.body;
        await cartManager.addProduct(newProduct);
        res.status(201).json({
            message: "Product successfully added"
        });
    } catch (e) {
        console.error("Error adding product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});

export default router;