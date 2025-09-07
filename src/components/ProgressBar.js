import React from "react";

const ProgressBar = ({ current, total }) => {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="progress-bar">
      <div className="fill" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;
