import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AddSlider, EditSlider, SliderHome, ViewSlider } from "./Home/Slider";
import { HomeAbout, HomeAboutAdd, HomeAboutEdit } from "./Home/HomeAbout";
import {
  AddGallery,
  EditGallery,
  GalleryHome,
  ViewGallery,
} from "./Home/Gallery";
import { AddLitera, EditLitera, EditLiteraHeading, LiteraHome } from "./Home/Litera";
import {
  Addschoolinfo,
  EditCardTable,
  EditHeadingData,
  EditScholInfo,
  EditSchoolData,
  RedirectView,
  SchoolInfoHome,
  ViewSchoolInfo,
} from "./Home/SchoolInfo";
import {
  AboutHome,
  AddAbout,
  EditAbout,
  EditCardDetail,
  EditTopDataAbout,
  ViewAbout,
  ViewCardDetails,
} from "./About/About";
import { AnthemHome, EditAnthem } from "./About/Anthem";
import {
  AddDirector,
  DirectorHome,
  EditDirector,
  EditDirectorCard,
} from "./About/Director";
import { AddPrincipal, EditPrincipal, PrincipalHome } from "./About/Principal";
import {
  EditHeadingPhilosophy,
  EditPhilosophy,
  PhilosophyHome,
} from "./About/Philosophy";
import { AddChairman, ChairmanHome, EditChairman } from "./About/Chairman";
import { AddRSD, EditRSD, RSDHome } from "./About/RSD";
import { AddMission, EditMission, MissionHome } from "./About/Mission";
import {
  AcademicHome,
  AddAcademic,
  EditAcademic,
  EditTopDataAcademic,
  ViewAcademic,
} from "./About/Academic";
import {
  AddLiteraExp,
  EditLiteraExp,
  EditLiteraExpPoint,
  LiteraExpHome,
} from "./About/LiteraExp";
import {
  AboutmlzsHome,
  AddAboutmlzs,
  EditAboutmlzs,
  EditTopDataAboutmlzs,
  ViewAboutmlzs,
} from "./whyMLZS/AboutMLZS";
import { AddHiTech, EditHiTech, HiTechHome } from "./whyMLZS/HiTech";
import { AddCampus, CampusHome, EditCampus } from "./whyMLZS/Campus";
import { AddFaculty, EditFaculty, FacultyHome } from "./whyMLZS/Faculty";
import {
  AddSport,
  EditSport,
  EditTopDataSport,
  SportHome,
  ViewSport,
} from "./whyMLZS/Sport";
import {
  AddSchoolTimings,
  EditDirectorName,
  EditHeading,
  EditLogo,
  EditSchoolName,
  EditSchoolTimings,
  SchoolTimingsHome,
} from "./whyMLZS/SchoolTiming";
import {
  AddGuidelines,
  EditGuidelines,
  EditGuidelinesDeclaration,
  EditGuidelinesPoint,
  GuidelinesHome,
} from "./Admission.js/Guidelines";
import {
  EditWithdrawalPolicy,
  WithdrawalPolicyHome,
} from "./Admission.js/WithdrawalPolicy";
import {
  EditEnquiry,
  EditEnquiryData,
  EditEnquiryPoint,
  EnquiryHome,
} from "./Admission.js/Enquiry";
import { AddRules, EditRules, RulesHome } from "./Admission.js/Rules";
import {
  AddSchoolCalendar,
  EditSchoolCalendar,
  EditTopDataSchoolCalendar,
  SchoolCalendarHome,
} from "./Parent Corner/SchoolCalendar";
import {
  AddHouse,
  AddHouseSystem,
  EditHouse,
  EditHouseSystem,
  EditTopDataHouseSystem,
  HouseSystemHome,
  ViewHouse,
} from "./Parent Corner/HouseSystem";
import {
  AddCurriculam,
  CurriculamHome,
  EditCurriculam,
  EditDataCurriculam,
  EditTopDataCurriculam,
  ViewCurriculam,
} from "./Parent Corner/Curriculam";
import {
  AddPhotoGallery,
  EditPhotoGallery,
  EditTopDataPhotoGallery,
  PhotoGalleryHome,
  ViewPhotoGallery,
} from "./Parent Corner/PhotoGallery";
import {
  AddVideoGallery,
  EditTopDataVideoGallery,
  EditVideoGallery,
  VideoGalleryHome,
  ViewVideoGallery,
} from "./Parent Corner/VideoGallery";
import {
  AchievementHome,
  AddAchievement,
  EditAchievement,
} from "./Parent Corner/Achievement";
import {
  AddArt,
  AddHobby,
  AddLanguage,
  AddSportData,
  EditArtHeading,
  EditArtUser,
  EditHobbyHeading,
  EditHobbyUser,
  EditLanguage,
  EditLanguageHeading,
  EditSportHeading,
  EditSportUser,
  EditTopDataLanguage,
  LanguageHome,
} from "./Parent Corner/Learning";
import {
  AddAnnual,
  AnnualHome,
  EditAnnual,
  EditTopDataAnnual,
  ViewAnnual,
} from "./Parent Corner/Annual";
import { CareerHome, EditCareer } from "./Career/Career";
import {
  AddContact,
  ContactHome,
  EditContact,
  EditContactDetail,
} from "./Career/Contact";
import MandatoryHome from "./Mandatory/MandatoryHome";
import { MyCalendar } from "./Calendar/CalendarHome";
import DashboardHome from "./Dashboard/DashboardHome";
import { GetInTouchForm } from "./About/GetInTouchForm";
import {
  AddSchoolCircular,
  EditSchoolCircular,
  EditTopDataSchoolCircular,
  SchoolCircularHome,
  ViewSchoolCircular,
} from "./Parent Corner/SchoolCircular";
import {
  AddNewAndEvent,
  EditNewAndEvent,
  EditTopDataNewAndEvent,
  NewAndEventHome,
  ViewNewAndEvent,
} from "./whyMLZS/NewAndEvent";
import { AddGeneralTable, EditGeneralTable, EditTopDataGeneralTable } from "./Mandatory/General";
import { AddDocument, EditDocument, EditTopDataDocument } from "./Mandatory/Document";
import { AddResult, EditResult, EditTopDataResult } from "./Mandatory/Result";
import { AddStaffTable, EditStaffTable, EditTopDataStaffTable } from "./Mandatory/Staff";
import { AddInfrastructureTable, EditInfrastructureTable, EditTopDataInfrastructureTable } from "./Mandatory/Infrastructure";
import { ContactForm } from "./Career/ContactForm";
import { EnquiryForm } from "./Admission.js/EnquiryForm";
import { AddPrePrimary, EditPrePrimary, PrePrimaryHome } from "./whyMLZS/PrePrimary";
import { AddPrimary, EditPrimary, PrimaryHome } from "./whyMLZS/Primary";
import { EditSession, EditSessionData, EditTopDataSessionTable } from "./Mandatory/SessionHome";
import { EditHeadingPedagogy, EditPedagogy, PedagogyHome } from "./Parent Corner/Pedagogy";
import { EditDataLibrary, EditLibrary, EditTopDataLibrary, LibraryHome } from "./Parent Corner/Library";
import { Editlearningsupport, EditTopDatalearningsupport, LearningsupportHome } from "./Parent Corner/LearningSupport";
import { useEffect } from "react";
import axios from "axios"

