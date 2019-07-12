import React from 'react';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
    return (
        <div>
            <h1 id="home-page-title">Welcome to Pet Home</h1>
            <Login />
            <Register />
        </div>
    );
}

export default App;
