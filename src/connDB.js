const mongoos = require("mongoos")

const connDB =async()=>{
    try {
        
        await mongoos.connect(
            "mongodb+srv://malenakiryluk:malena2014!@cluster0.tab2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

            {dbName:"proyectoCoder"}
        )

    } catch (error) {
        console.log(`error al conectarse a DB: ${error.message}`)
    }
}

module.exports=connDB;