import './App.css';
import { useState } from 'react';
import Input from './Components/Input';



export default function App() {

const [member,setMember]= useState({username:'Andrej', 
                                    color:'blue'});
const [messages, setMessages] = useState([]);

const drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: member});
drone.on('error', error => console.error(error));

const room = drone.subscribe('observable-MyAppFinal');
room.on('message', (message) => {
  const {data, clientId, member} = message;



  // const sms = messages;
  // sms.push(data);
  // setMessages(sms);

  // const newMessage = [messages, data];
  // setMessages(newMessage);
  // console.log(messages);

  // provjeri da li sam ja poslao ovu poruku
    if(clientId === drone.clientId){
      console.log('poruka od mene')
      console.log(data)
    } else {
      
      console.log(member)
      console.log(member.clientData.username)
      console.log(data)
    }
});

drone.on('open', (error) => {
  if (error) {
    return console.error(error);
  };
  console.log('spojeno ' + drone.clientId);
});

const sendMessage=(message)=>{
  drone.publish({
    room: 'observable-MyAppFinal',
    message: message
  });
};

  return (
    <div >
      {messages.map(m => <div>{m}</div>)}

      <Input onSendMessage={sendMessage}/>
     </div>
  );
}


