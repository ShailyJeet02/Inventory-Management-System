const Help = require("../models/Help");


// ========================================
// GET HELP DATA
// ========================================

const getHelp = async (req, res) => {

  try {


    let help = await Help.findOne({

      userId: req.user._id

    })
    .populate(
      "updatedBy",
      "name email role"
    );



    // First Time Create Help Data For User

    if (!help) {


      help = await Help.create({

        userId: req.user._id,


        email: "support@inventorypro.com",


        phone: "+91 12345 67890",


        chatLink: "https://inventorypro.com/chat",



        faqs: [

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

        ],


        updatedBy: req.user._id

      });


    }


    res.status(200).json(help);



  } catch(error) {


    console.log("GET HELP ERROR :", error);


    res.status(500).json({

      message:error.message

    });


  }

};






// ========================================
// UPDATE HELP DATA
// ========================================

const updateHelp = async(req,res)=>{


  try{


    const help = await Help.findOneAndUpdate(


      {

        userId:req.user._id

      },


      {


        ...req.body,


        userId:req.user._id,


        updatedBy:req.user._id


      },


      {


        new:true,


        upsert:true,


        runValidators:true


      }


    )
    .populate(

      "updatedBy",

      "name email role"

    );



    res.status(200).json({


      message:"Help Updated Successfully",


      help


    });



  }
  catch(error){


    console.log("UPDATE HELP ERROR :",error);


    res.status(500).json({

      message:error.message

    });


  }


};






module.exports = {


  getHelp,


  updateHelp


};