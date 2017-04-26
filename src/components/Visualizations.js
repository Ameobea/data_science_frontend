//! Creates the visualizations used to show the historical progression of stored data, demonstrate correlations
//! between different features, and the same features in different locations.  This component serves as a parent
//! to the individual graphs which are separated using tabs.

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import LinePlot from './LinePlot';
import RegionHeatmaps from './RegionHeatmaps';

class Visualizations extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = this.handleTabSelect.bind(this);

    this.state = {initialScroll: 0};
  }

  handleTabSelect(key) {
    const doc = document.documentElement;
    const scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    this.setState({initialScroll: scrollTop});
  }

  render() {
    return (
      <div style={{backgroundColor: '#f2e4f3'}}>
        <Tabs
          defaultActiveKey={1}
          animation={false}
          id='visualization-tabs'
          onSelect={this.handleTabSelect}
        >
          <Tab eventKey={1} title='Line Plot'>
            <LinePlot data={this.props.data} initialScroll={this.state.initialScroll} />
          </Tab>
          <Tab eventKey={2} title='Inter-region Heatmaps'>
            <RegionHeatmaps data={this.props.data} initialScroll={this.state.initialScroll} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Visualizations.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default Visualizations;
