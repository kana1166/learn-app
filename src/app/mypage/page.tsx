"use client";
import React, { useState, useEffect } from "react";
import getUser from "../_libs/api";
import { onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../firebase/firebaseInit";
import UpdateUser from "../_components/UpdateUser";

interface User {
  userId: string;
  firebaseId: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async (firebaseId: string): Promise<User> => {
      try {
        // ユーザー情報を取得するAPIリクエストを送信
        const response = await getUser(firebaseId);
        setUser(response);
        setIsLoading(false);
        return response;
      } catch (error) {
        console.error("エラーが発生しました:", error);
        throw error; // エラーを再スロー
      }
    };

    const { auth } = initializeFirebase();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Firebaseでログイン済みの場合
        const firebaseId = authUser.uid;

        // ユーザー情報を取得
        try {
          const user = await fetchData(firebaseId);
          setUser(user);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        // Firebaseでログアウト状態の場合
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleUpdateForm = () => {
    setIsUpdateFormVisible(!isUpdateFormVisible);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>ユーザーデータを取得できませんでした。</div>;
  }

  return (
    <div>
      <h1>My Page</h1>
      <div>
        <p>UserId: {user.userId}</p>
        <p>FirebaseId: {user.firebaseId}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Account Created: {new Date(user.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(user.updatedAt).toLocaleString()}</p>
        {/* 追加: 削除日時がある場合のみ表示 */}
        {user.deletedAt && (
          <p>Account Deleted: {new Date(user.deletedAt).toLocaleString()}</p>
        )}
      </div>
      <button type="button" onClick={toggleUpdateForm}>
        {isUpdateFormVisible ? "Close Form" : "Update User"}
      </button>
      {isUpdateFormVisible && <UpdateUser />}
    </div>
  );
};

export default MyPage;
