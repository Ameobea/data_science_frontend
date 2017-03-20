//! Various helper error messages and other error-related routines

import React from 'react';

const CritError = ({additionalError}) => {
  let extra;
  if(additionalError) {
    extra = (
      <div>
        {'Please include this error message in the email: '}
        <code>{additionalError}</code>
      </div>
    );
  } else {
    extra = <div />
  }

  return (
    <div>
      <h4>{'An unhandled error has occured!'}</h4>
      <p>{'I\'m very sorry; something broke inside the application that shouldn\'t have.'}
        {'If you send me an email at casey.primozic@valpo.edu, I\'d love to solve this problem and fix it for.'}
      </p>
      {extra}
    </div>
  );
};

CritError.propTypes = {
  additionalError: React.PropTypes.string,
};

export default {
  critError: critError,
};
