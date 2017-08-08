import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

// const { localGetCommand } = require('../../backend/processHuman'); // CHANGE FILE PATH

// import all different widgets
// in this file, control which widgets show
import Time from './Time';
import Weather from './Weather';
import Radio from './Radio';
import News from './News';
import Response from './responseDiv';

class WidgetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hasResponse: true,
        currentResponse: '',
        socket: this.props.socket
    };
  }

  componentDidMount() {

    // next line for testing purposes only:
    this.state.socket.emit('stt', 'test-widget1');

    // START SOCKET LISTENERS
    this.state.socket.join('W_CONTAINER')

    this.state.socket.on('stt_continuing', respObj => {
      console.log('received stt continuing', respObj);

      this.setState({currentResponse: respObj.response});
    });

    this.state.socket.on('stt_finished', respObj => {
      console.log('received stt finished', respObj);
      const self = this;

      this.setState({currentResponse: respObj.response});
      setTimeout(() => {
        console.log('in timeout of stt finished');
        self.setState({currentResponse: ''})
      }, 6000)
    });
    // END SOCKET LISTENERS

    // console.log('component mounted');
    // axios.post('/stt', {widget: 'test'})
    // .then( resp => {
    //   console.log('finished on the client side with', resp);
    // });

  }

  determineThreeWidgets() {
     // function to determine which widgets show
  }

  render () {
     // in future, only show three components,
     // for now, test out widgets here!
    return(
      <div className="outerDiv">
           <div className={this.props.isActive ? 'isActiveDiv' : 'isStandbyDiv'}>
               <ReactCSSTransitionGroup transitionName = "example"
                 transitionAppear = {true} transitionAppearTimeout = {2000}
                 transitionEnter = {false} transitionLeave = {false}>

                 <Time timeState={this.props.isActive}/>
                 <Weather weatherState={this.props.isActive}/>
              </ReactCSSTransitionGroup>
          </div>
          <div className={this.props.isActive ? 'responseDiv' : 'widgetsStandby'}>
              { this.state.hasResponse && <div className="rDiv"><Response display={this.state.currentResponse} /></div> }
          </div>
          <div className={this.props.isActive ? 'widgetsActive' : 'widgetsStandby'}>
              <ReactCSSTransitionGroup transitionName = "example"
                transitionAppear = {true} transitionAppearTimeout = {2000}
                transitionEnter = {false} transitionLeave = {false}>
                {this.props.widget === 'radio' ? <Radio socket={this.state.socket} /> : <div></div>}
                {this.props.widget === 'news' ? <News socket={this.state.socket} /> : <div></div>}
             </ReactCSSTransitionGroup>
          </div>

    </div>
    );
  }
}

export default WidgetContainer;
//
// /* Local Helper Function */
// // Exported Function
// // getCommand(widgetName)
// //  - Param:
// //  - Return:  object (keys: bool isFinished,  )
// //  - Description: called from Widget, runs three STT funcs, produces object response
// function localGetCommand (widgetName) {
//
// }
