import React from 'react';
import AllQuestions from '../allquestions.js';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {LeftSide: {},
                  RightSide: {},
                  CurrentQuestion: 1,
                  gameStarted: props.gameStarted}
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount () {

    console.log('did it come here');
    this.props.countries.forEach( country => {
      console.log(country.name);
    })
  }

  componentWillReceiveProps(nextProps) {
  this.setState( { gameStarted: nextProps.gameStarted } );
}

  handleAnswer() {
    this.setState(prevState => {
           return {CurrentQuestion: prevState.CurrentQuestion + 1}
                     });
  }

  render () {

    //display is based on CurrentQuestion

    if (this.state.gameStarted) {
      return (
        <div className="main-container">
            <div className="question-container">
              <p>Question #{this.state.CurrentQuestion}: {AllQuestions[this.props.getRandom()]}</p>
            </div>

            <h1 className="versus">VS</h1>

            <div className="boxes">
              <div className="main-left" onClick={this.handleAnswer}>
                {this.props.countries.map(country =>
                  <div key={country.alpha2Code} className="country-info">
                    <p>{country.name}</p>
                    <img src={"https://www.countryflags.io/" + country.alpha2Code + "/flat/64.png"}></img>
                  </div>

                )}

              </div>

              <div className="main-right" onClick={this.handleAnswer}>
                <p>United States Of America</p>
                <img src="https://www.countryflags.io/us/flat/64.png"></img>
                <p>Capital: Washington D.C</p>
                <p>Population: 9999999 million</p>
                <p>Main Language: English</p>

              </div>

            </div>
        </div>
      );

    } else {

      return (

        <div className="main-container">
          <h1>Press Start to Begin the game!</h1>
        </div>

      );


    }


  }
}

export default MainFrame;
