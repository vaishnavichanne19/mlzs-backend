import mongoose from "mongoose";

const review = mongoose.Schema ({
    rating: {
        type: String
    },
    title: {
        type: String
    },
    name: {
        type: String
    }
})

export const Review = mongoose.model("review", review);