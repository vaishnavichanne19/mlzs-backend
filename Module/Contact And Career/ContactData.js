import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
    paragraph: {
        type: String,
    },
    subtitle:  {
        type: String,
    },
    paragraph2:  {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    }
});

const careerSchema = new mongoose.Schema({
    heading:{
        type: String
    },
    description:{
        type: String
    }
})

const contactFormSchema = new mongoose.Schema({
   name:{
    type:String
   },
   email:{
    type:String
   },
   phone:{
    type:Number
   },
  subject:{
    type:String
  },
  message:{
    type:String
  }
})


export const ContactForm = mongoose.model("contactform", contactFormSchema)
export const ContactData = mongoose.model("contactschool", contactSchema)
export const CareerData = mongoose.model("careerschool", careerSchema)