import React, { Component } from 'react';
// import "./Message.css";

class Message extends Component {
    render() {
        return (
            <li>
                {this.props.user} - {this.props.msg}
            </li>
        );
    }
}

export default Message;