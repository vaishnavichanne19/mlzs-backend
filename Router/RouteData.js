import express from 'express';
import {  CreateApplyForJobform, CreateGallery, CreateHomeAbout, CreateLitera, CreateSchoolInfo, CreateSlider, DeleteApplyForJobForm, deleteGallery, DeleteHomeAbout, deleteschoolinfo, deleteSlider, getAllApplyForJobform, GetAllGallery, GetAllHomeAbout, GetAllLitera, getallschoolinfo, GetAllSlider, GetOneGallery, GetOneHomeAbout, GetOneLitera, getoneschoolinfo, GetOneSlider, UpdateGallery, UpdateHomeAbout, UpdateLitera, updateschoolinfo, UpdateSlider } from '../ControlAPi/HomeApi.js/Home.js';
import fs from "fs";
import path from "path";
import multer from "multer";
import { CreateAbout, CreateAcademic, CreateAnthem, CreateChairman, CreateDirector, Creategetintouchform, CreateLiteraExp, CreateMission, CreatePhilosophy, CreatePrincipal, CreateRSD, deleteAbout, deleteAcademic, deleteChairman, deleteDirector, DeleteGetinTouchForm, deleteLiteraExp, deleteMission, deletePrincipal, deleteRSD, getallAbout, getallAcademic, getallAnthem, getallChairman, getallDirector, GetAllGetinTouch, getallLiteraExp, getallMission, getallPhilosophy, getallPrincipal, getallRSD, getoneAbout, getoneAcademic, getoneAnthem, getoneChairman, getoneDirector, getoneLiteraExp, getoneMission, getonePhilosophy, getonePrincipal, getoneRSD, updateAbout, updateAcademic, updateAnthem, updateChairman, updateDirector, updateLiteraExp, updateMission, updatePhilosophy, updatePrincipal, updateRSD } from '../ControlAPi/HomeApi.js/AboutApi.js';
import { CreateAboutMLZS, CreateCampus, CreateFaculty, CreateHiTech, CreateNewAndEvent, CreatePrePrimary, CreatePrimary, CreateSchoolTiming, CreateSport, deleteAboutMLZS, deleteCampus, deleteFaculty, deleteHiTech, deleteNewAndEvent, deletePrePrimary, deletePrimary, deleteSchoolTiming, deleteSport, getallAboutMLZS, getallCampus, getallFaculty, getallHiTech, getallNewAndEvent, getallPrePrimary, getallPrimary, getallSchoolTiming, getallSport, getoneAboutMLZS, getoneCampus, getoneFaculty, getoneHiTech, getoneNewAndEvent, getonePrePrimary, getonePrimary, getoneSchoolTiming, getoneSport, updateAboutMLZS, updateCampus, updateFaculty, updateHiTech, updateNewAndEvent, updatePrePrimary, updatePrimary, updateSchoolTiming, updateSport } from '../ControlAPi/why mlzs/mlzsapi.js';
import { CreateEnquiry, CreateEnquiryform, CreateGuidelines, CreateRules, CreateWithdrawalPolicy, DeleteEnquiryForm, getallEnquiry, getAllEnquiryform, getallGuidelines, GetAllRules, getallWithdrawalPolicy, getoneEnquiry, getoneGuidelines, GetOneRules, getoneWithdrawalPolicy, updateEnquiry, updateGuidelines, UpdateRules, updateWithdrawalPolicy } from '../ControlAPi/AdmissionApi/Guidelines.js';
import { CreateAchievement, CreateAnnual, CreateArt, CreateCurriculam, Createhobby, CreateHouse, CreateHouseSystem, Createlanguage, CreateLearningSupport, CreateLibrary, CreatePedagogy, CreatePhotoGallery, CreateSchoolCalendar, CreateSchoolCircular, CreateSportData, CreateVideoGallery, deleteAchievement, deleteAnnual, deleteArt, deleteCurriculam, deletehobby, deleteHouse, deleteHouseSystem, deletelanguage, deleteLearningSupport, deleteLibrary, deletePedagogy, deletePhotoGallery, deleteSchoolCalendar, deleteSchoolCircular, deleteSportData, deleteVideoGallery, getallAchievement, getallAnnual, getallArt, getallCurriculam, getallhobby, getallHouse, getallHouseSystem, getalllanguage, getallLearningSupport, getallLibrary, getallPedagogy, getallPhotoGallery, getallSchoolCalendar, getallSchoolCircular, getallSportData, getallVideoGallery, getoneAchievement, getoneAnnual, getoneArt, getoneCurriculam, getonehobby, getoneHouse, getoneHouseSystem, getonelanguage, getoneLearningSupport, getoneLibrary, getonePedagogy, getonePhotoGallery, getoneSchoolCalendar, getoneSchoolCircular, getoneSportData, getoneVideoGallery, updateAchievement, updateAnnual, updateArt, updateCurriculam, updatehobby, updateHouse, updateHouseSystem, updatelanguage, updateLearningSupport, updateLibrary, updatePedagogy, updatePhotoGallery, updateSchoolCalendar, updateSchoolCircular, updateSportData, updateVideoGallery } from '../ControlAPi/patents corner/SchoolCalendarApi.js';
import { CreateCareer, Createcontact, Createcontactform, DeleteCareer, Deletecontact, DeleteContactForm, getAllCareer, getAllcontact, getAllcontactform, getOneCareer, getOnecontact, UpdateCareer, Updatecontact } from '../ControlAPi/ContactAndCareer/ContactApi.js';
import { CreateDocument, CreateGeneralTable, CreateInfrastructure, CreateResult, CreateSessionData, CreateSessionTable, CreateStaff, deleteDocument, deleteGeneralTable, deleteInfrastructure, deleteResult,  deleteSessionTable,  deleteStaff, getallDocument, getallGeneralTable, getallInfrastructure, getallResult,  getallSessionTable, getallStaff, getoneDocument, getoneGeneralTable, getoneInfrastructure, getoneResult, getoneSessionTable, getoneStaff, updateDocument, updateGeneralTable, updateInfrastructure, updateResult, updateSessionData, updateSessionTable, updateStaff } from '../ControlAPi/Mandatory/MandatoryApi.js';
import { CreateCalendar, CreateExcelEvent, GetAllCalendar, UpdateCalendar } from '../CalendarApi/Calendar.js';
import { CreateReview, getallReview } from '../ControlAPi/ReviewApi/Review.js';
import { Forgot, Login, LoginStatus, LogOut, ProtectedLogin, Registration, ResetPassword } from '../ControlAPi/AuthApi/AuthenticationApi.js';


