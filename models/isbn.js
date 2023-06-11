import mongoose from "mongoose";

const isbnModel = new mongoose.Schema({
  isbn13: Number,
});

export default isbnModel;