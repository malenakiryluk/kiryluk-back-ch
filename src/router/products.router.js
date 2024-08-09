const { Router } =require("express");

const router = Router();

const ProductManager = require("../dao/ProductManager.js");

ProductManager.path ="./src/data/product.json";


router.get ("/", async (req, res) => {
    let products
    try {
        products = await ProductManager.getProduct()
        
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
    return res.status(200).json({payload:products});


})

router.get("/:pid", async(req, res) => {

    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        // return res.send("id debe ser numerico")
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numerico`})
    }

    let products
    try {
        products=await ProductManager.getProduct()
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

router.post("/", async(req, res) => {
    let {title, description, code, price, status, stock, category}=req.body  
    if(!title || !description || !code || !price || !status || !stock || !category) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Tdoso los datos solicitados son obligatorios`})
    }

    let products = await ProductManager.getProduct()
    let existe = products.find(p=>p.code.toLowerCase()===code.toLowerCase())
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe un producto con codigo ${code}`});
    }

    try {
        let preProd={title, description, code, price, status, stock, category}
        let nuevoProd=await ProductManager.addProduct(preProd)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({nuevoProd});
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

router.put("/:pid", (req, res) => {

})

router.delete("/:pid", (req, res) => {

})

module.exports={ router };

