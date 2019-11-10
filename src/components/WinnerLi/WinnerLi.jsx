import React from "react";

const WinnerLi = ({ date, name }) => {
  return (
    <>
      <h3>{name}</h3>
      <p>{date}</p>
    </>
  );
};

export default WinnerLi;
