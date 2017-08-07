import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './components/WidgetContainer';
const socket = io('http://localhost:3000');
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
      isActive: false,
      widget: ""
    };
    this.isMirrorActive = this.isMirrorActive.bind(this);
  }

  isMirrorActive() {
     // function passed down to voice component to determine if
     // mirror is standby or active
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
