//! Displays a line plot visualization of the water quality observations

const _ = require('lodash');
import React from 'react';
const ReactHighcharts = require('react-highcharts');

import { replaceNulls } from '../utils/calc';

class LinePlot extends React.Component {
  constructor(props) {
    super(props);

    this.afterRender = this.afterRender.bind(this);
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  render() {
    const config = {
      // TODO: Implement multiple Y axises for each data point
      // TODO: Actually user timestamp data for the X axis
      series: [{
        data: replaceNulls(this.props.data, 'waterTemp'),
        name: 'Water Temperature',
      }, {
        data: replaceNulls(this.props.data, 'turbidity'),
        name: 'Turbidity',
      }, {
        data: replaceNulls(this.props.data, 'pH'),
        name: 'pH',
      }, {
        data: replaceNulls(this.props.data, 'ClConc'),
        name: 'Chlorine Concentration',
      }, {
        data: replaceNulls(this.props.data, 'DOPercent'),
        name: 'Dissolved Oxygen Percentage',
      }, {
        data: replaceNulls(this.props.data, 'DOMgL'),
        name: 'Dissolved Oxygen Mg/L',
      }],
      title: {
        text: 'Water Quality Feature Comparison',
      },
    };

    return (
      <ReactHighcharts config={config} callback={this.afterRender} />
    );
  }
}

LinePlot.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  initialScroll: React.PropTypes.number.isRequired,
};

export default LinePlot;
