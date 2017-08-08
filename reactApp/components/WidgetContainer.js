import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import all different widgets
// in this file, control which widgets show
import Time from './Time';
// import Weather from './Weather';
import Radio from './Radio';
import News from './News';
import Response from './responseDiv';

class WidgetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hasResponse: true
    };
  }

  determineThreeWidgets() {
     // function to determine which widgets show
  }

  render () {
     // in future, only show three components,
     // for now, test out widgets here!
	console.log("ACTIVE", this.props.isActive);
    return(
      <div className="outerDiv" id="q">
			{this.props.isActive ? <h1> Active </h1> : <div></div>}
           <div className={this.props.isActive ? 'isActiveDiv' : 'isStandbyDiv'}>
			<ReactCSSTransitionGroup transitionName = "example"
                 transitionAppear = {true} transitionAppearTimeout = {2000}
                 transitionEnter = {false} transitionLeave = {false}>
					<Time timeState={this.props.isActive}/>
					{/*<Weather weatherState={this.props.isActive}/>*/}
           </ReactCSSTransitionGroup>
          </div>
          {/*<div className={this.props.isActive ? 'responseDiv' : 'widgetsStandby'}>
              { this.state.hasResponse && <div className="rDiv"><Response /></div> }
          </div>*/}
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
