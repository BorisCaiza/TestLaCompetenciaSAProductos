const productModel = require("../model/Product.mode");
const mongoose = require('mongoose');


const productlCtrl = {};

//obtener servicios

productlCtrl.getProducts = async (req, res) => {


    let products = await productModel.find()

    //console.log(suppliers)

    if (products.length > 0) {

        res.status(200).send({
            status: true,
            products: products
        })

    } else {
        res.status(400).send({
            status: false,
            message: "No exiten productos"
        })
    }
}

//Obtener servicio

productlCtrl.getProduct = async (req, res) => {

    let id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).send({
            status: false,
            message: "Id no valido"
        })

    }





    let product = await productModel.findById(id)

    //console.log(task)

    if (!product) {

        res.status(400).send({
            status: false,
            message: "No existe el producto"
        })

    } else {

        try {

            res.status(200).send({
                status: true,
                product: product
            })

        } catch (error) {
            res.json({
                status: false,
                message: "Error al encontrar el producto"
            });

        }




    }
}






//Crear servicio
productlCtrl.create = async (req, res) => {



    let date = new Date();
    let strTime = date.toLocaleString("en-US", { timeZone: "America/Bogota" });
    const { name, description, sku, cost } = req.body;


    if (!name || !sku) {

        return res.status(400).send({
            status: false,
            message: "El nombre y el sku deben ser  obligatiorios"
        })
    }


    try {

        const product = new productModel({
            name: name,
            description: description,
            sku: sku,
            cost: cost
        })

        await product.save()

        res.status(200).send({
            status: true,
            message: "Producto Creado"
        })

    } catch (error) {


        res.status(400).send({
            status: true,
            message: "Error al crear el producto"
        })


    }









}

//Actualziar servicio


productlCtrl.update = async (req, res) => {

    let date = new Date();
    let strTime = date.toLocaleString("en-US", { timeZone: "America/Bogota" });
    const { name, description, sku, cost } = req.body;

    let product = await productModel.findById(req.params.id)

    if (!product) {

        res.status(400).send({
            status: false,
            message: "No existe el proovedor"
        })

    } else {


        try {

            if (product) {
                const newProduct = {
                    name: name,
                    description: description,
                    sku: sku,
                    cost: cost

                };

                await productModel.findByIdAndUpdate(req.params.id, newProduct, { userFindAndModify: false });

                res.status(200).send({
                    status: true,
                    message: "Producto Actualizado"
                })

            } else {
                res
                    .status(400).send({
                        status: false,
                        message: "No existe el producto"
                    })
            }
        } catch (error) {


            res.status(400).json({
                status: false,
                message: "Error al actualizar el producto"
            });
        }


    }

}




//Eliminar servicio

productlCtrl.delete = async (req, res) => {

    let id = req.params.id

    //console.log("entree")

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).send({
            status: false,
            message: "Id no valido"
        })

    }


    let product = await productModel.findById(id)

    if (!product) {

        res.status(400).send({
            status: false,
            message: "No existe el producto"
        })

    } else {

        try {

            await productModel.findByIdAndDelete(id, { userFindAndModify: false });

            res.status(200).send({
                status: true,
                message: "Producto Eliminado"
            })

        } catch (error) {

            res.json({
                status: false,
                message: "Error al eliminar el producto"
            });

        }




    }
}


module.exports = productlCtrl;
