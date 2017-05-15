//! Displays a line plot visualization of the water quality observations

const _ = require('lodash');
import React from 'react';
const ReactHighcharts = require('react-highcharts');
import { DropdownButton, MenuItem } from 'react-bootstrap';

class LinePlot extends React.Component {
  constructor(props) {
    super(props);

    const locations = _.map(_.uniqBy(props.data, 'Location'), 'Location');

    this.afterRender = this.afterRender.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);

    this.state = {selectedLocation: locations[0], locations};
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  handleLocationSelect(location) {
    this.setState({selectedLocation: location});
  }

  render() {
    const data = _.filter(this.props.data, datum => datum.Location == this.state.selectedLocation);

    const config = {
      // TODO: Implement multiple Y axises for each data point
      xAxis: {
        type: 'datetime'
      },
      series: [{
        data: _.map(data, obs => [obs.date, obs['Air temperature']]),
        name: 'Air Temperature (C)',
      }, {
        data: _.map(data, obs => [obs.date, obs['Water temperature']]),
        name: 'Water Temperature (C)',
      }, {
        data: _.map(data, obs => [obs.date, obs['Wind speed']]),
        name: 'Wind Speed (kph)',
        visible: false,
      }, {
        data: _.map(data, obs => [obs.date, obs['Amount of last rainfall']]),
        name: 'Amount of Last Rainfall (mm)',
        visible: false,
      }, {
        data: _.map(data, obs => [obs.date, obs['Water flow']]),
        name: 'Water flow (m/s)',
        visible: false,
      }, {
        data: _.map(data, obs => [obs.date, obs['Turbidity']]),
        name: 'Turbidity (cm)',
        visible: false,
      }],
      title: {
        text: 'Water Quality Feature Comparison',
      },
    };

    return (
      <div>
        <center>
          Selected Location:{'  '}
          <DropdownButton
            bsStyle='default'
            title={this.state.selectedLocation}
            onSelect={this.handleLocationSelect}
            id='locations-dropdown'
          >
            {_.map(this.state.locations, location => <MenuItem eventKey={location} key={location}>{location}</MenuItem>)}
          </DropdownButton>
        </center>
        <ReactHighcharts config={config} callback={this.afterRender} isPureConfig />
        <p>Click on the names of the features above to show/hide them</p>
      </div>
    );
  }
}

LinePlot.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  initialScroll: React.PropTypes.number.isRequired,
};

export default LinePlot;
