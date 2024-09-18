const model = require('../model/product.js');
const Product = model.Product;
const User = require('../model/user.js');


exports.createProduct = async (req, res)=>{
  try {
    const token = req?.get('Authorization')?.split('Bearer ');

    const user = await User.findOne({token: token[1]});

    const product = new Product(req.body);

    if(Math.floor(Number(req.body?.stock)) !== Number(req.body?.stock)){
      res.status(400).json({error: "Stock should be a positve integer greater than 1"});
      return;
    }

    product.user = user._id;

    user.products.push(product._id);
  
    const data = await product.save();

    await user.save();
  
      res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
 
  }
  
  exports.getAllProducts = async (req, res)=>{
    try {
      const products = await Product.find();

  res.json(products);
    } catch (error) {
      res.status(400).json({error})
    }
  
  }
  
  
  exports.getUserProducts = async (req, res)=>{
   try {
    const token = req?.get('Authorization')?.split('Bearer ');

    const userProducts = await User.findOne({token: token[1]}).populate('products');

    const products = userProducts.products;

    res.json(products);
   } catch (error) {
    res.status(400).json({error});
   }
  }

  
    exports.updateProduct = async (req, res)=>{ 
      try {
        const token = req?.get('Authorization')?.split('Bearer ');

        const userProducts = await User.findOne({token: token[1]}).populate('products');
    
        const products = userProducts.products;

        const product = products?.find((ele)=>ele._id == req.params.id);

        if(product){
          const getProduct = await Product.findById(req.params.id);
          const obj = {};
          let title = String(req.body?.title);
          let description = String(req.body?.description);
          let price = String(req.body?.price);
          let discount = String(req.body?.discountPercentage);
          let stock = String(req.body?.stock);
          let brand = String(req.body?.brand);
          let category = String(req.body?.category);
          let thumbnail = String(req.body?.thumbnail);
          
          if(req.body?.price < 1){
           obj.priceError = "Price should not be below 1"
          }
          if(req.body?.discountPercentage < 0){
            obj.discountError = "Discount can't be less than 0%"
          }
          if(req.body?.discountPercentage > 90){
            obj.discountError = "Discount can't be above 90%"
          }

          if(req.body?.stock < 1){
            obj.stockError = "Stock can't be less than 1"
          }

          if(req.body?.stock < getProduct.stock && req.body?.stock < 10){
            obj.stockError = "The stock value should be greater than the previous value or 9"

            console.log("The stock value should be greater than the previous value or 10", "previous value ->" ,getProduct.stock, "new Value", req.body.stock);
          }

          if(req.body?.stock){
            if(Math.floor(Number(req.body?.stock)) !== Number(req.body?.stock)){
              obj.stockError = "Stock should be a positve integer greater than 9 or previous value"
             }
          }
          

          if(title.trim() === ""){
            obj.titleError = "Title should contain at least one non space or non empty character";
           }

           if(description.trim() === ""){
            obj.descriptionError = "Description should contain at least one non space or non empty character";
           }

           if(description.length > 50){
            obj.descriptionError = "Description length should not be above 50";
           }
   
           if(price.trim() === ""){
             obj.priceError = "Price should be a valid number";
           }

           if(discount.trim() === ""){
            obj.discountError = "Discount should be a valid number";
           }

           if(stock.trim() === ""){
            obj.stockError = "Stock should be a valid number";
           }

           if(brand.trim() === ""){
            obj.brandError = "Brand should contain at least one non space or non empty character";
           }

           if(category.trim() === ""){
            obj.categoryError = "Category should contain at least one non space or non empty character";
           }

           if(thumbnail.trim() === ""){
            obj.thumbnailError = "Thumbnail should contain at least one non space or non empty character";
           }



          if(obj.priceError || obj.discountError || obj.titleError || obj.stockError || obj.brandError || obj.categoryError || obj.thumbnailError || obj.descriptionError){
            res.status(400).json({...obj, productId: req.params.id});
            return;
          }

          const product = await Product.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true});

          res.json(product);
        }
        else{
          res.status(400).json({error: "Can't update another user product", productId: req.params.id});
        }

      } catch (error) {
        console.log("updateProduct error caught snakx bar", error)
       res.status(400).json({...error, productId: req.params.id}) 
      }
      }
  
    exports.deleteProduct = async (req, res)=>{
  
      try {

        const token = req?.get('Authorization')?.split('Bearer ');

        const userProducts = await User.findOne({token: token[1]}).populate('products');
    
        const products = userProducts.products;

        const product = products?.find((ele)=>ele._id == req.params.id);

        if(product){
          const product = await Product.findOneAndDelete({'_id': req.params.id});

          const index = products?.findIndex((ele)=>ele._id == req.params.id);

          products.splice(index, 1);

          await userProducts.save();

          res.json(product);
        }
        else{
          res.status(400).json({error: "Can't delete another user product"});
        }

      } catch (error) {
       res.json(error) 
      }
  }


  exports.likeProduct = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

    const user = await User.findOne({token: token[1]});

    const product = await Product.findById(req.params.id);

      const index = product.likes.indexOf(user._id);

      if(index === -1){
        product.likes.push(user._id);
      }
      else{
       product.likes.splice(index, 1);
      }

      await product.save();

      res.json(product);

    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }


  exports.addProductToCart = async (req, res)=>{
  try {
    const token = req?.get('Authorization')?.split('Bearer ');

    const user = await User.findOne({token: token[1]});

    const product = await Product.findById(req.params.id);

    if(req.body?.quantity === undefined){

      const isproductInCart = user.cart.includes(product._id);

      if(!isproductInCart){
        user.cart.push(product._id);

        await user.save();
  
        res.json(user);  
      }
      else{
       res.status(400).json({error: "This product is already in the cart", productId: req.params.id});
      }

    }
    else{

      const obj = {};
      let quantity = String(req.body?.quantity);

      if(req.body.quantity < 1){
        obj.quantityError = "Quantity can't be less than 1"
      }

      if(product.stock < req.body?.quantity){
        obj.quantityError = "Quantity can't be more than stock"
      }

      if(Math.floor(Number(req.body.quantity)) !== Number(req.body.quantity)){
        obj.quantityError = "Qunatity should be a positve integer greater than 1"
      }

      if(quantity.trim() === ""){
        obj.quantityError = "Quantity should be a valid number"
      }

      if(obj.quantityError){
        res.status(400).json({error: obj, productId: req.params.id});

        return 
      }

      
        product.quantity = req.body?.quantity;
  
        const isproductInCart = user.cart.includes(product._id);

        if(!isproductInCart){

          await product.save();

          user.cart.push(product._id);
  
          await user.save();
    
          res.json(user);  
        }
        else{
         res.status(400).json({error: "This product is already in the cart", productId: req.params.id});
        }
     
    }

  } catch (error) {
   res.status(400).json({error: error.message}) 
  }
  }


  exports.removeProductFromCart = async (req, res)=>{
   try {
    const token = req?.get('Authorization')?.split('Bearer ');

    const user = await User.findOne({token: token[1]});

    const index = user.cart.indexOf(req.params.id);

    if(index !== -1){
      user.cart.splice(index, 1);

      await user.save();

      res.json(req.params.id);
    }
    else{
res.status(400).json({error: "Requested product for deletion is not found in the cart"});
    }
    
   } catch (error) {
    res.status(400).sjon({error: error.message})
   } 
  }


  exports.changeProductQuantity = async (req, res)=>{
try {
  const token = req?.get('Authorization')?.split('Bearer ');

  const user = await User.findOne({token: token[1]});

  const product = await Product.findById(req.params.id);

  const isProductInCart = user.cart.includes(req.params.id);

  if(isProductInCart){
    const obj = {};
    let quantity = String(req.body?.quantity);

    if(req.body.quantity < 1){
      obj.quantityError = "Quantity can't be less than 1"
    }

    if(product.stock < req.body?.quantity){
      obj.quantityError = "Quantity can't be more than stock"
    }

    if(Math.floor(Number(req.body.quantity)) !== Number(req.body.quantity)){
      obj.quantityError = "Qunatity should be a positve integer greater than 1"
    }

    if(quantity.trim() === ""){
      obj.quantityError = "Quantity should be a valid number"
    }

    if(obj.quantityError){
      res.status(400).json({error: obj, productId: req.params.id});

      return 
    }


    product.quantity = req.body.quantity;

    await product.save();

    res.json(product);
  }
  else{
    res.status(400).json({error: "Can't change quantity of a product which is not present in the cart"});
  }

} catch (error) {
  res.status(400).json({error: error.message})
}

  }


  exports.getCartProducts = async (req, res)=>{

    try {
      const token = req?.get('Authorization')?.split('Bearer ');

    const user = await User.findOne({token: token[1]}).populate("cart");

    const cartProducts = user.cart;

   res.json(cartProducts);

    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }