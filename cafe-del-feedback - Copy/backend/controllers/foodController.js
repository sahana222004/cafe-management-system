import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Add new food item
const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename || null,
    });

    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ success: false, message: "Error saving food", error: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const { id, name, description, category } = req.query;
    const filter = {};

    if (id) filter._id = id;
    if (name) filter.name = name;
    if (description) filter.description = description;
    if (category) filter.category = category;

    const foods = await foodModel.find(filter);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food list:", error);
    res.status(500).json({ success: false, message: "Error fetching food list", error: error.message });
  }
};

// Delete food item by ID or other fields
const removeFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.query;

    const filter = {};
    if (id) filter._id = id;
    if (name) filter.name = name;
    if (price) filter.price = Number(price);
    if (description) filter.description = description;
    if (category) filter.category = category;

    if (Object.keys(filter).length === 0) {
      return res.status(400).json({ success: false, message: "No valid delete criteria provided." });
    }

    const food = await foodModel.findOne(filter);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    if (food.image) {
      const imagePath = path.join("uploads", food.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await foodModel.deleteOne({ _id: food._id });
    res.json({ success: true, message: "Food removed" });

  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Error deleting food", error: error.message });
  }
};

export { addFood, listFood, removeFood };
