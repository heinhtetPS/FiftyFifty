import React from 'react';
import AllQuestions from '../allquestions.js';

class Questions extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {Questions: props.questions,
                  CurrentQuestion: 0}
  }

  getRandom() {
    let min = Math.ceil(0);
    let max = Math.floor(AllQuestions.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render () {


    return (
      <div className="question-container">
        <p>Question #1: {AllQuestions[this.getRandom()]}</p>
      </div>
    );
  }
}

export default Questions;
