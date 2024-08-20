const { Router } =require("express");
const router = Router();

const CartManager = require("../dao/CartManager.js");
const ProductManager = require("../dao/ProductManager.js");

CartManager.path = "./src/data/cart.json";

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
    id=Number(cid)
    if(isNaN(cid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser numerico`})
    }

    let cart;
    try {
        cart=await CartManager.getCart()
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

    let cartToFind = cart.find(p=>p.id === cid)
    if(!cartToFind){
    
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`carrito no encontrado con id ${cid}`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cartToFind});

})

router.post("/", async(req,res) =>{

    try {
        cart=await CartManager.createCarrito()
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

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`carrito creado con exito`});

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
    cid = Number(cid)
    pid = Number(pid)
    if (isNaN(cid)|| isNaN(pid)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los id's deben ser numericos`})
        
    }

    let cart = await CartManager.getCart()
    let cartId = cart.find(c=>c.id === cid)
    if (!cartId) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }

    let products = await ProductManager.getProduct()
    let product = products.find(p=>p.id === pid)
    product = productId.id
    if (!productId) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid}`})
    }

    let indiceProduct = cartId.products.findIndex(p=>p.product === pid)
    if (!indiceProduct) {
        cartId.products[indiceProduct].quantity++
    }else{
        cartId.products.push({
            product,
            quantity:1
        })
    }
    
    cart = await CartManager.addToCart(cid, cartId)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cartId});

})

module.exports={ router };
