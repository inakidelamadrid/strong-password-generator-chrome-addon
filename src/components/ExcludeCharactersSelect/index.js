// This componnet will customize the select component using the package below
// https://react-select.com/home
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const baseExcludedChars = [
  {value: '1', label: '1 ("one")'},
  {value: 'l', label: 'l ("lowercase l")'},
  {value: '0', label: '0 ("zero")'},
  {value: 'O', label: 'O ("uppercase o")'},
];

const ExcludeCharactersSelect = ({disabled=false, show = true}) => {
  const [options,] = useState(baseExcludedChars);

  return (
    show && (
      <Form.Group>
        <Form.Label>Exclude the following characters</Form.Label>
        <Select
          className="basic-multi-select"
          classNamePrefix="select"
          defaultValue={baseExcludedChars}
          isDisabled={disabled}
          isMulti
          name="excludedChars"
          options={options}
        />
      </Form.Group>
    )
  );
};
export default ExcludeCharactersSelect;
