const mongoose = require("mongoose");
const config = require("./config");

// const MONGODB_URI = 'mongodb://¨{config.MONGODB_DATABASE}';
const MONGODB_URI = 'mongodb+srv://teamrocket:pokemon@cluster0.ohi0qi5.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnfiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));