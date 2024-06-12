import express from "express";
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
    console.log(`Escuchando en el http://localhost:${PORT}`);
})