import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MessagesPage.scss";

const MessagesPage = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/messages/${username}`);
        setMessages(response.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [username]);

  const handleSendMessage = async (content) => {
    try {
      const response = await axios.post("http://localhost:3306/messages", {
        senderId: user.userId,
        receiverId: targetUserId, // Replace with the ID of the receiver
        content,
      });
      console.log(response.data.message); // Log success message
      // Optionally, refresh the messages list after sending
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err.message);
    }
  };

  return (
    <div className="messages-page">
      <h2>Messages with {username}</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.messageId}>
            <p>
              <strong>From:</strong> {msg.senderId} <strong>To:</strong> {msg.receiverId}
            </p>
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MessagesPage;
