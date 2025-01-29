import React from "react";
import { PulseLoader } from "react-spinners";

const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Loading = () => {
  return (
    <div className="-top-12 -left-12 right-0 bottom-0 absolute bg-secondary opacity-90 z-50">
      <PulseLoader cssOverride={override} color="#e11d48" />
    </div>
  );
};

export default Loading;
