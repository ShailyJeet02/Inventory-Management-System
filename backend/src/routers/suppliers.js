const express = require("express");

const router = express.Router();


const {

    createSupplier,

    getSuppliers,

    getSupplierById,

    updateSupplier,

    deleteSupplier

} = require("../controllers/supplierController");


const authMiddleware = require("../middleware/authMiddleware");





// Create Supplier

router.post(

    "/",

    authMiddleware,

    createSupplier

);





// Get All Suppliers

router.get(

    "/",

    authMiddleware,

    getSuppliers

);





// Get Single Supplier

router.get(

    "/:id",

    authMiddleware,

    getSupplierById

);





// Update Supplier

router.put(

    "/:id",

    authMiddleware,

    updateSupplier

);





// Delete Supplier

router.delete(

    "/:id",

    authMiddleware,

    deleteSupplier

);





module.exports = router;