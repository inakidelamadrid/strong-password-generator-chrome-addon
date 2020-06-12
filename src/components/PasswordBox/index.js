import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';

const PasswordBox = props => {
  return (
    <div className={styles.passwordBox}>
      <div>
        Some password here
      </div>
      <div>
        <FontAwesomeIcon icon="copy" size="2x" />
      </div>
      <div>
        <FontAwesomeIcon icon="redo" size="2x" />
      </div>
    </div>
  );
};
export default PasswordBox;
