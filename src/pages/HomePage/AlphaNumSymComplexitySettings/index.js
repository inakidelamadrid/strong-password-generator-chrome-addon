import React from 'react'
import capitalize from 'lodash/capitalize'
import map from 'lodash/map'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import CustomRadioButton from '../../../components/CustomRadioButton'
import IconWithTooltip from '../../../components/IconWithTooltip'

export const CHARACTER_GROUPS_VALUES = {
  all: 'all',
  easyToRead: 'easyToRead',
  easyToSay: 'easyToSay',
}

export const CHARACTER_TYPES = {
  lower: 'lowercase',
  upper: 'uppercase',
  number: 'numbers',
  symbols: 'symbols',
}

const AlphaNumSymComplexitySettings = ({
  disabledCharTypes,
  handleCharacterGroupOptionsChange,
  handleCharacterTypeChange,
  selectedCharacterGroup,
  selectedCharTypes,
}) => {
  const easyToReadLabel = (
    <label>
      {'Easy to read'} <IconWithTooltip />
    </label>
  )

  return (
    <Form.Group as={Row} controlId="digitsSensitivity">
      <Col xs={6}>
        <CustomRadioButton
          id={'characters_easy_to_say'}
          label={'Easy to say'}
          checked={selectedCharacterGroup === CHARACTER_GROUPS_VALUES.easyToSay}
          handleChange={handleCharacterGroupOptionsChange}
          value={CHARACTER_GROUPS_VALUES.easyToSay}
        />

        <Form.Check
          checked={
            selectedCharacterGroup === CHARACTER_GROUPS_VALUES.easyToRead
          }
          id={'characters_easy_to_read'}
          label={easyToReadLabel}
          onChange={handleCharacterGroupOptionsChange}
          type={'radio'}
          value={CHARACTER_GROUPS_VALUES.easyToRead}
        />

        <Form.Check
          checked={selectedCharacterGroup === CHARACTER_GROUPS_VALUES.all}
          id={'all_characters'}
          label={'All characters'}
          onChange={handleCharacterGroupOptionsChange}
          type={'radio'}
          value={CHARACTER_GROUPS_VALUES.all}
        />
      </Col>
      <Col xs={6}>
        {map(CHARACTER_TYPES, (value, key) => (
          <Form.Check
            checked={selectedCharTypes.includes(value)}
            disabled={disabledCharTypes.includes(value)}
            id={`character_type_${key}`}
            key={`cb_${key}`}
            label={capitalize(value)}
            onChange={handleCharacterTypeChange}
            type={'checkbox'}
            value={value}
          />
        ))}
      </Col>
    </Form.Group>
  )
}

export default AlphaNumSymComplexitySettings
