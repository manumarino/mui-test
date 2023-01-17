import { Button } from '@mui/material';
import React, {useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DebModal from './DebModal';

//API create
const apiCallCreate = (data)=> {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        resolve("Data de la api: " + data);
      }, 3000)
    });
    }
  //API create

function TableRowCreationButton({buttonMessage, innerMessage}) {

    //modal creacion
    const [openCreate, setOpenCreate] = useState(false);
    const openCreateModal = ()=>{
    setOpenCreate(true);
    }
    const closeCreateModal = ()=>{
    setOpenCreate(false);
    }
    const handleConfirmCreate = ()=> {
    return apiCallCreate('algo').then((response) => {
        alert("Recibimos esta response: " + response);
        // y talvez queremos cerrar el modal
        //closeModal();
    })
    }
    const handleRejectCreate = ()=> {
    // hacemos cosas cuando se aprieta rechazar
    alert("rechazaste el modal")
    // pero esta vez no lo cerramos
    }
    //modal creacion



  return (
    <>
      <Button sx={{gap:'0.5rem'}}
          variant='contained'
          color='secondary'
          size='small'
          onClick={openCreateModal}
          >
            <AddBoxIcon/>
            {buttonMessage}
        </Button>
        <DebModal
        open={openCreate}
        onClose={closeCreateModal}
        onConfirm={handleConfirmCreate}
        onReject={handleRejectCreate}
        onResponse={closeCreateModal}
        > {innerMessage} </DebModal>
    </>
  )
}

export default TableRowCreationButton
