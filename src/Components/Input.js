import React from "react";
import { useState } from 'react';

export default function Input({onSendMessage}) {
const [text, setText] = useState('');

const changeText =(e)=>{
    setText(e.target.value);
}

const handleSubmit =(e)=>{
    e.preventDefault();
    setText('');
    onSendMessage(text);
    
}

return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
            onChange={changeText}
            value={text}
            type="text"
            placeholder="Enter message here"
            autoFocus={true}>
            </input>
        </form>
    </>
);
}
