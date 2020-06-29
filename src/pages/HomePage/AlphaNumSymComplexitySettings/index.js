import React, { useRef, useState } from 'react'
import capitalize from 'lodash/capitalize'
import map from 'lodash/map'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Overlay from 'react-bootstrap/Overlay'
import Row from 'react-bootstrap/Row'
import CustomRadioButton from '../../../components/CustomRadioButton'

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
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const showTooltip = () => setIsTooltipVisible(true)
  const hideTooltip = () => setIsTooltipVisible(false)

  const target = useRef(null)
  const easyToReadLabel = (
    <label ref={target} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {'Easy to read'}
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
        <Overlay
          target={target.current}
          show={isTooltipVisible}
          placement="right"
        >
          {({
            placement,
            scheduleUpdate,
            arrowProps,
            outOfBoundaries,
            show: _show,
            ...props
          }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Hides difficult to read characters such as 1, l, 0 or O
            </div>
          )}
        </Overlay>

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
