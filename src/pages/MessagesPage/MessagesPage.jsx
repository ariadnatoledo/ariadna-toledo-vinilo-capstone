import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./MessagesPage.scss";

const socket = io("http://localhost:3306");

const MessagesPage = ({ loggedInUserId }) => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      console.log(`Fetching messages for ${username}`);
      const response = await axios.get(
        `http://localhost:3306/messages/${username}`
      );
      console.log("Fetched messages:", response.data.messages);
      setMessages(response.data.messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to fetch messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [username]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      console.log("New message received via socket:", message);
      setMessages((prev) => [...prev, message]);
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

    try {
      const message = {
        senderId: loggedInUserId,
        receiverUsername: username,
        content: newMessage,
      };

      console.log("Sending message:", message);
      const response = await axios.post(
        "http://localhost:3306/messages",
        message
      );
      console.log("Message sent successfully:", response.data);
      setNewMessage("");
      setError(null);
    } catch (err) {
      console.error(
        "Error sending message:",
        err.response?.data || err.message
      );
      setError("Failed to send message.");
    }
  };

  return (
    <div className="messages-page">
      <div className="messages-page__username">
        <h2>{username}</h2>
      </div>
      <ul className="messages-list">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`message-item ${
              msg.senderId === loggedInUserId
                ? "message-item--sent"
                : "message-item--received"
            }`}
          >
            <p>
              <strong>
                {msg.senderId === loggedInUserId ? "You" : username}:
              </strong>{" "}
              {msg.content}
            </p>
            <div className="message-item__timestamp">
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          </li>
        ))}
      </ul>

      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MessagesPage;