function App() {
  const validateFile = (file) => {
    if (!file) return { isValid: false, message: "No file selected!" };

    const fileType = file.type;
    const fileSize = file.size;

    // Allowed file types and their max sizes
    const fileRules = {
      images: {
        types: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        maxSize: 1 * 1024 * 1024, // 1MB
      },
      pdf: {
        types: ["application/pdf"],
        maxSize: 5 * 1024 * 1024, // 5MB
      },
      videos: {
        types: ["video/mp4", "video/webm", "video/ogg"],
        maxSize: 10 * 1024 * 1024, // 10MB
      },
    };

    // Determine file category
    let fileCategory = null;
    if (fileRules.images.types.includes(fileType)) fileCategory = "images";
    else if (fileRules.pdf.types.includes(fileType)) fileCategory = "pdf";
    else if (fileRules.videos.types.includes(fileType)) fileCategory = "videos";

    if (!fileCategory) {
      return { isValid: false, message: "Invalid file type!" };
    }

    if (fileSize > fileRules[fileCategory].maxSize) {
      return {
        isValid: false,
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${
          fileRules[fileCategory].maxSize / (1024 * 1024)
        }MB.`,
      };
    }

    return { isValid: true, message: "File is valid!" };
  };

  useEffect(() => {
    axios
      .get("http://localhost:8003/api/protected-route", { withCredentials: true })
      .then((res) => {
        console.log("User is authenticated:", res.data);
      })
      .catch(() => {
        console.log("Not authenticated");
        window.location.href= "/";
      });
  }, []);

  return (
    <div>
      <Router>
        <Sidebar />
        <ToastContainer />
        <Routes>
          {/* *********************************
           Dashboard
 ********************************* */}
          <Route exact path="/" element={<DashboardHome />} />

          {/* *********************************
            Home Slider 
 ********************************* */}
          <Route path="/slider" element={<SliderHome />} />
          <Route path="/slider-add" element={<AddSlider />} />
          <Route path="/slider-edit/:id" element={<EditSlider />} />
          <Route path="/slider-view/:id" element={<ViewSlider />} />

          {/* *********************************
           Home About 
 ********************************* */}
          <Route path="/homeabout" element={<HomeAbout />} />
          <Route path="/homeabout-add" element={<HomeAboutAdd />} />
          <Route path="/homeabout-edit/:id" element={<HomeAboutEdit />} />

          {/* *********************************
            Home Gallery
 ********************************* */}
          <Route path="/gallery" element={<GalleryHome />} />
          <Route path="/gallery-add" element={<AddGallery />} />
          <Route path="/gallery-edit/:id" element={<EditGallery />} />
          <Route path="/gallery-view/:id" element={<ViewGallery />} />

          {/* *********************************
            Home Litera
 ********************************* */}
          <Route path="/litera" element={<LiteraHome />} />
          <Route path="/litera-add" element={<AddLitera />} />
          <Route path="/litera-edit/:id" element={<EditLitera />} />
          <Route path="/litera-heading-edit/:id" element={<EditLiteraHeading />} />

          {/* *********************************
            Home School Info
 ********************************* */}
          <Route path="/SchoolInfo" element={<SchoolInfoHome />} />
          <Route path="/SchoolInfo-add" element={<Addschoolinfo />} />
          <Route path="/SchoolInfo-edit/:id" element={<EditScholInfo />} />
          <Route path="/SchoolInfo-view/:id" element={<ViewSchoolInfo />} />
          <Route path="/view/SchoolInfo/:id" element={<RedirectView />} />
          <Route path="/School-data-edit/:id" element={<EditSchoolData />} />
          <Route path="/School-heading-edit/:id" element={<EditHeadingData />} />

          {/* *********************************
            About 
 ********************************* */}
          <Route path="/about" element={<AboutHome />} />
          <Route path="/about-add" element={<AddAbout />} />
          <Route path="/about-edit/:id" element={<EditAbout />} />
          <Route path="/about-view/:id" element={<ViewAbout />} />
          <Route path="/head-about-edit/:id" element={<EditTopDataAbout />} />
          <Route path="/view-card-detail/:id" element={<ViewCardDetails />} />
          <Route path="/card-detail-edit/:id" element={<EditCardDetail />} />

          {/* *********************************
            Anthem
 ********************************* */}
          <Route path="/anthem" element={<AnthemHome />} />
          <Route path="/anthem-edit/:id" element={<EditAnthem />} />

          {/* *********************************
           Director
 ********************************* */}
          <Route path="/Director" element={<DirectorHome />} />
          <Route path="/Director-add" element={<AddDirector />} />
          <Route path="/Director-edit/:id" element={<EditDirector />} />
          <Route path="/Directors-edit/:id" element={<EditDirectorCard />} />

          {/* *********************************
          Principal
 ********************************* */}
          <Route path="/Principal" element={<PrincipalHome />} />
          <Route path="/Principal-add" element={<AddPrincipal />} />
          <Route path="/Principal-edit/:id" element={<EditPrincipal />} />

          {/* *********************************
          Philosophy
 ********************************* */}
          <Route path="/Philosophy" element={<PhilosophyHome />} />
          <Route path="/Philosophy-edit/:id" element={<EditPhilosophy />} />
          <Route
            path="/Philosophy-heading-edit/:id"
            element={<EditHeadingPhilosophy />}
          />

          {/* *********************************
          Chairman
 ********************************* */}
          <Route path="/Chairman" element={<ChairmanHome />} />
          <Route path="/Chairman-add" element={<AddChairman />} />
          <Route path="/Chairman-edit/:id" element={<EditChairman />} />

          {/* *********************************
          RSD
 ********************************* */}
          <Route path="/RSD" element={<RSDHome />} />
          <Route path="/RSD-add" element={<AddRSD />} />
          <Route path="/RSD-edit/:id" element={<EditRSD />} />

          {/* *********************************
         Mission
 ********************************* */}
          <Route path="/Mission" element={<MissionHome />} />
          <Route path="/Mission-add" element={<AddMission />} />
          <Route path="/Mission-edit/:id" element={<EditMission />} />

          {/* *********************************
            Academic 
 ********************************* */}
          <Route path="/Academic" element={<AcademicHome />} />
          <Route path="/Academic-add" element={<AddAcademic />} />
          <Route path="/Academic-edit/:id" element={<EditAcademic />} />
          <Route path="/Academic-view/:id" element={<ViewAcademic />} />
          <Route
            path="/head-Academic-edit/:id"
            element={<EditTopDataAcademic />}
          />

          {/* *********************************
           LiteraExp
 ********************************* */}
          <Route path="/LiteraExp" element={<LiteraExpHome />} />
          <Route path="/LiteraExp-add" element={<AddLiteraExp />} />
          <Route path="/LiteraExp-edit/:id" element={<EditLiteraExp />} />
          <Route
            path="/LiteraExp-point-edit/:id"
            element={<EditLiteraExpPoint />}
          />

          {/* *********************************
            About MLZS 
 ********************************* */}
          <Route path="/Aboutmlzs" element={<AboutmlzsHome />} />
          <Route path="/Aboutmlzs-add" element={<AddAboutmlzs />} />
          <Route path="/Aboutmlzs-edit/:id" element={<EditAboutmlzs />} />
          <Route path="/Aboutmlzs-view/:id" element={<ViewAboutmlzs />} />
          <Route
            path="/head-Aboutmlzs-edit/:id"
            element={<EditTopDataAboutmlzs />}
          />

          {/* *********************************
             Primary 
 ********************************* */}
          <Route path="/Primary" element={<PrimaryHome />} />
          <Route path="/Primary-add" element={<AddPrimary />} />
          <Route path="/Primary-edit/:id" element={<EditPrimary />} />

                 {/* *********************************
            Pre Primary 
 ********************************* */}
          <Route path="/PrePrimary" element={<PrePrimaryHome />} />
          <Route path="/PrePrimary-add" element={<AddPrePrimary />} />
          <Route path="/PrePrimary-edit/:id" element={<EditPrePrimary />} />

          {/* *********************************
        Hi Tech
 ********************************* */}
          <Route path="/HiTech" element={<HiTechHome />} />
          <Route path="/HiTech-add" element={<AddHiTech />} />
          <Route path="/HiTech-edit/:id" element={<EditHiTech />} />

          {/* *********************************
       Campus
 ********************************* */}
          <Route path="/Campus" element={<CampusHome />} />
          <Route path="/Campus-add" element={<AddCampus />} />
          <Route path="/Campus-edit/:id" element={<EditCampus />} />

          {/* *********************************
       Faculty
 ********************************* */}
          <Route path="/Faculty" element={<FacultyHome />} />
          <Route path="/Faculty-add" element={<AddFaculty />} />
          <Route path="/Faculty-edit/:id" element={<EditFaculty />} />

          {/* *********************************
            Sport
 ********************************* */}
          <Route path="/Sport" element={<SportHome />} />
          <Route path="/Sport-add" element={<AddSport />} />
          <Route path="/Sport-edit/:id" element={<EditSport />} />
          <Route path="/Sport-view/:id" element={<ViewSport />} />
          <Route path="/head-Sport-edit/:id" element={<EditTopDataSport />} />

          {/* *********************************
           School Timing
 ********************************* */}
          <Route path="/SchoolTimings" element={<SchoolTimingsHome />} />
          <Route path="/SchoolTimings-add" element={<AddSchoolTimings />} />
          <Route path="/Heading-edit/:id" element={<EditHeading />} />
          <Route path="/Logo-edit/:id" element={<EditLogo />} />
          <Route path="/SchoolName-edit/:id" element={<EditSchoolName />} />
          <Route path="/DirectorName-edit/:id" element={<EditDirectorName />} />
          <Route
            path="/SchoolTiming-table-edit/:id"
            element={<EditSchoolTimings />}
          />

          {/* *********************************
          Guidelines
 ********************************* */}
          <Route path="/Guidelines" element={<GuidelinesHome />} />
          <Route path="/Guidelines-edit/:id" element={<EditGuidelines />} />
          <Route
            path="/Guidelines-point-edit/:id"
            element={<EditGuidelinesPoint />}
          />
          <Route
            path="/Guidelines-declaration-edit/:id"
            element={<EditGuidelinesDeclaration />}
          />

          {/* *********************************
          WithdrawalPolicy
 ********************************* */}
          <Route path="/WithdrawalPolicy" element={<WithdrawalPolicyHome />} />
          <Route
            path="/WithdrawalPolicy-edit/:id"
            element={<EditWithdrawalPolicy />}
          />

          {/* *********************************
          Enquiry
 ********************************* */}
          <Route path="/Enquiry" element={<EnquiryHome />} />
          <Route path="/Enquiry-edit/:id" element={<EditEnquiry />} />
          <Route
            path="/Enquiry-Point-edit/:id"
            element={<EditEnquiryPoint />}
          />
          <Route path="/Enquiry-Data-edit/:id" element={<EditEnquiryData />} />

          {/* *********************************
          Rules
 ********************************* */}
          <Route path="/Rules" element={<RulesHome />} />
          <Route path="/Rules-add" element={<AddRules />} />
          <Route path="/Rules-edit/:id" element={<EditRules />} />

          {/* *********************************
          School Calendar 
 ********************************* */}
          <Route path="/SchoolCalendar" element={<SchoolCalendarHome />} />
          <Route path="/SchoolCalendar-add" element={<AddSchoolCalendar />} />
          <Route
            path="/SchoolCalendar-edit/:id"
            element={<EditSchoolCalendar />}
          />
          <Route
            path="/head-SchoolCalendar-edit/:id"
            element={<EditTopDataSchoolCalendar />}
          />

          {/* *********************************
          House System
 ********************************* */}
          <Route path="/HouseSystem" element={<HouseSystemHome />} />
          <Route path="/HouseSystem-add" element={<AddHouseSystem />} />
          <Route path="/HouseSystem-edit/:id" element={<EditHouseSystem />} />
          <Route
            path="/head-HouseSystem-edit/:id"
            element={<EditTopDataHouseSystem />}
          />
          {/* *********************************************************** */}

          <Route path="/House-add" element={<AddHouse />} />
          <Route path="/House-view/:id" element={<ViewHouse />} />
          <Route path="/House-edit/:id" element={<EditHouse />} />

          {/* *********************************
         Curriculam
 ********************************* */}
          <Route path="/Curriculam" element={<CurriculamHome />} />
          <Route path="/Curriculam-add" element={<AddCurriculam />} />
          <Route path="/Curriculam-view/:id" element={<ViewCurriculam />} />
          <Route path="/Curriculam-edit/:id" element={<EditCurriculam />} />
          <Route path="CurriculamData-edit/:id" element={<EditDataCurriculam/>}/>
          <Route
            path="/head-Curriculam-edit/:id"
            element={<EditTopDataCurriculam />}
          />

          {/* *********************************
         Photo Gallery
 ********************************* */}
          <Route path="/PhotoGallery" element={<PhotoGalleryHome />} />
          <Route path="/PhotoGallery-add" element={<AddPhotoGallery />} />
          <Route path="/PhotoGallery-view/:id" element={<ViewPhotoGallery />} />
          <Route path="/PhotoGallery-edit/:id" element={<EditPhotoGallery />} />
          <Route
            path="/head-PhotoGallery-edit/:id"
            element={<EditTopDataPhotoGallery />}
          />

          {/* *********************************
         Video Gallery
 ********************************* */}
          <Route path="/VideoGallery" element={<VideoGalleryHome />} />
          <Route path="/VideoGallery-add" element={<AddVideoGallery />} />
          <Route path="/VideoGallery-view/:id" element={<ViewVideoGallery />} />
          <Route path="/VideoGallery-edit/:id" element={<EditVideoGallery />} />
          <Route
            path="/head-VideoGallery-edit/:id"
            element={<EditTopDataVideoGallery />}
          />

          {/* *********************************
         Achievement
 ********************************* */}
          <Route path="/Achievement" element={<AchievementHome />} />
          <Route path="/Achievement-add" element={<AddAchievement />} />
          <Route path="/Achievement-edit/:id" element={<EditAchievement />} />

          {/* *********************************
        Learning
 ********************************* */}
          <Route path="/Learning" element={<LanguageHome />} />
          <Route
            path="/heading-Language-edit/:id"
            element={<EditTopDataLanguage />}
          />
          <Route path="/Languages-add" element={<AddLanguage />} />
          <Route path="/Languages-edit/:id" element={<EditLanguage />} />
          <Route
            path="/Languages/heading/edit/:id"
            element={<EditLanguageHeading />}
          />

          <Route path="/Hobby-add" element={<AddHobby />} />
          <Route path="/Hobby-edit/:id" element={<EditHobbyUser />} />
          <Route
            path="/Hobby/heading/edit/:id"
            element={<EditHobbyHeading />}
          />
          <Route path="/Sport-add-data" element={<AddSportData />} />
          <Route path="/Sport-edit-data/:id" element={<EditSportUser />} />
          <Route
            path="/Sport/heading/edit/:id"
            element={<EditSportHeading />}
          />
          <Route path="/Art-add" element={<AddArt />} />
          <Route path="/Art-edit/:id" element={<EditArtUser />} />
          <Route path="/Art/heading/edit/:id" element={<EditArtHeading />} />

          {/* *********************************
         Annual
 ********************************* */}
          <Route path="/Annual" element={<AnnualHome />} />
          <Route path="/Annual-add" element={<AddAnnual />} />
          <Route path="/Annual-view/:id" element={<ViewAnnual />} />
          <Route path="/Annual-edit/:id" element={<EditAnnual />} />
          <Route path="/head-Annual-edit/:id" element={<EditTopDataAnnual />} />

          {/* *********************************
          NewAndEvent 
 ********************************* */}
          <Route path="/NewAndEvent" element={<NewAndEventHome />} />
          <Route path="/NewAndEvent-add" element={<AddNewAndEvent />} />
          <Route path="/NewAndEvent-edit/:id" element={<EditNewAndEvent />} />
          <Route
            path="/head-NewAndEvent-edit/:id"
            element={<EditTopDataNewAndEvent />}
          />
          <Route path="/NewAndEvent-view/:id" element={<ViewNewAndEvent />} />

          {/* *********************************
          Career
 ********************************* */}
          <Route path="/Career" element={<CareerHome />} />
          <Route path="/Career-edit/:id" element={<EditCareer />} />

          {/* *********************************
          Contact
 ********************************* */}
          <Route path="/Contact" element={<ContactHome />} />
          <Route path="/head-Contact-edit/:id" element={<EditContact />} />
          <Route path="/Contact-add" element={<AddContact />} />
          <Route path="/Contact-edit/:id" element={<EditContactDetail />} />

          {/* *********************************
        Calendar
 ********************************* */}
          <Route path="/Calendar" element={<MyCalendar />} />

          {/* *********************************
        Get In Touch 
 ********************************* */}
          <Route path="/getintouchform" element={<GetInTouchForm />} />

                   {/* *********************************
        Contact Form
 ********************************* */}
          <Route path="/contactform" element={<ContactForm />} />

                             {/* *********************************
        Enquiry Form
 ********************************* */}
          <Route path="/Enquiryform" element={<EnquiryForm />} />

          {/* *********************************
            SchoolCircular 
 ********************************* */}
          <Route path="/SchoolCircular" element={<SchoolCircularHome />} />
          <Route path="/SchoolCircular-add" element={<AddSchoolCircular />} />
          <Route
            path="/SchoolCircular-edit/:id"
            element={<EditSchoolCircular />}
          />
          <Route
            path="/SchoolCircular-view/:id"
            element={<ViewSchoolCircular />}
          />
          <Route
            path="/head-SchoolCircular-edit/:id"
            element={<EditTopDataSchoolCircular />}
          />

                   {/* *********************************
        Mandatory Table
 ********************************* */}
          <Route path="/MandatoryTable" element={<MandatoryHome />} />
          <Route path="/SessionHeading-edit/:id" element={<EditTopDataSessionTable />} />
          <Route path="/Session-edit/:id" element={<EditSession />} />
          <Route path="/SessionData-edit/:sessionId/:dataId" element={<EditSessionData />} />

                   {/* *********************************
         General Table
 ********************************* */}
          <Route path="/GeneralTable-add" element={<AddGeneralTable />} />
          <Route path="/GeneralTable-edit/:id" element={<EditGeneralTable/>} />
          <Route path="/head-GeneralTable-edit/:id" element={<EditTopDataGeneralTable />}/>

                             {/* *********************************
         Document Table
 ********************************* */}
          <Route path="/Document-add" element={<AddDocument />} />
          <Route path="/Document-edit/:id" element={<EditDocument/>} />
          <Route path="/head-Document-edit/:id" element={<EditTopDataDocument />}/>

                                       {/* *********************************
         Result Table
 ********************************* */}
          <Route path="/Result-add" element={<AddResult />} />
          <Route path="/Result-edit/:id" element={<EditResult/>} />
          <Route path="/head-Result-edit/:id" element={<EditTopDataResult />}/>

                             {/* *********************************
         Staff Table
 ********************************* */}
          <Route path="/StaffTable-add" element={<AddStaffTable />} />
          <Route path="/StaffTable-edit/:id" element={<EditStaffTable/>} />
          <Route path="/head-StaffTable-edit/:id" element={<EditTopDataStaffTable />}/>

                                    {/* *********************************
         Infrastructure Table
 ********************************* */}
          <Route path="/InfrastructureTable-add" element={<AddInfrastructureTable />} />
          <Route path="/InfrastructureTable-edit/:id" element={<EditInfrastructureTable/>} />
          <Route path="/head-InfrastructureTable-edit/:id" element={<EditTopDataInfrastructureTable />}/>

                                                 {/* *********************************
         Pedagogy Table
 ********************************* */}
          <Route path="/Pedagogy" element={<PedagogyHome />} />
          <Route path="/Pedagogy-edit/:id" element={<EditPedagogy/>} />
          <Route path="/Pedagogy-heading-edit/:id" element={<EditHeadingPedagogy />}/>

                                                           {/* *********************************
         Library Table
 ********************************* */}
          <Route path="/Library" element={<LibraryHome />} />
          <Route path="/Library-edit/:id" element={<EditLibrary/>} />
          <Route path="/Library-heading-edit/:id" element={<EditTopDataLibrary />}/>
          <Route path="/LibraryData-edit/:id" element={<EditDataLibrary />}/>

                                                           {/* *********************************
         Learning Support Table
 ********************************* */}
          <Route path="/LearningSupport" element={<LearningsupportHome/>}/>
          <Route path="/LearningSupport-edit/:id" element={<Editlearningsupport/>} />
          <Route path="/LearningSupport-heading-edit/:id" element={<EditTopDatalearningsupport />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
