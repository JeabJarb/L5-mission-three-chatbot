const express = require('express');
const { getBotResponse } = require('../controllers/chatbotController');
const { testRun } = require('../controllers/testController');
const chatbotRouter = express.Router();

// chatbotRouter.post('/bot-response', getBotResponse);
chatbotRouter.post('/bot-test-run', testRun);

module.exports = chatbotRouter;