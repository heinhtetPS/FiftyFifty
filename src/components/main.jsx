import React from 'react';
import AllQuestions from '../allquestions.js';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {QuestionCount: 1,
                  CurrentQuestion: null,
                  gameStarted: props.gameStarted,
                  playerScore: 0,
                  gameOver: false}
    this.getRandom = this.getRandom.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.AdvanceQuestion = this.AdvanceQuestion.bind(this);
    this.IncreaseScore = this.IncreaseScore.bind(this);
    this.checkForGame = this.checkForGame.bind(this);
    this.restart = this.restart.bind(this);
    // this.reveal = this.reveal.bind(this);
    this.chooseQuestion = this.chooseQuestion.bind(this);
    this.optionalInfo = this.optionalInfo.bind(this);
  }

  componentWillMount () {

  }

  componentWillReceiveProps(nextProps) {
    this.setState( { gameStarted: nextProps.gameStarted } );
    this.setState({CurrentQuestion: this.getRandom()});
  }

  // reveal() {
  //   console.log(this.state);
  //   console.log(this.props.countries);
  // }

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllQuestions.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  AdvanceQuestion() {
    this.setState(prevState => {
           return {QuestionCount: prevState.QuestionCount + 1} });
    this.checkForGame();
    this.chooseQuestion();
  }

  IncreaseScore() {
    this.setState(prevState => {
           return {playerScore: prevState.playerScore + 1} });
  }

  chooseQuestion() {
    let index = this.getRandom();
    this.setState({CurrentQuestion: index});
  }

  checkForGame() {
    if (this.state.QuestionCount >= 10)
    this.setState({gameOver: true});
  }

  restart() {
    window.location.reload();
  }

  optionalInfo(leftside) {

    let offset = leftside ? -1 : + 9;

    let question = AllQuestions[this.state.CurrentQuestion];
    if (this.state.CurrentQuestion === null)
    return null;

    if (question.includes("flag")) {
      return (
        <div className="optional-block">
          <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount-1].alpha2Code + "/flat/64.png"} alt="flag"></img>
          <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
          <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
          <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
          <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
        </div>
      );
    }

    if (question.includes("capital")) {
      return (
        <div className="optional-block">
          <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
          <p>Capital City: {this.props.countries[this.state.QuestionCount-1].capital}</p>
          <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
          <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
          <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
        </div>
      );
    }

    if (question.includes("population")) {
      return (
        <div className="optional-block">
          <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
          <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
          <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
          <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
        </div>
      );
    }

    if (question.includes("language")) {
      return (
        <div className="optional-block">
          <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
          <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
          <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
          <p>Main Language: {this.props.countries[this.state.QuestionCount-1].languages[0].name}</p>
          <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
        </div>
      );
    }

    if (question.includes("internet")) {
      return (
        <div className="optional-block">
          <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
            <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
            <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
            <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
            <p>Internet Domain: {this.props.countries[this.state.QuestionCount-1].topLevelDomain[0]}</p>
        </div>
      );
    }

    //default
    return (
      <div className="optional-block">
        <img src={"https://www.countryflags.io/" + this.props.countries[this.state.QuestionCount + offset].alpha2Code + "/flat/64.png"} alt="flag"></img>
        <p>Capital City: {this.props.countries[this.state.QuestionCount + offset].capital}</p>
        <p>Population: {this.props.countries[this.state.QuestionCount + offset].population}</p>
        <p>Main Language: {this.props.countries[this.state.QuestionCount + offset].languages[0].name}</p>
        <p>Internet Domain: {this.props.countries[this.state.QuestionCount + offset].topLevelDomain[0]}</p>
      </div>
    );

  }

  handleAnswer(question_id, e) {
    //must create answerguide that looks at each question and has an algo to get correct answer
    //if you chose the correct side (right or left), then AdvanceQuestion and IncreaseScore, else just AdvanceQuestion


  }

  render () {
    //reveal button <button onClick={this.reveal}>reveal</button>

    //display is based on QuestionCount
    if (this.state.gameStarted) {

      if (this.props.countries.length <= 0)
      return null;

      if (!this.state.gameOver && this.props.countries.length > 0) {

        //game started and not gameover
        return (
          <div className="main-container">
            <p>Your Score: {this.state.playerScore}/10</p>

              <div className="question-container">
                <p>Question #{this.state.QuestionCount}: {AllQuestions[this.state.CurrentQuestion]}</p>
              </div>

              <h1 className="versus">VS</h1>

              <div className="boxes">
                <div className="main-left" onClick={this.AdvanceQuestion} value="0">
                  <p className="country-text">{this.props.countries[this.state.QuestionCount-1].name}</p>
                  {this.optionalInfo(true)}
                </div>

                <div className="main-right" onClick={this.AdvanceQuestion} value="1">
                    <p className="country-text">{this.props.countries[this.state.QuestionCount + 9].name}</p>
                    {this.optionalInfo(false)}
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
