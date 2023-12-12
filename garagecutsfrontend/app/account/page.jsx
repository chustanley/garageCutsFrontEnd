"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";

import Protected from "../../components/Protected";

//Importing the useContext FUNCTION so we can get the values accessible.
import { UserAuth } from "../../components/context/AuthContext.js";
import { useRouter } from "next/navigation";

const Account = () => {
  const { user } = UserAuth();
  const router = useRouter();

  console.log(user);
  return (
    <>
      <Protected>
        <Navbar />
        <div className="md:w-full md:h-screen md:items-center md:mt-0 md:mb-0  mt-40 mb-20">
          <div className="max-w-[1240px] w-full h-full flex flex-col mx-auto justify-center items-center p-5">
            <div className="flex flex-row items-center my-10">
              <Image
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="profile_picture"
                width={200}
                height={200}
                className="rounded-full"
              ></Image>
              <h1 className="font-bold text-5xl mx-10">
                Welcome, {user?.displayName}
              </h1>
            </div>
            <div className="w-full md:flex md:flex-row md:space-x-5 space-y-5 md:space-y-0">
              <div className="md:w-[40%] p-5 bg-slate-200 rounded-lg">
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold text-xl">PROFILE</h1>
                  <h1 className="font-bold text-md">EDIT</h1>
                </div>
                <div>
                  <ul className="p-5 space-y-3">
                    <li>
                      <div className="font-bold text-md">Name</div>
                      <div>{user?.displayName}</div>
                    </li>
                    <li>
                      <div className="font-bold text-md">Email</div>
                      <div>{user?.email}</div>
                    </li>
                    <li>
                      <div className="font-bold text-md">Phone Number</div>
                      <div>
                        {user?.phonenumber ? user?.phonenumber : "\u00A0"}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:w-[60%] p-5 bg-slate-200 rounded-lg md:relative space-y-5">
                <h1 className="text-3xl font-bold">
                  YOU CURRENTLY HAVE NO APPOINTMENTS BOOKED.
                </h1>
                <div className="flex justify-center">
                  <button
                    className="p-5 md:absolute md:bottom-5 md:right-5 rounded-lg bg-yellow-400 text-white font-bold"
                    onClick={() => {
                      alert("HAAA this dont work right now player");
                    }}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Protected>
    </>
  );
};

export default Account;
