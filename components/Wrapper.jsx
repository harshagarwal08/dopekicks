import React from "react";

const Wrapper = ({ className, children }) => {
  return (
    <div
      className={`w-full max-w-[1280px] px-10 md:px-20 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
