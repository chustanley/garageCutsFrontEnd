"use client";

import React, { useState } from "react";
import { auth } from "../../components/context/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAuth } from "../../components/context/AuthContext.js";
import { useRouter } from "next/navigation";

const Signup = (props) => {
  const { googleSignIn, loginAccount, user, logOut } = UserAuth();

  //SIGNUP PAGE STYLE RENDERING
  const [wrongPassword, setWrongPassword] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  //SIGNUP STATE RENDERING

  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  //FIREBASE AUTH EMAIL ERROR
  const [firebaseError, setFirebaseError] = useState(false);

  //SIGN UP FUNCTION
  const checkCredentials = () => {
    console.log("CHECKING CREDENTIALS...", auth);

    console.log(
      firstPassword,
      secondPassword,
      firstName,
      lastName,
      phoneNumber,
      email,
    );

    //Reset the error status incase one of them was on before
    setMissingPassword(false);
    setWrongPassword(false);

    //If user is already in database, warn user to create different username
    if (firstPassword.length === 0 || secondPassword.length === 0) {
      setMissingPassword(true);
      return;
    }
    setMissingPassword(false);

    //If passwords dont match, warn user to check if passwords match
    if (firstPassword !== secondPassword) {
      setWrongPassword(true);
      return;
    }
    setWrongPassword(false);

    //If successful, it will trigger the onAuthStateChanged listener inside of AuthContext useEffect
    //That will then change the state of user which inside of login, will redirect into account.
    createUserWithEmailAndPassword(auth, email, firstPassword)
      .then((userCredentials) => {
        if (!userCredentials) {
          throw userCredentials;
        }
        //Firebase automatically authenticates user.
        logOut();

        setFirebaseError(false);
        console.log("FIREBASE SUCCESS!!!", auth);

        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
          phoneNumber: "4159879583",
        });
        props.setSignUp(false);
      })
      .catch((err) => {
        setFirebaseError(true);
        console.log("FIREBASE ERROR!!!!", err);
      });
  };

  return (
    <div className="md:w-full md:min-h-screen md:items-center md:flex md:mt-0 md:mb-0 mt-40">
      <div className="w-full h-full mx-auto flex justify-center items-center">
        {/* LOGIN BOX  */}
        <div className="shadow-xl shadow-gray-400 rounded-xl p-5 w-full h-[60%] bg-gray-200 max-w-[500px] m-5">
          <h1>Garage Cuts</h1>
          <div className="my-5 h-[80%] rounded-lg bg-slate-300 p-5 justify-center items-center">
            {/* name and email  find out what breaks it*/}
            <form id="formOne" className="sm:grid grid-cols-2 gap-4 py-2">
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">First Name</label>
                <input
                  id="name"
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">Last Name</label>
                <input
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">Phone Number</label>
                <input
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase text-sm py-2">Email</label>
                <input
                  className="border-2 rounded-lg p-3 flex border-gray-300"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </form>

            <form id="formTwo" className="w-full">
              <div className="mt-10">
                <div className="flex flex-col">
                  <label className="uppercase text-sm py-2">Password</label>
                  <input
                    id="createPass1"
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    value={firstPassword}
                    onChange={(e) => {
                      setFirstPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="uppercase text-sm py-2">
                    {" "}
                    re-enter Password
                  </label>
                  <input
                    id="createPass2"
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    value={secondPassword}
                    onChange={(e) => {
                      setSecondPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <div>
                  {missingPassword ? (
                    <div className="justify-center items-center flex text-xs my-3 text-red-600">
                      Please fill out all of the information
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div>
                  {wrongPassword ? (
                    <div className="justify-center items-center flex text-xs my-3 text-red-600">
                      Please make sure both passwords match
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {firebaseError ? (
                    <div className="justify-center items-center flex text-xs my-3 text-red-600">
                      Email already in use, Please try a new email
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-3">
                {/* type = button stops the refresh  */}
                <button
                  type="button"
                  className="px-5 py-2 mt-7 bg-slate-500 rounded-lg hover:bg-gradient-to-r from-[#ffb115] to-[#f6dc30] "
                  onClick={() => {
                    checkCredentials();
                  }}
                >
                  <h4 className="uppercase text-sm text-white">sign up</h4>
                </button>
              </div>
            </form>
          </div>
          <div>
            <h4 className="text-xs">
              Already have an account?{" "}
              <div
                className="text-blue-600 inline-block text-xs"
                onClick={() => {
                  props.setSignUp(false);
                  setWrongPassword(false);
                  setMissingPassword(false);
                }}
              >
                Sign in
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
