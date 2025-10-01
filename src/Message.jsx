import React, { useEffect, useRef, useState } from 'react';
import './MessagePage.css';

function MessagePage() {
  const [users, setUsers] = useState([]); // current user we are going to message and we get that user details
  const [messageuser, setmessageuser] = useState(null); // current user chat box
  const [messages, setmessages] = useState([]); // to store all message of current user
  const [newmessage, setnewmessage] = useState(""); // to store the new message
  const currentUserId = localStorage.getItem('id'); // Replace with actual current user ID
  const token = localStorage.getItem('token'); // get token from localStorage
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:2002/message/showUserToChat?id=${currentUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [token]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' }); // to scroll the message to bottom when new message arrives
    }
  }, [messages]);

  const fetchMessages = async (receiverId) => {
    try {
      const sentMessages = await fetch(`http://localhost:2002/message/getmessage?senderId=${currentUserId}&receiverId=${receiverId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => res.json());

      const receivedMessages = await fetch(`http://localhost:2002/message/getmessage?senderId=${receiverId}&receiverId=${currentUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => res.json());

      const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => new Date(a.time) - new Date(b.timestamp));
      setmessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  function handleChatClick(user) {
    setmessageuser(user);
    setmessages([]); // Clear previous messages when switching users
    fetchMessages(user.id); // Fetch messages for the selected user
  }

  function handleMessage(m) {
    setnewmessage(m);
  }

  // to save the message to backend
function handleSendMessage() {
  if (!newmessage.trim()) return;

  const senderId = currentUserId;
  const receiverId = messageuser.id;
  const messageText = encodeURIComponent(newmessage); // encode to avoid breaking URL

  const url = `http://localhost:2002/message/savemessage?senderId=${senderId}&receiverId=${receiverId}&message=${messageText}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      setmessages(oldmessages => [...oldmessages, data]);
      setnewmessage("");
    })
    .catch(err => console.error("Error sending message:", err));
}



  return (
    <div className="message-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Message</h3>
        {users.length === 0 && <p>Loading users...</p>}
        {users.map(user => (
          <div
            key={user.id}
            className="chat-item d-flex"
            onClick={() => handleChatClick(user)}
          >
            <img
              src={user.profile_pic ? `data:image/${user.image_type};base64,${user.profile_pic}` : "profile"}
              alt={user.userName}
              className="profile-pic"
            />
            <div className="chat-info">
              <p className="username">{user.userName}</p>
              <p className="description">{user.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat-content">
        {messageuser ? (
          <div className="ok">
            <div className="chat-header d-flex">
              <img
                src={messageuser.profile_pic ? `data:image/${messageuser.image_type};base64,${messageuser.profile_pic}` : "https://via.placeholder.com/60"}
                alt={messageuser.userName}
                className="profile-pic-large"
              />
              <h4>{messageuser.userName}</h4>
            </div>
            <div className="chat-messages">
              {messages.length === 0 && <p>No messages yet. Start the conversation!</p>}
              {messages.map((msg, index) => (
                <div
                  key={ index}
                  className={`message-bubble ${msg.senderId == currentUserId ? 'sent' : 'received'}`}
                >
                  {console.log("msg"+msg.message)}
                  <p>{msg.message}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message"
                value={newmessage}
                onChange={(e) => handleMessage(e.target.value)}
               
              />
              <button
                className="btn btn-primary button"
                onClick={() => handleSendMessage()}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="message-placeholder">
            <div className="placeholder-content">
              <div className="icon">📨</div>
              <h3>Your messages</h3>
              <p>Send private photos and messages to a friend.</p>
              <button>Send message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagePage;
