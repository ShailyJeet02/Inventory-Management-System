const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
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
    default: '',
    trim: true
  },
  userId: { 
    type: String,  // Wapas String kar diya
    required: true,
    index: true
  }
}, { 
  timestamps: true 
});

productSchema.index({ userId: 1, name: 1 });

module.exports = mongoose.model('Product', productSchema);