"use client";
import React, { useState, useEffect } from "react";
import { getSchedulesList } from "../_libs/api";
import getUser from "../_libs/api";
import { onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../firebase/firebaseInit";

interface Schedule {
  scheduleId: string;
  dayOfWeekId: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const SchedulesList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth } = initializeFirebase();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Firebase ID からアプリケーションのユーザー ID を取得
          const appUserId = await getUser(firebaseUser.uid);
          if (appUserId) {
            await fetchSchedules(appUserId);
          }
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
          setLoading(false);
        }
      } else {
        setSchedules([]);
        setLoading(false);
      }
    });

    const fetchSchedules = async (user: {
      userId: string;
      [key: string]: any;
    }) => {
      console.log(user.userId); // ここで userId をログに出力
      try {
        const data = await getSchedulesList(user.userId); // userId のみを渡す
        setSchedules(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load schedules:", error);
        setLoading(false);
      }
    };

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>スケジュール一覧</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {schedules.length > 0 ? (
            <ul>
              {schedules.map((schedule) => (
                <li key={schedule.scheduleId}>
                  {schedule.dayOfWeekId} - {schedule.duration} 時間
                </li>
              ))}
            </ul>
          ) : (
            <p>スケジュールはありません。</p>
          )}
        </>
      )}
    </div>
  );
};

export default SchedulesList;
