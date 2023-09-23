import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function Politicas() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} 
          label={
            <span>
              Políticas de Seguridad <span style={{ color: 'red' }}>*</span>
            </span>
          }
        />
      </FormGroup>

      {isChecked && (
        <Typography variant="body1">
          Este es el texto de las políticas de seguridad.
          Puedes agregar aquí cualquier información relevante.
        </Typography>
      )}
    </div>
  );
}
