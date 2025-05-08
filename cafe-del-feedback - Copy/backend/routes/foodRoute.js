import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  
  },
});

const upload = multer({ storage });

const foodRouter = express.Router();


foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);

foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;
