import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        alt=""
      />
      <span className="conversationName">{conversation.members[2]}</span>
    </div>
  );
};

export default Conversation;
