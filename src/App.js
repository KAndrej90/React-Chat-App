import React, {useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input';
import Messages from './Components/Messages';
import { randomColor, randomName } from './Components/DataNameAndColor'; 


let copyMembersOnline =[];
const member = {username:randomName(), color:randomColor()};
const drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: member});
const room = drone.subscribe('observable-MyAppFinal');
console.log(drone)
export default function App() {
  
  const [myId,setMyId]= useState([]);  
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [membersOnline, setMembersOnline] = useState ([]);
 
  
  
  useEffect(()=> {
    
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      };
        let copyMyId = myId;
        copyMyId.id = drone.clientId;
        setMyId(copyMyId);
        console.log(myId);
    });
    
    room.on('members', m => {
      // const {clientData} = m;
      // console.log(m);
      // console.log(clientData);
      let memberOnline = m;
      copyMembersOnline = [...memberOnline];
      setMembersOnline (copyMembersOnline);
      console.log(membersOnline);
    });

      room.on('message', message => {
        const {data, id, member} = message;
        console.log(message);
        if(member===null){
          console.log('no member')
          console.log(message)
        } else { let msgs = messages;
          msgs.push({member: member, text: data, id:id});
          let newMsgs = [...msgs];
          setMessages(newMsgs)};
        });
        
      }, []);   
      
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
          <button className='btns' onClick={()=>setIsDarkMode(!isDarkMode)}>Dark Mode</button>
        </div>
        <Messages messages = {messages} currentId ={myId} membersOnline={membersOnline}/>
        <Input onSendMessage={sendMessage}/>
     </div>
  );
}


