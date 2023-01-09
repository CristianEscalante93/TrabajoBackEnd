const express= require('express');
const fs = require('fs');
const productManager = require('./ProductManager');

const app= express();

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send({saludos:"este es mi servidor"})
})

const pm = new productManager("./products.json");

app.get('/products/?', async (req, res) => {
  let cantidad = req.query;
  let product = await pm.getProducts();

  if (!cantidad.limit) {
    res.send({status: "Ok", message: product})
} else {
    let productQuery = product.slice(0, cantidad.limit);
    res.send({status: "Ok", message: productQuery})
}
  });

app.get("/products/:pid", async(req, res) => {
  let pid = req.params.pid;
  pid = parseInt(pid);
    
  let product = await pm.getProductById(pid);

  res.send({status: "Ok", message: product})
})

app.listen(8080,()=> {
    console.log("Listening on 8080");
})

console.log(pm.getProducts());

// pm.addProduct("Producto de prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
// console.log(pm.getProducts());
// console.log(pm.getProductById(0));
// console.log(pm.getProductById(1));
// pm.updateProduct(0,"producto");
// pm.updateProduct(1,"producto1");
// pm.deleteProduct(0);