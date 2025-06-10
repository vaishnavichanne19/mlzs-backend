import mongoose from "mongoose"


const CalendarSchema = mongoose.Schema({
    heading: {
        type: String
    },
    month: {
        type: String
    },
    day: {
        type: String
    },
    date: {
        type: String
    },
    event: {
        type: String
    },
})

const housesystemSchema = mongoose.Schema({
    heading: {
        type: String
    },
    housename: {
        type: String
    },
    houseincharge: {
        type: String
    },
    captainboys: {
        type: String
    },
    captaingirls: {
        type: String
    },
    point: {
        type: String
    },
    houseimage: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const houseSchema = mongoose.Schema({
    houseimage: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const  curriculamSchema = mongoose.Schema({
    heading: {
        type: String
    },
    paragraph: {
        type: String
    },
    curriculamimage: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    title2: {
        type: String
    },
    description2: {
        type: String
    },
})

const photogallerySchema = mongoose.Schema({
    heading: {
        type: String
    },
    photo: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
})

const videogallerySchema = mongoose.Schema({
    heading: {
        type: String
    },
    video: {
        type: String
    },
    url: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
})

const achivementSchema = mongoose.Schema({
    heading: {
        type: String
    },
    accoladessimage: {
        type: String
    },
    paragraph: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
})

const languagesSchema = mongoose.Schema({
    title: {
        type: String
    },
    heading: {
        type: String
    },
    languages: {
        type: String
    }
})

const hobbySchema = mongoose.Schema({
    heading: {
        type: String
    },
    hobby: {
        type: String
    }
})

const sportSchema = mongoose.Schema({
    heading: {
        type: String
    },
    sportname: {
        type: String
    }
})

const artsSchema = mongoose.Schema({
    heading: {
        type: String
    },
    arts: {
        type: String
    }
})

const annualSchema = mongoose.Schema({
    heading: {
        type: String
    },
    title: {
        type: String
    },
    annualpdf: {
        type: String
    }
})

const schoolcircularSchema = mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: Date
    },
    circularimage: {
        type: String
    },
    circularpdf: {
        type: String
    },

})

const pedagogySchema = mongoose.Schema({
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
})

const librarySchema = mongoose.Schema({
    heading: {
        type: String
    },
    paragraph: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    title2: {
        type: String
    },
    description2: {
        type: String
    },
})

const learningsupportSchema = mongoose.Schema({
    heading: {
        type: String
    },
    paragraph: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
})
export const SchoolCalendar = mongoose.model("schoolcalendar", CalendarSchema);
export const HouseSystem = mongoose.model("housesystem", housesystemSchema);
export const House = mongoose.model("house", houseSchema);
export const CurriculamData = mongoose.model("curriculan", curriculamSchema);
export const PhotoGallery = mongoose.model("photogallery", photogallerySchema);
export const VideoGallery = mongoose.model("videogallery", videogallerySchema);
export const AchievementData = mongoose.model("accoladess", achivementSchema);
export const LanguagesData = mongoose.model("languages", languagesSchema);
export const HobbyData = mongoose.model("hobby", hobbySchema);
export const SportData = mongoose.model("sportdata", sportSchema);
export const ArtData = mongoose.model("arts", artsSchema);
export const AnnualData = mongoose.model("annual", annualSchema);
export const SchoolCircular = mongoose.model("schoolcircular", schoolcircularSchema);
export const PedagogyData = mongoose.model("pedagogy", pedagogySchema);
export const LibraryData = mongoose.model("library", librarySchema)
export const LearningSupportData = mongoose.model("learningsupport", learningsupportSchema)
