import React from 'react';

export const GameReset = ({winner, restart}) => (
  <div className="gameResetWindow">
    <span className="winner">
      {`${winner} WIN !`}
    </span>
    <div
      className="restart"
      onClick={() => restart()}
    >
      Play Again
    </div>
  </div>
);
