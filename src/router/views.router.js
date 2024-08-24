const Router=require('express').Router;
const router=Router()

router.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');

})

router.get("/productsinrealtime", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json('productos en tiempo real');
})

module.exports={router}