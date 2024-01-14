"use client";
import React, { useState, useEffect } from "react";
import getUser from "../_libs/api";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser("abcd1234");
        setUser(response);
        setIsLoading(false);
      } catch (error) {
        console.error("エラーが発生しました:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    </div>
  );
};

export default MyPage;
