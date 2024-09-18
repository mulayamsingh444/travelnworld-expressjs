const mongoose = require('mongoose');


// Schema
const contactTravelnWorldSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Name is required"]
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

      phone: {
        type: Number,
        required: [true, "Phone number is required"],
        min: [1, 'Enter a valid phone number'],
      },

     message: {
        type: String,
     }
  });

const ContactTravelnWorld = mongoose.model('ContactTravelnWorld', contactTravelnWorldSchema);

module.exports = ContactTravelnWorld