import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './styles.module.scss';

const PasswordBox = props => {
  return (
    <Row className={styles.passwordBox}>
      <Col className={styles.password} xs={9}>
        Some password here
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <FontAwesomeIcon icon="copy" size="2x" color="#197bff" />
        </div>
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <FontAwesomeIcon icon="redo" size="2x" color="#197bff" />
        </div>
      </Col>
    </Row>
  );
};
export default PasswordBox;
