import React from 'react';
import Form from 'react-bootstrap/Form';

const CustomRadioButton = ({checked, id, label, handleChange, value}) => {
  return (
    <Form.Check
      id={id}
      label={label}
      type={'radio'}
      checked={checked}
      onChange={handleChange}
      value={value}
    />
  );
};
export default CustomRadioButton;
