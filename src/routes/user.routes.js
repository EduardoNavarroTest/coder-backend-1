import { Router } from 'express';


const users = [
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

router.get("/user", (req, res) => {
    res.json({
        message: 'OK',
        users
    })
});

router.get("*", (req, res)=>{
    res.status(400)
    res.json(`NOT FOUND`)
})





//PENDIENTE ROUTER POST 1:04

export default router;