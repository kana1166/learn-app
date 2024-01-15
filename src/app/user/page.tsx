"use client";
import React, { useState } from "react";
import { createUser } from "../_libs/api";

const CreateUserForm: React.FC = () => {
  const [firebaseId, setFirebaseId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(firebaseId, email, name);
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
        <label htmlFor="firebaseId">Firebase ID:</label>
        <input
          type="text"
          id="firebaseId"
          value={firebaseId}
          onChange={(e) => setFirebaseId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
