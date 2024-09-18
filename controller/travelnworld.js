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


    exports.getRegisteredUsers = async (req, res)=>{
    try {

    const registeredUsers = await RegisterTravelnWorld.find();

    res.json(registeredUsers);

    } catch (error) {
    res.status(400).json(error);
    }

    }


    exports.deleteRegisteredUser = async (req, res)=>{
    try {

    const DeletedDoc = await RegisterTravelnWorld.findOneAndDelete({'_id': req.params.id});

    res.json(DeletedDoc);

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

    exports.getQuoteUsers = async (req, res)=>{
    try {

    const QuoteUsers = await QuoteTravelnWorld.find();

    res.json(QuoteUsers);

    } catch (error) {
    res.status(400).json(error);
    }

    }


    exports.deleteQuoteUser = async (req, res)=>{
    try {

    const DeletedDoc = await QuoteTravelnWorld.findOneAndDelete({'_id': req.params.id});

    res.json(DeletedDoc);

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


    exports.getContactUsUsers = async (req, res)=>{
    try {

    const ContactUsers = await ContactTravelnWorld.find();

    res.json(ContactUsers);

    } catch (error) {
    res.status(400).json(error);
    }

    }


    exports.deleteContactUsUser = async (req, res)=>{
    try {

    const DeletedDoc = await ContactTravelnWorld.findOneAndDelete({'_id': req.params.id});

    res.json(DeletedDoc);

    } catch (error) {
    res.status(400).json(error);
    }

    }