// const uploads = multer({dest: 'images/'});
// only video 
const upload = multer({
  storage: multer.diskStorage({
    destination: 'videos/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/mkv', 'video/webm', 'video/avi'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4, MKV, WEBM, and AVI are allowed.'));
    }
  },
});

// video and image 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "aboutvideo") {
      cb(null, "./videos/");
    } else {
      cb(null, "./images/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "video/mp4"];
  
  if (!validTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type."));
  }

  cb(null, true);
};

// File size limits
const limits = {
  fileSize: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return 1 * 1024 * 1024; // 1MB for images
    } else if (file.mimetype.startsWith("video/")) {
      return 100 * 1024 * 1024; // 10MB for videos
    }
  },
};

export const uploads = multer({ 
  storage, 
  fileFilter, 
  limits: {
    fileSize: (req, file, cb) => {
      const fileSizeLimit = file.mimetype.startsWith("image/") ? 1 * 1024 * 1024 : 100 * 1024 * 1024;
      if (file.size > fileSizeLimit) {
        return cb(new Error(`File too large. Max size: ${fileSizeLimit / (1024 * 1024)}MB`));
      }
      cb(null, true);
    }
  }
});


// pdf and  image 
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Storage configuration
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "./images/";

    if (file.mimetype === "application/pdf") {
      uploadPath = "./pdfs/";
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter and size validation
const pdfFilter = (req, file, cb) => {
  const validTypes = {
    "image/jpeg": 1 * 1024 * 1024, // 1MB
    "image/png": 1 * 1024 * 1024, // 1MB
    "image/jpg": 1 * 1024 * 1024, // 1MB
    "image/webp": 1 * 1024 * 1024, // 1MB
    "application/pdf": 10 * 1024 * 1024, // 10MB
  };

  if (!validTypes[file.mimetype]) {
    return cb(new Error("Invalid file type. Only JPG, PNG, WebP, and PDF files are allowed."));
  }

  if (file.size > validTypes[file.mimetype]) {
    return cb(new Error(`File too large. Max size for this file type is ${validTypes[file.mimetype] / (1024 * 1024)}MB.`));
  }

  cb(null, true);
};

// Multer upload middleware
export const uploadpdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Overall limit (handled individually in fileFilter)
});


