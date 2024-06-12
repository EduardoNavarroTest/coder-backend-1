import express from "express";
import ProductManager from "../class/productManager.js";
const router = express.Router();


const productManager = new ProductManager("./src/db/products.json");


router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        limit ? res.json(products.slice(0, limit)) : res.json(products);

    } catch (e) {
        console.error("Error recovering the products", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.getProductById(id);
        res.json(product);
    } catch (e) {
        console.error("Error recovering the product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
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

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productUpdate = req.body;

    try {
        await productManager.updateProduct(parseInt(id), productUpdate);
        res.json({
            message: "Product successfully update"
        });
    } catch (e) {
        console.error("Error update product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Product successfully delete"
        });
    } catch (e) {
        console.error("Error delete product", e);
        res.status(500).json({
            e: "Server Error"
        });
    }
});





















router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, last_name } = req.body;

    const user = users.find(u => u.id === parseInt(id));

    if (user) {
        user.name = name;
        user.last_name = last_name;
        res.status(200).json({ mensaje: `Usuario con id ${id} actualizado`, ...user })
    } else {
        res.status(404).json({ error: `User no encontrado con el id ${id}` })
    }

});

router.delete("/:id", (req, res) => {

    const id = req.params.id;
    const user = users.some(u => u.id === parseInt(id));

    if (user) {
        users = users.filter(u => u.id !== parseInt(id));
        res.status(200).json({ mensaje: `Usuario con id ${id} eliminado` })
    } else {
        res.status(404).json({ error: `User no encontrado con el id ${id}` })
    }



})


export default router;