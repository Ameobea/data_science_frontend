//! Renders a heatmap displaying the correlation of the features of a single region to each other

import React from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
const ReactHighcharts = require('react-highcharts');
require('highcharts/modules/heatmap.js')(ReactHighcharts.Highcharts);
console.log(require('highcharts-heatmap'));
const _ = require('lodash');

import { calcIntraCorrelations } from '../utils/calc';

class IntralocationHeatmaps extends React.Component {
  constructor(props) {
    super(props);

    this.afterRender = this.afterRender.bind(this);

    // determine a list of available locations based on the data
    const locations = _.map(_.uniqBy(props.data, 'location'), 'location');
    this.state = {locations: locations, selectedLocation: locations[0]};

    // this.state = {locations: [], selectedLocation: null};
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  render() {
    // calculate the correlations for all of the features for the selected location
    const locationData = _.filter(this.props.data, ({location}) => location == this.state.selectedLocation);
    const correlData = calcIntraCorrelations(locationData);

    const labels = Object.keys(correlData);
    const chartData = [];
    // map the object-based `correlData` to the array-based data necessary for the chart
    _.each(labels, (label, i) => {
      _.each(labels, (label2, j) => {
        chartData.push([i, j, correlData[label][label2]]);
      });
    });

    console.log(chartData);
    console.log(labels);

    const config = {
      chart: {
        type: 'heatmap',
        height: .5 * this.props.containerWidth,
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },
      title: {
        text: `Intralocation Feature Correlation Heatmap`,
      },
      xAxis: {
        title: null,
        categories: labels,
      },
      yAxis: {
        title: null,
        categories: labels,
      },
      colorAxis: {
        min: -1,
        max: 1,
        stops: [
          [0, '#FF0000'],
          [.5, '#FFFFFF'],
          [0.99999999, '#0000FF'],
          [1, '#ABABAB'],
        ],
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.series.xAxis.categories[this.point.x]} vs ${this.series.xAxis.categories[this.point.y]}<br><b>` +
            `${this.point.value.toFixed(4)}</b>`;
        }
      },
      series: [{
        borderWidth: 1,
        data: chartData,
        name: 'Feature Correlations',
        dataLabels: {
          enabled: true,
          format: '{point.value:.4f}',
          color: '#000000'
        },
      }],
    };

    console.log(config);

    const locationOptions = _.map(this.state.locations, location => {
      return <MenuItem eventKey={location} key={location}>{location}</MenuItem>;
    });

    return (
      <div ref={this.handleContainerRef}>
        <Grid>
          <Row className='region-heatmaps-gui'>
            <Col xs={12} sm={12} md={12}>
              <DropdownButton bsSize='large' title='Select Location' id='location-select'>
                {locationOptions}
              </DropdownButton>
            </Col>
          </Row>
        </Grid>

        <ReactHighcharts config={config} callback={this.afterRender} />
      </div>
    );
  }
}

IntralocationHeatmaps.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  initialScroll: React.PropTypes.number.isRequired,
};

export default IntralocationHeatmaps;
