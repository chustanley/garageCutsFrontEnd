"use client";
import React, { useState, useEffect } from "react";

//Importing the useContext FUNCTION so we can get the values accessible.
import { UserAuth } from "../../components/context/AuthContext.js";

import { useRouter } from "next/navigation";

const Load = () => {
  const { user } = UserAuth();

  const router = useRouter();

  useEffect(() => {
    if (user?.displayName !== undefined) router.push("/account");
  });

  console.log(user?.displayName);
  return (
    <>
      <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <h1>LOADING . . .</h1>
        </div>
      </div>
    </>
  );
};

export default Load;
