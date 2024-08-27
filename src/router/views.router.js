const {Router}=require('express');
const router=Router()

router.get("/", async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('home',{
        products
    });

})

router.get("/productsinrealtime", (req, res)=>{

    res.setHeader('Content-Type','text/html');
    return res.status(200).render('products');
})

module.exports={router}