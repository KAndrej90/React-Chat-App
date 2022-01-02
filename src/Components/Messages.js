import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }



  renderMessage(message) {
    const {member, text, id} = message;
    console.log(message);
    const {currentMember} = this.props;
    const messageFromMe = id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className} key={id}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}


  // renderMessage(message) {
  //   const {member, text, id} = message;
  //   return (
  //     <li key={id}>
  //       {console.log(id)}
  //       <div className="Message-content">
  //         <div className="text">{text}</div>
  //       </div>
  //     </li>
  //   );
  // }


export default Messages;