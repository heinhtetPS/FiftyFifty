import React, { Component } from 'react';
import logo from './logo.svg';
import MainFrame from './components/main.jsx';
import Questions from './components/questions.jsx';
import AllCodes from './allcodes.js';
import './App.css';

class App extends Component {

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllCodes.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {

      let ThisGame = [];
      for (let i = 0; i < 10; i++) {
        let random1 = this.getRandom();
        let random2 = this.getRandom();
        ThisGame.push([AllCodes[random1], AllCodes[random2]]);
      }
    }

  render() {

    let ThisGame = [];
    for (let i = 0; i < 10; i++) {
      let random1 = this.getRandom();
      let random2 = this.getRandom();
      ThisGame.push([AllCodes[random1], AllCodes[random2]]);
    }

    console.log(ThisGame);

    return (
      <div className="App">
        <header>
          <h1>50/50 Game</h1>
          <h2>Countries of the World Quiz</h2>
        </header>
        <Questions />
        <MainFrame />
        <p>data store:</p>
        <p>{ ThisGame }</p>
      </div>
    );
  }
}

export default App;
