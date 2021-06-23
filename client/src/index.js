import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class Meme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meme: true
    };
  }

  render() {
    return (
      <div className="meme">
      </div>
    );
  }
}

ReactDOM.render(
    <Meme />,
    document.getElementById('root')
);