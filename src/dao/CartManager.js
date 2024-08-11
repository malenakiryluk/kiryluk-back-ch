const fs=require("fs");



class CartManager{
    static path;

    static async getCart(){

        if(fs.existsSync(this.path)){
            let cart=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            
            return cart 
        }else{
            return []
        }

    }

    static async createCarrito() {

        let cart = await this.getCart();

        let id = 1;
        if (cart.length>0) {
            id =Math.max(...cart.map(c=>c.id))+1
        }

        cart.push({
            id,
            products:[]
        })

        await fs.writeFile(this.path, JSON.stringify(cart), {encoding:"utf"})
        return id

    };

    static async addToCart(){}

    static async getCartById(){

        
    }




}