const { Router } =require("express");

const router = Router();

const ProductManager = require("../dao/ProductManager.js");

ProductManager.path = "./src/data/products.json";


router.get ("/", async (req, res) => {
    let products
    try {
        products = await ProductManager.getProduct()
        console.log(typeof(products));
        return res.status(200).json({ products });

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

})

router.get("/:pid", (req, res) => {

})

router.post("/", (req, res) => {

})

router.put("/:pid", (req, res) => {

})

router.delete("/:pid", (req, res) => {

})

module.exports={ router };

