import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSpring, animated } from '@react-spring/web';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SpringModal({ buttonText, modalTitle, modalContent }) {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleAccept = () => {
    // Puedes agregar lógica aquí para manejar la aceptación de políticas
    // Por ejemplo, enviar una solicitud al servidor o guardar el estado en el cliente.
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: 'black', textDecoration: 'underline'}}>
      
       {buttonText}
      </Button> 
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2" >
              {modalTitle}
            </Typography>
            
            {/* Envuelve el contenido en un div y aplica estilos a ese div */}
            <div style={{ maxHeight: '300px', overflowY: 'auto', displey: 'flex', justifyContent: 'flex-start'  }}>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                {modalContent}
              </Typography>
            </div>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="He leído y acepto las políticas."
            />
            <Button
              onClick={handleAccept}
              disabled={!isChecked}
              sx={{ mt: 2 }}
            >
              Aceptar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

SpringModal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalContent: PropTypes.string.isRequired,
};

export default SpringModal;

