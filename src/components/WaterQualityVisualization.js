//! Displays a visualization of the water quality observations

const _ = require('lodash');
import React from 'react';
const ReactHighcharts = require('react-highcharts');

/**
 * Filters all elements of a feature and replaces falsey values with `null`
 */
function replaceNulls(data, key) {
  return _.map(data, obs => {
    if(obs[key]) {
      return +obs[key];
    } else if(obs[key] == '') {
      return null;
    }
  });
}

class WaterQualityVisualization extends React.Component {
  render() {
    console.log(_.map(this.props.data, 'waterTemp'));
    const config = {
      series: [
        {
          data: replaceNulls(this.props.data, 'waterTemp'),
          name: 'Water Temperature'
        },
      ],
      title: {
        text: 'Water Quality Visualization',
      }
    };

    return (
      <ReactHighcharts config={config} />
    );
  }
}

WaterQualityVisualization.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default WaterQualityVisualization;
