import {
  AboutData,
  AcademicData,
  AnthemData,
  ChairmanData,
  DirectorData,
  GetTouch,
  LiteraExperience,
  MissionData,
  PhilosophyData,
  PrincipalData,
  RSDData,
} from "../../Module/HomeData/About.js";

/*********************************
 About Api
 *********************************/
export const CreateAbout = async (req, res) => {
  try {
    const { mainheading, para, heading, description, title, description1 } =
      req.body;
    const aboutimage = req.file.filename;

    const newData = new AboutData({
      aboutimage,
      mainheading,
      para,
      heading,
      description,
      title,
      description1,
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

export const getallAbout = async (req, res) => {
  try {
    const userData = await AboutData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAbout = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AboutData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainheading, para, heading, description, title, description1 } =
      req.body;

    let aboutimage = null;
    if (req.files?.aboutimage && req.files.aboutimage.length > 0) {
      aboutimage = req.files.aboutimage[0].filename;
    }

    const Dataupdate = {
      mainheading,
      para,
      heading,
      description,
      title,
      description1,
    };

    if (aboutimage) Dataupdate.aboutimage = aboutimage;

    const existingData = await AboutData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AboutData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await AboutData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await AboutData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Anthem Api
 *********************************/
export const CreateAnthem = async (req, res) => {
  try {
    const { heading, description } = req.body;

    const newData = new AnthemData({
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

export const getallAnthem = async (req, res) => {
  try {
    const userData = await AnthemData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAnthem = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AnthemData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAnthem = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    const Dataupdate = {
      heading,
      description,
    };

    const existingData = await AnthemData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AnthemData.findByIdAndUpdate(id, Dataupdate, {
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
 About Director  Api
 *********************************/
export const CreateDirector = async (req, res) => {
  try {
    const {
      heading,
      directorname,
      description,
      paragraph1,
      title,
      paragraph2,
      director2name,
      description2
    } = req.body;
    // const directorimage = req.files[0].filename;
    const director2image = req.file.filename;

    const newData = new DirectorData({
      heading,
      directorname,
      // directorimage,
      description,
      paragraph1,
      title,
      paragraph2,
      director2name,
      director2image,
      description2,
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

export const getallDirector = async (req, res) => {
  try {
    const userData = await DirectorData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneDirector = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await DirectorData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      heading,
      directorname,
      description,
      paragraph1,
      title,
      paragraph2,
      director2name,
      description2,
    } = req.body;

    const Dataupdate = {
      heading,
      directorname,
      description,
      paragraph1,
      title,
      paragraph2,
      director2name,
      description2,
    };

    if (req.files && req.files.directorimage) {
      Dataupdate.directorimage = req.files.directorimage[0].filename;
    }

    if (req.files && req.files.director2image) {
      Dataupdate.director2image = req.files.director2image[0].filename;
    }

    const existingData = await DirectorData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await DirectorData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteDirector = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await DirectorData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await DirectorData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Principal  Api
 *********************************/
export const CreatePrincipal = async (req, res) => {
  try {
    const { heading, principalname, description, paragraph1 } = req.body;
    const principalimage = req.file.filename;

    const newData = new PrincipalData({
      heading,
      principalname,
      principalimage,
      description,
      paragraph1,
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

export const getallPrincipal = async (req, res) => {
  try {
    const userData = await PrincipalData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePrincipal = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PrincipalData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePrincipal = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, principalname, description, paragraph1 } = req.body;

    const Dataupdate = {
      heading,
      principalname,
      description,
      paragraph1,
    };

    if (req.files && req.files.principalimage) {
      Dataupdate.principalimage = req.files.principalimage[0].filename;
    }

    const existingData = await PrincipalData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PrincipalData.findByIdAndUpdate(id, Dataupdate, {
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
export const deletePrincipal = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await PrincipalData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await PrincipalData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Philosophy Api
 *********************************/
export const CreatePhilosophy = async (req, res) => {
  try {
    const { heading, title, description } = req.body;

    const newData = new PhilosophyData({
      heading,
       title,
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

export const getallPhilosophy = async (req, res) => {
  try {
    const userData = await PhilosophyData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePhilosophy = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PhilosophyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePhilosophy = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading,  title, description } = req.body;

    const Dataupdate = {
      heading,
      title,
      description,
    };

    const existingData = await PhilosophyData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PhilosophyData.findByIdAndUpdate(id, Dataupdate, {
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
 About Chairman  Api
 *********************************/
export const CreateChairman = async (req, res) => {
  try {
    const { heading, Chairmanname, description, paragraph1 } = req.body;
    const Chairmanimage = req.file.filename;

    const newData = new ChairmanData({
      heading,
      Chairmanname,
      Chairmanimage,
      description,
      paragraph1,
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

export const getallChairman = async (req, res) => {
  try {
    const userData = await ChairmanData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneChairman = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await ChairmanData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateChairman = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, Chairmanname, description, paragraph1 } = req.body;

    const Dataupdate = {
      heading,
      Chairmanname,
      description,
      paragraph1,
    };

    if (req.files && req.files.Chairmanimage) {
      Dataupdate.Chairmanimage = req.files.Chairmanimage[0].filename;
    }

    const existingData = await ChairmanData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await ChairmanData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteChairman = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await ChairmanData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await ChairmanData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About RSD Api
 *********************************/
export const CreateRSD = async (req, res) => {
  try {
    const { heading, RSDname, description, paragraph1, title, paragraph2 } =
      req.body;
    const RSDimage = req.file.filename;

    const newData = new RSDData({
      heading,
      RSDname,
      RSDimage,
      description,
      paragraph1,
      title,
      paragraph2,
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

export const getallRSD = async (req, res) => {
  try {
    const userData = await RSDData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneRSD = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await RSDData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateRSD = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, RSDname, description, paragraph1, title, paragraph2 } =
      req.body;

    const Dataupdate = {
      heading,
      RSDname,
      description,
      paragraph1,
      title,
      paragraph2,
    };

    if (req.files && req.files.RSDimage) {
      Dataupdate.RSDimage = req.files.RSDimage[0].filename;
    }

    const existingData = await RSDData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await RSDData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteRSD = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await RSDData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await RSDData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Mission  Api
 *********************************/
export const CreateMission = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const missionimage = req.file.filename;

    const newData = new MissionData({
      heading,
      missionimage,
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

export const getallMission = async (req, res) => {
  try {
    const userData = await MissionData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneMission = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await MissionData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMission = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    const Dataupdate = {
      heading,
      description,
    };

    if (req.files && req.files.missionimage) {
      Dataupdate.missionimage = req.files.missionimage[0].filename;
    }

    const existingData = await MissionData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await MissionData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteMission = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await MissionData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await MissionData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Academic  Api
 *********************************/
export const CreateAcademic = async (req, res) => {
  try {
    const { heading, title, description } = req.body;
    const academicimage = req.file.filename;

    const newData = new AcademicData({
      heading,
      academicimage,
      description,
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

export const getallAcademic = async (req, res) => {
  try {
    const userData = await AcademicData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAcademic = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AcademicData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAcademic = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, title } = req.body;

    const Dataupdate = {
      heading,
      description,
      title,
    };

    if (req.files && req.files.academicimage) {
      Dataupdate.academicimage = req.files.academicimage[0].filename;
    }

    const existingData = await AcademicData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AcademicData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteAcademic = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await AcademicData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await AcademicData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 About Litera Experience Api
 *********************************/
 export const CreateLiteraExp = async (req, res) => {
  try {
    const { heading, paragraph1, title, paragraph2,  subtitle, description, point} =
      req.body;

      // const literaimage = req.file.filename;

    const newData = new LiteraExperience({
      heading,
      paragraph1,
      title,
      paragraph2,
      subtitle,
      description,
      point
      // literaimage
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

export const getallLiteraExp = async (req, res) => {
  try {
    const userData = await LiteraExperience.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneLiteraExp = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await LiteraExperience.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLiteraExp = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph1, title, paragraph2,  subtitle, description, point } =
      req.body;

    const Dataupdate = {
      heading,
      paragraph1,
      title,
      paragraph2,
      subtitle,
      description,
      point
    };

    
    if (req.files && req.files.literaimage) {
      Dataupdate.literaimage = req.files.literaimage[0].filename;
    }

    const existingData = await LiteraExperience.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await LiteraExperience.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteLiteraExp = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await LiteraExperience.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await LiteraExperience.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Get In Touch Api
 *********************************/


import axios from "axios"
// export const Creategetintouchform = async (req, res) => {
//   try {
//     const { parentname, email, mobile, city, school, query, grade, residence } = req.body;

//     const mpdData = new GetTouch({ parentname, email, mobile, city, school, query, grade, residence });
//     const savedData = await mpdData.save();

//     const requestData = {
//       OrganisationID: 75,
//       BranchID: 84,
//       AcademicYearID: 17,
//       StudentName: parentname,
//       FatherEmailID: email,
//       FatherMobile: mobile,
//       City: city,
//       School: school,
//       QueryContactSourceID: 463,
//       SpecifyRemarks: query,
//       Class: grade,
//       ResidentialNo: residence,
//     };

//     const apiResponse = await axios.post(
//       "https://api.myclassboard.com/api/EnquiryService/Save_EnquiryDetails",
//       requestData,
//       {
//         headers: {
//           Authorization: "00pbnFSwrhnPJu2EINVW3wiMK2dHTdjcFAw489kI",
//           api_Key: "msl786-0189-ias-gm19-marmoavis",
//           "Content-Type": "application/json",
//         },
//       }
//     );


//     res.status(200).json({
//       data: savedData,
//       externalApiResponse: apiResponse.data,  // Ensure response contains this
//       message: "Data Inserted & Sent Successfully",
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const Creategetintouchform = async (req, res) => {
  try {
    const { 
      studentname, gender, dob, admissionclass, fathername, fathernumber, 
      mothername, mothernumber, status, source, admissiontype, email,  
      city, school, query, grade, residence 
    } = req.body;

    // Save to local database
    const mpdData = new GetTouch({
      studentname, gender, dob, admissionclass, fathername, fathernumber, 
      mothername, mothernumber, status, source, admissiontype, email,  
      city, school, query, grade, residence
    });
    const savedData = await mpdData.save();

    // Prepare request data for external API
    const requestData = {
      OrganisationID: 75,
      BranchID: 84,
      AcademicYearID: 17,
      StudentName: studentname,
      Gender: gender === "Boy" ? true : false,
      PlaceOfBirth: dob,
      FatherName: fathername,
      FatherEmailID: email,
      FatherMobile: fathernumber,
      MotherName: mothername,
      MotherMobile: mothernumber,
      City: city,
      School: school,
      QueryContactSourceID: 463,
      SpecifyRemarks: query,
      Board: grade,
      ClassID: 1207,
      Class: admissionclass,
      ResidentialNo: residence,
    };

    // Send data to external API
    const apiResponse = await axios.post(
      "https://api.myclassboard.com/api/EnquiryService/Save_EnquiryDetails",
      requestData,
      {
        headers: {
          Authorization: "00pbnFSwrhnPJu2EINVW3wiMK2dHTdjcFAw489kI",
          api_Key: "msl786-0189-ias-gm19-marmoavis",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      data: savedData,
      externalApiResponse: apiResponse.data,  
      message: "Data Inserted & Sent Successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const GetAllGetinTouch = async (req, res) => {
  try {
    const mpdData = await GetTouch.find();
    if (!mpdData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(mpdData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const DeleteGetinTouchForm = async (req, res) => {
  try {
    const id = req.params.id;
    const mpdExist = await GetTouch.findById(id);
    if (!mpdExist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await GetTouch.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};