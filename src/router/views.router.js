const {Router}=require('express');
const router=Router()

const ProductManager = require("../dao/ProductManager.js");

router.get("/", async(req, res)=>{

    products = await ProductManager.getProduct()
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home',{
        products
    });

})

router.get("/realtimeproducts", (req, res)=>{

    res.setHeader('Content-Type','text/html');
    return res.status(200).render('products');
})

module.exports={router}