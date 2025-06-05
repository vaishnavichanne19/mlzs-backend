import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  mainheading: {
    type: String,
  },
  para: {
    type: String,
  },
  aboutimage: {
    type: String,
  },
  heading: {
    type: String,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  description1: {
    type: String,
  },
});

const anthemSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  description: {
    type: String,
  },
});

const directorSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  directorname: {
    type: String,
  },
  directorimage: {
    type: String,
  },
  description: {
    type: String,
  },
  paragraph1: {
    type: String,
  },
  title: {
    type: String,
  },
  paragraph2: {
    type: String,
  },
  director2name: {
    type: String,
  },
  director2image: {
    type: String,
  },
  description2: {
    type: String,
  },
});

const principalSchema = mongoose.Schema({
  heading: {
    type: String,
  },
  principalname: {
    type: String,
  },
  principalimage: {
    type: String,
  },
  description: {
    type: String,
  },
  paragraph1: {
    type: String,
  },
});

const philosophySchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const ChairmanSchema = mongoose.Schema({
  heading: {
    type: String,
  },
  Chairmanname: {
    type: String,
  },
  Chairmanimage: {
    type: String,
  },
  description: {
    type: String,
  },
  paragraph1: {
    type: String,
  },
});

const RSDSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  RSDname: {
    type: String,
  },
  RSDimage: {
    type: String,
  },
  description: {
    type: String,
  },
  paragraph1: {
    type: String,
  },
  title: {
    type: String,
  },
  paragraph2: {
    type: String,
  },
});

const missionSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  missionimage: {
    type: String,
  },
  description: {
    type: String,
  },
});

const AcademicSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  academicimage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const LiteraExperienceSchema = mongoose.Schema({
  heading: {
    type: String,
  },
  title: {
    type: String,
  },
  paragraph1: {
    type: String,
  },
  literaimage: {
    type: String,
  },
  point: {
    type: String,
  },
  paragraph2: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
});

// const getTouchSchema = mongoose.Schema({
//   parentname: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },
//   mobile: {
//     type: Number,
//   },
//   city: {
//     type: String,
//   },
//   school: {
//     type: String,
//   },
//   query: {
//     type: String,
//   },
//   grade: {
//     type: String,
//   },
//   residence: {
//     type: String,
//   },
// });


const getTouchSchema = mongoose.Schema({
  studentname: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  admissionclass: {
    type: String,
  },
  fathername: {
    type: String,
  },
  fathernumber: {
    type: Number,
  },
  mothername: {
    type: String,
  },
  mothernumber: {
    type: Number,
  },
  status: {
    type: String,
  },
  source: {
    type: String,
  },
  admissiontype: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  school: {
    type: String,
  },
  query: {
    type: String,
  },
  grade: {
    type: String,
  },
  residence: {
    type: String,
  },
});

export const AboutData = mongoose.model("about", aboutSchema);
export const AnthemData = mongoose.model("anthem", anthemSchema);
export const DirectorData = mongoose.model("director", directorSchema);
export const PrincipalData = mongoose.model("principal", principalSchema);
export const PhilosophyData = mongoose.model("Philosophy", philosophySchema);
export const ChairmanData = mongoose.model("chairman", ChairmanSchema);
export const RSDData = mongoose.model("RSD", RSDSchema);
export const MissionData = mongoose.model("mission", missionSchema);
export const AcademicData = mongoose.model("academic", AcademicSchema);
export const LiteraExperience = mongoose.model(
  "literaexperience",
  LiteraExperienceSchema
);
export const GetTouch = mongoose.model("getTouch", getTouchSchema);
