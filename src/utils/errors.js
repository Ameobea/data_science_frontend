//! Various helper error messages and other error-related routines

import React from 'react';
import { Alert } from 'react-bootstrap';
const _ = require('lodash');

const CritError = ({additionalError}) => {
  let extra;
  if(additionalError) {
    if(!_.isString(additionalError))
      additionalError = JSON.stringify(additionalError);
    console.log(additionalError);
    extra = (
      <div>
        {'Please include this error message in the email: '}
        <code>{additionalError}</code>
      </div>
    );
  } else {
    extra = <div />;
  }

  return (
    <Alert bsStyle='danger'>
      <h4>{'An unhandled error has occured!'}</h4>
      <p>{'I\'m very sorry; something broke inside the application that shouldn\'t have.'}
        {'If you send me an email at '}
        <a href='mailto:casey.primozic@valpo.edu'>{'casey.primozic@valpo.edu'}</a>
        {', I\'d love to solve this problem and fix it for.'}
      </p>
      {extra}
    </Alert>
  );
};

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

CritError.propTypes = {
  additionalError: React.PropTypes.any,
};

CritError.defaultProps = {
  additionalError: '',
};

export { CritError, ErrorMessage };
