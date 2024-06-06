import express from 'express';
import userRoutes from "./routes/user.routes.js"

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/users", userRoutes)

app.get("/", (req, res) => {
    res.send(`Escuchando el puerto ${PORT}`);
});

app.get("/clients", (req, res) => {
    res.send(`Mi primera chamba como backend ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Escuchando en el http://localhost:${PORT}`);
})