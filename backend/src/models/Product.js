const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: String,
  quantity: { 
    type: Number, 
    required: true,
    min: 0
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  supplier: { 
    type: String, 
    default: '' 
  },
  userId: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);