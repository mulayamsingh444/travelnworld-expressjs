const RegisterTravelnWorld = require("../model/register.travelnworld.js");
const QuoteTravelnWorld = require("../model/quote.travelnworld.js");
const ContactTravelnWorld = require("../model/contact.travelnworld.js");

exports.register = async (req, res)=>{
    try {

    const registered = await RegisterTravelnWorld.create(req.body);

    res.json(registered);

    } catch (error) {
      res.status(400).json(error);
    }
   
    }


exports.quote = async (req, res)=>{
try {

const registered = await QuoteTravelnWorld.create(req.body);

res.json(registered);

} catch (error) {
    res.status(400).json(error);
}

}


exports.contactUs= async (req, res)=>{
    try {

    const registered = await ContactTravelnWorld.create(req.body);

    res.json(registered);

    } catch (error) {
        res.status(400).json(error);
    }
    
    }