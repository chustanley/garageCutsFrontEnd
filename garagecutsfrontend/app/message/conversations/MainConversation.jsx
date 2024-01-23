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
      <div className="h-screen items-center">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <div className="h-[80%] sm:h-max bg-gray-300 mt-[5%] min-w-[60%] max-w-[90%] rounded-xl p-5">
            {user?.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2" ? (
              <h1>Stanley Chu</h1>
            ) : (
              <h1>{currentConversation?.members[2]}</h1>
            )}

            {/* <h1
              onClick={() => {
                setShowMessage(false);
                setMessages([]);
              }}
            >
              GO BACK
            </h1> */}
            {/* messages transaction */}
            <div className=" bg-white h-[80%] my-5 p-5 overflow-y-scroll rounded-xl">
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
            <div className="flex justify-between">
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
