const mongoose = require('mongoose');


// Schema
const registerTravelnWorldSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Name is required"]
    },

    businessName: {
      type: String
  },

  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    min: [1, 'Enter a valid phone number'],
  },

    email: {
        type: String,
        // unique: [true, "Email {VALUE} already exists"],
        validate: {
            validator: (v)=>{
             return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props)=> `${props.value} is not a valid email address`
        },
        required: [true, "Email is required"]
      },

      location: {
        type: String
      },
      
     yourRequirements: {
        type: String,
     }
  });

const RegisterTravelnWorld = mongoose.model('RegisterTravelnWorld', registerTravelnWorldSchema);

module.exports = RegisterTravelnWorld