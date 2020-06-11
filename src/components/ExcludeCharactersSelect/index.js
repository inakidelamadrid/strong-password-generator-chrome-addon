import React from 'react';
import Form from 'react-bootstrap/Form';

const ExcludeCharactersSelect = props => {
  return (
    <Form.Group>
      <Form.Label>Exclude the following characters</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
  );
};
export default ExcludeCharactersSelect;
