import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  sliderimage: {
    type: String,
  },
});

const homeaboutSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  expno: {
    type: Number,
  },
  exptext: {
    type: String,
  },
  aboutvideo: {
    type: String,
  },
  homeaboutimg1:{
    type:String,
  },
  homeaboutimg2:{
    type:String
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  para: {
    type: String,
  },
  point1: {
    type: String,
  },
  pointpara1: {
    type: String,
  },
  point2: {
    type: String,
  },
  pointpara2: {
    type: String,
  },
  point3: {
    type: String,
  },
  pointpara3: {
    type: String,
  },
  point4: {
    type: String,
  },
  pointpara4: {
    type: String,
  },
});

const gallerySchema = new mongoose.Schema({
  galleryimage: {
    type: String,
  },
});

const literaSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  literavideo: {
    type: String,
  },
});

const schoolsSchema = mongoose.Schema({
  mainheading: {
    type: String
  },
  schoollogo: {
    type: String,
  },
  schoolname: {
    type: String,
  },
  years: {
    type: String,
  },
  heading: {
    type: String,
  },
  subheading: {
    type: String,
  },
  para: {
    type: String,
  },
  description1: {
    type: String,
  },
  schoolinfoimage: {
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
});


export const SliderData = mongoose.model("slider", sliderSchema);
export const HomeAboutData = mongoose.model("homeabout", homeaboutSchema);
export const GalleryData = mongoose.model("homegallery", gallerySchema);
export const LiteraData = mongoose.model("homelitera", literaSchema);
export const SchoolInfo = mongoose.model("schoolinfo", schoolsSchema);
