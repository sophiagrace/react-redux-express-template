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
        currentResponse: ''
    };
  }

  componentDidMount() {
    // callGetCommand('test-widget')
    //   .then(() => {
    //     console.log('finished');
    //   })
    console.log('component mounted');
    axios.post('/stt', {widget: 'test'})
    .then( resp => {
      console.log('finished on the client side with', resp);
    });

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
              { this.state.hasResponse && <div className="rDiv"><Response /></div> }
          </div>
          <div className={this.props.isActive ? 'widgetsActive' : 'widgetsStandby'}>
              <ReactCSSTransitionGroup transitionName = "example"
                transitionAppear = {true} transitionAppearTimeout = {2000}
                transitionEnter = {false} transitionLeave = {false}>
                {this.props.widget === 'radio' ? <Radio /> : <div></div>}
                {this.props.widget === 'news' ? <News /> : <div></div>}
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
