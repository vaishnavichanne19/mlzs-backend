import { CareerData, ContactData, ContactForm} from "../../Module/Contact And Career/ContactData.js";


export const Createcontact = async (req, res) => {
    try {
      const { heading, paragraph, subtitle, paragraph2, title, description } = req.body;
  
      const mpdData = new ContactData({
        heading, paragraph, subtitle, paragraph2, title, description
      });
  
      const savedData = await mpdData.save();
      res
        .status(200)
        .json({ data: savedData, msg: "Data Inserted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getAllcontact = async (req, res) => {
    try {
      const mpdData = await ContactData.find();
      if (!mpdData) {
        return res.status(404).json({ msg: "user data not found" });
      }
      res.status(200).json(mpdData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getOnecontact = async (req, res) => {
    try {
      const id = req.params.id;
      const mpdExist = await ContactData.findById(id);
      if (!mpdExist) {
        return res.status(400).json({ msg: "user not found" });
      }
      res.status(200).json(mpdExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const Updatecontact = async (req, res) => {
    try {
      const id = req.params.id;
      const {  heading, paragraph, subtitle, paragraph2, title, description  } = req.body;
      const mpdData = {
         heading, paragraph, subtitle, paragraph2, title, description 
      };
      const mpdExist = await ContactData.findById(id);
      if (!mpdExist) {
        return res.status(401).json({ success: false, msg: "user not found" });
      }
      
      const cbscData = await ContactData.findByIdAndUpdate(id, mpdData, {
        new: true,
      });
      res.status(200).json({
        data: cbscData,
        msg: "user updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error });
      res
        .status(500)
        .json({ success: false, msg: "Internal server error", error });
    }
  };
  
  export const Deletecontact = async (req, res) => {
    try {
      const id = req.params.id;
      const mpdExist = await ContactData.findById(id);
      if (!mpdExist) {
        return res.status(404).json({ msg: "user not exist" });
      }
      await ContactData.findByIdAndDelete(id);
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };


//   career
export const CreateCareer = async (req, res) => {
    try {
      const { heading,description } = req.body;
      const mpdData = new CareerData({
        heading, description
      });  
      const savedData = await mpdData.save();
      res
        .status(200)
        .json({ data: savedData, msg: "Data Inserted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getAllCareer = async (req, res) => {
    try {
      const mpdData = await CareerData.find();
      if (!mpdData) {
        return res.status(404).json({ msg: "user data not found" });
      }
      res.status(200).json(mpdData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getOneCareer = async (req, res) => {
    try {
      const id = req.params.id;
      const mpdExist = await CareerData.findById(id);
      if (!mpdExist) {
        return res.status(400).json({ msg: "user not found" });
      }
      res.status(200).json(mpdExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const UpdateCareer = async (req, res) => {
    try {
      const id = req.params.id;
      const {  heading,description  } = req.body;
      const mpdData = {
         heading, description 
      };
      const mpdExist = await CareerData.findById(id);
      if (!mpdExist) {
        return res.status(401).json({ success: false, msg: "user not found" });
      }
  
      // update the data in the database
      const cbscData = await CareerData.findByIdAndUpdate(id, mpdData, {
        new: true,
      });
      res.status(200).json({
        data: cbscData,
        msg: "user updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error });
      res
        .status(500)
        .json({ success: false, msg: "Internal server error", error });
    }
  };
  
  export const DeleteCareer = async (req, res) => {
    try {
      const id = req.params.id;
      const mpdExist = await CareerData.findById(id);
      if (!mpdExist) {
        return res.status(404).json({ msg: "user not exist" });
      }
      await CareerData.findByIdAndDelete(id);
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

// contact form
export const Createcontactform = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const mpdData = new ContactForm({
      name, email, phone, subject, message
     
    });

    const savedData = await mpdData.save();
    res
      .status(200)
      .json({ data: savedData, msg: "Data Inserted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllcontactform = async (req, res) => {
  try {
    const mpdData = await ContactForm.find();
    if (!mpdData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(mpdData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const DeleteContactForm = async (req, res) => {
  try {
    const id = req.params.id;
    const mpdExist = await ContactForm.findById(id);
    if (!mpdExist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await ContactForm.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};