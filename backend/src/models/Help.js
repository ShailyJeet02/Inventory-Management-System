const mongoose = require("mongoose");


// ================================
// FAQ Schema
// ================================

const faqSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  }

});



// ================================
// Help Schema
// ================================

const helpSchema = new mongoose.Schema({


  email: {

    type: String,

    required: true,

    default: "support@inventorypro.com"

  },


  phone: {

    type: String,

    required: true,

    default: "+91 12345 67890"

  },


  chatLink: {

    type: String,

    default: "https://inventorypro.com/chat"

  },


  faqs: {

    type: [faqSchema],

    default: [

      {

        question: "How do I add a new product?",

        answer:
          "Go to Products page and click 'Add Product'. Fill the details and save."

      },


      {

        question: "How to generate reports?",

        answer:
          "Go to Reports page and click 'Export Report' to download PDF or Excel."

      },


      {

        question: "Can I manage multiple warehouses?",

        answer:
          "Yes. Go to Settings and configure warehouse management."

      }

    ]

  },


  // ================================
  // Who Updated Help
  // ================================

  updatedBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    default: null

  }


}, {

  timestamps: true

});


module.exports = mongoose.model("Help", helpSchema);