import React from "react";
import s from "./ProgressBar.module.css";

type Props = {
  correct: number;
  incorrect: number;
  total: number;
};

const part = (n: number, total: number, color: string) => (
  <div
    style={{
      width: `${(100 * n) / total}%`,
      backgroundColor: color,
    }}
  >
    {n > 0 && n}
  </div>
);

// ----------
// COMPONENT:
const ProgressBar = ({ correct, incorrect, total }: Props) => {
  return (
    <div className={s.root}>
      {part(correct, total, "teal")}
      {part(total - correct - incorrect, total, "inherit")}
      {part(incorrect, total, "crimson")}
    </div>
  );
};

export default ProgressBar;
