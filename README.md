# ISBN Scrapper

This documentation provides information about the app and how to set it up to process data from Open Library's API and store it in a MongoDB database using Mongoose.
Prerequisites

Before running the app, ensure you have the following prerequisites installed:

* Node.js
* MongoDB
* Database with ISBN collection

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/bourdier/isbn-scrapper.git
```

2. Install the dependencies by navigating to the project directory and running the following command:

```bash
npm install
```

3. Configure the MongoDB connection:

* Open the `index.js` file in a text editor.
* Locate the `database` constant and replace `'URL'` with the appropriate MongoDB connection URL for your environment.

4. Run the app:

```bash
node index.js
```

The app will retrieve data from Open Library's API for each ISBN entry in the MongoDB collection and store it in the Book collection.

## App Overview

The app is written in JavaScript and uses the following libraries:

* `axios`: A promise-based HTTP client for making API requests.
* `log-symbols`: Provides symbols for log messages (e.g., success, error).
* `mongoose`: A MongoDB object modeling tool designed to work in an asynchronous environment.
* `ISBN`: A Mongoose model representing the `ISBN` collection in the MongoDB database.
* `Book`: A Mongoose model representing the `Book` collection in the MongoDB database.

The app follows these steps:

* Establishes a connection to the MongoDB database using the provided connection URL.
* Retrieves all documents from the `ISBN` collection using the `ISBN` model.
* Iterates over each document and retrieves book data from Open Library's API.
* Inserts the book data into the `Book` collection using the `Book` model.
* Prints success messages for each processed ISBN.
* Prints a final success message after processing all documents.
* In case of an error, prints an error message with details.

## Customization

You can customize the app to fit your specific requirements:

* Adjust the MongoDB connection URL to connect to your desired database.
* Modify the `url` variable in the `process` function to use a different API or modify the query parameters as needed.
* Customize the success and error log messages as per your preference.
* Extend the app's functionality to include additional data processing or error handling.

## Contributing

Contributions to the app are welcome! If you encounter any issues or have suggestions for improvements, please create a new issue or submit a pull request on the GitHub repository.

## License

This app is open-source and distributed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
