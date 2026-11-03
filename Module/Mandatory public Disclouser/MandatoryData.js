import mongoose from "mongoose";

const generalSchema = new mongoose.Schema({
    mainheading: {
        type: String,
    },
    heading: {
        type: String,
    },
    information: {
        type: String,
    },
    detail: {
        type: String,
    },
});

const documentSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
    document: {
        type: String,
    },
    documentpdf: {
        type: String,
    }
})

const resultSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
    resultdocument: {
        type: String,
    },
    resultpdf: {
        type: String,
    }
})
const sessiontblSchema = new mongoose.Schema({
    mainheading: {
        type: String,
    },
    session: {
        type: String,
    },
    data: [
        {
          classes: String,
          sectionA1: Number,
          sectionA2: Number,
          sectionB1: Number,
          sectionB2: Number,
          sectionC1: Number,
          sectionC2: Number,
          sectionD: Number,
          sectionE: Number,
          total: Number,
        },
      ],
})

const staffSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    staffinformation: {
        type: String
    },
    staffdetail: {
        type: String
    }
})

const infrastructureSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    infrastructure: {
        type: String
    },
    infrastructuredetail: {
        type: String
    }
})

const resultcompSchema = new mongoose.Schema({
    year:{
        type:Number
    },
    mlzs:{
        type:Number
    },
    global:{
        type:Number
    },
})

export const GeneralData = mongoose.model("generaldata", generalSchema);
export const DocumentData = mongoose.model("documentdata", documentSchema);
export const ResultData = mongoose.model("resultdata", resultSchema);
export const SessionTable = mongoose.model("sessiontable", sessiontblSchema);
export const StaffData = mongoose.model("staffdata", staffSchema);
export const InfrastructureData = mongoose.model("infrastructuredata", infrastructureSchema);
export const resultcompdata = mongoose.model("resultcomp", resultcompSchema)