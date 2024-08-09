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

    static async addProduct(product={}){

        let products=await this.getProduct()
        let id=1
        if(products.length>0){
            id=Math.max(...products.map(d=>d.id))+1
        }

        let nuevoProduct={
            id, 
            ...product
        }

        products.push(nuevoProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(product, null, 5))

        return nuevoProduct

    }

    static async deleteProduct(){

    }

    static async modifyProduct(){

    }



}




module.exports=ProductManager;
