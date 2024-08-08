const fs=require("fs")



class ProductManager {


    static path;

    static async getProduct(){

        if(fs.existsSync(this.path)){
            let productos=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            
            return productos 
        }else{
            return []
        }

    }

    static async getProductById(){

    }

    static async addProduct(){

    }

    static async deleteProduct(){

    }

    static async modifyProduct(){

    }



}




module.exports=ProductManager;
