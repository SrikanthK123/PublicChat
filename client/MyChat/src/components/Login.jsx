import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BG from '../assets/Images/BG2.gif';

const Login = () => {
    const [username, setUsername] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const url = isExistingUser 
                ? `${backendUrl}/api/checkUser` 
                : `${backendUrl}/api/createUser`;  

            const data = isExistingUser 
                ? { name: username, groupCode } 
                : { name: username, MessageChat: [], groupCode: generateRandomGroupCode() };

            const response = await axios.post(url, data);

            if (response.data.success) {
                localStorage.setItem('username', username);
                navigate('/chat');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            if (!err.response) {
                setError('Network Error');
            } else if (err.response.status === 404) {
                setError('404 - Not Found');
            } else {
                setError(`Error: ${err.message}`);
            }
            console.log("Error is ", err);
        }
    };

    const generateRandomGroupCode = () => {
        // Generate a random group code
        return Math.random().toString(36).substring(2, 7).toUpperCase();
    };

    return (
        <div className='login-container'>
            <div className='p-4' style={{ background: 'rgba(152, 188, 224, 0.12)', borderRadius: '15px' }}>
                <h2 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white' }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your username'
                            required
                        />
                    </div>
                    {isExistingUser && (
                        <div>
                            <input
                                type='text'
                                id='groupCode'
                                value={groupCode}
                                onChange={(e) => setGroupCode(e.target.value)}
                                placeholder='Enter group code'
                                required
                            />
                        </div>
                    )}
                    <button type='submit'>{isExistingUser ? 'Login' : 'Create Account'}</button>
                    <button type='button' onClick={() => setIsExistingUser(!isExistingUser)}>
                        {isExistingUser ? 'Create New Account' : 'Existing User'}
                    </button>
                </form>
                {error && <p className='error'>{error}</p>}
            </div>
          
        </div>
    );
};

export default Login;
