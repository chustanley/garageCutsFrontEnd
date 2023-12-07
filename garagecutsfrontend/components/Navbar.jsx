"use client";
import React, { useState } from "react";
import Link from "next/link";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "./context/AuthContext";

const Navbar = () => {
  //Turns on and off side navbar
  const [nav, setNav] = useState(false);

  //Handles the changes on side nav bar
  const handleNav = () => {
    setNav(!nav);
  };

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full h-20 shadow-xl top-0 z-[100]">
      {/* Container to justify between the logo and the option UL */}
      <div className="flex justify-between bg-gray-200 items-center w-full h-full px-2 2xl:px-16">
        {/* Title banner */}
        <h1 className="text-center text-2xl font-bold">
          <Link href="/">garageCuts</Link>
        </h1>

        {/* Navigator options | Adding flex to UL will turn its LI directed as a row instead of column */}
        {/* Tailwind is mobile first so in MOBILE, this will be hidden and anything ABOVE medium will be flex */}
        <ul className="hidden md:flex">
          <Link href="/">
            <li className="ml-10 text-sm uppercase hover:border-b">home</li>
          </Link>
          <Link href="/about">
            <li className="ml-10 text-sm uppercase hover:border-b">about</li>
          </Link>
          {user !== null ? (
            <Link href="/message">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Messaging
              </li>
            </Link>
          ) : (
            <></>
          )}
          {user !== null ? (
            <Link href="/account">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Account
              </li>
            </Link>
          ) : (
            <></>
          )}
          {user !== null ? (
            <li
              onClick={() => {
                handleSignOut();
              }}
              className="ml-10 text-sm uppercase hover:border-b"
            >
              Sign Out
            </li>
          ) : (
            <Link href="/login">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Sign In
              </li>
            </Link>
          )}
        </ul>
        {/* Anything above MEDIUM screen will be hidden. Above, anything above medium will be flex / showing */}
        <div
          className="md:hidden"
          onClick={() => {
            handleNav();
          }}
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>
      {/*
      OVERALL POP UP
      - This will conditionally show when nav is true or false upon click. The state is initially false so that it will NOT show. But it can ONLY show IF the hamberger menu is SHOWN and ACTIVATED upon click
      - Once open, it can close because of the x button.
      - Checkout css for darkness below and actual popup.
      */}
      {/* right side darkness */}
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        {/*
        GENERAL WHITE POP-UP
        - When nav is true, it will show and have a general width of 75% below small. 60% above small, and 45% above medium. Easing throughout each change at a duration of 500
        - When nav is false, we moving it 100% negative to the left, hiding it and allowing an ease into it with a duration of 500
        */}
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 h-screen ease-in duration-500"
          }
        >
          <div className="flex justify-between items-center">
            <div>GarageCuts</div>
            <div
              onClick={() => {
                handleNav();
              }}
            >
              {" "}
              <AiOutlineClose />
            </div>
          </div>
          <div className="mt-20">
            <ul className="uppercase">
              <Link
                href="/"
                onClick={() => {
                  handleNav();
                }}
              >
                <li className="py-4 text-sm"> Home</li>
              </Link>
              <Link
                href="/about"
                onClick={() => {
                  handleNav();
                }}
              >
                <li className="py-4 text-sm"> About</li>
              </Link>
              {user !== null ? (
                <Link
                  href="/account"
                  onClick={() => {
                    handleNav();
                  }}
                >
                  <li className="py-4 text-sm"> Account</li>
                </Link>
              ) : (
                <></>
              )}

              {user !== null ? (
                <Link
                  href="/message"
                  onClick={() => {
                    handleNav();
                  }}
                >
                  <li className="py-4 text-sm">Messaging</li>
                </Link>
              ) : (
                <></>
              )}
              {user !== null ? (
                <li
                  onClick={() => {
                    handleSignOut();
                    handleNav();
                  }}
                  className="py-4 text-sm"
                >
                  Sign Out
                </li>
              ) : (
                <Link
                  href="/login"
                  onClick={() => {
                    handleNav();
                  }}
                >
                  <li className="py-4 text-sm">Sign In</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
