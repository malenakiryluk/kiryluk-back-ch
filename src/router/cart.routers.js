const { Router } =require("express");

const CartManager = require("../dao/CartManager.js");

const router = Router();
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

})

router.post("/", async(req,res) =>{

})

router.put("/cid", async(req, res) =>{

})


module.exports={ router };
