import React, {useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input';
import Messages from './Components/Messages';
import { randomColor, randomName } from './Components/dataNameAndColor'; 


// let drone ={}
// let helpMessages = [];
const member = {username:randomName(), color:randomColor()}
const drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: member});
const room = drone.subscribe('observable-MyAppFinal');
console.log(drone)
export default function App() {
  
  const [myId,setMyId]= useState([]);  
  const [messages, setMessages] = useState([]);
  // const [lastMessage, setLastMessage] = useState('');
  
  
  useEffect(()=> {
    
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      };
        let ada = myId;
        ada.id = drone.clientId;
        setMyId(ada);
        console.log(myId);
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
        const {data, id, member} = message;
        console.log(message);
        if(member===null){
          console.log('no member')
          console.log(message)
        } else { let msgs = messages;
          msgs.push({member: member, text: data, id:id});
          let newMsgs = [...msgs];
          setMessages(newMsgs);}
          // setallMembers(allMembers.push(clientId))
          // console.log(clientId);
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
      <Messages messages = {messages} currentId ={myId}/>
      <Input onSendMessage={sendMessage}/>
     </div>
  );
}


