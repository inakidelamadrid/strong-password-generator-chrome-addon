import React, { useState, useContext } from 'react'
import concat from 'lodash/concat'
import difference from 'lodash/difference'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import PasswordContext from '../../context/PasswordContext'
import {
  INITIAL_PASSWORD_LENGTH,
  INITIAL_EXCLUDED_LOWERCASE,
  INITIAL_EXCLUDED_NUMBERS,
  INITIAL_EXCLUDED_UPPERCASE,
} from '../../globals'
import ExcludeCharactersSelect from '../../components/ExcludeCharactersSelect'
import PasswordBox from '../../components/PasswordBox'

import styles from './styles.module.scss'
import AlphaNumSymComplexitySettings from './AlphaNumSymComplexitySettings'
import {
  CHARACTER_GROUPS_VALUES,
  CHARACTER_TYPES,
} from './AlphaNumSymComplexitySettings'

const NUMBERS_AND_SYMBOLS_GROUP_TYPES = [
  CHARACTER_TYPES.number,
  CHARACTER_TYPES.symbols,
]
const HomePage = props => {
  const {
    setPasswordLength,
    setContextSelectedTypes,
    setContextExcludedChars,
  } = useContext(PasswordContext)

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

  const handleDigitsLengthChange = evt => {
    const length = evt.target.value

    setPasswordLength(length)
    setDigitsLength(length)
  }

  const getDisabledTypesAndExcludedSymbols = value => {
    const defaultExcludedChars = {
      excludeLower: INITIAL_EXCLUDED_LOWERCASE,
      excludeNumbers: INITIAL_EXCLUDED_NUMBERS,
      excludeUpper: INITIAL_EXCLUDED_UPPERCASE,
    }
    switch (value) {
      case CHARACTER_GROUPS_VALUES.easyToSay:
        return [NUMBERS_AND_SYMBOLS_GROUP_TYPES, defaultExcludedChars]
      case CHARACTER_GROUPS_VALUES.easyToRead:
        return [[], defaultExcludedChars]
      case CHARACTER_GROUPS_VALUES.all:
        return [[], {}]
      default:
        return [NUMBERS_AND_SYMBOLS_GROUP_TYPES, defaultExcludedChars]
    }
  }

  const handleCharacterGroupOptionsChange = changeEvent => {
    const value = changeEvent.target.value

    /*
     * rules -
     * 1) easy to say: disable numbers and symbols
     * 2) easy to read: exclude 0, 1, l and 0
     * 3) all characters: disabled types and excluded chars are empty
     */
    const [
      charTypesToDisable,
      excludedChars,
    ] = getDisabledTypesAndExcludedSymbols(value)
    setDisabledCharTypes(charTypesToDisable)

    // if disabled types were checked, remove them from the selectedTypes
    const newSelectedCharacterTypes = difference(
      selectedCharTypes,
      charTypesToDisable
    )

    setSelectedCharTypes(newSelectedCharacterTypes)
    setContextSelectedTypes(newSelectedCharacterTypes)
    setSelectedCharacterGroup(value)
    setContextExcludedChars(excludedChars)
  }

  const handleCharacterTypeChange = changeEvent => {
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
        <PasswordBox />
      </Form>
    </div>
  )
}
export default HomePage
