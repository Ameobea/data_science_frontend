//! Client application to interact with, analyze, and add to the project's data set

import React from 'react';
import { Alert } from 'react-bootstrap';
const _ = require('lodash');
const PouchDB = require('pouchdb');

import './App.css';
import UploadFilePrompt from './components/UploadFilePrompt';
import WaterDataInput from './components/WaterDataInput';
import loadDb from './utils/loadDb';

var db = new PouchDB('dbname');

/**
 * Displays a big red warning at the top of the application if there is an error to report.  Renders nothing if there is no error.
 */
const ErrorMessage = ({msg}) => {
  if(msg === null) {
    return <div />;
  }

  let content;
  if(_.isString(msg)) {
    content = (<p>{msg}</p>);
  } else {
    content = msg;
  }

  return (
    <Alert bsStyle='danger'>
      {content}
    </Alert>
  );
};

ErrorMessage.propTypes = {
  msg: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]),
};

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
  if(!fileUploaded && error !== null) {
    return (
      <div>
        <ErrorMessage msg={error} />
        <UploadFilePrompt onSelectFile={onFileSelect} />
      </div>
    );
  //} //else if(!fileUploaded) {
   // return <UploadFilePrompt onSelectFile={onFileSelect} />;
  } else if(successStatus) {
    return <Alert bsStyle='success'>{successStatus}</Alert>;
  } else {
    return <div />;
  }
};

TopInfo.propTypes = {
  error: React.PropTypes.string,
  fileUploaded: React.PropTypes.bool.isRequired,
  onFileSelect: React.PropTypes.func.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: false,
      error: null,
    };

    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleError = this.handleError.bind(this);
    this.setSuccessStatus = this.setSuccessStatus.bind(this);
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
        parsed = JSON.parse(contents);
      } catch(e) {
        this.setState({error: 'Unable to parse the supplied file.  Did you pick the right one?'});
      }

      // attempt to load the PouchDB with the parsed data
      loadDb(db, parsed).then(() => {
        this.setState({error: null, fileUploaded: true});
      }).catch(err => {
        this.setState({error: err});
      });
    };

    r.readAsText(results[0][1]);
  }

  handleError(err) {
    this.setState({error: err});
  }

  setSuccessStatus(status) {
    console.log(status);
    this.setState({error: null, successStatus: status});
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>{'Data Science 101 Project GUI'}</h2>
        </div>

        <div className='content'>
          <div className='top'>
            <TopInfo
              error={this.state.error}
              fileUploaded={/* this.state.fileUploaded */true} // temporarily disabled so that we can generate a starting file
              onFileSelect={this.handleFileSelect}
              successStatus={this.state.successStatus}
            />
          </div>
        </div>

        <WaterDataInput db={db} onInputSuccess={this.setSuccessStatus} onError={this.handleError} />
      </div>
    );
  }
}

export default App;
