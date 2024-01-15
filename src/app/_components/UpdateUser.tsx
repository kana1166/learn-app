"use client";
import React, { useState, useEffect } from "react";
import { updateUser } from "@/app/_libs/api";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Authenticationサービスを取得
const auth = getAuth(app);

const UpdateUser = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Firebase AuthenticationのonAuthStateChangedを使用してユーザーのEmailを取得
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合
        setEmail(user.email); // ユーザーのEmailをセット
      } else {
        setEmail(""); // ユーザーがログアウトしている場合、またはユーザーが存在しない場合、Emailをクリア
      }
    });

    return () => unsubscribe(); // cleanup関数を返してunsubscribeする
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUser(userId, email || "", name);
      console.log(response);

      alert("User updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">UserId:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email || ""}
          readOnly // 読み取り専用に設定
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
