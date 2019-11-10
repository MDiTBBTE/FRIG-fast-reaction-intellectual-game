import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <h2 className={styles.tittle}>
        Hello my <span className={styles.span}>friend !</span>{" "}
      </h2>
      <p className={styles.info}>
        You have a great opportunity to compete with the machine and show your
        skills.
      </p>
      <p className={styles.span}>Good luck !</p>
    </>
  );
};

export default Home;
