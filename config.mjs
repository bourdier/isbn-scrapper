import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DATABASE_URI;
const baseUrl = 'https://openlibrary.org/api/books?bibkeys=ISBN:';