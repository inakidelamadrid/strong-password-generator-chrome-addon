import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AlphaNumSymComplexitySettings = ({
  groupsValues,
  handleCharacterGroupOptionsChange,
  selectedCharacterGroup,
}) => {
  return (
    <Form.Group as={Row} controlId="digitsSensitivity">
      <Col xs={6}>
        <Form.Check
          id={'characters_easy_to_say'}
          label={'Easy to say'}
          type={'radio'}
          checked={selectedCharacterGroup === groupsValues.easyToSay}
          onChange={handleCharacterGroupOptionsChange}
          value={groupsValues.easyToSay}
        />

        <Form.Check
          checked={selectedCharacterGroup === groupsValues.easyToRead}
          id={'characters_easy_to_read'}
          label={'Easy to read'}
          onChange={handleCharacterGroupOptionsChange}
          type={'radio'}
          value={groupsValues.easyToRead}
        />

        <Form.Check
          checked={selectedCharacterGroup === groupsValues.all}
          id={'all_characters'}
          label={'All characters'}
          onChange={handleCharacterGroupOptionsChange}
          type={'radio'}
          value={groupsValues.all}
        />
      </Col>
      <Col xs={6}></Col>
    </Form.Group>
  );
};

export default AlphaNumSymComplexitySettings;
