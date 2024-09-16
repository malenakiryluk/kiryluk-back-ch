const { Router } =require("express");
const router = Router();

const CartManager = CartMongoManager=require("../dao/CartMongoManager.js");
const ProductManager = ProductMongoManager =require("../dao/ProductMongoManager.js");
const { isValidObjectId } = require("mongoose");

//CartManager.path = "./src/data/carts.json"; 

router.get("/", async (req, res) =>{
    let cart
    try {
        cart = await CartManager.getCart();
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({payload:cart});
})

router.get("/:cid", async(req, res) => {

    let {cid}=req.params
    if(!isValidObjectId(cid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }

    try {
        let cart=await CartManager.getCartBy({_id:cid})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:cart});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

})

router.post("/", async(req,res) =>{

    try {
        cart=await CartManager.createCarrito()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({cart});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    

    /*let { id } = req.body
    if (!id || typeof id !== 'number') {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Por favor ingresa un ID que tiene que ser de tipo numerico`})
    }

    let products = await ProductManager.getProduct()
    let index = products.findIndex(p=>p.id === id)

    if(index === -1){
        throw new Error(`no existe el id ${id}`)

    }

    let productToAdd = {...products[index]}

    try {
        await CartManager.createCarrito(productToAdd)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productToAdd});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }*/

})

router.post("/:cid/product/:pid", async(req, res) =>{

    let { cid, pid } = req.params
    if (!isValidObjectId(cid)|| !isValidObjectId(pid)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los id's deben ser validos`})
        
    }

    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }

    let product = await ProductManager.getProductBy({_id:pid})
    if (!product) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid}`})
    }

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if (indiceProduct===-1) {
        cart.products.push({
            product:pid,
            quantity:1
        })
        
    }else{
        cart.products[indiceProduct].quantity++
    }
    
    cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});

})

router.delete("/:cid/product/:pid",async(req,res)=>{
    let { cid, pid }= req.params
    console.log(cid, pid)
    if (!isValidObjectId(cid)|| !isValidObjectId(pid)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los id's deben ser validos`})
        
    }

    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }
   // let product = await ProductManager.getProductBy({_id:pid})
   /* if (!product) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid}`})
    }*/

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if(indiceProduct === -1){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid} en este carriro`})
    }else{
        cart.products.splice(indiceProduct,1)
    }

    cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});
})

router.delete("/:cid", async(req,res)=>{

    let {cid}=req.params
    if (!isValidObjectId(cid) || !cid) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id ${cid} no es valido`})
    }
    try {
        let cart=await CartManager.getCartBy({_id:cid})
        let newCart=cart.products=[]
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:newCart});

    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})

router.put("/:cid", async(req,res)=>{
    let {cid}=req.params
    let {array} = req.body
    if(!isValidObjectId(cid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }


})// en este punto no llegue a comprender exactamente que pedia la consigna

router.put("/:cid/product/:pid", async(req,res)=>{
    let {cid, pid}=req.params
    let { quantity }= req.body
    if(!isValidObjectId(cid)|| !isValidObjectId(pid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }
    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if(indiceProduct === -1){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid} en este carriro`})
    }else{
        cart.products[indiceProduct].quantity = quantity
    }

    try {
        cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
    

})

module.exports={ router };
