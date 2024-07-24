import { Router } from "express";
import ProductManager from "../dao/db/productManagerDb.js"
import CartManager from "../dao/db/cartManagerDb.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

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

router.get("/products", async (req, res) => {
    try {
       const { limit = 10, page = 1, query, sort } = req.query;
       const productos = await productManager.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        query,
        sort          
       });
 
       const nuevoArray = productos.docs.map(producto => {
          const { _id, ...rest } = producto.toObject();
          return rest;
       });

       console.log({productos: nuevoArray,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages})
 
       res.render("products", {
          productos: nuevoArray,
          hasPrevPage: productos.hasPrevPage,
          hasNextPage: productos.hasNextPage,
          prevPage: productos.prevPage,
          nextPage: productos.nextPage,
          currentPage: productos.page,
          totalPages: productos.totalPages
       });
 
    } catch (error) {
       console.error("Error getting products", error);
       res.status(500).json({
          status: 'error',
          error: "Internal error server"
       });
    }
 });


export default router;