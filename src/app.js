const express = require("express");

const PORT = 8080;

const app = express();

app.listen(PORT, ()=>console.log(`servidor activo en puerto ${PORT}`));

console.log('hola mundo');
