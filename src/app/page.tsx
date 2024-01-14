import React from "react";
import CreateUserForm from "./_components/CreateUserForm";
import CreateSchedulePage from "./_components/CreateSchedulePage";
import MyPage from "./_components/MyPage";

const Home: React.FC = () => {
  return (
    <>
      <div>
        <h1>Create User</h1>
        <CreateUserForm />
        <br />
        <br />
        <br />
        <h1>スケジュール登録</h1>
        <CreateSchedulePage />
      </div>
      <div>
        <MyPage />
      </div>
    </>
  );
};

export default Home;
