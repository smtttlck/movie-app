const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

// @desc Get all admins
// @route GET /api/admin
// @access private
const getAdmins = async (req, res) => {
    const page = req.query.page || 1; // page number
    const pageSize = req.query.pageSize || 15; // item count for page
    const name = req.query.name || ""; // filter by name
    const admins = await Admin.findAll({ // get
        order: [["id", "DESC"]],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    const count = await Admin.count(); // total data count
    res.status(200).json({ data: admins, totalDataCount: count });
}

// @desc Create new admin
// @route POST /api/admin
// @access private
const createAdmin = async (req, res) => {
    const { name, level, password } = req.body;
    if (!name || !level || !password) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const nameCheck = await Admin.findOne({ where:{ name: name } });
    if (nameCheck !== null) { // check other names
        res.status(400);
        throw new Error("Admin already created");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name: name, level: level, password: hashedPassword }); // create
    res.status(201).json({ message: `'${admin.name}' admin added` });
}

// @desc Delete admin
// @route DELETE /api/admin/:id
// @access private
const deleteAdmin = async (req, res) => {
    const admin = await Admin.findByPk(req.params.id); // get
    if (admin === null) { // check fields
        res.status(404);
        throw new Error("Admin not found");
    }
    await admin.destroy(); // delete
    res.status(200).json({ message: "Admin deleted successfully" });
}

// @desc Update admin
// @route PUT /api/admin/:id
// @access private
const updateAdmin = async (req, res) => {
    const { name, level, password } = req.body;
    if (!name || !level) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const admin = await Admin.findByPk(req.params.id); // get
    if (admin === null) { // check fields
        res.status(404);
        throw new Error("Admin not found");
    }
    await admin.update({ name: name, level: level }); // update
    res.status(200).json(admin);    
}

// @desc Login for admin
// @route POST /api/admin/login
// @access public
const adminLogin = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) { // check fields
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const admin = await Admin.findOne({ where: { name: name } });
    if (admin && await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({
            admin: {
                name: admin.name,
                level: admin.level
            }
        },
            process.env.SECRET_TOKEN,
            { expiresIn: "1d" }
    );
        res.status(200).json({ token });
    }
    else {
        res.status(401);
        throw new Error("Name or password not valid");
    }
}

module.exports = {
    getAdmins,
    createAdmin,
    deleteAdmin,
    updateAdmin,
    adminLogin
};