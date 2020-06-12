import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const PasswordBox = props => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon="copy" size="2x" />
      </div>
      <div>
        <FontAwesomeIcon icon="redo" size="2x" />
      </div>
      <div></div>
    </div>
  );
};
export default PasswordBox;
