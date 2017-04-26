//! Renders a heatmap displaying the correlation of the features of a single region to each other

import React from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
const ReactHighcharts = require('react-highcharts');
const _ = require('lodash');

import { calcIntraCorrelations } from '../utils/calc';

class RegionHeatmaps extends React.Component {
  constructor(props) {
    super(props);
    this.afterRender = this.afterRender.bind(this);
    this.state = {locations: [], selectedLocation: null};
  }

  componentWillReceiveProps(nextProps) {
    // determine a list of available locations based on the data
    const locations = _.map(_.uniqBy(nextProps.data, 'location'), 'location');
    this.setState({locations: locations, selectedLocation: locations[0]});
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  render() {
    // calculate the correlations for all of the features for the selected location
    const locationData = _.filter(this.props.data, ({location}) => location == this.state.selectedLocation);
    const correlData = calcIntraCorrelations(locationData);

    const config = {
      chart: {
        type: 'heatmap',
      },
      title: {
        text: 'Water Quality Visualization',
      },
      series: [
        {
          data: correlData,
          name: 'waterTemp'
        },
      ],
    };

    const locationOptions = _.map(this.state.locations, location => {
      return <MenuItem eventKey={location} key={location}>{location}</MenuItem>;
    });

    return (
      <div>
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

RegionHeatmaps.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  initialScroll: React.PropTypes.number.isRequired,
};

export default RegionHeatmaps;
