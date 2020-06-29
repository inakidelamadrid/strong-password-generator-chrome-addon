import React, { useState, useContext } from 'react'
import PasswordContext from '../../context/PasswordContext'
import concat from 'lodash/concat'
import difference from 'lodash/difference'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { INITIAL_PASSWORD_LENGTH } from '../../globals'
import styles from './styles.module.css'
import AlphaNumSymComplexitySettings from './AlphaNumSymComplexitySettings'
import {
  CHARACTER_GROUPS_VALUES,
  CHARACTER_TYPES,
} from './AlphaNumSymComplexitySettings'

import ExcludeCharactersSelect from '../../components/ExcludeCharactersSelect'
import PasswordBox from '../../components/PasswordBox'

const NUMBERS_AND_SYMBOLS_GROUP_TYPES = [
  CHARACTER_TYPES.number,
  CHARACTER_TYPES.symbols,
]
const HomePage = (props) => {
  const { setPasswordLength, setContextSelectedTypes } = useContext(
    PasswordContext
  )
  const [digitsLength, setDigitsLength] = useState(INITIAL_PASSWORD_LENGTH)

  const [disabledCharTypes, setDisabledCharTypes] = useState([
    NUMBERS_AND_SYMBOLS_GROUP_TYPES,
  ])

  const [selectedCharacterGroup, setSelectedCharacterGroup] = useState(
    CHARACTER_GROUPS_VALUES.easyToSay
  )

  const [selectedCharTypes, setSelectedCharTypes] = useState([
    CHARACTER_TYPES.lower,
    CHARACTER_TYPES.upper,
  ])

  const handleDigitsLengthChange = (evt) => {
    const length = evt.target.value

    setPasswordLength(length)
    setDigitsLength(length)
  }

  const handleCharacterGroupOptionsChange = (changeEvent) => {
    const value = changeEvent.target.value
    const charTypesToDisable =
      value === CHARACTER_GROUPS_VALUES.easyToSay
        ? NUMBERS_AND_SYMBOLS_GROUP_TYPES
        : []
    setDisabledCharTypes(charTypesToDisable)

    // if disabled types were checked, remove them from the selectedTypes
    setSelectedCharTypes(difference(selectedCharTypes, charTypesToDisable))
    setSelectedCharacterGroup(changeEvent.target.value)
  }

  const handleCharacterTypeChange = (changeEvent) => {
    const { value, checked } = changeEvent.target

    // do nothing for the 'lower' value, since we need to have at least one selected type
    if (value === CHARACTER_TYPES.lower) return

    const action = checked ? concat : difference
    const newSelectedCharTypes = action(selectedCharTypes, [value])

    // update internal state (modifies UI) and then
    // recalculate password by modifying context' state
    setSelectedCharTypes(newSelectedCharTypes)
    setContextSelectedTypes(newSelectedCharTypes)
  }

  return (
    <div className="page">
      <h3>Strong password generator</h3>
      <Form>
        <Form.Group as={Row} controlId="digitsLengthRange">
          <Form.Label column xs={4}>
            Number of digits
          </Form.Label>
          <Col xs={7} className={styles.centeredContent}>
            <Form.Control
              type="range"
              min={8}
              max={30}
              onChange={handleDigitsLengthChange}
              value={digitsLength}
            />
          </Col>
          <Col xs={1} className={styles.centeredContent}>
            <div>{digitsLength}</div>
          </Col>
        </Form.Group>
        <AlphaNumSymComplexitySettings
          disabledCharTypes={disabledCharTypes}
          handleCharacterGroupOptionsChange={handleCharacterGroupOptionsChange}
          handleCharacterTypeChange={handleCharacterTypeChange}
          selectedCharacterGroup={selectedCharacterGroup}
          selectedCharTypes={selectedCharTypes}
        />
        <ExcludeCharactersSelect
          show={[
            CHARACTER_GROUPS_VALUES.easyToRead,
            CHARACTER_GROUPS_VALUES.all,
          ].includes(selectedCharacterGroup)}
          disabled={[
            CHARACTER_GROUPS_VALUES.easyToRead,
            CHARACTER_GROUPS_VALUES.easyToSay,
          ].includes(selectedCharacterGroup)}
        />
        <PasswordBox />
      </Form>
    </div>
  )
}
export default HomePage
