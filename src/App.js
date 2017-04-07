//! Client application to interact with, analyze, and add to the project's data set

import React from 'react';
import { Alert } from 'react-bootstrap';
const _ = require('lodash');
const PouchDB = require('pouchdb');

import './App.css';
import UploadFilePrompt from './components/UploadFilePrompt';
import WaterDataInput from './components/WaterDataInput';
import loadDb from './utils/loadDb';
import { ErrorMessage } from './utils/errors';
import WaterQualityVisualization from './components/WaterQualityVisualization';
import { getAllWaterQualityObservations } from './utils/queryDb';

var db = new PouchDB('dbname');
db.destroy().then(() => {
  db = new PouchDB('dbname');
});

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
const TopInfo = ({error, fileUploaded, onFileSelect, successStatus}) => {
  const fileUploadComp = fileUploaded ? <div /> : <UploadFilePrompt onSelectFile={onFileSelect} />;
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
      {fileUploadComp}
    </div>
  );
};

TopInfo.propTypes = {
  error: React.PropTypes.any,
  fileUploaded: React.PropTypes.bool.isRequired,
  onFileSelect: React.PropTypes.func.isRequired,
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

    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleInputSuccess = this.handleInputSuccess.bind(this);
  }

  /**
   * Read in the supplied file and attempt to load it into the database.
   */
  handleFileSelect(event, results) {
    let r = new FileReader();
    r.onload = e => {
      // load the contents of the file into `contents`
      let contents = e.target.result;
      let parsed;

      try {
        console.log(contents);
        parsed = JSON.parse(contents);
      } catch(e) {
        this.setState({error: 'Unable to parse the supplied file.  Did you pick the right one?'});
      }

      // attempt to load the PouchDB with the parsed data
      loadDb(db, parsed).then(() => {
        this.setState({error: null, fileUploaded: true, successStatus: 'File successfully loaded!'});
        // pull all documents out and parse
        getAllWaterQualityObservations(db).then(data => {
          this.setState({data: data});
        }).catch(err => {
          this.setState({error: err});
        });
      }).catch(err => {
        this.setState({error: err});
      });
    };

    r.readAsText(results[0][1]);
  }

  handleError(err) {
    this.setState({error: err, successStatus: null});
  }

  handleInputSuccess(status) {
    getAllWaterQualityObservations(db).then(data => {
      this.setState({data: data, error: null, successStatus: status});
    }).catch(err => {
      this.setState({error: err});
    });
  }

  render() {
    const content = this.state.fileUploaded
      ? <WaterDataInput db={db} onError={this.handleError} onInputSuccess={this.handleInputSuccess} />
      : <div />;

    const viz = this.state.data
      ? <WaterQualityVisualization data={this.state.data} />
      : <div />;

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>{'Data Science 101 Project GUI'}</h2>
        </div>

        <div className='content'>
          <div className='top'>
            <TopInfo
              error={this.state.error}
              fileUploaded={this.state.fileUploaded} // temporarily disabled so that we can generate a starting file
              onFileSelect={this.handleFileSelect}
              successStatus={this.state.successStatus}
            />
          </div>
        </div>

        {content}
        {viz}
      </div>
    );
  }
}

export default App;
