const User = require("../model/user.js");
const bcrypt = require("bcrypt");
  
  exports.getAllusers = async (req, res)=>{
    try {
      const users = await User.find();
  res.json(users);
    } catch (error) {
    res.status(400).json(error);
    }
    
  }
  
  exports.getCurrentUser = async (req, res)=>{
    try {
      const token = req?.get('Authorization')?.split('Bearer ');

       const user = await User.findOne({'token': token[1]});
   
    res.json(user)
    } catch (error) {
      res.status(400).json(error);
    }
  }
  
  
  
    exports.updateCurrentUser = async (req, res)=>{ 
      try {
        const token = req?.get('Authorization')?.split('Bearer ');

          const obj = {};
          let pass = String(req.body?.password);
          let firstName = String(req.body?.firstName);
          let lastName = String(req.body?.lastName);

        if(pass.length < 8){
          obj.passwordError = "Password length should not be below 8";
        }
        if(/\s/.test(pass)){
         obj.passwordError = "Password should not contain space characters";
        }

        if(firstName.trim() === ""){
         obj.firstNameError = "First name should contain at least one non space or non empty character";
        }

        if(lastName.trim() === ""){
          obj.lastNameError = "Last name should contain at least one non space or non empty character";
        }

        if(obj.passwordError || obj.firstNameError || obj.lastNameError){
          res.status(400).json({error: obj});
          return;
        }

        if(req.body.password){
          const hash = bcrypt.hashSync(String(req.body?.password), 10);

          const user = await User.findOneAndUpdate({token: token[1]}, {...req.body, password: hash}, {new: true});

          res.json(user);

          return;
        }

        const user = await User.findOneAndUpdate({token: token[1]}, req.body, {new: true});
        res.json(user);

      } catch (error) {
       res.status(400).json(error) 
      }

      }