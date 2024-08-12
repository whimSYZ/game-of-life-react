import React from "react";

interface CellProps {
  isAlive: boolean;
  toggleCell: () => void;
}

const Cell: React.FC<CellProps> = ({ isAlive, toggleCell }) => {
  return (
    <div
      onClick={toggleCell}
      style={{
        width: 20,
        height: 20,
        backgroundColor: isAlive ? "var(--alive-cell-color)" : undefined,
      }}
    />
  );
};

export default Cell;
