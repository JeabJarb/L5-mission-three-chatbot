

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "As an interviewer, your job is to practice job interviews for a staff member, you should ask a series of questions to the user and can adjust your response based on the answers. The flow will start with you saying \"Tell me about yourself\", you should ask the user at least 6 questions based on the the user's response. Other than the first question, the question should not be generated based on the user's answers and the question should be to interview for the user's job type (\"Job title\"). At the end of the interview, you as the interviewer should comment on how well the user answered the questions, and suggest how the user can improve their response.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getBotResponse(req, res) {
  try {
    const { userMessage, jobTitle } = req.body;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: `Tell me about yourself. What is your job title?` }],
        },
        {
          role: "user",
          parts: [{ text: `My job title is ${jobTitle}.` }],
        },
        {
          role: "model",
          parts: [{ text: `Great! Let's start the interview for the position of ${jobTitle}.` }],
        },
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    const result = await chatSession.sendMessage(userMessage);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error getting bot response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getApi = (req, res) => {
  console.log(req.query);
  if (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    res.json({ response: "API is working" });
  }
};

module.exports = { getBotResponse, getApi };