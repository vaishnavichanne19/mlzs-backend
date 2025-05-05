import { EnquiryData, EnquiryForm, GuidelinesData, RulesData, WithdrawalPolicy } from "../../Module/Admission/Admission.js";

/*********************************
Guidelines
 *********************************/
export const CreateGuidelines = async (req, res) => {
  try {
    const { heading, description, subheading, title, points, declaration, paragraph  } = req.body;

    const newData = new GuidelinesData({
      heading,
      description, subheading, title, points, declaration, paragraph
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school info:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallGuidelines = async (req, res) => {
  try {
    const userData = await GuidelinesData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneGuidelines = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await GuidelinesData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateGuidelines = async (req, res) => {
  try {
    const { id } = req.params;
    const {heading, description, subheading, title, points, declaration, paragraph } = req.body;

    const Dataupdate = {
      heading, description, subheading, title, points, declaration, paragraph
    };

    const existingData = await GuidelinesData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await GuidelinesData.findByIdAndUpdate(id, Dataupdate, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedData,
      msg: "User updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ success: false, msg: "Internal Server Error", error });
  }
};

/*********************************
WithdrawalPolicy
 *********************************/
export const CreateWithdrawalPolicy = async (req, res) => {
    try {
      const { heading, description, title, paragraph} = req.body;
  
      const newData = new WithdrawalPolicy({
        heading,
        description, title, paragraph
      });
  
      await newData.save();
      res.status(200).json({ msg: "Data added successfully", data: newData });
    } catch (error) {
      console.error("Error adding school info:", error);
      res
        .status(500)
        .json({ error: "Failed to add data", details: error.message });
    }
  };
  
  export const getallWithdrawalPolicy = async (req, res) => {
    try {
      const userData = await WithdrawalPolicy.find();
      if (!userData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getoneWithdrawalPolicy = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await WithdrawalPolicy.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const updateWithdrawalPolicy = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description, title, paragraph} = req.body;
  
      const Dataupdate = {
        heading, description, title, paragraph
      };
  
      const existingData = await WithdrawalPolicy.findById(id);
      if (!existingData) {
        return res
          .status(404)
          .json({ success: false, msg: "User data not found" });
      }
  
      const updatedData = await WithdrawalPolicy.findByIdAndUpdate(id, Dataupdate, {
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: updatedData,
        msg: "User updated successfully",
      });
    } catch (error) {
      console.error("Update error:", error);
      res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  };

  /*********************************
Enquiry
 *********************************/
export const CreateEnquiry = async (req, res) => {
    try {
      const { heading, description, title, paragraph, title1, description1, title2, description2 } = req.body;
  
      const newData = new EnquiryData({
        heading,
        description, title, paragraph, title1, description1, title2, description2
      });
  
      await newData.save();
      res.status(200).json({ msg: "Data added successfully", data: newData });
    } catch (error) {
      console.error("Error adding school info:", error);
      res
        .status(500)
        .json({ error: "Failed to add data", details: error.message });
    }
  };
  
  export const getallEnquiry = async (req, res) => {
    try {
      const userData = await EnquiryData.find();
      if (!userData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getoneEnquiry = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await EnquiryData.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const updateEnquiry = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description, title, paragraph, title1, description1, title2, description2 } = req.body;
  
      const Dataupdate = {
        heading, description, title, paragraph, title1, description1, title2, description2
      };
  
      const existingData = await EnquiryData.findById(id);
      if (!existingData) {
        return res
          .status(404)
          .json({ success: false, msg: "User data not found" });
      }
  
      const updatedData = await EnquiryData.findByIdAndUpdate(id, Dataupdate, {
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: updatedData,
        msg: "User updated successfully",
      });
    } catch (error) {
      console.error("Update error:", error);
      res
        .status(500)
        .json({ success: false, msg: "Internal Server Error", error });
    }
  };

    /*********************************
   Rules Api
   *********************************/
   export const CreateRules = async (req, res) => {
    try {
      const {heading} = req.body;
      const rulesimage = req.file.filename;
  
      const Rules = new RulesData({
        rulesimage,
        heading
      });
  
      if (!Rules) {
        return res.status(404).json({ msg: "Data not found" });
      }
  
      await Rules.save();
      res.status(200).json({ msg: "Data Added Successfully", data: Rules });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ msg: "Server error" });
    }
  };
    
    export const GetAllRules = async (req, res) => {
      try{
        const existdata = await RulesData.find();
    
        if(!existdata) {
          return res.status(404).json({msg: "Data Not Found"});
        }
        res.status(200).json(existdata);
    } catch(error) {
        res.status(500).json({msg: "server error"})
    }
    }
    
    export const GetOneRules = async (req, res) => {
      const id = req.params.id;
      try {
        const exitData = await RulesData.findById(id);
        if (!exitData) {
          return res.status(404).json({ msg: "user data not found" });
        }
    
        res.status(200).json(exitData);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    };
    
    
    export const UpdateRules = async (req, res) => {
      try {
        const { id } = req.params;
        const { heading } = req.body;
    
        // Find the existing rule by ID
        const existingRule = await RulesData.findById(id);
        if (!existingRule) {
          return res.status(404).json({
            success: false,
            msg: "Rules data not found",
          });
        }
    
        // Prepare the update object
        const updateData = { heading };
    
        if (req.files && req.files.rulesimage && req.files.rulesimage.length > 0) {
          const file = req.files.rulesimage[0];
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    
          if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({
              success: false,
              msg: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
            });
          }
    
          const maxSize = 100 * 1024 * 1024; // 100MB limit
          if (file.size > maxSize) {
            return res.status(400).json({
              success: false,
              msg: "File size exceeds the 100MB limit.",
            });
          }
    
          updateData.rulesimage = file.filename;
        }
    
        // Update the rule data
        const updatedRules = await RulesData.findByIdAndUpdate(id, updateData, {
          new: true,
        });
    
        res.status(200).json({
          success: true,
          data: updatedRules,
          msg: "Rules updated successfully",
        });
      } catch (error) {
        console.error("Error updating rules:", error);
        res.status(500).json({
          success: false,
          msg: "Server error",
          error: error.message,
        });
      }
    };
   
    
    // Enquiry form
export const CreateEnquiryform = async (req, res) => {
  try {
    const { studentname, admissionclass, dob, admissionyear, parentname, email, mobile, state, city, source } = req.body;

    const mpdData = new EnquiryForm({
      studentname, admissionclass, dob, admissionyear,
       parentname, email, mobile, state, city, source
     
    });

    const savedData = await mpdData.save();
    res
      .status(200)
      .json({ data: savedData, msg: "Data Inserted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllEnquiryform = async (req, res) => {
  try {
    const mpdData = await EnquiryForm.find();
    if (!mpdData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(mpdData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const DeleteEnquiryForm = async (req, res) => {
  try {
    const id = req.params.id;
    const mpdExist = await EnquiryForm.findById(id);
    if (!mpdExist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await EnquiryForm.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};