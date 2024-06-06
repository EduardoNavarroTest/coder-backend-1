import { Router } from 'express';


let users = [
    {
        id: 1,
        name: "juan1",
        last_name: "perez",
        email: "junperez@mail.com",
        password: "123456",
    },
    {
        id: 2,
        name: "juan1",
        last_name: "perez",
        email: "junperez@mail.com",
        password: "123456",
    },
    {
        id: 3,
        name: "juan1",
        last_name: "perez",
        email: "junperez@mail.com",
        password: "123456",
    },
    {
        id: 4,
        name: "juan1",
        last_name: "perez",
        email: "junperez@mail.com",
        password: "123456",
    },
];

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: 'OK',
        users
    })
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

    if(user){
        users = users.filter(u => u.id !== parseInt(id));
        res.status(200).json({ mensaje: `Usuario con id ${id} eliminado` })
    } else {
        res.status(404).json({ error: `User no encontrado con el id ${id}` })
    }

    

})

router.get("*", (req, res) => {
    res.status(400)
    res.json(`NOT FOUND`)
})





//PENDIENTE ROUTER POST 1:04

export default router;