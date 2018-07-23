import React, { Component } from 'react';
import logo from './logo.svg';
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
      } catch (err) {
        alert(err);
        console.log('error with fetch');
      }
  }

  handleStart() {
    console.log('starting');

    for (let i = 0; i < 20; i++) {
      let usedValues = [];
      let random = this.getRandom();

      //prevent dupes
      while (usedValues.includes(random)) {
        random = this.getRandom();
      }

      this.fetchCountry(AllCodes[random]);
      usedValues.push(random);

      if (i === 19)
      this.setState({gameStarted: true});
    }

    console.log(this.state);
  }

  componentDidMount() {

    }

  render() {

    return (
      <div className="App">
        <header>
          <h1>50/50 Game</h1>
          <h2>Countries of the World Quiz</h2>
        </header>
        <button onClick={this.handleStart}>start</button>
        <MainFrame countries={this.state.data}
                   gameStarted={this.state.gameStarted}
                   getRandom={this.getRandom}/>
      </div>
    );
  }
}

export default App;
