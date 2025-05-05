import {
  AboutMLZS,
  CampusData,
  FacultyData,
  HiTechData,
  NewAndEventData,
  PrePrimaryData,
  PrimaryData,
  SchoolTiming,
  SportData,
} from "../../Module/why mlzs/whymlzs.js";

/*********************************
 AboutMLZS Api
 *********************************/
export const CreateAboutMLZS = async (req, res) => {
  try {
    const { mainheading, heading, description, paragraph } = req.body;
    const mlzsimage = req.file.filename;

    const newData = new AboutMLZS({
      mlzsimage,
      mainheading,
      heading,
      description,
      paragraph,
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

export const getallAboutMLZS = async (req, res) => {
  try {
    const userData = await AboutMLZS.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAboutMLZS = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AboutMLZS.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAboutMLZS = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainheading, heading, description, paragraph } = req.body;

    let mlzsimage = null;
    if (req.files?.mlzsimage && req.files.mlzsimage.length > 0) {
      mlzsimage = req.files.mlzsimage[0].filename;
    }

    const Dataupdate = {
      mainheading,
      heading,
      description,
      paragraph,
    };

    if (mlzsimage) Dataupdate.mlzsimage = mlzsimage;

    const existingData = await AboutMLZS.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AboutMLZS.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteAboutMLZS = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await AboutMLZS.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await AboutMLZS.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 HiTech Api
 *********************************/
export const CreateHiTech = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const hitechimage = req.file.filename;

    const newData = new HiTechData({
      hitechimage,
      heading,
      description,
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

export const getallHiTech = async (req, res) => {
  try {
    const userData = await HiTechData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneHiTech = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await HiTechData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateHiTech = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    let hitechimage = null;
    if (req.files?.hitechimage && req.files.hitechimage.length > 0) {
      hitechimage = req.files.hitechimage[0].filename;
    }

    const Dataupdate = {
      heading,
      description,
    };

    if (hitechimage) Dataupdate.hitechimage = hitechimage;

    const existingData = await HiTechData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await HiTechData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteHiTech = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await HiTechData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await HiTechData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Campus Api
 *********************************/
export const CreateCampus = async (req, res) => {
  try {
    const { heading, description, title, paragraph } = req.body;
    const campusimage = req.file.filename;

    const newData = new CampusData({
      campusimage,
      heading,
      description,
      title,
      paragraph,
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

export const getallCampus = async (req, res) => {
  try {
    const userData = await CampusData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneCampus = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await CampusData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateCampus = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, title, paragraph } = req.body;

    let campusimage = null;
    if (req.files?.campusimage && req.files.campusimage.length > 0) {
      campusimage = req.files.campusimage[0].filename;
    }

    const Dataupdate = {
      heading,
      description,
      title,
      paragraph,
    };

    if (campusimage) Dataupdate.campusimage = campusimage;

    const existingData = await CampusData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await CampusData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteCampus = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await CampusData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await CampusData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Faculty Api
 *********************************/
export const CreateFaculty = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const facultyimage = req.file.filename;

    const newData = new FacultyData({
      facultyimage,
      heading,
      description,
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

export const getallFaculty = async (req, res) => {
  try {
    const userData = await FacultyData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneFaculty = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await FacultyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    let facultyimage = null;
    if (req.files?.facultyimage && req.files.facultyimage.length > 0) {
      facultyimage = req.files.facultyimage[0].filename;
    }

    const Dataupdate = {
      heading,
      description,
    };

    if (facultyimage) Dataupdate.facultyimage = facultyimage;

    const existingData = await FacultyData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await FacultyData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteFaculty = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await FacultyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await FacultyData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Sport Api
 *********************************/
export const CreateSport = async (req, res) => {
  try {
    // const { heading, description} =
    //   req.body;
    const sportimage = req.file.filename;

    const newData = new SportData({
      sportimage,
      // heading,
      // description,
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

export const getallSport = async (req, res) => {
  try {
    const userData = await SportData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneSport = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await SportData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateSport = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    let sportimage = null;
    if (req.files?.sportimage && req.files.sportimage.length > 0) {
      sportimage = req.files.sportimage[0].filename;
    }

    const Dataupdate = {
      heading,
      description,
    };

    if (sportimage) Dataupdate.sportimage = sportimage;

    const existingData = await SportData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await SportData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteSport = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await SportData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await SportData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 School Timing Api
 *********************************/
export const CreateSchoolTiming = async (req, res) => {
  try {
    const {
      // heading,
      // schooladdress,
      // academicyear,
      // schooltimingheading,
      level,
      days,
      timing,
      // title,
      // directorname,
      // about,
    } = req.body;
    // const logo1 = req.files?.logo1?.[0]?.filename || null;
    // const logo2 = req.files?.logo2?.[0]?.filename || null;

    const newData = new SchoolTiming({
      // logo1,
      // logo2,
      // heading,
      // schooladdress,
      // academicyear,
      // schooltimingheading,
      // title,
      // directorname,
      // about,
      level,
      days,
      timing,
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

export const getallSchoolTiming = async (req, res) => {
  try {
    const userData = await SchoolTiming.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneSchoolTiming = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await SchoolTiming.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateSchoolTiming = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      heading,
      schooladdress,
      academicyear,
      schooltimingheading,
      level,
      days,
      timing,
      title,
      directorname,
      about,
    } = req.body;

    const Dataupdate = {
      heading,
      schooladdress,
      academicyear,
      schooltimingheading,
      level,
      days,
      timing,
      title,
      directorname,
      about,
    };

    // Check if files exist and update accordingly
    if (req.files && req.files.logo1) {
      Dataupdate.logo1 = req.files.logo1[0].filename;
    }
    if (req.files && req.files.logo2) {
      Dataupdate.logo2 = req.files.logo2[0].filename;
    }

    // Check if the record exists before updating
    const existingData = await SchoolTiming.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    // Perform update
    const updatedData = await SchoolTiming.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteSchoolTiming = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await SchoolTiming.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await SchoolTiming.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
NewAndEvent
 *********************************/
export const CreateNewAndEvent = async (req, res) => {
  try {
    const { heading, title, date, description } = req.body;
    const newandeventimage = req.file.filename;
    const newData = new NewAndEventData({
      heading,
      title,
      date,
      description,
      newandeventimage,
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

export const getallNewAndEvent = async (req, res) => {
  try {
    const userData = await NewAndEventData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneNewAndEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await NewAndEventData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateNewAndEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, title, date, description } = req.body;

    let newandeventimage = null;
    if (req.files?.newandeventimage && req.files.newandeventimage.length > 0) {
      newandeventimage = req.files.newandeventimage[0].filename;
    }

    const Dataupdate = {
      heading,
      title,
      date,
      description,
    };

    if (newandeventimage) Dataupdate.newandeventimage = newandeventimage;

    const existingData = await NewAndEventData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await NewAndEventData.findByIdAndUpdate(
      id,
      Dataupdate,
      {
        new: true,
      }
    );

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

export const deleteNewAndEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await NewAndEventData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await NewAndEventData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 PrePrimary Api
 *********************************/
 export const CreatePrePrimary = async (req, res) => {
  try {
    const {  heading, description1, description2, title, description3} = req.body;
    const  preprimaryimage = req.file.filename;

    const newData = new PrePrimaryData({
       preprimaryimage,    
      heading,
      description1,
      description2, 
      title,
      description3
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

export const getallPrePrimary = async (req, res) => {
  try {
    const userData = await PrePrimaryData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePrePrimary = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PrePrimaryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePrePrimary = async (req, res) => {
  try {
    const { id } = req.params;
    const {heading, description1, description2, title, description3} = req.body;

    let preprimaryimage = null;
    if (req.files?.preprimaryimage && req.files.preprimaryimage.length > 0) {
      preprimaryimage = req.files.preprimaryimage[0].filename;
    }

    const Dataupdate = {
      heading, description1, description2, title, description3
    };

    if (preprimaryimage) Dataupdate.preprimaryimage = preprimaryimage;

    const existingData = await PrePrimaryData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PrePrimaryData.findByIdAndUpdate(id, Dataupdate, {
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
export const deletePrePrimary = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await PrePrimaryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await PrePrimaryData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Primary Api
 *********************************/
 export const CreatePrimary = async (req, res) => {
  try {
    const {  heading, description1, description2, title, } = req.body;
    const  primaryimage = req.file.filename;

    const newData = new PrimaryData({
       primaryimage,    
      heading,
      description1,
      description2, 
      title,
      
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

export const getallPrimary = async (req, res) => {
  try {
    const userData = await PrimaryData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePrimary = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PrimaryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePrimary = async (req, res) => {
  try {
    const { id } = req.params;
    const {heading, description1, description2, title, } = req.body;

    let primaryimage = null;
    if (req.files?.primaryimage && req.files.primaryimage.length > 0) {
      primaryimage = req.files.primaryimage[0].filename;
    }

    const Dataupdate = {
      heading, description1, description2, title, 
    };

    if (primaryimage) Dataupdate.primaryimage = primaryimage;

    const existingData = await PrimaryData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PrimaryData.findByIdAndUpdate(id, Dataupdate, {
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
export const deletePrimary = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await PrimaryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await PrimaryData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};