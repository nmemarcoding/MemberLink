const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// use cors
app.use(cors());

// use body-parser
app.use(bodyParser.json());

mongoose
    .connect("mongodb+srv://nmemarcoding:Test1377@cluster0.8cwxn08.mongodb.net/")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})



const port = process.env.PORT || 3002;

// start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});