import React from 'react';

export const GameStartIntro = () => (
  <>
    <div
      className="inscription"
      style={{animationDelay: `4s`, top: '50%', left: '50%'}}
    >
      Ready
    </div>
    <div
      className="inscription"
      style={{animationDelay: `5s`, top: '50%', left: '50%'}}
    >
      Steady
    </div>
    <div
      className="inscription"
      style={{animationDelay: `6s`, top: '50%', left: '50%'}}
    >
      ! GO !
    </div>
  </>
);

export const ShowScore = ({delay, compScore, playerScore}) => (
  <>
    <div
      className="inscription"
      style={{animationDelay: `${delay}s`, top: '50%', left: '25%'}}
    >
      {compScore}
    </div>
    <div
      className="inscription"
      style={{animationDelay: `${delay + 1}s`, top: '50%', left: '75%'}}
    >
      {playerScore}
    </div>
    <div
      className="inscription"
      style={{animationDelay: `${delay + 2}s`, top: '50%', left: '50%'}}
    >
      Ready
    </div>
    <div
      className="inscription"
      style={{animationDelay: `${delay + 3}s`, top: '50%', left: '50%'}}
    >
      Steady
    </div>
    <div
      className="inscription"
      style={{animationDelay: `${delay + 4}s`, top: '50%', left: '50%'}}
    >
      ! GO !
    </div>
  </>
);

