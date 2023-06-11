import mongoose from "mongoose";

const isbnSchema = new mongoose.Schema({
  isbn13: Number,
});

export default isbnSchema;