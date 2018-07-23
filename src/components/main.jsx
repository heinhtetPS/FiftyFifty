import React from 'react';
import AllQuestions from '../allquestions.js';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {LeftSide: {},
                  RightSide: {},
                  CurrentQuestion: 1,
                  gameStarted: false}
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount () {
    //here take the props and insert them into state
  }

  handleAnswer() {
    this.setState(prevState => {
           return {CurrentQuestion: prevState.CurrentQuestion + 1}
                     });
  }

  render () {

    //display is based on CurrentQuestion

    return (
      <div className="main-container">

        <h1 className="versus">VS</h1>

          <div className="question-container">
            <p>Question #{this.state.CurrentQuestion}: {AllQuestions[this.props.getRandom()]}</p>
          </div>

          <div className="boxes">
            <div className="main-left" onClick={this.handleAnswer}>
              <p>China</p>
              <img src="https://www.countryflags.io/cn/flat/64.png"></img>
              <p>Capital: Beijing</p>
              <p>Population: 9999999 million</p>
              <p>Main Language: Mandarin</p>

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
  }
}

export default MainFrame;
