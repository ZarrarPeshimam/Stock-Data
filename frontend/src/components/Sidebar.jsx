import React from "react";

const Sidebar = ({ companies, onSelect }) => {
  return (
    <div className="sidebar">
      <h2>Companies</h2>
      <ul>
        {companies.map((c) => (
          <li key={c} onClick={() => onSelect(c)}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
