"use client";
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";

const axios = require("axios");

import { auth } from "./firebase.js";

import { useRouter } from "next/navigation";

//Creating a context object that acts like a 'store' where data can be stored and accessed by components within its tree
const AuthContext = createContext();

//Create component that has functions, use state, use effect and etc.
//These functions, states and effects can then be passed into the...

/*
  CreatedContext created above's.provider's value section below and can then have a
  children object


  What we will do after is export this component and wrap it at the root so the whole project has access!
*/
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    // Initiate the Google sign-in redirect
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
    setUser(null);
  };

  const loginAccount = (loginUser, loginPassword) => {
    signInWithEmailAndPassword(auth, loginUser, loginPassword)
      .then((data) => {
        if (!data) {
          throw data;
        }
        console.log("LOGIN ACCOUNT SUCCESS", data);
      })
      .catch((err) => {
        console.log("LOGINACCOUNT FAIL", err);
      });
  };

  /*
  onAuthStateChanged is an event listener and when this page mounts, use effect sets up the
  event listener so its focused on the AuthStateChange. When the component unmounts, or the dependency change
   in this case no dependency.
   The clean up function is then executed
  */

  //This prevents duplication.
  const firstConversation = async (currentUser) => {
    try {
      const conversation = await axios.get(
        `http://3.144.250.206:8800/api/conversations/${currentUser?.uid}`,
      );

      if (conversation.data.length === 0) {
        console.log("hi", currentUser.displayName);
        const createConversation = await axios.post(
          `http://3.144.250.206:8800/api/conversations/`,
          {
            senderId: currentUser.uid,
            recieverId: "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2",
            senderName: currentUser.displayName,
          },
        );

        console.log(createConversation);
        setConversation([createConversation.data]);
      } else {
        throw conversation.data;
      }
    } catch (err) {
      //If conversation exist, here is the convoID that is related to the 2 users.

      const totalConversations = err;

      setConversation(totalConversations);
    }
  };

  /*
  Display name shown only when logged in with google or from main page / not account creation.
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log(currentUser?.displayName);
      /* This will get called when account created, login and google login..  */

      console.log(currentUser.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2");

      if (
        currentUser?.displayName !== null &&
        currentUser?.displayName !== undefined
      ) {
        console.log("we got here");
        console.log(currentUser);
        console.log(currentUser?.uid);
        if (
          currentUser !== null &&
          currentUser.uid !== "JGWXQ59ZU0Qtm3F8bpSnomOvTWr2"
        ) {
          console.log("not stanley");
          firstConversation(currentUser);
        } else {
          axios
            .get(
              `http://3.144.250.206:8800/api/conversations/${currentUser?.uid}`,
            )
            .then((data) => {
              if (!data) throw data;
              setConversation(data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        loginAccount,
        setUser,
        conversation,
        setConversation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// After you export the component above and wrap it on the root,
// You can now export this and call it so that you have access to all of its values!
// values as in the ones states above in the component as prop.
export const UserAuth = () => {
  return useContext(AuthContext);
};
