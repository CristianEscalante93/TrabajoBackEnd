class ProductManager {
  constructor(){
    this.products =[];
    this.id = 0;
  }

  addProduct(title,description,price,thumbnail,code,stock){
    if(title && description && price && thumbnail && code && stock != undefined){
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.id,
      };
      if(this.products.find((product)=> product.code === code)){
        console.log("Error al agregar el producto, el producto ya se encuentra en el arreglo");
        return;
      }else{
        this.id++;
        this.products.push(product);
        console.log("El producto fue agregado al arreglo correctamente");
      }
    }else{
      console.log("Error al agregar producto: hubo parametros sin completar");
      return;
    }
  }
  getProducts(){
    this.products.length > 0 ? this.products.forEach((product)=> console.log(product)) : console.log("No hay productos en el arreglo");
  }
  getProductById(id){
    this.products.find((product)=> product.id === id) ? console.log(this.products.filter((product)=> product.id === id)) : console.log("Error Not Found");
  }
}

let sumaProducto = new ProductManager();
console.log(sumaProducto.products)
sumaProducto.addProduct(
  "Lámpara moderna",
  "Lampara moderna con mampara blanca traslucida, con tensor y cable de 2m",
  "$2500",
  "img",
  "11",
  "100"
)
sumaProducto.addProduct(
  "Lámpara vintage",
  "Lampara vintage negro brillante con tonalidad cobre, cúpula y cable de 2m",
  "$1000",
  "img",
  "22",
  "100"
)
sumaProducto.addProduct(
  "Lámpara",
  
)
sumaProducto.getProducts();
sumaProducto.getProductById(0);
sumaProducto.getProductById(1);
sumaProducto.getProductById(10);