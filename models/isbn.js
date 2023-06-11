import mongoose from "mongoose";

const isbnSchema = new mongoose.Schema({
  isbn13: Number,
});

export const ISBN = mongoose.model("isbn", isbnSchema);