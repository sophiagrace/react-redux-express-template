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
      <div className="outerDiv">
          

	 </div>
    );
  }
}

export default WidgetContainer;
