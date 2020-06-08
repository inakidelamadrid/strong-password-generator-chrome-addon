import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from './styles.module.css';
import AlphaNumSymComplexitySettings from './AlphaNumSymComplexitySettings';
import {
  CHARACTER_GROUPS_VALUES,
  CHARACTER_TYPES,
} from './AlphaNumSymComplexitySettings';

const NUMBERS_AND_SYMBOLS_GROUP_TYPES = [
  CHARACTER_TYPES.number,
  CHARACTER_TYPES.symbols,
];
const HomePage = props => {
  const [digitsLength, setDigitsLength] = useState(8);

  const [disabledCharTypes, setDisabledCharTypes] = useState(
    NUMBERS_AND_SYMBOLS_GROUP_TYPES,
  );

  const [selectedCharacterGroup, setSelectedCharacterGroup] = useState(
    CHARACTER_GROUPS_VALUES.easyToSay,
  );

  const [selectedCharTypes, setSelectedCharTypes] = useState([
    CHARACTER_TYPES.lower,
    CHARACTER_TYPES.upper,
  ]);

  const handleDigitsLengthChange = evt => setDigitsLength(evt.target.value);

  const handleCharacterGroupOptionsChange = changeEvent => {
    const value = changeEvent.target.value;
    const charTypesToDisable =
      value === CHARACTER_GROUPS_VALUES.easyToSay
        ? NUMBERS_AND_SYMBOLS_GROUP_TYPES
        : [];
    setDisabledCharTypes(charTypesToDisable);
    setSelectedCharacterGroup(changeEvent.target.value);
  };

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
          selectedCharacterGroup={selectedCharacterGroup}
          selectedCharTypes={selectedCharTypes}
        />
      </Form>
    </div>
  );
};
export default HomePage;
