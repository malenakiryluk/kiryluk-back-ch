const express = require("express");
const fs = require("fs");
const { router:productRouter } = require("./router/products.router.js");
const { router:cartRouter } = require("./router/cart.routers");
const { router:vistasRouter }= require("./router/vistas.router.js")
const path=require('path');
const engine=require('express-handlebars').engine


const PORT = 8080;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./src/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);


app.use("/", vistasRouter);

app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Home Page');

})



app.listen(PORT, ()=>console.log(`servidor activo en puerto ${PORT}`));


