import React from "react";

const Milestones = ({ milestones }) => {
  return (
    <div className="milestones-container">
      <h2>Milestones & Achievements</h2>
      <ul>
        {milestones.map((milestone, index) => (
          <li key={index}>{milestone.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Milestones;
