const express = require("express");
const connectDB = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connectDB();

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/thoughts", require("./routes/thoughtRoutes"));

app.listen(PORT, () => {
  console.log(
    `You are now listening to the smooth, sultry sounds of ${PORT}, the PORT!`
  );
});
