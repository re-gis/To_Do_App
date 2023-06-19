const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/todo.routes.js");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.routes");

// CORS
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// DATABASE
connectDB();

/* TODO ROUTES */
app.use("/api/todo", router);


/* USER ROUTES */
app.use('/api/users', userRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
