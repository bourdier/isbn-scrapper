import axios from "axios";
import logSymbols from "log-symbols";
import mongoose from "mongoose";
import { ISBN } from "./models/isbn.js";
import { Book } from "./models/book.js";

const database = 'URL';

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function process() {
  try {
    const isbnData = await ISBN.find().lean();

    for (const doc of isbnData) {
      const id = doc.isbn13;
      const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${id}&jscmd=details&format=json`;
      const response = await axios.get(url);
      const data = response.data;

      await Book.insertMany(data);
      console.log(`${logSymbols.success} ${id} processed.`);
    }

    console.log(`${logSymbols.success} All documents processed.`);
  } catch (error) {
    console.error(logSymbols.error, error);
  }
}

process();
