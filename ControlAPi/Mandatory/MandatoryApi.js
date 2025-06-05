import {
  DocumentData,
  GeneralData,
  InfrastructureData,
  ResultData,
  SessionTable,
  StaffData,
} from "../../Module/Mandatory public Disclouser/MandatoryData.js";

/*********************************
Session Table
 *********************************/
export const CreateSessionTable = async (req, res) => {
  const { session } = req.body;
  try {
    const existingSession = await SessionTable.findOne({ session });
    if (existingSession) {
      return res.status(400).json({ message: "Session already exists" });
    }
    const newSession = new SessionTable({ session, data: [] });
    await newSession.save();
    res.json({ message: "Session added successfully", newSession });
  } catch (error) {
    res.status(500).json({ error: "Error adding session" });
  }
};

export const CreateSessionData = async (req, res) => {
  const { session } = req.params;
  const newData = req.body;

  try {
    const sessionData = await SessionTable.findOne({ session });
    if (!sessionData) {
      return res.status(404).json({ message: "Session not found" });
    }

    sessionData.data.push(newData);
    await sessionData.save();
    res.json({ message: "Data added successfully", sessionData });
  } catch (error) {
    res.status(500).json({ error: "Error adding data" });
  }
};
export const getallSessionTable = async (req, res) => {
  try {
    const userData = await SessionTable.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneSessionTable = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await SessionTable.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateSessionTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainheading, session } = req.body;

    const Dataupdate = {
      mainheading,
      session
    };

    const existingData = await SessionTable.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await SessionTable.findByIdAndUpdate(id, Dataupdate, {
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

export const updateSessionData = async (req, res) => {
  try {
    const { sessionId, dataId } = req.params; // Get session ID and data ID
    const updatedData = req.body; // Get updated values from request

    const session = await SessionTable.findById(sessionId);
    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    const dataIndex = session.data.findIndex((item) => item._id.toString() === dataId);
    if (dataIndex === -1) {
      return res.status(404).json({ msg: "Data entry not found" });
    }

    // Update specific object in the array
    session.data[dataIndex] = { ...session.data[dataIndex], ...updatedData };
    
    await session.save(); // Save changes to database

    res.status(200).json({ msg: "Data updated successfully", session });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteSessionTable = async (req, res) => {
  try {
    const { session } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "Missing userId in request body" });
    }

    const updatedSession = await SessionTable.findOneAndUpdate(
      { session },
      { $pull: { data: { _id: userId } } }, // Remove specific row from the data array
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ msg: "Session not found" });
    }

    res.status(200).json({ msg: "Row deleted successfully", updatedSession });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



/*********************************
General Table
 *********************************/
export const CreateGeneralTable = async (req, res) => {
  try {
    const { mainheading, heading, information, detail } = req.body;

    const newData = new GeneralData({
      mainheading,
      heading,
      information,
      detail,
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

export const getallGeneralTable = async (req, res) => {
  try {
    const userData = await GeneralData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneGeneralTable = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await GeneralData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateGeneralTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainheading, heading, information, detail } = req.body;

    const Dataupdate = {
      mainheading,
      heading,
      information,
      detail,
    };

    const existingData = await GeneralData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await GeneralData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteGeneralTable = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await GeneralData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await GeneralData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Document
   *********************************/
export const CreateDocument = async (req, res) => {
  try {
    const { heading, document } = req.body;
    const documentpdf = req.file ? req.file.filename : null; // Ensure filename is stored

    const newData = new DocumentData({
      heading,
      document,
      documentpdf,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding document:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallDocument = async (req, res) => {
  try {
    const userData = await DocumentData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneDocument = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await DocumentData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, document } = req.body;

    let documentpdf = null;
    if (req.files?.documentpdf && req.files.documentpdf.length > 0) {
      documentpdf = req.files.documentpdf[0].filename;
    }

    const Dataupdate = {
      heading,
      document,
    };

    if (documentpdf) Dataupdate.documentpdf = documentpdf;

    const existingData = await DocumentData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await DocumentData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await DocumentData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await DocumentData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Result
   *********************************/
export const CreateResult = async (req, res) => {
  try {
    const { heading, resultdocument } = req.body;
    const resultpdf = req.file.filename;

    const newData = new ResultData({
      heading,
      resultdocument,
      resultpdf,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school circular:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallResult = async (req, res) => {
  try {
    const userData = await ResultData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneResult = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await ResultData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, resultdocument } = req.body;

    let resultpdf = null;
    if (req.files?.resultpdf && req.files.resultpdf.length > 0) {
      resultpdf = req.files.resultpdf[0].filename;
    }

    const Dataupdate = {
      heading,
      resultdocument,
    };

    if (resultpdf) Dataupdate.resultpdf = resultpdf;

    const existingData = await ResultData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await ResultData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteResult = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await ResultData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await ResultData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Staff
   *********************************/
export const CreateStaff = async (req, res) => {
  try {
    const { heading, staffinformation, staffdetail } = req.body;

    const newData = new StaffData({
      heading,
      staffinformation,
      staffdetail,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school circular:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallStaff = async (req, res) => {
  try {
    const userData = await StaffData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneStaff = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await StaffData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, staffinformation, staffdetail } = req.body;

    const Dataupdate = {
      heading,
      staffinformation,
      staffdetail,
    };

    const existingData = await StaffData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await StaffData.findByIdAndUpdate(id, Dataupdate, {
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

export const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await StaffData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await StaffData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
Infrastructure
   *********************************/
export const CreateInfrastructure = async (req, res) => {
  try {
    const { heading, infrastructure, infrastructuredetail } = req.body;

    const newData = new InfrastructureData({
      heading,
      infrastructure,
      infrastructuredetail,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school circular:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallInfrastructure = async (req, res) => {
  try {
    const userData = await InfrastructureData.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getoneInfrastructure = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await InfrastructureData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, infrastructure, infrastructuredetail } = req.body;

    const Dataupdate = {
      heading,
      infrastructure,
      infrastructuredetail,
    };

    const existingData = await InfrastructureData.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, msg: "User data not found" });
    }

    const updatedData = await InfrastructureData.findByIdAndUpdate(
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

export const deleteInfrastructure = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await InfrastructureData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await InfrastructureData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
