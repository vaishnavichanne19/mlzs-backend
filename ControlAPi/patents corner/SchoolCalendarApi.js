import { AchievementData, AnnualData, ArtData, CurriculamData, HobbyData, House, HouseSystem, LanguagesData, LearningSupportData, LibraryData, PedagogyData, PhotoGallery, SchoolCalendar, SchoolCircular, SportData, VideoGallery } from "../../Module/Parents corner/SchoolCalendar.js";

 /*********************************
School Calendar
 *********************************/
export const CreateSchoolCalendar = async (req, res) => {
    try {
      const {heading,  month, day, date, event } = req.body;
  
      const newData = new SchoolCalendar({
        heading,
        month,
        day, 
        date,
         event,
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
  
  export const getallSchoolCalendar = async (req, res) => {
    try {
      const userData = await SchoolCalendar.find();
      if (!userData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getoneSchoolCalendar = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await SchoolCalendar.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const updateSchoolCalendar = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, month, day, date, event } = req.body;
  
      const Dataupdate = {
        heading,
        month,
        day, 
        date,
         event,
      };
  
      const existingData = await SchoolCalendar.findById(id);
      if (!existingData) {
        return res
          .status(404)
          .json({ success: false, msg: "User data not found" });
      }
  
      const updatedData = await SchoolCalendar.findByIdAndUpdate(id, Dataupdate, {
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

  export const deleteSchoolCalendar = async (req, res) => {
    try {
      const id = req.params.id;
      const exitData = await SchoolCalendar.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      await SchoolCalendar.findByIdAndDelete(id);
      res.status(200).json({ msg: "user deleted data successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  
 /*********************************
House System
 *********************************/
export const CreateHouseSystem = async (req, res) => {
  try {
    const {heading,  housename, houseincharge, captainboys, captaingirls, point } = req.body;

    const newData = new HouseSystem({
      heading,
      housename,
      houseincharge, 
      captainboys,
       captaingirls, 
       point,
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

export const getallHouseSystem = async (req, res) => {
  try {
    const userData = await HouseSystem.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneHouseSystem = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await HouseSystem.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateHouseSystem = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading,  housename, houseincharge, captainboys, captaingirls, point } = req.body;

    const Dataupdate = {
      heading,
      housename, 
      houseincharge, 
      captainboys, 
      captaingirls, 
      point
    };

    const existingData = await HouseSystem.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await HouseSystem.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteHouseSystem = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await HouseSystem.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await HouseSystem.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// *********************************************************************************************************
export const CreateHouse = async (req, res) => {
  try {
    const { title, description} =
      req.body;
    const houseimage = req.file.filename;

    const newData = new House({
      houseimage,
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

export const getallHouse = async (req, res) => {
  try {
    const userData = await House.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneHouse = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await House.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description} =
      req.body;

    let houseimage = null;
    if (req.files?.houseimage && req.files.houseimage.length > 0) {
      houseimage = req.files.houseimage[0].filename;
    }

    const Dataupdate = {
      title,
      description,
    };

    if (houseimage) Dataupdate.houseimage = houseimage;

    const existingData = await House.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await House.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteHouse = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await House.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await House.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 /*********************************
Curriculam
 *********************************/
export const CreateCurriculam = async (req, res) => {
  try {
    const { heading, paragraph, title, description, title2, description2} =
      req.body;
    const curriculamimage = req.file.filename;

    const newData = new CurriculamData({
      heading,
       paragraph,
      curriculamimage,
      title,
      description,
      title2, description2
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

export const getallCurriculam = async (req, res) => {
  try {
    const userData = await CurriculamData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneCurriculam = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await CurriculamData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateCurriculam = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph, title, description, title2, description2} =
      req.body;

    let curriculamimage = null;
    if (req.files?.curriculamimage && req.files.curriculamimage.length > 0) {
      curriculamimage = req.files.curriculamimage[0].filename;
    }

    const Dataupdate = {
      heading,
       paragraph,
      title,
      description,
      title2, description2
    };

    if (curriculamimage) Dataupdate.curriculamimage = curriculamimage;

    const existingData = await CurriculamData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await CurriculamData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteCurriculam = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await CurriculamData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await CurriculamData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


/*********************************
Photo Gallary
 *********************************/
export const CreatePhotoGallery = async (req, res) => {
  try {
    const { heading, title, date} =
      req.body;
    const photo = req.file.filename;

    const newData = new PhotoGallery({
      heading,
      photo,
      title,
      date,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Server Error:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallPhotoGallery = async (req, res) => {
  try {
    const userData = await PhotoGallery.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePhotoGallery = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PhotoGallery.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePhotoGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, title, date} =
      req.body;

    let photo = null;
    if (req.files?.photo && req.files.photo.length > 0) {
      photo = req.files.photo[0].filename;
    }

    const Dataupdate = {
      heading,  
      title,
      date,
    };

    if (photo) Dataupdate.photo = photo;

    const existingData = await PhotoGallery.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PhotoGallery.findByIdAndUpdate(id, Dataupdate, {
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

export const deletePhotoGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await PhotoGallery.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await PhotoGallery.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Video Gallary
 *********************************/
export const CreateVideoGallery = async (req, res) => {
  try {
    const { heading, title, description, url} =
      req.body;
      const video = req.file ? req.file.filename : null;

    const newData = new VideoGallery({
      heading,
      video,
      title,
      description,
      url
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

export const getallVideoGallery = async (req, res) => {
  try {
    const userData = await VideoGallery.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneVideoGallery = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await VideoGallery.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateVideoGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;

    let video = null;
    if (req.files?.video && req.files.video.length > 0) {
      video = req.files.video[0].filename;
    }

    const existingData = await VideoGallery.findById(id);
    if (!existingData) {
      return res.status(404).json({ success: false, msg: "Video data not found" });
    }

    const Dataupdate = {
      title,
      description,
      url, 
    };

    if (video) Dataupdate.video = video; 

    const updatedData = await VideoGallery.findByIdAndUpdate(id, { $set: Dataupdate }, { new: true });

    res.status(200).json({
      success: true,
      data: updatedData,
      msg: "Video updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error", error });
  }
};

export const deleteVideoGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await VideoGallery.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await VideoGallery.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


 /*********************************
Achievement
 *********************************/
export const CreateAchievement = async (req, res) => {
  try {
    const { heading, paragraph, title, description} =
      req.body;
    const accoladessimage = req.file.filename;

    const newData = new AchievementData({
      heading,
       paragraph,
      accoladessimage,
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

export const getallAchievement = async (req, res) => {
  try {
    const userData = await AchievementData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAchievement = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AchievementData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph, title, description} =
      req.body;

    let accoladessimage = null;
    if (req.files?.accoladessimage && req.files.accoladessimage.length > 0) {
      accoladessimage = req.files.accoladessimage[0].filename;
    }

    const Dataupdate = {
      heading,
       paragraph,
      title,
      description,
    };

    if (accoladessimage) Dataupdate.accoladessimage = accoladessimage;

    const existingData = await AchievementData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AchievementData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteAchievement = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await AchievementData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await AchievementData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Language
 *********************************/
export const Createlanguage = async (req, res) => {
    try {
      const { title, heading, languages } = req.body;
  
      const newData = new LanguagesData({
        title,
        heading,
        languages,
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
  
  export const getalllanguage = async (req, res) => {
    try {
      const userData = await LanguagesData.find();
      if (!userData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const getonelanguage = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await LanguagesData.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const updatelanguage = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, heading, languages } = req.body;
  
      const Dataupdate = {
        title,
        heading,
        languages,
      };
  
      const existingData = await LanguagesData.findById(id);
      if (!existingData) {
        return res
          .status(404)
          .json({ success: false, msg: "User data not found" });
      }
  
      const updatedData = await LanguagesData.findByIdAndUpdate(id, Dataupdate, {
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
  export const deletelanguage = async (req, res) => {
    try {
      const id = req.params.id;
      const exitData = await LanguagesData.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      await LanguagesData.findByIdAndDelete(id);
      res.status(200).json({ msg: "user deleted data successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  /*********************************
hobby 
*********************************/
export const Createhobby= async (req, res) => {
  try {
    const { heading, hobby } = req.body;

    const newData = new HobbyData({
      heading,
      hobby,
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

export const getallhobby= async (req, res) => {
  try {
    const userData = await HobbyData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonehobby= async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await HobbyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatehobby= async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, hobby } = req.body;

    const Dataupdate = {
      heading,
      hobby,
    };

    const existingData = await HobbyData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await HobbyData.findByIdAndUpdate(id, Dataupdate, {
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
export const deletehobby= async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await HobbyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await HobbyData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

  /*********************************
Sport 
*********************************/
export const CreateSportData= async (req, res) => {
  try {
    const { heading, sportname } = req.body;

    const newData = new SportData({
      heading,
      sportname,
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

export const getallSportData= async (req, res) => {
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

export const getoneSportData= async (req, res) => {
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

export const updateSportData= async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, sportname } = req.body;

    const Dataupdate = {
      heading,
      sportname,
    };

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
export const deleteSportData= async (req, res) => {
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
Art 
*********************************/
export const CreateArt= async (req, res) => {
  try {
    const { heading, arts } = req.body;

    const newData = new ArtData({
      heading,
      arts,
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

export const getallArt= async (req, res) => {
  try {
    const userData = await ArtData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneArt= async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await ArtData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateArt= async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, arts } = req.body;

    const Dataupdate = {
      heading,
      arts,
    };

    const existingData = await ArtData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await ArtData.findByIdAndUpdate(id, Dataupdate, {
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
export const deleteArt= async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await ArtData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await ArtData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Annual
 *********************************/
export const CreateAnnual = async (req, res) => {
  try {
    const { heading, title} =
      req.body;
      const annualpdf = req.file ? req.file.filename : null; // Ensure filename is stored

    const newData = new AnnualData({
      heading,
      annualpdf,
      title
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Server Error:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallAnnual = async (req, res) => {
  try {
    const userData = await AnnualData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneAnnual = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await AnnualData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateAnnual = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, title} =
      req.body;

    const Dataupdate = {
      heading,  
      title,
    };

    if (req.files && req.files.annualpdf) {
      Dataupdate.annualpdf = req.files.annualpdf[0].filename;
    }

    const existingData = await AnnualData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await AnnualData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteAnnual = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await AnnualData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await AnnualData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 /*********************************
School Circular
 *********************************/
export const CreateSchoolCircular = async (req, res) => {
  try {
    const { heading, title, date, description } = req.body;

    // Ensure req.files exists before accessing properties
    const circularimage = req.files?.circularimage?.[0]?.filename || null;
    const circularpdf = req.files?.circularpdf?.[0]?.filename || null;

    // Create new document in database
    const newData = new SchoolCircular({
      heading,
      title,
      date,
      description,
      circularimage,
      circularpdf,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school circular:", error);
    res.status(500).json({ error: "Failed to add data", details: error.message });
  }
};


export const getallSchoolCircular = async (req, res) => {
  try {
    const userData = await SchoolCircular.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneSchoolCircular = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await SchoolCircular.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateSchoolCircular = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, title, date, description} =
      req.body;

    let circularimage = null;
    if (req.files?.circularimage && req.files.circularimage.length > 0) {
      circularimage = req.files.circularimage[0].filename;
    }

    let circularpdf = null;
    if (req.files?.circularpdf && req.files.circularpdf.length > 0) {
      circularpdf = req.files.circularpdf[0].filename;
    }

    const Dataupdate = {
      heading,
      title,
      date,
      description,
    };

    if (circularimage) Dataupdate.circularimage = circularimage;
    if (circularpdf) Dataupdate.circularpdf = circularpdf;

    const existingData = await SchoolCircular.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await SchoolCircular.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteSchoolCircular = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await SchoolCircular.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await SchoolCircular.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 /*********************************
Pedagogy Api
 *********************************/
export const CreatePedagogy = async (req, res) => {
  try {
    const {heading,  description, title, paragraph } = req.body;

    const newData = new PedagogyData({
      heading,
      description,
      title, 
      paragraph
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

export const getallPedagogy = async (req, res) => {
  try {
    const userData = await PedagogyData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getonePedagogy = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await PedagogyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePedagogy = async (req, res) => {
  try {
    const { id } = req.params;
    const {heading,  description, title, paragraph } = req.body;

    const Dataupdate = {
      heading,  description, title, paragraph }

    const existingData = await PedagogyData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await PedagogyData.findByIdAndUpdate(id, Dataupdate, {
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

export const deletePedagogy = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await PedagogyData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await PedagogyData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 /*********************************
Library
 *********************************/
export const CreateLibrary = async (req, res) => {
  try {
    const { heading, paragraph, title, description, title2, description2} =
      req.body;

    const newData = new LibraryData({
      heading,
       paragraph,
      title,
      description,
      title2, description2
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

export const getallLibrary = async (req, res) => {
  try {
    const userData = await LibraryData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneLibrary = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await LibraryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph, title, description, title2, description2} =
      req.body;

    const Dataupdate = {
      heading,
       paragraph,
      title,
      description,
      title2, description2
    };

   
    const existingData = await LibraryData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await LibraryData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteLibrary = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await LibraryData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await LibraryData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

 /*********************************
Learning Support
 *********************************/
export const CreateLearningSupport = async (req, res) => {
  try {
    const { heading, paragraph, title, description, } =
      req.body;

    const newData = new LearningSupportData({
      heading,
       paragraph,
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

export const getallLearningSupport = async (req, res) => {
  try {
    const userData = await LearningSupportData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneLearningSupport = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await LearningSupportData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLearningSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph, title, description, } =
      req.body;

    const Dataupdate = {
      heading,
       paragraph,
      title,
      description,
      
    };

   
    const existingData = await LearningSupportData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await LearningSupportData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteLearningSupport = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await LearningSupportData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await LearningSupportData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};