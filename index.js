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

let retryCount = 0; 

async function process() {
  try {
    const isbnData = await ISBN.find().lean();

    for (const doc of isbnData) {
      const id = doc.isbn;
      let success = false; 

      while (!success) {
        try {
          const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`;
          const response = await axios.get(url);
          const data = response.data;

          if (data.totalItems === 0) {
            console.log(`${logSymbols.error} ${id} not found.`);
          } else {
            await Book.insertMany(data);
            console.log(`${logSymbols.success} ${id} processed.`);
          }

          success = true;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log(`${logSymbols.warning} Too many requests. Restarting...`);
            await delay(1000); 
            retryCount++;
          } else {
            console.error(logSymbols.error, error);
            break;
          }
        }
      }

      if (!success) {
        console.log(`${logSymbols.error} Max retry limit reached for ${id}. Skipping...`);
      }

      if (success) {
        await ISBN.findOneAndDelete({ isbn: id });
      }
    }

    console.log(`${logSymbols.success} All documents processed.`);
  } catch (error) {
    console.error(logSymbols.error, error);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

process();
