import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { sender: "You", text: userInput }];
        setMessages(newMessages);

        try {
            const response = await fetch('http://localhost:5000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userInput })
            });
            const data = await response.json();
            setMessages([...newMessages, { sender: "Chatbot", text: data.response }]);
        } catch (error) {
            setMessages([...newMessages, { sender: "Chatbot", text: error }]);
        }

        setUserInput("");
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span>Chatbot</span>
                        <button onClick={() => setIsOpen(false)}>&times;</button>
                    </div>
                    <div className="chatbox-body">
                        {messages.map((msg, index) => (
                            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                        ))}
                    </div>
                    <div className="chatbox-footer">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
            <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>💬</button>

            <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .chatbox {
          width: 300px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
        }
        .chatbox-header {
          background: #0078ff;
          color: white;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        .chatbox-body {
          padding: 15px;
          font-size: 14px;
          color: #333;
          max-height: 300px;
          overflow-y: auto;
        }
        .chatbox-footer {
          display: flex;
        }
        .chatbox-footer input {
          flex: 1;
          padding: 5px;
        }
        .chatbox-footer button {
          padding: 5px 10px;
        }
        .chatbot-button {
          background: #0078ff;
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
        .chatbot-button:hover {
          transform: scale(1.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
