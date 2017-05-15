//! Client application to interact with, analyze, and add to the project's data set

import React from 'react';
import { Alert, Tabs, Tab } from 'react-bootstrap';
const _ = require('lodash');
import 'whatwg-fetch';

import './App.css';
import LinePlot from './components/LinePlot';
import MiscPlots from './components/MiscPlots';
import { ErrorMessage } from './utils/errors';

/**
 * Helper component that conditionally displays content in the application based on the application's state.
 */
const Content = ({fileUploaded}) => {
  if(!fileUploaded) {
    return <div />;
  }
};

Content.propTypes = {
  fileUploaded: React.PropTypes.bool.isRequired
};

/**
 * Helper component that decides what to render at the top of the application depending on what stage of setup we're on,
 * the state of any errors, etc.
 */
const TopInfo = ({error, successStatus}) => {
  let errorComp;
  if(React.isValidElement(error)) {
    errorComp = error;
  } else {
    if(error && !_.isString(error)) {
      error = JSON.stringify(error);
    }
    errorComp = error ? <ErrorMessage msg={error} /> : <div />;
  }
  const successComp = successStatus ? <Alert bsStyle='success'>{successStatus}</Alert> : <div />;

  return (
    <div>
      {errorComp}
      {successComp}
    </div>
  );
};

TopInfo.propTypes = {
  error: React.PropTypes.any,
  successStatus: React.PropTypes.string,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: false,
      error: null,
      successStatus: null,
    };

    this.handleError = this.handleError.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleContainerRef = this.handleContainerRef.bind(this);

    // dummy value until the dom renders
    this.container = {clientWidth: 0};
    this.state = {initialScroll: 0};
  }

  componentDidMount() {
    // perform network request to get the JSON file containing all data
    fetch('https://ameo.link/u/4d4.json')
      .then(res => res.json())
      .catch(err => {console.log('Unable to fetch data from remote URL!');})
      .then(body => {
        // preprocess the raw data
        let gradeschoolData = _.map(body.gradeschoolData, datum => {
          // console.log(datum);

          const needsSplit = ['pollution floating in water', 'pollution on banks', 'pollution source', 'Invasive species?'];
          _.each(needsSplit, attr => {
            datum[attr] = datum[attr] ? _.map(datum[attr].split(','), val => val.trim()) : [];
          });

          return {...datum,
            date: new Date(datum['Student Collection Date']).getTime(),
            'Amount of last rainfall': datum['Amount of last rainfall'] * 100,
          };
        });

        this.setState({data: _.sortBy(gradeschoolData, 'date'), successStatus: 'Successfully retrieved data!'});
      }).catch(err => {
        console.error('Error while processing remote data: ');
        console.log(err);
      });
  }

  handleError(err) {
    this.setState({error: err, successStatus: null});
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
    if (!this.state.data) {
      return <b>Loading Data...</b>;
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Water Quality Data Analysis</h2>
        </div>

        <div className='content'>
          <div className='top'>
            <TopInfo
              error={this.state.error}
              successStatus={this.state.successStatus}
            />
          </div>
        </div>

        <div style={{backgroundColor: '#f2e4f3', paddingBottom: '20px'}}>
          <Tabs
            defaultActiveKey={1}
            animation={false}
            id='visualization-tabs'
            onSelect={this.handleTabSelect}
          >
            <Tab eventKey={1} title='Line Plot'>
              <LinePlot data={this.state.data} initialScroll={this.state.initialScroll} />
            </Tab>

            <Tab eventKey={2} title='Visualizations'>
              <MiscPlots data={this.state.data} initialScroll={this.state.initialScroll} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
