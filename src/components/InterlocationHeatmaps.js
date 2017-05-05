//! Renders a heatmap displaying the correlation of the same features of a different regions to each other

import React from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
const ReactHighcharts = require('react-highcharts');
require('highcharts/modules/heatmap.js')(ReactHighcharts.Highcharts);
console.log(require('highcharts-heatmap'));
const _ = require('lodash');

import { calcIntraCorrelations } from '../utils/calc';

class InterlocationHeatmaps extends React.Component {
  constructor(props) {
    super(props);

    this.afterRender = this.afterRender.bind(this);
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  render() {
    // const config = {
    //   chart: {
    //     type: 'heatmap',
    //     height: .5 * this.props.containerWidth,
    //     marginTop: 40,
    //     marginBottom: 80,
    //     plotBorderWidth: 1
    //   },
    //   title: {
    //     text: `Interlocation Feature Correlation Heatmap`,
    //   },
    //   xAxis: {
    //     title: null,
    //     categories: labels,
    //   },
    //   yAxis: {
    //     title: null,
    //     categories: labels,
    //   },
    //   colorAxis: {
    //     min: -1,
    //     max: 1,
    //     stops: [
    //       [0, '#FF0000'],
    //       [.5, '#FFFFFF'],
    //       [0.99999999, '#0000FF'],
    //       [1, '#ABABAB'],
    //     ],
    //   },
    //   legend: {
    //     align: 'right',
    //     layout: 'vertical',
    //     margin: 0,
    //     verticalAlign: 'top',
    //     y: 25,
    //     symbolHeight: 280
    //   },
    //   tooltip: {
    //     formatter: function () {
    //       return `<b>${this.series.xAxis.categories[this.point.x]} vs ${this.series.xAxis.categories[this.point.y]}<br><b>` +
    //         `${this.point.value.toFixed(4)}</b>`;
    //     }
    //   },
    //   series: [{
    //     borderWidth: 1,
    //     data: chartData,
    //     name: 'Feature Correlations',
    //     dataLabels: {
    //       enabled: true,
    //       format: '{point.value:.4f}',
    //       color: '#000000'
    //     },
    //   }],
    // };
    return <div />
  }
}

export default InterlocationHeatmaps;
