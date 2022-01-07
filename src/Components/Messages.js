import {Component} from "react";
import React from "react";

export default class Messages extends Component {
  render() {
    const {messages} = this.props;
    // const {membersOnline} = this.props;
    // console.log(membersOnline);
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text, id} = message;
    const {currentId} = this.props;
    const messageFromMe = member.id === currentId.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className} key={id}>
      <span 
        className="avatar"
        style={{backgroundColor: member.clientData.color}}>
          <div className="username">
            {member.clientData.username}
          </div>
      </span>
        <div className="Message-content">
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}