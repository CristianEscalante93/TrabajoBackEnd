const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async(setTitle, setDescription, setPrice, setThumbnail, setCode, setStock) => {
        const product = {
            title: setTitle,
            description: setDescription,
            price: setPrice,
            thumbnail: setThumbnail,
            code: setCode,
            stock: setStock
        }

        let valid = true;

        if ((setTitle && setDescription && setPrice && setThumbnail && setStock && setCode) == undefined) {
            console.log("Some data is missing");
            valid = false;
        }
        if ((setTitle.trim() && setDescription.trim() && setThumbnail.trim() && setCode.trim()) == 0) {
            console.log(`Some data is empty so the product won't be created`);
            valid = false;
        }
        if (typeof(setPrice) != "number" || typeof(setStock) != "number") {
            console.log(`Stock and price need to be numbers so ${setTitle} won't be created`);
            valid = false;
        }

        if (valid) {
            if (fs.existsSync(`${this.path}`)) {
                let objects = await JSON.parse(fs.readFileSync(`${this.path}`, "utf-8"));
                let lastProduct = await objects.pop()
                objects.push(lastProduct);
                product.id = await lastProduct.id+1;
    
                objects.push(product);
    
                objects = JSON.stringify(objects);
                fs.writeFileSync(`${this.path}`, objects);
            } else {
                console.log("No se encontrĂ³ el archivo, por lo que se ha creado uno nuevo");
                product.id = 0;
                let objects = [product];
    
                objects = await JSON.stringify(objects);
                await fs.writeFileSync(`${this.path}`, objects);
            }
        }
    }

    getProducts = async() => {
        if (fs.existsSync(`${this.path}`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}`, "utf-8"));
            return objects;

        } else {
            console.log("No se encontrĂ³ el archivo");
        }
    }

    getProductById = async(id) => {
        if (fs.existsSync(`${this.path}`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            if (position == -1) {
                console.log("No se encuentra ningĂºn producto con ese ID");
                return "No se encuentra ningĂºn producto con ese ID";
            } else {
                console.log(objects[position]);
                return objects[position];
            }
        } else {
            console.log("No se encontrĂ³ el archivo");
            return "No se encontrĂ³ el archivo";
        }
    }

    updateProduct = async(id, setTitle, setDescription, setPrice, setThumbnail, setCode, setStock) => {
        let product = {
            title: setTitle,
            description: setDescription,
            price: setPrice,
            thumbnail: setThumbnail,
            code: setCode,
            stock: setStock
        }
        
        if (fs.existsSync(`${this.path}`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            
            if (position === -1) {
                console.log("No se encuentra ningun producto con esa ID");
            } else {
                product.id = objects[position].id;

                objects.splice(position, 1, product);
                console.log(objects);
    
                objects = JSON.stringify(objects);
                fs.writeFileSync(`${this.path}`, objects);
            }
        } else {
            console.log("No se encontrĂ³ el archivo");
        }
    }

    deleteProduct = async(id) => {
        if (fs.existsSync(`${this.path}`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);

            if (position === -1) {
                console.log("No se encuentra ningĂºn producto con esa ID");
            } else {
                objects.splice(position, 1);
            }

            if (objects.length == 0) {
                await fs.unlinkSync(`${this.path}`, objects);
            } else {
                objects = JSON.stringify(objects);
                await fs.writeFileSync(`${this.path}`, objects);
            }
        } else {
            console.log("No se encontrĂ³ el archivo");
        }
    }
}


module.exports = ProductManager;

// pm.addProduct("Producto de prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);

// console.log(pm.getProductById(0));
// console.log(pm.getProductById(1));
// pm.updateProduct(0,"producto");
// pm.updateProduct(1,"producto1");
// pm.deleteProduct(0);

