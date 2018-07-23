import React from 'react';
import AllQuestions from '../allquestions.js';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {LeftSide: [
                      {name: "loading",
                       alpha2Code: "loading"}],
                  RightSide: [{name: "loading",
                              alpha2Code: "loading"}],
                  CurrentQuestion: 1,
                  gameStarted: props.gameStarted,
                  playerScore: 0,
                  gameOver: false}
    this.getRandom = this.getRandom.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.AdvanceQuestion = this.AdvanceQuestion.bind(this);
    this.IncreaseScore = this.IncreaseScore.bind(this);
    this.placeCountries = this.placeCountries.bind(this);
    this.checkForGame = this.checkForGame.bind(this);
    this.restart = this.restart.bind(this);
    this.pushLeft = this.pushLeft.bind(this);
    this.pushRight = this.pushRight.bind(this);
    this.reveal = this.reveal.bind(this);
  }

  componentWillMount () {
    if(this.state.LeftSide.length < 9)
    this.placeCountries();
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { gameStarted: nextProps.gameStarted } );

  }

  reveal() {
    console.log(this.state);
  }

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllQuestions.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  AdvanceQuestion() {
    this.setState(prevState => {
           return {CurrentQuestion: prevState.CurrentQuestion + 1} });
    this.checkForGame();
  }

  pushLeft(country) {
    let newstate = this.state.LeftSide.concat(country);
    console.log(newstate);
    this.setState({LeftSide: newstate});
  }

  pushRight(country) {
    let newstate = this.state.RightSide.concat(country);
    this.setState({RightSide: newstate});
  }

  IncreaseScore() {
    this.setState(prevState => {
           return {playerScore: prevState.playerScore + 1} });
  }

  checkForGame() {
    if (this.state.CurrentQuestion >= 10)
    this.setState({gameOver: true});
  }

  placeCountries() {
    for (let i = 0; i <= 20; i++) {
      if (i <= 10) {

        this.pushLeft(this.props.countries[i]);

      } else {
        this.pushRight(this.props.countries[i]);
      }
    };

  }

  restart() {
    window.location.reload();
  }

  handleAnswer(side) {
    //must create answerguide that looks at each question and has an algo to get correct answer
    //if you chose the correct side (right or left), then AdvanceQuestion and IncreaseScore, else just AdvanceQuestion

  }

  render () {


    //display is based on CurrentQuestion
    if (this.state.gameStarted) {

      if (this.props.countries.length <= 0)
      return null;

      if (!this.state.gameOver && this.props.countries.length > 0) {

        //game started and not gameover
        return (
          <div className="main-container">
            <p>Your Score: {this.state.playerScore}/10</p>
                        <button onClick={this.reveal}>reveal</button>
              <div className="question-container">
                <p>Question #{this.state.CurrentQuestion}: {AllQuestions[this.getRandom()]}</p>
              </div>

              <h1 className="versus">VS</h1>

              <div className="boxes">
                <div className="main-left" onClick={this.AdvanceQuestion}>
                  <p>{this.state.LeftSide[0].name}</p>

                </div>

                <div className="main-right" onClick={this.AdvanceQuestion}>
                    <p>{this.state.RightSide[0].name}</p>

                </div>

              </div>
          </div>
        );

      } else if (this.state.gameOver) {
        return (
          <div className="main-container">
            <p>GAME OVER</p>
            <p>Your Score: {this.state.playerScore}/10</p>
            <button onClick={this.restart}>Restart</button>
          </div>
        )
      }

    } else {
      //game hasnt started
      return (
        <div className="main-container">
          <h1 className="blinker">Press Start to Begin the game!</h1>
        </div>
      );
    }


  }
}

export default MainFrame;
