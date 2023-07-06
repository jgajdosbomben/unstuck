import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


import { createClient } from "@supabase/supabase-js";

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const AuthProvider = (props) => {
  const { children } = props;
  console.log("props =", props);

  const auth = supabase.auth;
  console.log("auth", auth);

  const signInPassword = async (email, password) => {
    try {
      let creds = await auth.signInWithPassword(email, password);
      console.log("creds1", creds);
      if (creds) {
        console.log("Logged in,", creds.data.user, creds.user);
      } else {
        console.log("Login failed");
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };

  const logOut = async () => {
    await auth.signOut();
    // router.push("/");
  };

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     console.log("onAuthStateChanged() - new User!!", user);
  //     setUser(user);
  //   });
  //   return unsub; // to shut down onAuthStateChanged listener
  // }, [auth]);

  const userLocal = async () => {
    try {
      const sessionDataKey = localStorage.key(0);
      const sessionData = localStorage.getItem(sessionDataKey); //get user data from local storage (if available)
      const sessionDataParsed = await JSON.parse(sessionData);
      let userId = await sessionDataParsed.user.id;
      console.log("userId", userId);
      if (userId) {
        console.log("Logged in,", userId);
        return userId;
      } else {
        console.log("Login failed");
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };

  
  const userSupa = async () => {

    const { data: { user } } = await supabase.auth.getUser()
    console.log("user Supa Data", data)
    return { data: {user} }
  }


  const signUp = async (email, password) => {
    try {
      console.log("we called signUp successfully");
      let { data, error } = await auth.signUp(email, password);
      if (error) {
        console.log("Sign up failed. Error: \n", error);
        return { data, error };
      }
      if (data) {
        console.log("Signed up successfully", data);
        return { data, error };
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };

  // const currentSession = auth.getSession();
  // const currentUser = autnpmh.getUser();
  // const signInMagic = auth.signInWithOtp;
  // const signInSSO = auth.signInWithSSO;
  // const signInToken = auth.signInWithIdToken;
  // const signInOAuth = auth.signInWithOAuth;

  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  const values = { signUp, userSupa, userLocal, signInPassword, logOut };
  console.log("values:", values);
  return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
};

export default AuthProvider;
