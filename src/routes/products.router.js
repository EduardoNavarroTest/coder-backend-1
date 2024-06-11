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
        const { title, description, code, price, stock, category, thumbnails } = newProduct;
        await productManager.addProduct(title, description, code, price, stock, thumbnails, category);
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























router.post("/", (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    if (!name || !last_name || !email) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
    }

    let id = users[users.length - 1].id + 1;
    users.push({ id, name, last_name, email });
    res.status(201).json({ id })
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