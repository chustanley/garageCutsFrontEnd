"use client";
import React from "react";
import Navbar from "../../components/Navbar";

import Protected from "../../components/Protected";

//Importing the useContext FUNCTION so we can get the values accessible.
import { UserAuth } from "../../components/context/AuthContext.js";

const Account = () => {
  const { user } = UserAuth();

  console.log(user?.displayName);
  return (
    <>
      <Protected>
        <Navbar />
        <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
          <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
            <h1>Welcome, {user?.displayName}</h1>
          </div>
        </div>
      </Protected>
    </>
  );
};

export default Account;
