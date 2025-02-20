const Category = require('../models/Category');
const CATEGORIES = ["men", "women", "teens"];

const createACategory = async (req, res) => {
    const { name } = req.body;

    if (!CATEGORIES.includes(name.toLowerCase())) {
        return res.status(400).json({ error: "Categories should include men, women, or teens only." });
    }
    try {
        const category = new Category({ name });
        await category.save();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAvailableCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.status(404).json({ error: "No categories found." });
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
