const express = require("express");
const fs = require("fs");
const { router:productRouter } = require("./router/products.router.js");
const { router:cartRouter } = require("./router/cart.routers");


const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Home Page');

})

app.listen(PORT, ()=>console.log(`servidor activo en puerto ${PORT}`));


