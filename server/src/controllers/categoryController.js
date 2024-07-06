const Category = require('../models/categoryModel');
const { Op } = require('sequelize');

// @desc Get all categories
// @route GET /api/category
// @access public
const getCategories = async (req, res) => {
    const name = req.query.name || ""; // filter by name
    const sort = req.query.sort || "id"; // filter by name
    const type = req.query.type || "desc"; // filter by name
    const categories = await Category.findAll({ // get
        order: [[sort, type]],
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    const count = await Category.count(); // total data count
    res.status(200).json({ data: categories, totalDataCount: count });
}

// @desc Create new category
// @route POST /api/category
// @access private
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const nameCheck = await Category.findOne({ where:{ name: name } });
    if (nameCheck !== null) { // check other names
        res.status(400);
        throw new Error("Category already created");
    }
    const category = await Category.create({ name: name }); // create
    res.status(201).json({ message: `'${category.name}' category added` });
}

// @desc Delete category
// @route DELETE /api/category/:id
// @access private
const deleteCategory = async (req, res) => {
    const category = await Category.findByPk(req.params.id); // get
    if (category === null) { // check fields
        res.status(404);
        throw new Error("Category not found");
    }
    await category.destroy(); // delete
    res.status(200).json({ message: "Category deleted successfully" });
}

// @desc Update category
// @route PUT /api/category/:id
// @access private
const updateCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const category = await Category.findByPk(req.params.id); // get
    if (category === null) { // check fields
        res.status(404);
        throw new Error("Category not found");
    }
    await category.update({ name: name }); // update
    res.status(200).json(category);    
}

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
};