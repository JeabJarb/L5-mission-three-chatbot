require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const chatbotRouter = require("./routes/chatbotRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is function 👨‍🍳🍽");
});

app.use('/api/chatbot', chatbotRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
