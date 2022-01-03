import React from "react";
import { useState } from 'react';

export default function Input({onSendMessage}) {
const [text, setText] = useState('');

const changeText =(e)=>{
    const askd = e.target.value;
    setText(askd.trimStart());
}

const handleSubmit =(e)=>{
    e.preventDefault();
    onSendMessage(text);
    setText('');

}

return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
            className='input'
            onChange={changeText}
            value={text}
            type='text'
            placeholder='Enter message here'
             >
            </input>
        </form>
    </>
);
}
