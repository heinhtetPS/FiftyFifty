import React from 'react';
import AllQuestions from '../allquestions.js';

class Questions extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {Questions: props.questions,
                  CurrentQuestion: 1}
  }

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllQuestions.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render () {


    return (
      <div className="question-container">
        <p>Question #{this.state.CurrentQuestion}: {AllQuestions[this.getRandom()]}</p>
      </div>
    );
  }
}

export default Questions;
