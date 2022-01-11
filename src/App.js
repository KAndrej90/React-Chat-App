import React, {useState } from 'react';
import './App.css';
import Input from './Components/Input';
import Messages from './Components/Messages';
import Login from './Components/Login';

let drone='';
let addedMember={};
const randomColor= () => {
return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  };

export default function App() {
  
  const [myId,setMyId]= useState([]);  
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isActiveChat, setIsActiveChat] = useState (false);
  
  const setUsername =(newUsername)=>{
    addedMember={username:newUsername, color:randomColor()}
    setIsActiveChat(true);
    
    drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: addedMember});
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      };
      let copyMyId = myId;
        copyMyId.id = drone.clientId;
        setMyId(copyMyId);
    });

    const room = drone.subscribe('observable-MyAppFinal');
    
    room.on('message', message => {
      const {data, id, member} = message;
      if(member===null){
        console.log('no member')
      } else {
        let msgs = messages;
        msgs.push({member: member, text: data, id:id});
        let newMsgs = [...msgs];
        setMessages(newMsgs)
        };
    });
 }
    
  const sendMessage=(txt)=>{
    drone.publish({
    room: 'observable-MyAppFinal',
    message: txt
    })
  };
      
  return (
      <div className={isDarkMode ? 'App-dark' : 'App'}>
        <div className={isDarkMode ? 'App-header-dark' : 'App-header'}>
          <h1>Have a Nice Chat...</h1>
          <button className='btns' onClick={()=>setIsDarkMode(!isDarkMode)}>{isDarkMode ? 'Light Theme' :'Dark Theme'}</button>
        </div>
        {isActiveChat&& <Messages messages = {messages} currentId ={myId}/>}
        {isActiveChat&& <Input onSendMessage={sendMessage}/>}
        {!isActiveChat && <Login onSetUsername={setUsername}/>}
     </div>
  );
}


