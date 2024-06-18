const Category = require('../models/Category');
const CATEGORIES = ["men", "women", "teens"];

const createACategory = async (req, res) => {
    const { name } = req.body;

    if (!CATEGORIES.includes(name.toLowerCase())) {
        return res.status(500).json({ error: "Categories should include men, women, or teens only." });
    }
    try {
        const category = new Category({ name });
        await category.save();
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAvailableCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            res.status(500).json({ error: "No category found. " });
        }
        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createACategory,
    getAvailableCategories
};