// pdf only 
const ensureDirectoryExist = async (dir) => {
  try {
    await fs.promises.access(dir);
  } catch (error) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
};

// Multer storage for PDFs
const pdfsStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = "./pdfs/";
    await ensureDirectoryExist(uploadPath); // Ensure folder exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`; // Keep original name with timestamp
    cb(null, uniqueName);
  },
});

// File filter for PDFs with size limit
const pdfsFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Multer upload middleware with size limit (10MB)
export const uploadpdfs = multer({
  storage: pdfsStorage,
  fileFilter: pdfsFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const route = express.Router();
  /*********************************
 Home slider Method
 *********************************/
route.post("/createslider", uploads.single("sliderimage"), CreateSlider);
route.get("/getallslider", GetAllSlider);
route.get("/getoneslider/:id", GetOneSlider);
route.put("/updateslider/:id", uploads.fields([{ name: "sliderimage" }]), UpdateSlider);
route.delete("/deleteslider/:id", deleteSlider);

  /*********************************
 Home About Method
 *********************************/
 route.post("/createhomeabout", uploads.fields([{name:"aboutvideo"}, {name:"homeaboutimg1"}, {name:"homeaboutimg2"}]), CreateHomeAbout);
 route.get("/getallhomeabout", GetAllHomeAbout);
 route.get("/getonehomeabout/:id", GetOneHomeAbout);
 route.put("/updatehomeabout/:id", uploads.fields([{name:"aboutvideo"}, {name:"homeaboutimg1"}, {name:"homeaboutimg2"}]), UpdateHomeAbout);
 route.delete("/deletehomeabout/:id", DeleteHomeAbout);
 

   /*********************************
 Home Gallery Method
 *********************************/
 route.post("/creategallery", uploads.single("galleryimage"), CreateGallery);
 route.get("/getallgallery", GetAllGallery);
 route.get("/getonegallery/:id", GetOneGallery);
 route.put("/updategallery/:id", uploads.fields([{ name: "galleryimage" }]), UpdateGallery);
 route.delete("/deletegallery/:id", deleteGallery);

    /*********************************
 Home Litera Method
 *********************************/
 route.post("/createlitera", upload.single("literavideo"), CreateLitera);
 route.get("/getalllitera", GetAllLitera);
 route.get("/getonelitera/:id", GetOneLitera);
 route.put("/updatelitera/:id", upload.fields([{ name: "literavideo" }]), UpdateLitera);

    /*********************************
 Home School Info Method
 *********************************/
 route.post("/createschoolinfo", uploads.fields([ { name: "schoollogo" }, { name: "schoolinfoimage" }]) ,CreateSchoolInfo);
route.get("/getallschoolinfo", getallschoolinfo);
 route.get("/getoneschoolinfo/:id", getoneschoolinfo);
 route.put("/updateschoolinfo/:id", uploads.fields([ { name: "schoollogo" }, { name: "schoolinfoimage" }]), updateschoolinfo);
 route.delete("/deleteschoolinfo/:id", deleteschoolinfo);

   /*********************************
About Method
 *********************************/
 route.post("/createabout", uploads.single("aboutimage"), CreateAbout);
 route.get("/getallabout", getallAbout);
 route.get("/getoneabout/:id", getoneAbout);
 route.put("/updateabout/:id", uploads.fields([{ name: "aboutimage" }]), updateAbout);
 route.delete("/deleteabout/:id", deleteAbout);

    /*********************************
About Anthem Method
 *********************************/
route.post("/createanthem", CreateAnthem);
route.get("/getallanthem", getallAnthem);
route.get("/getoneanthem/:id", getoneAnthem);
route.put("/updateanthem/:id", updateAnthem);

   /*********************************
About Director Method
 *********************************/
route.post("/createdirector", uploads.single("director2image"), CreateDirector);
route.get("/getalldirector", getallDirector);
route.get("/getonedirector/:id", getoneDirector);
route.put("/updatedirector/:id", uploads.fields([{ name: "directorimage" }, { name: "director2image" }]), updateDirector);
route.delete("/deletedirector/:id", deleteDirector);

   /*********************************
About Principal Method
 *********************************/
route.post("/createprincipal", uploads.single("principalimage"), CreatePrincipal);
route.get("/getallprincipal", getallPrincipal);
route.get("/getoneprincipal/:id", getonePrincipal);
route.put("/updateprincipal/:id", uploads.fields([{ name: "principalimage" }]), updatePrincipal);
route.delete("/deleteprincipal/:id", deletePrincipal);

  /*********************************
About Philosophy Method
 *********************************/
route.post("/createphilosophy", CreatePhilosophy);
route.get("/getallphilosophy", getallPhilosophy);
route.get("/getonephilosophy/:id", getonePhilosophy);
route.put("/updatephilosophy/:id", updatePhilosophy);

   /*********************************
About Chairman Method
 *********************************/
route.post("/createChairman", uploads.single("Chairmanimage"), CreateChairman);
route.get("/getallChairman", getallChairman);
route.get("/getoneChairman/:id", getoneChairman);
route.put("/updateChairman/:id", uploads.fields([{ name: "Chairmanimage" }]), updateChairman);
route.delete("/deleteChairman/:id", deleteChairman);

   /*********************************
About RSD Method
 *********************************/
route.post("/createRSD", uploads.single("RSDimage"), CreateRSD);
route.get("/getallRSD", getallRSD);
route.get("/getoneRSD/:id", getoneRSD);
route.put("/updateRSD/:id", uploads.fields([{ name: "RSDimage" }]), updateRSD);
route.delete("/deleteRSD/:id", deleteRSD);

   /*********************************
About Mission Method
 *********************************/
route.post("/createmission", uploads.single("missionimage"), CreateMission);
route.get("/getallmission", getallMission);
route.get("/getonemission/:id", getoneMission);
route.put("/updatemission/:id", uploads.fields([{ name: "missionimage" }]), updateMission);
route.delete("/deletemission/:id", deleteMission);

   /*********************************
About Academic Method
 *********************************/
route.post("/createacademic", uploads.single("academicimage"), CreateAcademic);
route.get("/getallacademic", getallAcademic);
route.get("/getoneacademic/:id", getoneAcademic);
route.put("/updateacademic/:id", uploads.fields([{ name: "academicimage" }]), updateAcademic);
route.delete("/deleteacademic/:id", deleteAcademic);

   /*********************************
About Litera Exp. Method
 *********************************/
route.post("/createliteraexp", uploads.single("literaimage"), CreateLiteraExp);
route.get("/getallliteraexp", getallLiteraExp);
route.get("/getoneliteraexp/:id", getoneLiteraExp);
route.put("/updateliteraexp/:id", uploads.fields([{ name: "literaimage" }]), updateLiteraExp);
route.delete("/deleteliteraexp/:id", deleteLiteraExp);

  /*********************************
AboutMLZS Method
 *********************************/
route.post("/createaboutmlzs", uploads.single("mlzsimage"), CreateAboutMLZS);
route.get("/getallaboutmlzs", getallAboutMLZS);
route.get("/getoneaboutmlzs/:id", getoneAboutMLZS);
route.put("/updateaboutmlzs/:id", uploads.fields([{name: "mlzsimage"}]), updateAboutMLZS);
route.delete("/deleteaboutmlzs/:id", deleteAboutMLZS);


  /*********************************
preprimary Method
 *********************************/
route.post("/createpreprimary", uploads.single("preprimaryimage"), CreatePrePrimary);
route.get("/getallpreprimary", getallPrePrimary);
route.get("/getonepreprimary/:id", getonePrePrimary);
route.put("/updatepreprimary/:id", uploads.fields([{name: "preprimaryimage"}]), updatePrePrimary);
route.delete("/deletepreprimary/:id", deletePrePrimary);

  /*********************************
primary Method
 *********************************/
route.post("/createprimary", uploads.single("primaryimage"), CreatePrimary);
route.get("/getallprimary", getallPrimary);
route.get("/getoneprimary/:id", getonePrimary);
route.put("/updateprimary/:id", uploads.fields([{name: "primaryimage"}]), updatePrimary);
route.delete("/deleteprimary/:id", deletePrimary);

  /*********************************
Hitech Method
 *********************************/
route.post("/createhitech", uploads.single("hitechimage"), CreateHiTech);
route.get("/getallhitech", getallHiTech);
route.get("/getonehitech/:id", getoneHiTech);
route.put("/updatehitech/:id", uploads.fields([{name: "hitechimage"}]), updateHiTech);
route.delete("/deletehitech/:id", deleteHiTech);

  /*********************************
Campus Method
 *********************************/
route.post("/createcampus", uploads.single("campusimage"), CreateCampus);
route.get("/getallcampus", getallCampus);
route.get("/getonecampus/:id", getoneCampus);
route.put("/updatecampus/:id", uploads.fields([{name: "campusimage"}]), updateCampus);
route.delete("/deletecampus/:id", deleteCampus);

  /*********************************
Faculty Method
 *********************************/
route.post("/createfaculty", uploads.single("facultyimage"), CreateFaculty);
route.get("/getallfaculty", getallFaculty);
route.get("/getonefaculty/:id", getoneFaculty);
route.put("/updatefaculty/:id", uploads.fields([{name: "facultyimage"}]), updateFaculty);
route.delete("/deletefaculty/:id", deleteFaculty);

  /*********************************
Sport Method
 *********************************/
route.post("/createsport", uploads.single("sportimage"), CreateSport);
route.get("/getallsport", getallSport);
route.get("/getonesport/:id", getoneSport);
route.put("/updatesport/:id", uploads.fields([{name: "sportimage"}]), updateSport);
route.delete("/deletesport/:id", deleteSport);

  /*********************************
School Timing Method
 *********************************/
route.post("/createschooltiming", uploads.fields([{name: "logo1"}, {name: "logo2"}]), CreateSchoolTiming);
route.get("/getallschooltiming", getallSchoolTiming);
route.get("/getoneschooltiming/:id", getoneSchoolTiming);
route.put("/updateschooltiming/:id", uploads.fields([{name: "logo1"}, {name: "logo2"}]), updateSchoolTiming);
route.delete("/deleteschooltiming/:id", deleteSchoolTiming);

   /*********************************
Guidelines Method
 *********************************/
route.post("/createguidelines",  CreateGuidelines);
route.get("/getallguidelines", getallGuidelines);
route.get("/getoneguidelines/:id", getoneGuidelines);
route.put("/updateguidelines/:id",  updateGuidelines);


   /*********************************
WithdrawalPolicy Method
 *********************************/
route.post("/createwithdrawalpolicy",  CreateWithdrawalPolicy);
route.get("/getallwithdrawalpolicy", getallWithdrawalPolicy);
route.get("/getonewithdrawalpolicy/:id", getoneWithdrawalPolicy);
route.put("/updatewithdrawalpolicy/:id",  updateWithdrawalPolicy);

   /*********************************
Enquiry Method
 *********************************/
route.post("/createEnquiry",  CreateEnquiry);
route.get("/getallEnquiry", getallEnquiry);
route.get("/getoneEnquiry/:id", getoneEnquiry);
route.put("/updateEnquiry/:id",  updateEnquiry);

  /*********************************
Rules Method
 *********************************/
route.post("/createrules", uploads.single("rulesimage"), CreateRules);
route.get("/getallrules", GetAllRules);
route.get("/getonerules/:id", GetOneRules);
route.put("/updaterules/:id", uploads.fields([{name: "rulesimage"}]), UpdateRules);

   /*********************************
School Calendar Method
 *********************************/
route.post("/createSchoolCalendar",  CreateSchoolCalendar);
route.get("/getallSchoolCalendar", getallSchoolCalendar);
route.get("/getoneSchoolCalendar/:id", getoneSchoolCalendar);
route.put("/updateSchoolCalendar/:id",  updateSchoolCalendar);
route.delete("/deleteSchoolCalendar/:id",  deleteSchoolCalendar);

  /*********************************
House System Method
 *********************************/
route.post("/createhousesystem",  CreateHouseSystem);
route.get("/getallhousesystem", getallHouseSystem);
route.get("/getonehousesystem/:id", getoneHouseSystem);
route.put("/updatehousesystem/:id",  updateHouseSystem);
route.delete("/deletehousesystem/:id",  deleteHouseSystem);

// **********************************************************************************************
route.post("/createhouse", uploads.single("houseimage"), CreateHouse);
route.get("/getallhouse", getallHouse);
route.get("/getonehouse/:id", getoneHouse);
route.put("/updatehouse/:id", uploads.fields([{name: "houseimage"}]), updateHouse);
route.delete("/deletehouse/:id",  deleteHouse);

  /*********************************
Curriculam Method
 *********************************/
route.post("/createcurriculam", uploads.single("curriculamimage"), CreateCurriculam);
route.get("/getallcurriculam", getallCurriculam);
route.get("/getonecurriculam/:id", getoneCurriculam);
route.put("/updatecurriculam/:id", uploads.fields([{name: "curriculamimage"}]), updateCurriculam);
route.delete("/deletecurriculam/:id",  deleteCurriculam);

  /*********************************
Photo Gallery Method
 *********************************/
route.post("/createphotogallery", uploads.single("photo"), CreatePhotoGallery);
route.get("/getallphotogallery", getallPhotoGallery);
route.get("/getonephotogallery/:id", getonePhotoGallery);
route.put("/updatephotogallery/:id", uploads.fields([{name: "photo"}]), updatePhotoGallery);
route.delete("/deletephotogallery/:id",  deletePhotoGallery);

  /*********************************
Video Gallery Method
 *********************************/
route.post("/createvideogallery", upload.single("video"), CreateVideoGallery);
route.get("/getallvideogallery", getallVideoGallery);
route.get("/getonevideogallery/:id", getoneVideoGallery);
route.put("/updatevideogallery/:id", upload.fields([{name: "video"}]), updateVideoGallery);
route.delete("/deletevideogallery/:id",  deleteVideoGallery);

  /*********************************
Achievement Method
 *********************************/
route.post("/createachievement", uploads.single("accoladessimage"), CreateAchievement);
route.get("/getallachievement", getallAchievement);
route.get("/getoneachievement/:id", getoneAchievement);
route.put("/updateachievement/:id", uploads.fields([{name: "accoladessimage"}]), updateAchievement);
route.delete("/deleteachievement/:id",  deleteAchievement);

  /*********************************
Language
 *********************************/
route.post("/createlanguage",  Createlanguage);
route.get("/getalllanguage", getalllanguage);
route.get("/getonelanguage/:id", getonelanguage);
route.put("/updatelanguage/:id",  updatelanguage);
route.delete("/deletelanguage/:id",  deletelanguage);

 /*********************************
Hobby
 *********************************/
route.post("/createhobby",  Createhobby);
route.get("/getallhobby", getallhobby);
route.get("/getonehobby/:id", getonehobby);
route.put("/updatehobby/:id",  updatehobby);
route.delete("/deletehobby/:id",  deletehobby);

 /*********************************
Sport
 *********************************/
route.post("/createsportData",  CreateSportData);
route.get("/getallsportData", getallSportData);
route.get("/getonesportData/:id", getoneSportData);
route.put("/updatesportData/:id",  updateSportData);
route.delete("/deletesportData/:id",  deleteSportData);

 /*********************************
Art Method
 *********************************/
route.post("/createart",  CreateArt);
route.get("/getallart", getallArt);
route.get("/getoneart/:id", getoneArt);
route.put("/updateart/:id",  updateArt);
route.delete("/deleteart/:id",  deleteArt);

  /*********************************
Annual Method
 *********************************/
route.post("/createannual", uploadpdfs.single("annualpdf"), CreateAnnual);
route.get("/getallannual", getallAnnual);
route.get("/getoneannual/:id", getoneAnnual);
route.put("/updateannual/:id", uploadpdfs.fields([{name: "annualpdf"}]), updateAnnual);
route.delete("/deleteannual/:id",  deleteAnnual);

 /*********************************
News And Event Method
 *********************************/
route.post("/createnewandevent", uploads.single("newandeventimage"), CreateNewAndEvent);
route.get("/getallnewandevent", getallNewAndEvent);
route.get("/getonenewandevent/:id", getoneNewAndEvent);
route.put("/updatenewandevent/:id", uploads.fields([{name: "newandeventimage"}]), updateNewAndEvent);
route.delete("/deletenewandevent/:id",  deleteNewAndEvent);


 /*********************************
Contact Method
 *********************************/
route.post("/createcontact",  Createcontact);
route.get("/getallcontact", getAllcontact);
route.get("/getonecontact/:id", getOnecontact);
route.put("/updatecontact/:id",  Updatecontact);
route.delete("/deletecontact/:id",  Deletecontact);

 /*********************************
Career Method
 *********************************/
route.post("/createcareer",  CreateCareer);
route.get("/getallcareer", getAllCareer);
route.get("/getonecareer/:id", getOneCareer);
route.put("/updatecareer/:id",  UpdateCareer);
route.delete("/deletecareer/:id",  DeleteCareer);

   /*********************************
Calendar Method
 *********************************/
route.post("/createcalendar", CreateCalendar);
route.post("/createexcelevents", CreateExcelEvent);
route.get("/getallcalendar", GetAllCalendar);
route.put("/updatecalendar/:id", UpdateCalendar)

   /*********************************
Get In Touch Method
 *********************************/
route.post("/creategetintouch", Creategetintouchform);
route.get("/getallgetintouch", GetAllGetinTouch);
route.delete("/deletegetintouch/:id", DeleteGetinTouchForm)

   /*********************************
Contact Form Method
 *********************************/
route.post("/createcontactform", Createcontactform);
route.get("/getallcontactform", getAllcontactform);
route.delete("/deletecontactform/:id", DeleteContactForm)

   /*********************************
Enquiry Form Method
 *********************************/
route.post("/createenquiryform", CreateEnquiryform);
route.get("/getallenquiryform", getAllEnquiryform);
route.delete("/deleteenquiryform/:id", DeleteEnquiryForm)

  /*********************************
School Circular Method
 *********************************/
 route.post("/createschoolcircular", uploadpdf.fields([{name:"circularpdf"}, {name:"circularimage"}]), CreateSchoolCircular);
 route.get("/getallschoolcircular", getallSchoolCircular);
 route.get("/getoneschoolcircular/:id", getoneSchoolCircular);
 route.put("/updateschoolcircular/:id", uploadpdf.fields([{name:"circularpdf"}, {name:"circularimage"}]), updateSchoolCircular);
 route.delete("/deleteschoolcircular/:id", deleteSchoolCircular);

    /*********************************
Mandatory Session Table Method
 *********************************/
route.post("/createsessiontable",  CreateSessionTable);
route.post("/createsessiondata/:session/data",  CreateSessionData);
route.get("/getallsessiontable", getallSessionTable);
route.get("/getonesessiontable/:id", getoneSessionTable);
route.put("/updatesessiontable/:id",  updateSessionTable);
route.put("/updatesessiondata/:sessionId/:dataId", updateSessionData);
route.delete("/deletesessiontable/:session/data", deleteSessionTable);

   /*********************************
General Method
 *********************************/
route.post("/creategeneral", CreateGeneralTable);
route.get("/getallgeneral", getallGeneralTable);
route.get("/getonegeneral/:id", getoneGeneralTable);
route.put("/updategeneral/:id", updateGeneralTable);
route.delete("/deletegeneral/:id", deleteGeneralTable);

   /*********************************
Document Method
 *********************************/
route.post("/createdocument", uploadpdfs.single("documentpdf"), CreateDocument);
route.get("/getalldocument", getallDocument);
route.get("/getonedocument/:id", getoneDocument);
route.put("/updatedocument/:id", uploadpdfs.fields([{name:"documentpdf"}]), updateDocument);
route.delete("/deletedocument/:id", deleteDocument);

   /*********************************
Result Method
 *********************************/
route.post("/createresult", uploadpdfs.single("resultpdf"), CreateResult);
route.get("/getallresult", getallResult);
route.get("/getoneresult/:id", getoneResult);
route.put("/updateresult/:id", uploadpdfs.fields([{name:"resultpdf"}]), updateResult);
route.delete("/deleteresult/:id", deleteResult);

   /*********************************
Staff Method
 *********************************/
route.post("/createStaff", CreateStaff);
route.get("/getallStaff", getallStaff);
route.get("/getoneStaff/:id", getoneStaff);
route.put("/updateStaff/:id", updateStaff);
route.delete("/deleteStaff/:id", deleteStaff);

   /*********************************
Infrastructure Method
 *********************************/
route.post("/createInfrastructure", CreateInfrastructure);
route.get("/getallInfrastructure", getallInfrastructure);
route.get("/getoneInfrastructure/:id", getoneInfrastructure);
route.put("/updateInfrastructure/:id", updateInfrastructure);
route.delete("/deleteInfrastructure/:id", deleteInfrastructure);

   /*********************************
Review Method
 *********************************/
route.post("/createReview", CreateReview);
route.get("/getallReview", getallReview);

 /*********************************
Pedagogy Method
 *********************************/
route.post("/createPedagogy",  CreatePedagogy);
route.get("/getallPedagogy", getallPedagogy);
route.get("/getonePedagogy/:id", getonePedagogy);
route.put("/updatePedagogy/:id",  updatePedagogy);
route.delete("/deletePedagogy/:id",  deletePedagogy);

 /*********************************
Library Method
 *********************************/
route.post("/createLibrary",  CreateLibrary);
route.get("/getallLibrary", getallLibrary);
route.get("/getoneLibrary/:id", getoneLibrary);
route.put("/updateLibrary/:id",  updateLibrary);
route.delete("/deleteLibrary/:id",  deleteLibrary);

 /*********************************
Learning Support Method
 *********************************/
route.post("/createLearningSupport",  CreateLearningSupport);
route.get("/getallLearningSupport", getallLearningSupport);
route.get("/getoneLearningSupport/:id", getoneLearningSupport);
route.put("/updateLearningSupport/:id",  updateLearningSupport);
route.delete("/deleteLearningSupport/:id",  deleteLearningSupport);

 /*********************************
Authentication Method
 *********************************/
route.post("/register", Registration);
route.post("/login", Login);
route.get("/loginstatus", LoginStatus);
route.get("/protected-route", ProtectedLogin)
route.get("/logout", LogOut);
route.post("/forgot", Forgot);
route.post("/reset-password/:token", ResetPassword)

   /*********************************
Apply For Job Method
 *********************************/
route.post("/createApplyForJob", uploadpdfs.single("resume"), CreateApplyForJobform);
route.get("/getallApplyForJob", getAllApplyForJobform);
route.delete("/deleteApplyForJob/:id", DeleteApplyForJobForm);
export default route;