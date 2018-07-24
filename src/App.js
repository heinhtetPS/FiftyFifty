import React, { Component } from 'react';
import MainFrame from './components/main.jsx';
import AllCodes from './allcodes.js';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      data: [],
      gameStarted: false
    };
    this.handleStart = this.handleStart.bind(this);
  }

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllCodes.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async fetchCountry(countryCode) {
      let finalData = {};
      const staticURL = 'https://restcountries.eu/rest/v2/alpha/'
      let fullURL = staticURL + countryCode;

      try {
        let response = await fetch(fullURL);
        finalData = await response.json();
        let newData = this.state.data.concat(finalData);
        this.setState({data: newData});
        if (this.state.data.length >= 18)
        this.setState({gameStarted: true});
      } catch (err) {
        alert(err);
        console.log('error with fetch');
      }
  }

  handleStart() {
    for (let i = 0; i < 20; i++) {
      let usedValues = [];
      let random = this.getRandom();

      //prevent dupes
      while (usedValues.includes(random)) {
        random = this.getRandom();
      }
      this.fetchCountry(AllCodes[random]);
      usedValues.push(random);
    }
  }

  render() {

    if (this.state.gameStarted) {

      return (
        <div className="App">
          <header>
            <h1>Fifty/Fifty Game</h1>
            <h2>Countries of the World Quiz</h2>
          </header>
          <MainFrame countries={this.state.data}
                     gameStarted={this.state.gameStarted}
                     getRandom={this.getRandom}/>
        </div>
      );

    } else {

      return (
        <div className="App">
          <header>
            <h1>Fifty/Fifty Game</h1>
            <h2>Test Your Knowledge!</h2>
          </header>
          <button onClick={this.handleStart}>start</button>
            <h1 className="blinker">Press Start to Begin the Game!</h1>
        </div>
      );
    }
  }
}

export default App;
