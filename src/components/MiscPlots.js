//! Draws some misc. visualizations using the data including stuff like bar charts, pie charts, and other fun stuff.

import React, { Component } from 'react';
const _ = require('lodash');
const ReactHighcharts = require('react-highcharts');

export class MiscPlots extends Component {
  constructor(props) {
    super(props);

    const species = _.filter(_.uniq(_.flatten(_.map(props.data, 'Invasive species?'))), species => species !== null);
    let location0 = props.data[0].Location;
    let location1;
    const counts0 = [];
    _.each(species, () => {counts0.push(0);});
    const counts1 = _.cloneDeep(counts0);

    _.each(props.data, obs => {
      _.each(obs['Invasive species?'], s => {
        if(_.includes(species, s)) {
          if(obs.Location == location0){
            counts0[species.indexOf(s)] += 1;
          } else {
            location1 = obs.Location;
            counts1[species.indexOf(s)] += 1;
          }
        }
      });
    });

    this.InvasiveVizConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Water Quality Feature Comparison',
      },
      xAxis: {
        categories: species,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          }
        }
      },
      series: [{
        name: location0,
        data: counts0,
      }, {
        name: location1,
        data: counts1,
      }],
    };

    this.afterRender = this.afterRender.bind(this);
  }

  afterRender() {
    // rendering the chart has the unfortunate effect of scrolling the window, so reset it to what it was before
    window.scrollTo(0, this.props.initialScroll);
  }

  render() {
    return (
      <ReactHighcharts config={this.InvasiveVizConfig} callback={this.afterRender} isPureConfig />
    );
  }
}

export default MiscPlots;
