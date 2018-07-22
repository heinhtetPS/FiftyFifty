import React from 'react';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {LeftSide: {},
                  RightSide: {},
                  QuestionState: 0}
  }

  componentDidMount () {
    //here take the props and insert them into state
  }

  render () {

    //display is based on QuestionsState

    return (
      <div className="main-container">

        <h1 className="versus">VS</h1>

        <div className="main-left">
          <p>China</p>
          <img src="https://www.countryflags.io/cn/flat/64.png"></img>
          <p>Capital: Beijing</p>
          <p>Population: 9999999 million</p>
          <p>Main Language: Mandarin</p>

        </div>

        <div className="main-right">
          <p>United States Of America</p>
          <img src="https://www.countryflags.io/us/flat/64.png"></img>
          <p>Capital: Washington D.C</p>
          <p>Population: 9999999 million</p>
          <p>Main Language: English</p>

        </div>

      </div>
    );
  }
}

export default MainFrame;
