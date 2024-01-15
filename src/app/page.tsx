import React from "react";
import Footer from "./Footer";
import LoginComponent from "./_components/login";
import Header from "./Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <LoginComponent />

        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
