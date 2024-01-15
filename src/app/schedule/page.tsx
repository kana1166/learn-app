"use client";
import React, { useState, useEffect } from "react";
import { createSchedule } from "../_libs/api";
import { onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../firebase/firebaseInit";
import getUser from "../_libs/api";

const daysOfWeek = [
  { dayOfWeekId: "70dcebc0-6bd3-4d28-b749-a1de1ec5c7b7", name: "Monday" },
  { dayOfWeekId: "371de418-4007-42af-b772-4a52e93ae2fc", name: "Tuesday" },
  { dayOfWeekId: "20e3e852-4343-43fa-bfe5-ab26509a7994", name: "Wednesday" },
  { dayOfWeekId: "02fb1a9b-a88e-4cc0-bbd3-739b5e026940", name: "Thursday" },
  { dayOfWeekId: "714e3177-beea-4132-8b6a-5422b44b96d6", name: "Friday" },
  { dayOfWeekId: "4b02a3fa-f83c-4080-bba1-0a29832450fc", name: "Saturday" },
  { dayOfWeekId: "031e903d-a06a-4396-a2da-c0cece14bb91", name: "Sunday" },
];

const CreateSchedulePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [duration, setDuration] = useState(0);

  const [userId, setUserId] = useState(""); // ユーザーIDをstateで管理

  // Firebaseの初期化
  const { auth } = initializeFirebase();

  useEffect(() => {
    // 認証ステートが変更された時の処理
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ユーザーがログインしている場合、ユーザーIDをセット
        const userIdFromFirebase = await fetchUserId(user.uid); // ユーザーIDを非同期で取得
        setUserId(userIdFromFirebase);
      } else {
        // ユーザーがログアウトしている場合、ユーザーIDを空にする
        setUserId("");
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, [auth]);

  const fetchUserId = async (firebaseUserId: string) => {
    try {
      const appUser = await getUser(firebaseUserId); // ユーザーオブジェクトを取得
      const appUserId = appUser.userId; // ユーザーIDを取得
      return appUserId;
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
      return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dayOfWeek = daysOfWeek.find((day) => day.name === selectedDay);
    if (!dayOfWeek) {
      alert("Please select a valid day of the week.");
      return;
    }

    try {
      const response = await createSchedule(
        userId,
        dayOfWeek.dayOfWeekId,
        duration
      );
      console.log(response);

      alert("User created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create user.");
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
      <div className="flex items-center space-x-2">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration:
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="mt-1 block w-16 pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"
          placeholder="0"
        />
        <span className="text-sm text-gray-700">時間</span>
      </div>
      <div>
        <label
          htmlFor="daysOfWeek"
          className="block text-sm font-medium text-gray-700"
        >
          Day of Week:
        </label>
        <select
          id="daysOfWeek"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="mt-1 block w-54 pl-3 pr-10 sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Select a day</option>
          {daysOfWeek.map((day) => (
            <option key={day.dayOfWeekId} value={day.name}>
              {day.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Schedule
      </button>
    </form>
  );
};

export default CreateSchedulePage;
