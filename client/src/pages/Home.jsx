import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className="text-center pt-28">
      <h1 className={`text-9xl font-bold ${styles.heading}`}>genuine.</h1>
      <div className="mt-8">
        <Link
          to="/authenticate"
          className="bg-[#ace5d7] text-black py-2 px-6 rounded-lg font-bold uppercase inline-block transform transition-transform duration-200 hover:translate-y-1"
          style={{
            boxShadow: "0 4px #1c3d5a",
          }}
        >
          Authenticate Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
