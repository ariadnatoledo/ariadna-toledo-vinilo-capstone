import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"; 
import "./MessagesPage.scss";

const socket = io("http://localhost:3306");

const MessagesPage = ({ user }) => {
  const { username } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3306/messages/${username}`);
      setMessages(response.data.messages);
    } catch (err) {
      setError("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [username]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      setError("Message cannot be empty.");
      return;
    }
  
    console.log("user is")
    console.log(user)
    const senderId = user.userId; 

    const message = {
      senderId,
      receiverUsername: username,
      content: newMessage,
    };

    console.log("Sending message:", message);

    try {
      const response = await axios.post("http://localhost:3306/messages", message);
      console.log("Message successfully sent. Response:", response.data);
      
      console.log("Message emitted via socket:", response.data.newMessage);
      
      setNewMessage("");
      setError(null); 
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err.message);
      setError("Failed to send message");
    }
  };

  return (
    <div className="messages-page">
      <h2>Messages with {username}</h2>
      <ul className="messages-list">
        {messages.map((msg) => (
          <li key={msg.messageId} className="message-item">
            <p>
              <strong>{msg.senderId === "user1" ? "You" : msg.senderId}:</strong> {msg.content}
            </p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <textarea
        className="new-message-input"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
        placeholder="Type your message"
      />
      <button className="send-message-button" onClick={handleSendMessage}>
        Send
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MessagesPage;


