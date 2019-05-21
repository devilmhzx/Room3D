import React, { Component } from 'react';
import J from './JSONLoad'
import './Test.scss';
class Test extends Component {
  componentDidMount() {
    let a = new J()
    window.lm = a
  }

  render() {
    return (
      <div className="Test">
        1234
       	<div id="canvasFather"></div>
      </div>
    );
  }
}
export default Test;