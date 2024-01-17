"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
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

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginWithUserId: (userId: string) => void; // 新しい関数を追加
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // ユーザーがログインまたは認証された後に、setUser を使用して userId を設定
  const loginWithUserId = async (userId: string) => {
    try {
      // バックエンドからユーザー情報を取得
      const fetchedUser = await getUser(userId);
      setUser(fetchedUser);
    } catch (error) {
      console.error("ユーザー情報の取得エラー", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginWithUserId }}>
      {children}
    </UserContext.Provider>
  );
};
