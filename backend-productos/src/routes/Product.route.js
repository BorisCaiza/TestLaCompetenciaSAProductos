const express = require('express');
const router = express.Router();
const productlCtrl = require('../Controller/Product.controller');





//Obtener todos
router.get('/product', productlCtrl.getProducts);
//Obtener uno
router.get('/product/:id', productlCtrl.getProduct);

router.post('/product', productlCtrl.create);

router.delete("/product/:id", productlCtrl.delete)

router.put("/product/:id", productlCtrl.update)


module.exports = router;