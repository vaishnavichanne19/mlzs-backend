import { Review } from "../../Module/Review/Review.js";

export const CreateReview = async (req, res) => {
  try {
    const { rating, title, name} =
      req.body;

    const newData = new Review({
      rating,
      title,
      name,
    });

    await newData.save();
    res.status(200).json({ msg: "Data added successfully", data: newData });
  } catch (error) {
    console.error("Error adding school info:", error);
    res
      .status(500)
      .json({ error: "Failed to add data", details: error.message });
  }
};

export const getallReview = async (req, res) => {
  try {
    const userData = await Review.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


