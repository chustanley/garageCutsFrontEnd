"use client";
import { useContext, createContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

//Creating a context object that acts like a 'store' where data can be stored and accessed by components within its tree
const LoadingContext = createContext();

//Create component that has functions, use state, use effect and etc.
//These functions, states and effects can then be passed into the...

/*
  CreatedContext created above's.provider's value section below and can then have a
  children object


  What we will do after is export this component and wrap it at the root so the whole project has access!
*/
export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// After you export the component above and wrap it on the root,
// You can now export this and call it so that you have access to all of its values!
// values as in the ones states above in the component as prop.
export const LoadingSetter = () => {
  return useContext(LoadingContext);
};
