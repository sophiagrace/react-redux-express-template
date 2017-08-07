import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './components/WidgetContainer';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
/* ********************** */

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: true
    };
    this.isMirrorActive = this.isMirrorActive.bind(this);
  }

  isMirrorActive() {
     // function passed down to voice component to determine if
     // mirror is standby or active
    return;
  }

  render () {
    return (
      <WidgetContainer isActive={this.state.isActive} className="card2"/>
    );
  }
}


ReactDOM.render(
  <Container />,
   document.getElementById('root'));
