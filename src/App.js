//! Client application to interact with, analyze, and add to the project's data set

import React from 'react';

import './App.css';
import UploadFilePrompt from './components/UploadFilePrompt';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: false,
    };

    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  /**
   * Read in the supplied file and attempt to load it into the database.
   */
  handleFileSelect(event, results) {
    var r = new FileReader();
    r.onload = e => {
      // load the contents of the file into `contents`
      var contents = e.target.result;
      console.log(contents);
    };

    r.readAsText(results[0][1]);
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>{'Data Science 101 Project GUI'}</h2>
        </div>

        <div className='content'>
          <UploadFilePrompt fileUploaded={this.state.fileUploaded} onSelectFile={this.handleFileSelect} />
        </div>
      </div>
    );
  }
}

export default App;
