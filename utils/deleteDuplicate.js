import { Book } from "../models/book.js";

const deleteDuplicate = async () => {
  Book.aggregate([
    {
      "$group": {
          _id: {id: "$id"},
          id: { $addToSet: "$_id" } ,
          count: { $sum : 1 }
      }
  },
  {
      "$match": {
          count: { "$gt": 1 }
      }
  }
  ], {allowDiskUse: true}).then((item) => {
    item.forEach(async (item) => {
      item.id.shift();
      console.log(`${logSymbols.warning} Duplicate data found for ID ${item._id.id}`)
      await Book.deleteMany({_id: {$in: item.id}})
        .then(() => console.log(`${logSymbols.success} Duplicate data for ID ${item._id.id} deleted`))
        .catch((err) => console.log(`${logSymbols.error} Error deleting duplicate ID ${item._id.id}: ${err}`))
    })
  })
}