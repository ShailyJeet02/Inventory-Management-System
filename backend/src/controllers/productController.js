const Product = require('../models/Product');
const Activity = require('../models/Activity');


// Add Product
const addProduct = async (req, res) => {
  try {

    const {
      name,
      category,
      description,
      quantity,
      price,
      supplier
    } = req.body;


    // userId authMiddleware se lo
    const userId = req.user._id || req.user.id || req.user.userId;


    console.log('REQ.BODY:', req.body);
    console.log('USER ID:', userId);
    console.log('SUPPLIER:', supplier);


    if (!userId) {
      return res.status(400).json({
        message: 'User ID not found in token'
      });
    }



    const newProduct = await Product.create({

      name,

      category,

      description: description || '',

      quantity: Number(quantity),

      price: Number(price),

      supplier: supplier || '',

      userId

    });



    // Create Dashboard Activity

    await Activity.create({

      type: "inventory",

      title: "New Product Added",

      desc: `${name} added to inventory`,

      color: "purple",

      time: "Just now"

    });



    console.log('SAVED PRODUCT:', newProduct);


    res.status(201).json({

      product: newProduct

    });


  } catch (error) {

    console.log('CREATE ERROR:', error);

    res.status(500).json({

      message: error.message

    });

  }
};







// Get All Products

const getProducts = async (req, res) => {

  try {


    const userId = req.user._id || req.user.id || req.user.userId;


    const products = await Product.find({
      userId
    });


    res.json(products);


  } catch (error) {


    res.status(500).json({
      message: error.message
    });


  }

};







// Get Single Product

const getProductById = async (req, res) => {

  try {


    const product = await Product.findById(req.params.id);


    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }


    res.json(product);



  } catch (error) {


    res.status(500).json({
      message:error.message
    });


  }

};








// Update Product

const updateProduct = async (req, res) => {

  try {


    const {
      name,
      category,
      description,
      quantity,
      price,
      supplier
    } = req.body;



    const updated = await Product.findByIdAndUpdate(

      req.params.id,

      {

        name,

        category,

        description: description || '',

        quantity:Number(quantity),

        price:Number(price),

        supplier:supplier || ''

      },

      {
        new:true
      }

    );



    if (!updated) {

      return res.status(404).json({
        message:'Product not found'
      });

    }



    res.json({

      product:updated

    });



  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};









// Delete Product

const deleteProduct = async (req,res)=>{

  try{


    const deleted = await Product.findByIdAndDelete(
      req.params.id
    );



    if(!deleted){

      return res.status(404).json({

        message:'Product not found'

      });

    }



    res.json({

      message:'Product deleted successfully'

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};







module.exports = {

  addProduct,

  getProducts,

  getProductById,

  updateProduct,

  deleteProduct

};