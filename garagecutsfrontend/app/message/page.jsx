"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Message from "./message/Message";
import Conversation from "./conversations/Conversation";

import { UserAuth } from "../../components/context/AuthContext.js";
const axios = require("axios");

import { io } from "socket.io-client";

const Messaging = () => {
  const { conversation, setConversation, user } = UserAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentConversation, setCurrentConversation] = useState(null);
  const scrollRef = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();

  console.log(conversation);

  console.log(currentConversation);
  console.log(user?.uid);

  useEffect(() => {
    console.log("arrival message", arrivalMessage);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    //THIS IS SETTING UP AN EVENT LISTENER? I DONT THINK IT TRIGGERS ON FIRST RENDER UNTIL A MESSAGE IS SENT
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  /*
When someone logs in that isnt stanley chu. assign the current convo to that.
*/

  useEffect(() => {
    socket.current.emit("addUser", user?.uid);
    socket.current.on("getUsers", (users) => {
      console.log("users array", users);
    });
  }, [user]);

  //WHEN CURRENT CONVERSATION CHANGES... WE WILL REQUEST FOR NEW MESSAGES WITH THAT CONVERSATION ID AND REASSIGN THE MESSAGES
  useEffect(() => {
    console.log(conversation);
    console.log(currentConversation);

    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://3.144.250.206:8800/api/messages/" + currentConversation._id,
        );
        console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentConversation, conversation]);

  //ON LOAD, WE SET THE CURRENT CONVO TO THE FIRST ONE ON THE LIST AT ALL TIMES..
  useEffect(() => {
    console.log(user?.uid);
    console.log(conversation);

    if (user?.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2") {
      console.log(conversation[0]);
      setCurrentConversation(conversation[0]);
    }
  }, [conversation, user?.uid]);

  //Smooth scrolling
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    console.log(currentConversation);

    e.preventDefault(); // prevent rerender of page!
    const message = {
      sender: user?.uid,
      text: newMessage,
      conversationId: currentConversation?._id,
    };

    const recieverId = currentConversation.members.find((member) => {
      return member !== user.uid;
    });

    console.log("troll", recieverId);

    //Sending to the server, the tag, the senderID (your id), the recieverID(the other person), and the message
    socket.current.emit("sendMessage", {
      senderId: user.uid,
      recieverId: recieverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://3.144.250.206:8800/api/messages",
        message,
      );
      console.log("new message", res.data);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {user?.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2" ? (
        <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
          <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
            <div className="h-[70%] bg-gray-300 mt-[5%] w-[60%] rounded-xl p-5">
              <h1>TALKING TO STANLEY</h1>
              {/* messages transaction */}
              <div className="bg-white h-[70%] my-10 p-5 overflow-y-scroll rounded-xl">
                {messages.map((m) => {
                  console.log(m);
                  return (
                    <div ref={scrollRef} key={m.created}>
                      <Message message={m} own={m.sender === user?.uid} />
                    </div>
                  );
                })}
              </div>
              {/* SEND THE MESSAGE */}
              <div className="">
                <textarea
                  className="w-[50%]"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                ></textarea>
                <button
                  className="px-3 bg-white rounded-md"
                  onClick={handleSubmit}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
          <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
            <div>
              {conversation.map((c) => {
                //FOR each conversaion related to one user, we will pass the currentUser to it and also the conversation data for EACH conversation.
                //When any of them are clicked, we update the currentChat with the value inside of conversations
                //Upon click, currentChat will be updated with a new message:[user1, you]

                console.log(c);

                return (
                  <div
                    key={1}
                    onClick={() => {
                      setCurrentConversation(c);
                    }}
                  >
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                );
              })}
            </div>
            <>
              {currentConversation ? (
                <div className="h-[70%] bg-gray-300 mt-[5%] w-[60%] rounded-xl p-5">
                  <h1>{currentConversation?.members[2]}</h1>
                  {/* messages transaction */}
                  <div className="bg-white h-[70%] my-10 p-5 overflow-y-scroll rounded-xl">
                    {messages.map((m) => {
                      return (
                        <div ref={scrollRef} key={1}>
                          <Message message={m} own={m.sender === user?.uid} />
                        </div>
                      );
                    })}
                  </div>
                  {/* SEND THE MESSAGE */}
                  <div className="">
                    <textarea
                      className="w-[50%]"
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      value={newMessage}
                    ></textarea>
                    <button
                      className="px-3 bg-white rounded-md"
                      onClick={handleSubmit}
                    >
                      send
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1>please select convo</h1>
                </>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Messaging;
