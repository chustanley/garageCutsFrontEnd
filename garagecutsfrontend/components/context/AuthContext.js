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

  console.log("auth", auth.currentUser?.displayName);
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    console.log("test");
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
        router.push("/account");
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, loginAccount, setUser }}
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
