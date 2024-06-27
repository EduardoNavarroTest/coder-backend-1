import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./class/productManager.js";

const PORT = 8080;
const app = express();
const productManager = new ProductManager("./src/db/products.json");
//Listener
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el http://localhost:${PORT}`);
});
const io = new Server(httpServer);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);



io.on("connection", async (socket) => {
    console.log("User conected...");

    //Send products array
    socket.emit("productos", await productManager.getProducts());

    //Eliminar productos desde el backend
    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);

        io.sockets.emit("productos", await productManager.getProducts());

    });

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        io.sockets.emit("productos", await productManager.getProducts());
    } )
});


/* Adicional

app.use(express.static("./src/public"));

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

app.post("/upload", upload.single("imagenclave"), (req, res) => {
    res.send("upload");
})

*/

//Voy por minuto 21:19