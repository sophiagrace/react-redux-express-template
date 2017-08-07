import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './components/WidgetContainer';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
/* ********************** */

class Container extends React.Component {
  constructor () {
    super();
    this.state = {
      isActive: true,
      widget: "radio"
    };
    this.isMirrorActive = this.isMirrorActive.bind(this);
  }

  componentDidMount () {
    isMirrorActive();
  }

  isMirrorActive () {
     // function passed down to voice component to determine if
     // mirror is standby or active

     // call snowboy python file code here

     // this.setState({isActive: bool});
    return;
  }

  componentDidMount(){

    socket.on('connect', function(){
      console.log("connected");
    });

    socket.on('active', function(){
      this.setState({
        isActive: true
      });
    });

    socket.on('widget', function(howtword){
      this.setState({
        widget:hotword
      })
    })

  }

  render () {
    return (
      <WidgetContainer isActive={this.state.isActive} widget={this.state.widget} className="card2"/>
    );
  }
}


ReactDOM.render(
  <Container />,
   document.getElementById('root'));



 /* This can check if your electron app can communicate with your backend */
 // fetch('http://localhost:3000')
 // .then(resp => resp.text())
 // .then(text => console.log(text))
 // .catch(err => {throw err})
 /* ********************** */
