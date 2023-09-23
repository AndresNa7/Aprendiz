import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = ({ labelText = 'Password' }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <TextField
        id="outlined-password"
        label={labelText}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderBottom: '1px solid #000', // Añade una línea inferior
          },
        }}
        sx={{
          width: '100%', // Cambia el tamaño de la caja del TextField aquí
          '& .MuiInputLabel-root': {
            color: 'black', // Cambia el color de la etiqueta
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'blue',
              border: 'none !important' // Cambia el color del borde cuando no está enfocado
            },
            '&:hover fieldset': {
              borderColor: 'green',// Cambia el color del borde cuando se pasa el cursor sobre el TextField
            },
            '&.Mui-focused fieldset': {
              borderColor: 'red', // Cambia el color del borde cuando el TextField está enfocado
            },
          },
        }}
      />
    </div>
  );
};

export default Password;


