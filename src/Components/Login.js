import React from "react";
import { useState } from 'react';

export default function Login({onSetUsername}) {
const [username, setUsername] = useState('');

const enterUsername =(e)=>{
    const newUsername = e.target.value;
    setUsername(newUsername.trimStart());
    console.log(username);
}

const handleSubmiter =(e)=>{
    e.preventDefault();
    onSetUsername(username);
    setUsername('');

}

return (
    <div className="loginCard">
        <form onSubmit={handleSubmiter}>
          <label htmlFor='username'> Username: </label>
          <input
            name="username"
            className="loginInput"
            value={username}
            onChange={enterUsername}
            type='text'
            placeholder='"Enter Username"'
            autoFocus={true}
            autoComplete="off"
            />
         <button className='loginBtn' disabled={username ===''} type="submit" onSubmit={handleSubmiter}>Enter Chat</button>        
        </form>
    </div>
);
}
