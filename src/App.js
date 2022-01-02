import React, {useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input';
import Messages from './Components/Messages';
import { randomColor, randomName } from './Components/dataNameAndColor'; 


// let drone ={}
// let helpMessages = [];
 
export default function App() {
  
  const [member,setMember]= useState({username:randomName(), color:randomColor()}
      );  
   const [messages, setMessages] = useState([]);
      // const [lastMessage, setLastMessage] = useState('');

  const drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: member});
  const room = drone.subscribe('observable-MyAppFinal');

useEffect(()=> {
    drone.on('open', error => {
    if (error) {
      return console.error(error);
    };
    console.log('spojeno ' + drone.clientId);
  });
  

  // room.on('data', (text, memb) => {
  //   // console.log("receiving data");
  //   console.log(text);
  //   console.log(memb);
  //   // const newMessages = [...messages];
  //   const newMessages = [...helpMessages];
  //   newMessages.push({member: memb, txt: text}); //here is defined object structure for one message
  //   helpMessages = [...newMessages];
  //   setMessages(newMessages);
  // });

  room.on('message', message => {
    const {data, clientId, member} = message;
    console.log(data);
    console.log(messages);

    let msgs = messages;
    msgs.push({member: member, text: data, id:clientId});
    let newMsgs = [...msgs];
    setMessages(newMsgs);
    console.log(messages);
    // const newMessage = [...messages, data];
    // setMessages(newMessage);
    // console.log(messages);
  });
}, []);

        
const sendMessage=(txt)=>{
  drone.publish({
  room: 'observable-MyAppFinal',
  message: txt
  })
};


  return (
    <div className='App'>
      <div className='App-header'>
        <h1>My Chat App</h1>
      </div>
      <Messages messages = {messages} currentMember={member}/>
      <Input onSendMessage={sendMessage}/>
     </div>
  );
}


