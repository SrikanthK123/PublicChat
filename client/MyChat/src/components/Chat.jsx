import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userProfile from '../assets/Images/UserProfile.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notes from './Notes';

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [publicMessages, setPublicMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [error, setError] = useState('');
    const [activeUser, setActiveUser] = useState('');
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('username') || '');
    const [activeUserName, setActiveUserName] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [isPublicChat, setIsPublicChat] = useState(false);
    const [groupCode, setGroupCode] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/getUser`);
                if (response.data.success) {
                    setUsers(response.data.user);
                    if (response.data.user.length > 0) {
                        setActiveUser(response.data.user[0]._id);
                        setActiveUserName(response.data.user[0].name);
                        setRecipientName(response.data.user[0].name);
                        setGroupCode(response.data.user[0].groupCode);
                    }
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, [backendUrl]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/getMessages/${activeUser}`);
                if (response.data.success) {
                    setMessages(response.data.messages);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch messages');
            }
        };

        if (!isPublicChat && activeUser) {
            fetchMessages();
        }
    }, [activeUser, isPublicChat, backendUrl]);

    useEffect(() => {
        const fetchPublicMessages = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/getPublicMessages`);
                if (response.data.success) {
                    setPublicMessages(response.data.messages);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch public messages');
            }
        };

        if (isPublicChat) {
            fetchPublicMessages();
        }
    }, [isPublicChat, backendUrl]);

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            try {
                const url = isPublicChat
                    ? `${backendUrl}/api/sendPublicMessage`
                    : `${backendUrl}/api/sendMessage/${activeUser}`;

                const response = await axios.post(url, {
                    content: messageInput,
                    sender: currentUser
                });

                if (response.data.success) {
                    if (isPublicChat) {
                        setPublicMessages([...publicMessages, response.data.message]);
                    } else {
                        setMessages([...messages, response.data.message]);
                    }
                    setMessageInput('');
                    toast.success('Message sent successfully!');
                } else {
                    setError(response.data.message);
                    toast.error('Failed to send message.');
                }
            } catch (err) {
                setError('Failed to send message');
                toast.error('Failed to send message.');
            }
        }
    };

    const handleUserChange = (userId, userName, userGroupCode) => {
        setIsPublicChat(false);
        setActiveUser(userId);
        setActiveUserName(userName);
        setRecipientName(userName);
        setGroupCode(userGroupCode);

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/getMessages/${userId}`);
                if (response.data.success) {
                    setMessages(response.data.messages);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch messages');
            }
        };

        fetchMessages();
    };

    const handlePublicChatToggle = () => {
        setIsPublicChat(true);
        setActiveUser('');
        setActiveUserName('');
        setRecipientName('Everyone');
        setGroupCode('supersix');

        const fetchPublicMessages = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/getPublicMessages`);
                if (response.data.success) {
                    setPublicMessages(response.data.messages);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Failed to fetch public messages');
            }
        };

        fetchPublicMessages();
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const messageDate = new Date(timestamp);
        
        const isToday = now.toDateString() === messageDate.toDateString();
        const isYesterday = now.getDate() - 1 === messageDate.getDate() &&
                            now.getMonth() === messageDate.getMonth() &&
                            now.getFullYear() === messageDate.getFullYear();

        if (isToday) {
            return `Today at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        if (isYesterday) {
            return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        return `${messageDate.toLocaleDateString()} at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className='chat-container'>
            <Notes />
            <div className='user-list text-white' style={{ backgroundColor: '#001529' }}>
                <div className='p-2 m-2' style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0056b3', borderRadius: '10px' }}>
                    <h4 style={{ fontSize: '25px' }}>
                        <img src={userProfile} alt='UserProfile' style={{ width: '60px', height: '50px' }} />
                        {currentUser}
                    </h4>
                </div>
                
                <ul className="p-3" style={{ listStyle: 'none' }}>
                    <li
                        onClick={handlePublicChatToggle}
                        className={`fs-3 mb-2 user-item ${isPublicChat ? 'active' : ''}`}
                        style={{ borderRadius: '10px', }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-people-fill mx-2 mb-2" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        </svg>
                        Public Chat
                    </li>
                    <div className='px-1' style={{backgroundColor:'rgb(30 55 79 / 95%)',borderRadius: '10px',}}> 
                        <h4 className='p-2'>Private Chat Members</h4>
                    {users.map(user => (
                        <li
                            key={user._id}
                            onClick={() => handleUserChange(user._id, user.name, user.groupCode)}
                            style={{ borderRadius: '10px' }}
                            className={`user-item ${!isPublicChat && activeUser === user._id ? 'active' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill mx-2" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            {user.name}
                            
                        </li>
                    ))}
                    </div>
                </ul>   
            </div>
            <div className='chat-box' style={{ backgroundColor: '#e7eaf6' }}>
                <h2 style={{ fontFamily: 'serif' }}>
                    Chat with {recipientName}
                    {isPublicChat && (
                        <span className='group-code'>
                            (Group Code: {groupCode})
                        </span>
                    )}
                </h2>
                {error && <p>{error}</p>}
                
                <div className='messages'>
                    {(isPublicChat ? publicMessages : messages).map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}
                        >
                            <h3 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                                {msg.sender === currentUser ? 'You' : msg.sender}
                            </h3>
                            <p
                                style={{
                                    marginBottom: '0.5rem',
                                    backgroundColor: msg.sender === currentUser ? '#8dc6ff' : '#f1f0f0',
                                    color: msg.sender === currentUser ? '#352f44' : 'black',
                                    minWidth: '80px',
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    alignSelf: msg.sender === currentUser ? 'flex-end' : 'flex-start',
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                }}
                                className='p-3'
                            >
                                {msg.content}
                            </p>
                            <span className='timestamp' style={{ color: '#5c5470' }}>{formatTimestamp(msg.createdAt)}</span>
                        </div>
                    ))}
                </div>
                <div className='message-input'>
                    <input
                        type='text'
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder='Type a message...'
                    />
                    <button onClick={handleSendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-send m-1" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                        Send
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Chat;
