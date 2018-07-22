import React from 'react';

class MainFrame extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {LeftSide: {},
                  RightSide: {}}
  }

  render () {

    return (
      <div className="main-container">
        <div className="main-left">

        </div>

        <div className="main-right">

        </div>

      </div>
    );
  }
}

export default MainFrame;
