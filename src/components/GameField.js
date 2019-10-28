import React from 'react';
import {ShowScore} from './GameStartIntro';
import {GameReset} from './GameReset';

class GameField extends React.Component {
  constructor() {
    super();
    this.state = {
      positionY: 5,
      compPositionY: 20,
      compSpeed: 10,
      ballX: window.innerWidth / 2 - 20,
      ballY: window.innerHeight / 2 - 20,
      ballDirectionX: 1,
      ballDirectionY: 0,
      ballSpeed: 4,
      playerScore: 0,
      compScore: 0,
      setEnd: false,
      winner: '',
      gameEnd: false,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      Array.from(document.getElementsByClassName('inscription')).map(element => element.remove());
      this.newGame();
    }, 7000);
  }

  newGame = () => {
    let {compSpeed, compScore, playerScore} = this.state;

    compSpeed += playerScore - compScore >= 2 ? 2 : 0;
    compSpeed -= compScore - playerScore >= 2 ? 1 : 0;
    compSpeed = compScore - playerScore === 0 ? compSpeed - 2 : compSpeed;
    compSpeed = compSpeed < 4 ? 4 : compSpeed;
    compSpeed = compSpeed > 19 ? 19 : compSpeed;

    this.setState({
      compSpeed,
      ballX: window.innerWidth / 2 - 20,
      ballY: window.innerHeight / 2 - 20,
      ballDirectionX: 1,
      ballDirectionY: 0,
      ballSpeed: 4,
      setEnd: false,
      gameEnd: false,
    }, this.startGame());
  }

  startGame = () => {
    let game = setInterval(() => {
      let [compScore, playerScore, setEnd, gameEnd, winner] = this.endGame();
      let [ballX, ballY, ballDirectionX, ballDirectionY, ballSpeed] = this.ballMove();
      let compPositionY = this.compMove();

      this.setState({
        compPositionY,
        ballX, ballY, ballDirectionX, ballDirectionY, ballSpeed,
        compScore, playerScore, setEnd, gameEnd, winner
      });

      if (setEnd && !gameEnd) {
        setTimeout(() => this.newGame(), 5000);
      }

      setEnd && clearInterval(game);
    }, 14);
  }

  handleMoseMove = (positionY) => {
    const prevPosition = this.state.positionY;
    const maxPosition = window.innerHeight - 140;
    const minPosition = 5;
    let newPosition;

    newPosition = positionY > maxPosition ? maxPosition : positionY;
    newPosition = positionY < minPosition ? minPosition : newPosition;

    newPosition !== prevPosition && this.setState({positionY: newPosition});
  }

  compMove = () => {
    let {ballX, ballY, compPositionY, compSpeed} = this.state;
    let centerPosition = compPositionY + 65;

    if ((ballX < window.innerWidth / 4 * 3) && (centerPosition < ballY || centerPosition > ballY + 30)) {
      compPositionY = centerPosition > ballY + 15
        ? compPositionY - compSpeed
        : compPositionY + compSpeed;

      compPositionY = compPositionY <= 5
        ? 6
        : compPositionY;

      compPositionY = compPositionY + 130 >= window.innerHeight - 10
        ? window.innerHeight - 141
        : compPositionY;
    }

    return compPositionY;
  }

  ballMove = () => {
    let {ballX, ballY, positionY, compPositionY,
        ballDirectionX, ballDirectionY, ballSpeed} = this.state;
    let newBallX, newBallY, newBallDirectionX, newBallDirectionY;

    // Calculating and correcting ball y-cordinate
    newBallY = ballY + ballDirectionY * ballSpeed;
    ballY = newBallY < 5 ? 5 : newBallY;
    ballY = newBallY > window.innerHeight - 40 ? window.innerHeight - 40 : ballY;

    // Calculating and correcting ball x-cordinate
    newBallX = ballX + ballDirectionX * ballSpeed;
    ballX = newBallX < 5 ? 5 : newBallX;
    ballX = newBallX > window.innerWidth - 40 ? window.innerWidth - 40 : newBallX;
    if (newBallX <= 45 && ballY + 30 >= compPositionY && ballY <= compPositionY + 130) {
      ballX = 45;
    }
    if (newBallX + 30 >= window.innerWidth - 55 && ballY + 30 >= positionY && ballY <= positionY + 130) {
      ballX = window.innerWidth - 85;
    }

    // Ball & borders collision
    if (ballY === 5 || ballY + 30 === window.innerHeight - 10) {
      ballDirectionY = -ballDirectionY;
      ballSpeed -= 0.05;
    }

    // Ball & pad collision
    // top pad part
    if ((ballX === 45
          && ballY + 30 >= compPositionY
          && ballY + 15 <= compPositionY + 20)
      || (ballX + 30 === window.innerWidth - 55
          && ballY + 30 >= positionY
          && ballY + 15 <= positionY + 20))
    {
      newBallDirectionX = Math.abs(ballDirectionY) * (-Math.abs(ballDirectionX) / ballDirectionX);
      newBallDirectionY = -Math.abs(ballDirectionX);
      ballDirectionY = newBallDirectionY;
      ballDirectionX = Math.abs(newBallDirectionX) <= 1.5 ? 1.5 * (-Math.abs(ballDirectionX) / ballDirectionX) : newBallDirectionX;

      ballSpeed *= 1.2;
    }

    // central pad part
    if ((ballX === 45
          && ballY + 15 > compPositionY + 20
          && ballY + 15 < compPositionY + 110)
        || (ballX + 30 === window.innerWidth - 55
          && ballY + 15 > positionY + 20
          && ballY + 15 < positionY + 110))
    {
      ballDirectionX = -(ballDirectionX * 1.1);
      ballDirectionY = ballDirectionY / 1.1;
    }

    // bottom pad part
    if ((ballX === 45
          && ballY + 15 >= compPositionY + 110
          && ballY <= compPositionY + 130)
        || (ballX + 30 >= window.innerWidth - 55
          && ballY + 15 >= positionY + 110
          && ballY <= positionY + 130))
    {
      newBallDirectionX = Math.abs(ballDirectionY) * (-Math.abs(ballDirectionX) / ballDirectionX);
      newBallDirectionY = Math.abs(ballDirectionX);
      ballDirectionY = newBallDirectionY;
      ballDirectionX = Math.abs(newBallDirectionX) <= 1.5 ? 1.5 * (-Math.abs(ballDirectionX) / ballDirectionX) : newBallDirectionX;

      ballSpeed *= 1.2;
    }

    // Calculating and correcting ball speed
    ballSpeed = ballSpeed > 10 ? 10 : ballSpeed;
    ballDirectionX = ballDirectionX > 6 ? 6 : ballDirectionX;
    ballDirectionY = ballDirectionY > 6 ? 6 : ballDirectionY;

    return [ballX, ballY, ballDirectionX, ballDirectionY, ballSpeed];
  }

  endGame = () => {
    let {ballX, compScore, playerScore, setEnd, gameEnd, winner} = this.state;

    if (ballX + 30 >= window.innerWidth - 10 || ballX <= 5) {
      setEnd = true;
      compScore += ballX + 30 >= window.innerWidth - 10 ? 1 : 0;
      playerScore += ballX <= 5 ? 1 : 0;
    }

    if (compScore === 11 || playerScore === 11) {
      gameEnd = true;
      winner = compScore === 11 ? "COMPUTER" : "YOU";
    }

    return [compScore, playerScore, setEnd, gameEnd, winner];
  }

  restart = () => {
    this.setState({
      ballX: window.innerWidth / 2 - 20,
      ballY: window.innerHeight / 2 - 20,
      ballDirectionX: 1,
      ballDirectionY: 0,
      ballSpeed: 4,

      playerScore: 0,
      compScore: 0,
      setEnd: true,
      gameEnd: false,
      winner: '',
      compSpeed: 10,
    },
    () => setTimeout(() => this.newGame(), 5000));
  }


  render () {
    let {compPositionY, positionY, ballX, ballY,
        setEnd, gameEnd, compScore, playerScore, winner} = this.state;

    return (
      <div
        className="game"
        style={gameEnd ? {cursor: 'default'} : {}}
        onMouseMove={event => this.handleMoseMove(event.pageY)}
      >
        {setEnd && !gameEnd
          && <ShowScore delay={0} compScore={compScore} playerScore={playerScore} />
        }

        {gameEnd && <GameReset winner={winner} restart={this.restart}/>}

        <div
          className="pad--left"
          style={{top: `${compPositionY}px`}}
        />

        <div className="devider" />

        <div
          className="ball"
          style={{top: `${ballY}px`, left: `${ballX}px`}}
        />

        <div
          className="pad--right"
          style={{top: `${positionY}px`}}
        />
      </div>
    );
  }
}

export default GameField;


