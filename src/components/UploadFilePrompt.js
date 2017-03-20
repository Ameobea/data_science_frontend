//! Creates a modal that pops up and requests that the user upload a file containing the data set to continue.

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FileReaderInput from 'react-file-reader-input';

/**
 * A modal that is created to allow users to select a pre-existing data file to use to populate the database.
 * @param {bool} fileUploaded - false if there has not yet been a file selected (or the file isn't in the proper format for the tool)
 * @param {func} onSelectFile - function that should be called after the user selects a file to upload.
 */
const UploadFilePrompt = ({onSelectFile}) => {
  return (
    <div className='static-modal'>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{'Upload Data File'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {'Please upload the file containing the saved data.'}
        </Modal.Body>

        <Modal.Footer>
          <FileReaderInput as='text' onChange={onSelectFile}>
            <Button bsStyle='primary'>{'Upload File'}</Button>
          </FileReaderInput>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

UploadFilePrompt.propTypes = {
  onSelectFile: React.PropTypes.func.isRequired,
};

export default UploadFilePrompt;
