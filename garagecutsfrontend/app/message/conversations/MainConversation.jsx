import React, { useState, useEffect, useRef } from "react";

import Message from "../message/Message";

const MainConversation = ({
  currentConversation,
  messages,
  setShowMessage,
  setNewMessage,
  newMessage,
  handleSubmit,
  user,
  setMessages,
}) => {
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollRef = useRef();

  return (
    <>
      <div className="h-screen">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <div className="h-[80%] bg-gray-300 mt-[5%] min-w-[60%] max-w-[90%] rounded-xl p-5">
            <div className="relative flex justify-between h-[5%]">
              <h1
                onClick={() => {
                  setShowMessage(false);
                  setMessages([]);
                }}
              >
                GO BACK
              </h1>

              {user?.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2" ? (
                <h1>Stanley Chu</h1>
              ) : (
                <div className="absolute w-full h-full flex flex-col justify-end items-center">
                  <img
                    className="rounded-full w- h-5"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                  <h1>{currentConversation?.members[2]}</h1>
                </div>
              )}
            </div>

            {/* messages transaction */}
            <div className=" bg-white h-[80%] mt-2 mb-5 p-5 overflow-y-scroll rounded-xl">
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
            <div className="flex justify-between h-[7%]">
              <textarea
                className="rounded-lg w-full mr-5"
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                value={newMessage}
              ></textarea>

              <button
                className=" text-xs md:text-lg py-2 px-3 bg-white rounded-md"
                onClick={handleSubmit}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainConversation;
