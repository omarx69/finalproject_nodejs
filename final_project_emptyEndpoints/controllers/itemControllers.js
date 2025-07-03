const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<password>:<password>@cluster0.qlj1kug.mongodb.net/wishlistDB?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const Product = require('../models/Product');


const addProduct = async (req ,res)=>{
    const newProduct = new Product({
        nameOfProduct : req.body.nameOfProduct,
        price: req.body.price,
        description: req.body.description
    });

    await newProduct.save();
    res.json(newProduct);
}

const getAllProducts = async (req, res) =>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send("Error retrieving Products");
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId)

        if (!product){
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
        return;
    } catch (error) {
        console.error("Failed retrieving the productId:", productId);
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
}

const patchProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true })

        if (!product){
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
        return;
    } catch (error) {
        console.error("Failed retrieving the productId:", productId);
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
}

const deleteProduct=async (req, res) => {
        try {
        const productId = req.params.productId;
        const product = await Product.findByIdAndDelete(productId)

        if (!product){
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
        return;
    } catch (error) {
        console.error("Failed retrieving the productId:", productId);
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    patchProduct,
    deleteProduct
}
