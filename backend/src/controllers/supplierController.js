const Supplier = require("../models/Supplier");

// Create Supplier
const createSupplier = async(req, res) => {
    try {
        console.log("REQ.BODY SUPPLIER:", req.body);
        console.log("USER FROM TOKEN:", req.user);
        
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        
        if (!userId) {
            return res.status(401).json({
                message: "User ID not found. Please login again."
            });
        }

        const supplier = await Supplier.create({
            ...req.body,
            createdBy: userId
        });

        console.log("SAVED SUPPLIER:", supplier);

        res.status(201).json({
            message: "Supplier created successfully",
            supplier
        });

    } catch (error) {
        console.log("Create supplier error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Suppliers
const getSuppliers = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        
        const suppliers = await Supplier.find({
            createdBy: userId
        })
        .sort({
            createdAt: -1
        });

        res.status(200).json(suppliers);

    } catch (error) {
        console.log("Get suppliers error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Supplier
const getSupplierById = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        
        const supplier = await Supplier.findOne({
            _id: req.params.id,
            createdBy: userId
        });

        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json(supplier);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Supplier
const updateSupplier = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        
        const supplier = await Supplier.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: userId
            },
            req.body,
            {
                new: true
            }
        );

        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json({
            message: "Supplier updated successfully",
            supplier
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Supplier
const deleteSupplier = async(req, res) => {
    try {
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        
        const supplier = await Supplier.findOneAndDelete({
            _id: req.params.id,
            createdBy: userId
        });

        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json({
            message: "Supplier deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};
