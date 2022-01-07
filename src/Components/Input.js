import React from "react";
import { useState } from 'react';

export default function Input({onSendMessage}) {
const [text, setText] = useState('');

const changeText =(e)=>{
    const chatText = e.target.value;
    setText(chatText.trimStart());
}

const handleSubmit =(e)=>{
    e.preventDefault();
    onSendMessage(text);
    setText('');
}

return (
    <div>
        <form onSubmit={handleSubmit} className="formChat">
            <input 
            className='inputChat'
            onChange={changeText}
            value={text}
            type='text'
            placeholder='"Lets talk"'
            autoFocus={true}
            
             ></input> 
        </form>
    </div>
);
}
