import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

//Importing the useContext FUNCTION so we can get the values accessible.
import { UserAuth } from "../components/context/AuthContext.js";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return;
  }

  return children;
};

export default Protected;
