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

    static async deleteProduct(pid){

        let products=await this.getProduct()
        let iProduct=products.findindex(p=>p.id===pid)
        if(iProduct===-1){
            throw new Error(`no existe el id ${pid}`)
        }
        let cantidad0=products.length
        products=products.filter(p=>p.id!==pid)   
        let cantidad1=products.length
       
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))

        return cantidad0-cantidad1

    }

    static async modifyProduct(pid, pAModificar={}){

        let products=await this.getProduct()
        let iProduct=products.findindex(p=>p.id===pid)
        if(iProduct===-1){
            throw new Error(`no existe el id ${id}`)
        }

        products[iProduct]={
            ...products[iProduct],
            ...pAModificar
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))


    }



}




module.exports=ProductManager;
