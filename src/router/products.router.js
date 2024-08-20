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

    let {pid}=req.params
    id=Number(pid)
    if(isNaN(id)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser numerico`})
    }

    let products;
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

    let product=products.find(p=>p.id===id)
    if(!product){
    
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`producto no encontrado con id ${iid}`})
    }
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:product});

})

router.post("/", async(req, res) => {
    let {title, description, code, price, status, stock, category}=req.body  
    if(!title || !description || !code || !price || !status || !stock || !category) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Todos los datos solicitados son obligatorios`})
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'number' || typeof price !== 'number' || typeof status !== 'boolean' || typeof stock !== 'number' || typeof category !=='string') {
        
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los datos deben ser envidos esn sus formatos correctos`})

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

router.put("/:pid", async(req, res) => {

    let {pid}=req.params
    id=Number(pid)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numerico`})
    }

    let products;
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

    let product=products.find(p=>p.id===id)
    if(!product){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`producto no encontrado con id ${id}`})
    }

    let pAModificar=req.body

    delete pAModificar.id;

    if(pAModificar.code){
        let existe=products.find(P=>P.code.toLowerCase()===pAModificar.code.toLowerCase() && p.id!==id)
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`ya hay un producto registrado con codigo ${pAModificar.code}`})
        }
    }

    try {
        let productModificado=await ProductManager.modifyProduct(id, pAModificar)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productModificado});
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

router.delete("/:pid", async(req, res) => {

    let { pid }=req.params
    id=Number(pid)
    if(isNaN(id)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id debe ser numerico`})
    }


    try {
        let resultado=await ProductManager.deleteProduct(id)
        if(resultado>0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:"Producto eliminado con exito"});
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al eliminar el producto`})
        }
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

