import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Autocomplete.css';
export default function AutoComplete({ nombre, array, obligatorio }) {
  const [value, setValue] = React.useState(null); 
  return (
    <Autocomplete
      className='autocomplete'
      disablePortal
      id="Campo-autocomplete"
      options={array}
      value={value} 
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ m: 1, width: '25ch' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={nombre}
          required={obligatorio} 
      
        />
      )}
    />
  );
}

