const express = require("express");
const mongoose = require("mongoose");

// setup an express app
const app = express();

// setup middleware to handle json request
app.use(express.json());

// connect to MongoDB using Mongoose

async function connectToMongoDB() {
  try {
    // wait for the mongodb to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is connected");
  } catch {
    console.log(error);
  }
}

// triggers the connect with MongoDB
connectToMongoDB();

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const showRouter = require("./routes/show");
app.use("/shows", showRouter);

// start the express
app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
