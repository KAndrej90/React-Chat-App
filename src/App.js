import './App.css';
import { useState } from 'react';

export default function App() {

const [member,setMember]= useState({username:'Andrej'});

const drone = new window.Scaledrone('WL753f2kafQVXuG2',{data: member});
drone.on('error', error => console.error(error));

const room = drone.subscribe('observable-MyAppFinal');
room.on('message', function(message) {
console.log(drone);
// provjeri da li sam ja poslao ovu poruku
  if(message.clientId === drone.clientId){
    console.log('poruka od mene')
    console.log(message.data)
  } else {
    const sender = message.member;
    console.log(message)
    console.log(sender.clientData.username)
    console.log(message.data)
  }
});

drone.on('open', function(error) {
  if (error) {
    return console.error(error);
  }
  console.log('spojeno ' + drone.clientId);

});

const sendMsg=()=>{
  drone.publish({
    room: 'observable-MyAppFinal',
    message: 'world'
  });
}

  return (
    <div >
      <button onClick={sendMsg}>klik</button>

      <p></p>
    </div>
  );
}


