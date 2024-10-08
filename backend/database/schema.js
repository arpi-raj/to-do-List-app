require("dotenv").config();
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = process.env.mongoUrl;
mongoose.connect(mongoDB);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to success event (to get notification of successful connection)
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifiedOtp: { type: Boolean },
  todo: [
    {
      title: String,
      description: String,
      completed: Boolean,
      date: Date,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
