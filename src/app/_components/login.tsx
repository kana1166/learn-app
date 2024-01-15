"use client";
import React from "react";
import useAuth from "../firebase/useAuth";

const LoginComponent = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div>
      <button onClick={signInWithGoogle}>Googleでログイン</button>
    </div>
  );
};

export default LoginComponent;
