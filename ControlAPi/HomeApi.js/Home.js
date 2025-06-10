import { ApplyForJob, GalleryData, HomeAboutData, LiteraData, SchoolInfo, SliderData } from "../../Module/HomeData/Home.js";
import nodemailer from "nodemailer"; 
import dotenv from "dotenv";

/*********************************
 Home Slider Api
 *********************************/
export const CreateSlider = async (req, res) => {
  try {
    const sliderimage = req.file.filename;

    const slider = new SliderData({
      sliderimage,
    });

    if (!slider) {
      return res.status(404).json({ msg: "Data not found" });
    }

    await slider.save();
    res.status(200).json({ msg: "Data Added Successfully", data: slider });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
  
  export const GetAllSlider = async (req, res) => {
    try{
      const existdata = await SliderData.find();
  
      if(!existdata) {
        return res.status(404).json({msg: "Data Not Found"});
      }
      res.status(200).json(existdata);
  } catch(error) {
      res.status(500).json({msg: "server error"})
  }
  }
  
  export const GetOneSlider = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await SliderData.findById(id);
      if (!exitData) {
        return res.status(404).json({ msg: "user data not found" });
      }
  
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  
  export const UpdateSlider = async (req, res) => {
    try {
      const { id } = req.params;
  
      const sliderNewData = await SliderData.findById(id);
      if (!sliderNewData) {
        return res.status(404).json({
          success: false,
          msg: "Slider data not found",
        });
      }
  
      const updatedSlider = await SliderData.findByIdAndUpdate(
        id,
        { sliderimage: file.filename },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        data: updatedSlider,
        msg: "Slider image updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Server error",
        error,
      });
    }
  };
  
  
  
  export const deleteSlider = async (req, res) => {
    try {
      const id = req.params.id;
      const exitData = await SliderData.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      await SliderData.findByIdAndDelete(id);
      res.status(200).json({ msg: "user deleted data successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  /*********************************
 Home About Api
 *********************************/
 export const CreateHomeAbout = async (req, res) => {
  try {
    const { heading, description, title, expno, exptext, subtitle, para, point1, pointpara1, point2, pointpara2, point3, pointpara3, point4, pointpara4} = req.body;

    // Handling different paths for video and images
    const aboutvideo = req.files["aboutvideo"]?.[0]?.filename;
    const homeaboutimg1 = req.files["homeaboutimg1"]?.[0]?.filename;
    const homeaboutimg2 = req.files["homeaboutimg2"]?.[0]?.filename;

    // Creating new document
    const newData = new HomeAboutData({
      heading,
      description,
      title, expno, exptext, subtitle, para, point1, pointpara1, point2, pointpara2, point3, pointpara3, point4, pointpara4,
      aboutvideo,
      homeaboutimg1,
      homeaboutimg2
    });

    // Saving to database
    await newData.save();
    res.status(200).json({ msg: "Data Added Successfully", data: newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



export const GetAllHomeAbout = async (req, res) => {
  try{
    const existdata = await HomeAboutData.find();

    if(!existdata) {
      return res.status(404).json({msg: "Data Not Found"});
    }
    res.status(200).json(existdata);
} catch(error) {
    res.status(500).json({msg: "server error"})
}
}

export const GetOneHomeAbout = async (req, res) => {
  const id = req.params.id;
  try {
    const exitData = await HomeAboutData.findById(id);
    if (!exitData) {
      return res.status(404).json({ msg: "user data not found" });
    }

    res.status(200).json(exitData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const UpdateHomeAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, title, expno, exptext, subtitle, para, point1, pointpara1, point2, pointpara2, point3, pointpara3, point4, pointpara4 } = req.body;

    const aboutdata = {
      heading, description, title, expno, exptext, subtitle, para, point1, pointpara1, point2, pointpara2, point3, pointpara3, point4, pointpara4,
    };

    if (req.files && req.files.aboutvideo) {
      aboutdata.aboutvideo = req.files.aboutvideo[0].filename;
    }

    if (req.files && req.files.homeaboutimg1) {
      aboutdata.homeaboutimg1 = req.files.homeaboutimg1[0].filename;
    }
    if (req.files && req.files.homeaboutimg2) {
      aboutdata.homeaboutimg2 = req.files.homeaboutimg2[0].filename;
    }
    const aboutNewData = await HomeAboutData.findById(id);
    if (!aboutNewData) {
      return res.status(404).json({ success: false, msg: "User Data not found" });
    }


    const aboutUpdatedData = await HomeAboutData.findByIdAndUpdate(id, aboutdata, {
      new: true, 
    });

    res.status(200).json({
      success: true,
      data: aboutUpdatedData,
      msg: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};


export const DeleteHomeAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const exitData = await HomeAboutData.findById(id);

    if (!exitData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await HomeAboutData.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted data successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/*********************************
 Home Gallery Api
 *********************************/
 export const CreateGallery = async (req, res) => {
  try {
    const galleryimage = req.file.filename;

    const gallery = new GalleryData({
      galleryimage,
    });

    if (!gallery) {
      return res.status(404).json({ msg: "Data not found" });
    }

    await gallery.save();
    res.status(200).json({ msg: "Data Added Successfully", data: gallery });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
  
  export const GetAllGallery = async (req, res) => {
    try{
      const existdata = await GalleryData.find();
  
      if(!existdata) {
        return res.status(404).json({msg: "Data Not Found"});
      }
      res.status(200).json(existdata);
  } catch(error) {
      res.status(500).json({msg: "server error"})
  }
  }
  
  export const GetOneGallery = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await GalleryData.findById(id);
      if (!exitData) {
        return res.status(404).json({ msg: "user data not found" });
      }
  
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  
  export const UpdateGallery = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!req.files || !req.files.galleryimage || req.files.galleryimage.length === 0) {
        return res.status(400).json({
          success: false,
          msg: "No image file provided",
        });
      }
  
      const file = req.files.galleryimage[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          msg: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
        });
      }
  
      const maxSize = 100 * 1024 * 1024; 
      if (file.size > maxSize) {
        return res.status(400).json({
          success: false,
          msg: "File size exceeds the 100MB limit.",
        });
      }
  
      const galleryNewData = await GalleryData.findById(id);
      if (!galleryNewData) {
        return res.status(404).json({
          success: false,
          msg: "Slider data not found",
        });
      }
  
      const updatedGallery = await GalleryData.findByIdAndUpdate(
        id,
        { galleryimage: file.filename },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        data: updatedGallery,
        msg: "Gallery image updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Server error",
        error,
      });
    }
  };
  
  export const deleteGallery = async (req, res) => {
    try {
      const id = req.params.id;
      const exitData = await GalleryData.findById(id);
  
      if (!exitData) {
        return res.status(404).json({ msg: "User data not found" });
      }
      await GalleryData.findByIdAndDelete(id);
      res.status(200).json({ msg: "user deleted data successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  /*********************************
 Home Litera Api
 *********************************/
 export const CreateLitera = async (req, res) => {
  try {
    const {heading} = req.body;
    const literavideo = req.file.filename;

    const Litera = new LiteraData({
      heading,
      literavideo,
    });

    if (!Litera) {
      return res.status(404).json({ msg: "Data not found" });
    }

    await Litera.save();
    res.status(200).json({ msg: "Data Added Successfully", data: Litera });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
  
  export const GetAllLitera = async (req, res) => {
    try{
      const existdata = await LiteraData.find();
  
      if(!existdata) {
        return res.status(404).json({msg: "Data Not Found"});
      }
      res.status(200).json(existdata);
  } catch(error) {
      res.status(500).json({msg: "server error"})
  }
  }
  
  export const GetOneLitera = async (req, res) => {
    const id = req.params.id;
    try {
      const exitData = await LiteraData.findById(id);
      if (!exitData) {
        return res.status(404).json({ msg: "user data not found" });
      }
  
      res.status(200).json(exitData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  
  export const UpdateLitera = async (req, res) => {
    try {
      const { id } = req.params;
  
      const {heading} = req.body;

      const literavideoFile = {
        heading
      }
      if (req.files && req.files.literavideo) {
        literavideoFile.literavideo = req.files.literavideo[0].filename;
      }
      

      const LiteraNewData = await LiteraData.findById(id);
      if (!LiteraNewData) {
        return res.status(404).json({
          success: false,
          msg: "Slider data not found",
        });
      }
  
      const updatedLitera = await LiteraData.findByIdAndUpdate(
        id,
        literavideoFile,
        { new: true }
      );
      
  
      res.status(200).json({
        success: true,
        data: updatedLitera,
        msg: "Litera video updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Server error",
        error,
      });
    }
  };

    /*********************************
 Home School Info Api
 *********************************/
 export const CreateSchoolInfo = async (req, res) => {
  try {
    const { mainheading, schoolname, years, heading, subheading, para, description1, description2, title, description3 } = req.body;
    const schoollogo = req.files?.schoollogo?.[0]?.filename || null;
    const schoolinfoimage = req.files?.schoolinfoimage?.[0]?.filename || null;

    const newData = new SchoolInfo({
      mainheading,
      schoolinfoimage,
      schoolname,
      years,
      heading,
      subheading, 
      para,
      description1,
      description2,
      schoollogo,
      title,
      description3,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school info:", error);
    res.status(500).json({ error: "Failed to add data", details: error.message });
  }
};

 
 export const getallschoolinfo = async (req, res) => {
   try {
     const userData = await SchoolInfo.find();
     if (!userData) {
       return res.status(404).json({ msg: "User data not found" });
     }
     res.status(200).json(userData);
   } catch (error) {
     res.status(500).json({ error: error });
   }
 };
 
 export const getoneschoolinfo = async (req, res) => {
   const id = req.params.id;
   try {
     const exitData = await SchoolInfo.findById(id);
 
     if (!exitData) {
       return res.status(404).json({ msg: "User data not found" });
     }
     res.status(200).json(exitData);
   } catch (error) {
     res.status(500).json({ error: error });
   }
 };
 
 export const updateschoolinfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainheading, schoolname, years, heading, subheading, para, description1, description2, title, description3 } = req.body;

    let schoolinfoimage = null;
    let schoollogo = null;


    if (req.files?.schoollogo && req.files.schoollogo.length > 0) {
      schoollogo = req.files.schoollogo[0].filename;
    }

    if (req.files?.schoolinfoimage && req.files.schoolinfoimage.length > 0) {
      schoolinfoimage = req.files.schoolinfoimage[0].filename;
    }

 
    const Dataupdate = {
      mainheading,
      schoolname,
      years,
      heading,
      subheading,
       para,
      description1,
      description2,
      title,
      description3,
    };


    if (schoollogo) Dataupdate.schoollogo = schoollogo;
    if (schoolinfoimage) Dataupdate.schoolinfoimage = schoolinfoimage;


    const existingData = await SchoolInfo.findById(id);
    if (!existingData) {
      return res.status(404).json({ success: false, msg: "User data not found" });
    }

 
    const updatedData = await SchoolInfo.findByIdAndUpdate(id, Dataupdate, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedData,
      msg: "User updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error", error });
  }
};

 
 export const deleteschoolinfo = async (req, res) => {
   try {
     const id = req.params.id;
     const exitData = await SchoolInfo.findById(id);
 
     if (!exitData) {
       return res.status(404).json({ msg: "User data not found" });
     }
     await SchoolInfo.findByIdAndDelete(id);
     res.status(200).json({ msg: "user deleted data successfully" });
   } catch (error) {
     res.status(500).json({ error: error });
   }
 };
 
// Apply For Job form
// export const CreateApplyForJobform = async (req, res) => {
//   try {
//     const { staffname, education, application_for_post, subject, email, mobile, experience, currently_working } = req.body;
//     const resume = req.file ? req.file.filename : null;

//     const mpdData = new ApplyForJob({
//       staffname, education, application_for_post,
//        subject, email, mobile, experience, currently_working, resume
     
//     });

//     const savedData = await mpdData.save();
//     res
//       .status(200)
//       .json({ data: savedData, msg: "Data Inserted Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };


export const CreateApplyForJobform = async (req, res) => {
  try {
    const {
      staffname,
      education,
      application_for_post,
      subject,
      email,
      mobile,
      experience,
      currently_working,
    } = req.body;

    const resume = req.file ? req.file.filename : null;

    const mpdData = new ApplyForJob({
      staffname,
      education,
      application_for_post,
      subject,
      email,
      mobile,
      experience,
      currently_working,
      resume,
    });

    const savedData = await mpdData.save();

    // ------------- SEND EMAIL -------------
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.Email_Password,    
      },
    });

    const mailOptions = {
      from: "channevaishnavi8@gmail.com",
      to: "mlzs.ghogali@mountlitera.com",
      subject: `New Job Application from ${staffname}`,
      html: `
        <h3>New Job Application Received</h3>
        <p><strong>Name:</strong> ${staffname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Post Applied For:</strong> ${application_for_post}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Currently Working:</strong> ${currently_working}</p>
        ${
          resume
            ? `<p><strong>Resume:</strong> <a href="http://localhost:8003/pdfs/${resume}" target="_blank">View Resume</a></p>`
            : ""
        }
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ data: savedData, msg: "Data inserted and email sent successfully" });
  } catch (error) {
    console.error("Error sending form:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getAllApplyForJobform = async (req, res) => {
  try {
    const mpdData = await ApplyForJob.find();
    if (!mpdData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(mpdData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const DeleteApplyForJobForm = async (req, res) => {
  try {
    const id = req.params.id;
    const mpdExist = await ApplyForJob.findById(id);
    if (!mpdExist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await ApplyForJob.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};