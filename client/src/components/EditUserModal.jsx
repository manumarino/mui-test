import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DebModal from './DebModal';

//API edit
const apiCallEdit = (data)=> {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        resolve("Data de la api: " + data);
      }, 3000)
    });
    }
  //API edit

function EditUserModal({openEdit, closeEditModal, confirmText, rejectText, headerText}) {

    //modal edicion

    const handleConfirmEdit = ()=> {
      return apiCallEdit('algo').then((response) => {
          alert("Recibimos esta response: " + response);
          // y talvez queremos cerrar el modal
          //closeModal();
      })
      }
    const handleRejectEdit = ()=> {
      // hacemos cosas cuando se aprieta rechazar
      alert("rechazaste el modal")
      // pero esta vez no lo cerramos
      }
    //modal edicion
    
  return (
    <>
      <DebModal
      open={openEdit}
      onClose={closeEditModal}
      onConfirm={handleConfirmEdit}
      onReject={handleRejectEdit}
      onResponse={closeEditModal}
      confirmText={confirmText}
      rejectText={rejectText}
      headerText={headerText}
      children={<DeleteIcon/>}
      ></DebModal>
    </>
  )
}

export default EditUserModal
