import mongoose from "mongoose"

const aboutSchema = new mongoose.Schema({
    mainheading: {
        type: String
    },
    description: {
        type: String
    },
    mlzsimage: {
        type: String
    },
    heading: {
        type: String
    },
    paragraph: {
        type: String
    },
})

const hitechSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    hitechimage: {
        type: String
    },
    description: {
        type: String
    },
})
const campusSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    campusimage: {
        type: String
    },
    title: {
        type: String
    },
    paragraph: {
        type: String
    },
})

const facultySchema = new mongoose.Schema({
    heading: {
        type: String
    },
    facultyimage: {
        type: String
    },
    description: {
        type: String
    },
})

const sportSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    sportimage: {
        type: String
    }
})

const schooltimingSchema = mongoose.Schema({
    heading: {
        type: String
    },
    logo1: {
        type: String
    },
    logo2: {
        type: String
    },
    schooladdress: {
        type: String
    },
    academicyear: {
        type: String
    },
    schooltimingheading: {
        type: String
    },
    level: {
        type: String
    },
    days: {
        type: [String]
    },
    timing: {
        type: [String]
    },
    title: {
        type: String
    },
    directorname: {
        type: String
    },
    about: {
        type: String
    },
})

const newsandeventSchema = mongoose.Schema({
    heading: {
      type: String
    },
    newandeventimage: {
        type: String
      },
    title: {
      type: String
    },
    description: {
        type: String
    },
    date: {
      type: String
    },
  })

  const preprimarySchema = mongoose.Schema({
    heading: {
        type: String,
      },
      description1: {
        type: String,
      },
      preprimaryimage: {
        type: String,
      },
      description2: {
        type: String,
      },
      title: {
        type: String,
      },
      description3: {
        type: String,
      },
  })

  const primarySchema = mongoose.Schema({
    heading: {
        type: String,
      },
      title: {
        type: String,
      },
      description1: {
        type: String,
      },
      primaryimage: {
        type: String,
      },
      description2: {
        type: String,
      },
  })
export const AboutMLZS = mongoose.model("aboutmlzs", aboutSchema);
export const HiTechData = mongoose.model("hitech", hitechSchema);
export const CampusData = mongoose.model("campus", campusSchema);
export const FacultyData = mongoose.model("faculty", facultySchema);
export const SportData = mongoose.model("sport", sportSchema);
export const SchoolTiming = mongoose.model("schooltiming", schooltimingSchema);
export const NewAndEventData = mongoose.model("NewAndEvent", newsandeventSchema);
export const PrePrimaryData = mongoose.model("preprimary", preprimarySchema);
export const PrimaryData = mongoose.model("primary", primarySchema);
