"use client";
import React, { useState, useEffect } from "react";
import { createRecord } from "../_libs/api";
import { onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../firebase/firebaseInit";
import getUser from "../_libs/api";
import DatePicker from "react-datepicker"; // DatePickerの追加
import "react-datepicker/dist/react-datepicker.css";

const CreateRecordPage: React.FC = () => {
  const [date, setDate] = useState(new Date()); // デフォルト値を現在の日付に変更
  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const { auth } = initializeFirebase();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const appUserId = await getUser(firebaseUser.uid);
          if (appUserId) {
            setUserId(appUserId.userId);
            if (date) {
              await fetchRecord(appUserId.userId);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
          setLoading(false);
        }
      } else {
        setRecord([]);
        setLoading(false);
      }
    });

    const fetchRecord = async (userId: string) => {
      try {
        const formattedDate = formatDate(date);
        const response = await createRecord(
          userId,
          formattedDate,
          duration,
          note
        );
        console.log(response);

        alert("Record created successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to create record.");
      }
    };

    const formatDate = (inputDate: Date) => {
      const isoDateString = inputDate.toISOString();
      return isoDateString;
    };

    return () => unsubscribe();
  }, [date]); // dateが変更されたときにのみ実行

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestData = {
        userId: userId,
        date: date.toISOString(), // Date型をISO文字列に変換
        duration: duration,
        note: note,
      };

      const response = await createRecord(
        requestData.userId,
        requestData.date,
        requestData.duration,
        requestData.note
      );
      console.log(response);

      alert("Record created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create record.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">userId:</label>
        <input
          type="userId"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        {/* DatePickerコンポーネントを使用 */}
        <DatePicker
          selected={date}
          onChange={(newDate) => {
            if (newDate !== null) {
              setDate(newDate);
            }
          }}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label htmlFor="duration">Duration (hours):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="note">Note:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <button type="submit">Create Record</button>
    </form>
  );
};

export default CreateRecordPage;
