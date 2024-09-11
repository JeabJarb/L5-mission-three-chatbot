import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import style from "./Chatbot.module.css";

const API_KEY = "AIzaSyAPgSGg2fTTIOQfPJAbpgxs3_PCtmdEHv0";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const constructRequestBody = (messages) => {
  return {
    contents: messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.text }],
    })),
    systemInstruction: {
      role: "user",
      parts: [
        {
          text: "As an interviewer, your role is to simulate a job interview for the user. Start by asking the user to provide their job title with the prompt, '''Hi, I am your interviewer. Could you please provide your job title?'''  Confirming once again by saying '''Your job title is (job title). Is that correct?'''. Once the user responds, then capture their job title as a reference and thank the user for providing their job title\n\nBegin the interview by saying, '''Please tell me about yourself.''' You should ask at least six questions tailored to the user'''s job title. These questions should be relevant to the role they are interviewing for. While the first question is fixed, subsequent questions should dynamically adjust based on the user’s responses and the specific job title.\n\nAt the end of the interview, provide feedback on how well the user answered each question. Offer suggestions for improving their responses with specific examples or insights to help them prepare better.\n\nProvide the user a score rating out of 10 as well.",
        },
      ],
    },
    generationConfig: {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  };
};

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am your interviewer. Could you please provide your job title?",
      role: "model",
    },
  ]);
  const [input, setInput] = useState("");
  const requestInProgress = useRef(false);
  const chatDisplayRef = useRef(null); // Ref for the chat display container

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (requestInProgress.current) {
      return;
    }

    const newMessage = {
      text: input,
      role: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    requestInProgress.current = true;

    await processMessageToGeminiAi(newMessages);

    requestInProgress.current = false;
  };

  const processMessageToGeminiAi = async (messages) => {
    console.log("Loading...");
    try {
      const requestBody = constructRequestBody(messages);
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const aiMessage = response.data.candidates[0].content.parts[0].text;
      if (aiMessage) {
        setMessages([...messages, { text: aiMessage, role: "model" }]);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data from Gemini AI:", error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat display whenever messages change
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={style.container}>
      <div className={style.body}>
        <h2 className={style.header}>AI Mock Interviewer</h2>
        <form className={style.form} onSubmit={(e) => e.preventDefault()}>
          <div
            className={style.chatDisplay}
            ref={chatDisplayRef} // Attach the ref here
          >
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={message.role === "user" ? style.user : style.bot}
                >
                  <p>{message.text}</p>
                </div>
                <p
                  className={
                    message.role === "user" ? style.userIcon : style.botIcon
                  }
                >
                  {message.role}
                </p>
              </div>
            ))}
          </div>
          <div className={style.chatBox}>
            <input
              type="text"
              placeholder="Type message here"
              value={input}
              onChange={handleChange}
              className={style.inputChat}
            />
            <button onClick={handleClick} className={style.button}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
