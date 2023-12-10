"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";

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
      <Navbar />
      <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
        <div className="max-w-[1240px] w-full h-full flex mx-auto justify-center items-center">
          <Image
            src="/hamster-loader.gif"
            alt="My Image"
            width={300}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default Load;
