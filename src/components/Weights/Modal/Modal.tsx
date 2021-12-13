import react, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useWeightsState } from '../../../subscribers/weights'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  description: string
}

export default function BasicModal({ description }: Props) {
  const [{ modalVisible, name }, { setModalVisibility, setName }] = useWeightsState()
  const [message, setMessage] = useState<string>('')

  const handleClose = () => {
    if (name === '') {
      setMessage('Należy uzupełnić imię')
      return
    }
    setModalVisibility(false);
  }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
      setMessage('')
    }

  return (
    <div>
      <Modal
        open={modalVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wstęp przed wypełnieniem formularza
          </Typography>
          <Typography style={{ marginTop: '10px' }}>{message}</Typography>
          <TextField variant="outlined" label="Imię" onChange={handleInputChange} style={{ marginBottom: '20px'}}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Button style={{ marginTop: '10px'}} onClick={handleClose}>
            Zamknij
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
