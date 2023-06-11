import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    "totalItems": {
      "type": "Number"
    },
    "items": {
      "type": [
        "Mixed"
      ]
    }
});

export const Book = mongoose.model("book", bookSchema);
