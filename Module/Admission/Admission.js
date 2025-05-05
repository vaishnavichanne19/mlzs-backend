import mongoose from "mongoose"

const guidelineSchema = mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    subheading: {
        type: String
    },
    title: {
        type: String
    },
    points: {
        type: String
    },
    declaration: {
        type: String
    },
    paragraph: {
        type: String
    },
})

const withdrawalpolicySchema = mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    paragraph: {
        type: String
    }
})

const EnquirySchema = mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    paragraph: {
        type: String
    },
    title1: {
        type: String
    },
    description1: {
        type: String
    },
    title2: {
        type: String
    },
    description2: {
        type: String
    },
})

const rulesSchema = mongoose.Schema({
    heading: {
        type: String
    },
    rulesimage: {
        type: String
    }
})

const enquiryFormSchema = mongoose.Schema({
    studentname: {
        type: String
    },
    admissionclass: {
        type: String
    },
    dob: {
        type: String
    },
    admissionyear: {
        type: String
    },
    parentname: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    source: {
        type: String
    }
})
export const GuidelinesData = mongoose.model("guidelines", guidelineSchema);
export const WithdrawalPolicy = mongoose.model("WithdrawalPolicy", withdrawalpolicySchema);
export const EnquiryData = mongoose.model("enquiry", EnquirySchema);
export const RulesData = mongoose.model("rules", rulesSchema);
export const EnquiryForm = mongoose.model("enquiryform", enquiryFormSchema);