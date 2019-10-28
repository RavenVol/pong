import React from 'react';

export const StatusBlock = ({compSpeed, ballX, ballY, ballSpeed}) => (
  <div className="statusBlock">
    <p>{`Comp Speed: ${compSpeed}`}</p>
    <p>{`Ball X: ${ballX}`}</p>
    <p>{`Ball Y: ${ballY}`}</p>
    <p>{`Ball Speed: ${ballSpeed}`}</p>
  </div>
);



