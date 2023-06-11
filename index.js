import axios from "axios";
import logSymbols from "log-symbols";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { bookModel } from "./models/book.js";
import { isbnModel } from "./models/isbn.js";
dotenv.config();

const database = process.env.DATABASE_URI;

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const isbn = mongoose.model("isbn", isbnModel);
const book = mongoose.model("book", bookModel);

async function process() {
  try {
    const isbnData = await isbn.find().lean();

    for (const doc of isbnData) {
      const id = doc.isbn13;
      const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${id}&jscmd=details&format=json`;
      const response = await axios.get(url);
      const data = response.data;

      await book.insertMany(data);
      console.log(`${logSymbols.success} ${id} processed.`);
    }

    console.log(`${logSymbols.success} All documents processed.`);
  } catch (error) {
    console.error(logSymbols.error, error);
  }
}

process();
