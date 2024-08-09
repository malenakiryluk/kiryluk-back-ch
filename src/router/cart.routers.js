const { Router } =require("express");

const CartManager = require("../dao/CartManager.js");

const router = Router();
CartManager.path = "./src/data/cart.json";

router.get("/:cid", (req, res) => {

})

router.post("/", (req,res) =>{

})


module.exports={ router };
