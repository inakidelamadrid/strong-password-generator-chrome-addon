import React, { useContext } from 'react'
import PasswordContext from '../../context/PasswordContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styles from './styles.module.scss'

const PasswordBox = () => {
  const values = useContext(PasswordContext)

  return (
    <Row className={styles.passwordBox}>
      <Col className={styles.password} xs={9}>
        {values.password}
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <button className={styles.actionButton}>
            <FontAwesomeIcon icon="copy" size="2x" color="#197bff" />
          </button>
        </div>
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <button className={styles.actionButton}>
            <FontAwesomeIcon icon="redo" size="2x" color="#197bff" />
          </button>
        </div>
      </Col>
    </Row>
  )
}
export default PasswordBox
