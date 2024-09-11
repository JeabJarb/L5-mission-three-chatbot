// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
//   systemInstruction: `As an interviewer, your role is to simulate a job interview for the user. Start by asking the user to provide their job title with the prompt, 'Hi, I am your interviewer. Could you please provide your job title?'  Confirming once again by saying 'Your job title is (jobTitle). Is that correct?'. Once the user responds, then capture their job title as a reference and thank the user for providing their job title\n\nBegin the interview by saying, 'Please tell me about yourself.' You should ask at least six questions tailored to the user's job title. These questions should be relevant to the role they are interviewing for. While the first question is fixed, subsequent questions should dynamically adjust based on the user’s responses and the specific job title.\n\nAt the end of the interview, provide feedback on how well the user answered each question. Offer suggestions for improving their responses with specific examples or insights to help them prepare better.\n\nProvide the user a score rating out of 10 as well.`,
// });

// // Controller function to get a bot response
// async function getBotResponse(req, res) {
//   try {
//     const userMessage = req.body.message;
    
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         { role: "user", parts: [{ text: userMessage }] },
//         // Add more history if needed
//       ],
//     });

//     const result = await chatSession.sendMessage(userMessage);
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     console.error('Error handling chat:', error.message);
//     console.error('Error stack trace:', error.stack);
//     res.status(500).json({ error: 'An error occurred while processing your request.', details: error.message });
//   }
// }

// module.exports = { getBotResponse };