import React, { useState } from "react";
import style from "./Chatbot.module.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: input, jobTitle }),
      });

      const data = await response.json(); // Parse the JSON response
      const botResponse = data.response;

      setMessages([
        ...messages,
        { role: "user", text: input },
        { role: "bot", text: botResponse },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error getting bot response:", error);
    } finally {
      setLoading(false); // Ensure loading is reset to false
    }
  };

  return (
    <div className={style.container}>
      <div className={style.body}>
        <h2 className={style.header}>AI Mock Interviewer</h2>
        <form className={style.form} onSubmit={(e) => e.preventDefault()}>
          <div className={style.titleBox}>
            <label className={style.job}>Job Title:</label>
            <input
              type="text"
              name="job-title"
              placeholder="Enter your job title"
              className={style.inputJob}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className={style.chatDisplay}>
            {messages.map((message, index) => (
              <span key={index}>
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
              </span>
            ))}
            {loading && (
              <div className={style.loader}>
                <img src="./loader.gif" alt="loading..." />
              </div>
            )}
          </div>
          <div className={style.chatBox}>
            <input
              type="text"
              placeholder="Enter your chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.inputChat}
            />
            <button
              onClick={handleOnClick}
              className={style.button}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;