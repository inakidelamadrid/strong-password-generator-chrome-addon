import React, { useContext, useRef } from 'react'
import PasswordContext from '../../context/PasswordContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styles from './styles.module.scss'

const PasswordBox = () => {
  const passwordEl = useRef(null)
  const {password, regeneratePassword} = useContext(PasswordContext)

  const copyPasswordToClipboard = evt => {
    evt.preventDefault()
    passwordEl.current.select()
    document.execCommand('copy')
  }

  const handleRegeneratePassword = (evt) => {
    evt.preventDefault();
    // regenerate password using context
    regeneratePassword();
  }

  return (
    <Row className={styles.passwordBox}>
      <Col className={styles.password} xs={9}>
        <textarea value={password} readOnly ref={passwordEl} />
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <button
            className={styles.actionButton}
            onClick={copyPasswordToClipboard}
          >
            <FontAwesomeIcon icon="copy" size="2x" color="#197bff" />
          </button>
        </div>
      </Col>
      <Col>
        <div className={styles.centerItems}>
          <button className={styles.actionButton} onClick={handleRegeneratePassword}>
            <FontAwesomeIcon icon="redo" size="2x" color="#197bff" />
          </button>
        </div>
      </Col>
    </Row>
  )
}
export default PasswordBox
