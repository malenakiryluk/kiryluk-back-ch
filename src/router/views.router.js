const {Router}=require('express');
const router=Router()

const ProductManager = ProductMongoManager = require("../dao/ProductMongoManager");
const CartManager = CartMongoManager=require("../dao/CartMongoManager.js");

router.get("/products", async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('products');

})

router.get("/realtimeproducts", (req, res)=>{

    res.setHeader('Content-Type','text/html');
    return res.status(200).render('realTimeProducts');
})

router.get("/carts/:cid", async(req,res)=>{
    let {cid}=req.params
    let cart = await CartManager.getCartBy({_id:cid})

    res.setHeader('Content-Type','text/html');
    return res.status(200).render('carts',{
        cart
    });
})

module.exports={router}