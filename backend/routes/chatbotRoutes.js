const express = require("express");
const router = express.Router();
const chatbot = require("../controllers/chatbotController");

router.get("/api", chatbot.getApi);
router.post("/api/chatbot", chatbot.getBotResponse);

module.exports = router;
