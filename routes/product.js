const express = require('express');
const {createProduct, getAllProducts, updateProduct, deleteProduct, getUserProducts, likeProduct, addProductToCart, removeProductFromCart, changeProductQuantity, getCartProducts} = require("../controller/product.js");
const productRouter = express.Router();


module.exports = productRouter;

productRouter
.post('/', createProduct)
.get('/likeProduct/:id', likeProduct)
.get('/', getAllProducts)
.get('/userProducts', getUserProducts)
.get('/cartProducts', getCartProducts)
.patch('/:id', updateProduct)
.patch('/addToCart/:id', addProductToCart)
.patch('/changeQuantity/:id', changeProductQuantity)
.delete('/:id', deleteProduct)
.delete('/removeFromCart/:id', removeProductFromCart)
;

productRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  });

