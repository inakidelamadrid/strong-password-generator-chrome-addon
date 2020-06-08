import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from './styles.module.css';

const CHARACTER_GROUPS_VALUES = {
  all: 'all',
  easyToRead: 'easyToRead',
  easyToSay: 'easyToSay',
};

const HomePage = props => {
  const [digitsLength, setDigitsLength] = useState(8);
  const [selectedCharacterGroup, setSelectedCharacterGroup] = useState(
    CHARACTER_GROUPS_VALUES.easyToSay,
  );

  const handleDigitsLengthChange = evt => setDigitsLength(evt.target.value);
  const handleCharacterGroupOptionsChange = changeEvent =>
    setSelectedCharacterGroup(changeEvent.target.value);

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
        <Form.Group as={Row} controlId="digitsSensitivity">
          <Col xs={6}>
            <Form.Check
              id={'characters_easy_to_say'}
              label={'Easy to say'}
              type={'radio'}
              checked={
                selectedCharacterGroup === CHARACTER_GROUPS_VALUES.easyToSay
              }
              onChange={handleCharacterGroupOptionsChange}
              value={CHARACTER_GROUPS_VALUES.easyToSay}
            />

            <Form.Check
              checked={
                selectedCharacterGroup === CHARACTER_GROUPS_VALUES.easyToRead
              }
              id={'characters_easy_to_read'}
              label={'Easy to read'}
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
          <Col xs={6}></Col>
        </Form.Group>
      </Form>
    </div>
  );
};
export default HomePage;
