import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  thumbnail_url: String,
  details: {
    title: String,
    by_statement: String,
    publishers: [String],
    description: {
      type: String,
      value: String,
    },
    publish_date: String,
    series: [String],
    identifiers: {
      amazon: [String],
    },
    languages: [
      {
        key: String,
      },
    ],
    isbn_10: [String],
    isbn_13: [String],
  },
});

export const Book = mongoose.model("book", bookSchema);
