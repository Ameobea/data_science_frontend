//! Creates the visualizations used to show the historical progression of stored data, demonstrate correlations
//! between different features, and the same features in different locations.  This component serves as a parent
//! to the individual graphs which are separated using tabs.

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import LinePlot from './LinePlot';
import IntralocationHeatmaps from './IntralocationHeatmaps';
import InterlocationHeatmaps from './InterlocationHeatmaps';
import DataExport from './DataExport';

class Visualizations extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleContainerRef = this.handleContainerRef.bind(this);
    // dummy value until the dom renders
    this.container = {clientWidth: 0};

    this.state = {initialScroll: 0};
  }

  handleTabSelect(key) {
    const doc = document.documentElement;
    const scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    this.setState({initialScroll: scrollTop});
  }

  handleContainerRef(container) {
    this.container = container;
  }

  render() {
    return (
      <div style={{backgroundColor: '#f2e4f3', paddingBottom: '20px'}} ref={this.handleContainerRef}>
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
            <IntralocationHeatmaps
              data={this.props.data}
              initialScroll={this.state.initialScroll}
              containerWidth={this.container.clientWidth}
            />
          </Tab>
          <Tab eventKey={3} title='Intra-region Heatmaps'>
            <InterlocationHeatmaps
              data={this.props.data}
              initialScroll={this.state.initialScroll}
              containerWidth={this.container.clientWidth}
            />
          </Tab>
          <Tab eventKey={4} title='Data Export'>
            <DataExport />
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
