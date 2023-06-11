import axios from "axios";
import logSymbols from "log-symbols";
import mongoose from "mongoose";
import fs from "fs";
import { database, baseUrl } from "./config.js";
import { bookModel } from "./models/book.js";
import { formatDate } from "./utils/formatDate.js";
import { formatTime } from "./utils/formatTime.js";

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const startTimer = Date.now();
const book = mongoose.model("book", bookModel);
let booksCount = await book.countDocuments();
let lastId =
  (await book.find({}).sort({ _id: -1 }).limit(1))[0].id === undefined
    ? 0
    : (await book.find({}).sort({ _id: -1 }).limit(1))[0].id;

const getBooks = async (id) => {
  const url = `${baseUrl}${id}&jscmd=details&format=json`;
  try {
    const response = await axios.get(url);
    console.log(`${logSymbols.success} Data fetched for ID ${id}`);
    return response.data;
  } catch (err) {
    console.error(`${logSymbols.error} Error fetching data for ID ${id}:`, err);
  }
};

const saveBooks = async (data) => {
  let count = 0;
  try {
    await book.insertMany(data);
  } catch (err) {
    console.error(
      `${logSymbols.error} Error saving data to Mongoose database:`,
      err
    );
    count++;
    await fs.promises.writeFile(`error_${formatDate(Date())}_${count}.txt`, err);
  }
};

const main = async () => {
  let allData = [];
  let newDataCounter = [];
  let count = 0;
  let i;
  for (lastId ? (i = lastId) : (i = 1); i <= total; i++) {
    const data = await getBooks(i);
    count++;

    if (data) {
      allData.push(data);
      newDataCounter.push(data);
    }

    if (count === 100) {
      await saveBooks(allData);
      console.log(`${logSymbols.info} Full batch saved to Mongoose database`);
      allData = [];
      count = 0;
    } else if (count < 100 && i === JSON.parse(total)) {
      await saveBooks(allData);
      console.log(
        `${logSymbols.info} Batch with ${allData.length} data saved to Mongoose database`
      );
      allData = [];
      count = 0;
    }
  }
  const timeElapsed = Date.now() - startTimer;

  console.log(`${logSymbols.success} Job done in ${formatTime(timeElapsed)}!`);
  fs.writeFileSync(
    `log_${formatDate(Date())}.txt`,
    `Job done in ${formatTime(timeElapsed)}!\nTotal data: ${booksCount}`
  );
};

main();