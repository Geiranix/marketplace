const Product = require('../models/Product');
const CATEGORIES = ["men", "women", "teens"];
const capitalizeInitial = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const createNewProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    if (!CATEGORIES.includes(category.toLowerCase())) {
        return res.status(400).json({ error: "Categories should include men, women, or teens only." });
    }

    try {
        const product = new Product({ name, description, price, quantity, category });
        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getAvailableProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(204).json({ message: "No products found in the database." });
        }
        res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getAProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(204).json({ error: "No product found." });
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const updateAProductById = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;

    if (category && !CATEGORIES.includes(category.toLowerCase())) {
        return res.status(400).json({ error: "Categories should include men, women, or teens only." });
    }
    
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, quantity, category },
            { new: true }
        );
        if (!product) {
            return res.status(204).json({ error: "No product found!" });
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteAProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(204).json({ message: `The item ${id} is already deleted!` });
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ message: "You've successfully deleted all the products." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const searchProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: new RegExp(name, 'i') });
        if (products.length === 0) {
            return res.status(204).json({ message: `No product matches the name ${capitalizeInitial(name)} in our database!` });
        }
        res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createNewProduct,
    getAvailableProducts,
    getAProductById,
    updateAProductById,
    deleteAProductById,
    deleteAllProducts,
    searchProductsByName
};
