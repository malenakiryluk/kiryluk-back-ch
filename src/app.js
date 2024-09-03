const express = require("express");
const fs = require("fs");
const { router:productRouter } = require("./router/products.router.js");
const { router:cartRouter } = require("./router/cart.routers");
const { router:viewsRouter }= require("./router/views.router.js")
const engine=require('express-handlebars').engine
const path=require('path');
const {Server} = require("socket.io");
//const { Server } = require("http");
let io;

const PORT=8080;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))
app.use(
    "/api/products",
    (req, res, next)=>{
        req.io= io
        next()
    },
    productRouter);
app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);

app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Home Page');

})


const server =app.listen(PORT, ()=>console.log(`servidor activo en puerto ${PORT}`));
io=new Server(server);

